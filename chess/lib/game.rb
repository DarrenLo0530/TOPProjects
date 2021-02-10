require_relative "board"
require 'json'


class Game  
  def initialize
    @player_turn = Piece.white
    @board = Board.new()
  end

  def get_save_path(file_name)
    "save_files/" + file_name + ".json"
  end

  def to_json(file_path)
    game_save = {
      player_turn: @player_turn,
      board: @board.to_hash
    }

    File.open(file_path, "w") do |f|
      f.write(game_save.to_json)
    end 
  end

  def from_json(file_path)
    game_save = JSON.parse(File.read(file_path), symbolize_names: true)
    @player_turn = game_save[:player_turn]
    @board = Board.new()
    @board.from_hash(game_save[:board])
  end

  def ask_to_save
    puts "Do you want to save your game?"
    answer = gets.chomp.strip.downcase
    
    if answer == 'yes'
      puts "What name do you want to save it under?"
      loop do
        file_name = gets.chomp.strip.gsub(/\s+/, '_')
        file_path = get_save_path(file_name)

        if File.file?(file_path)
          puts "A save file with that name already exists. Pick another name!"
        else
          to_json(file_path)
          return
        end
      end
    end
  end

  def ask_to_load
    #Do not ask to load save file if there are no save files available
    unless Dir.empty?('save_files')
      puts "Do you want to load a game?"
      load_game_answer = gets.chomp.strip.downcase

      if load_game_answer == 'yes'
        puts "Here are the available save files"

        #Prints all the file names of save files
        Dir.each_child('save_files') do |file_name|
          name_without_extension = File.basename(file_name, '.json')
          puts '- ' + name_without_extension
        end
        
        #Gets name of file user wants to load
        puts "What file would you like to load?"
        loop do
          file_name = gets.chomp.strip
          file_path = get_save_path(file_name)

          if File.file?(file_path)
            from_json(file_path)
            puts "Succesfully loaded file"
            return
          else 
            puts "Please enter one of the save file names listed previously"
          end
        end
      end
    end
  end

  def is_proper_coord?(coord)
    return !(coord =~ /^[A-H][1-8]$/).nil?
  end

  def convert_coord_to_num(coord)
    split_coord = coord.split("")
    x_coord = split_coord[0].ord - "A".ord  
    y_coord = 8 - split_coord[1].to_i
    return Space.new(x_coord, y_coord)
  end

  def get_coord_input
    puts "Enter a coordinate: "

    loop do
      coord = gets.strip
      return convert_coord_to_num(coord) if is_proper_coord?(coord)
      puts "Please enter a valid coordinate!"
    end
  end

  def make_move(turn_colour)
    puts "It is #{Piece.num_to_colour(turn_colour)}'s turn to move a piece"
    while true

      selected_coord = nil
      curr_piece = nil

      curr_king = @board.get_king(turn_colour)

      puts "Choose what piece to move: "
      loop do
        selected_coord = get_coord_input
        curr_piece = @board.get(selected_coord)
        
        #If checked, must move king
        if curr_king[0].is_being_checked?(curr_king[1], @board) && selected_coord != curr_king[1]
          puts "Your king is being checked, you must move it!"
          next
        end
        
        #If square is not your piece or is empty, prompts to pick another square
        break if !curr_piece.nil? && curr_piece.colour == turn_colour
        puts "Please choose a square with a piece and that is of your colour!\n\n"
      end

      #Spacing
      puts 

      #Gets place to move that piece to
      moved_coord = nil
      puts "Choose where to move that piece to: "
      
      #Makes sure moved square is not the piece's current square
      loop do
        moved_coord = get_coord_input
        break if moved_coord != selected_coord
        puts "Please choose a space that is not the space the current piece is on!\n\n"
      end
      
      #Makes sure it does not result in your king being checked if you move
      if @board.king_checked_if_move?(selected_coord, moved_coord, turn_colour)
        puts "Invalid move! Results in your king being checked!\n\n"
        next
      end
      
      #Makes sure that piece can actually move to that square
      if curr_piece.is_valid_move?(selected_coord, moved_coord, @board)
        @board.get(selected_coord).has_moved = true
        @board.move_piece(selected_coord, moved_coord)
        return 
      else
        puts "Invalid move! Choose another piece or do perform a valid move!\n\n"
      end
    end
  end
  

  def is_checkmate?(colour)
    team_king = @board.get_king(colour)

    #Pretty naive way of checking. Moves every piece to every space to check if the king is still being checked
    team_pieces = @board.get_pieces(colour)

    return false if team_king[0].can_move?(team_king[1], @board) || !team_king[0].is_being_checked?(team_king[1], @board) 
    #Checks that no piece move can stop the checkmate
    team_pieces.each do |piece|
      piece_coord = piece[1]
      @board.get_all_spaces.each do |moved_coord|
        if piece[0].is_valid_move?(piece_coord, moved_coord, @board)
          return false unless @board.king_checked_if_move?(piece_coord, moved_coord, colour)
        end
      end
    end

    return true
  end

  def is_stalemate?(colour)
    #Can't be stalemate if king is being checked
    team_king = @board.get_king(colour)
    if team_king[0].is_being_checked?(team_king[1], @board) 
      puts "Being checked"
      return false
    end

    #Returns all the pieces
    pieces = @board.get_pieces(colour)

    #Sees if any piece can be moved. If there is none, then it is stalemate
    pieces.each do |piece|
      type_of_piece = piece[0]
      coord = piece[1]
      if type_of_piece.can_move?(coord, @board)
        return false
      end
    end

    return true
  end

  #0-1 for a winner
  #2 for a draw
  #3 for game continues
  def get_game_state
    black_king = @board.get_king(Piece.black)
    white_king = @board.get_king(Piece.white)

    return Piece.white if is_checkmate?(Piece.black)
    return Piece.black if is_checkmate?(Piece.white)
    return 2 if is_stalemate?(Piece.black) || is_stalemate?(Piece.white)
    return 3
  end

  def play_game
    ask_to_load
    #Continue playing while the game is not a check/stalemate
    while get_game_state == 3
      ask_to_save
      @board.print_board()
      make_move(@player_turn)
      @board.transform_pawns
      @player_turn = Piece.get_other_colour(@player_turn)
      puts "\n\n"
    end

    #Prints the end of game message
    game_result = get_game_state
    @board.print_board
    if game_result == 0 || game_result == 1
      puts "Good game, #{Piece.num_to_colour(game_result)} wins"
      return 1
    else
      puts "Draw"
      return 2
    end
  end
end

