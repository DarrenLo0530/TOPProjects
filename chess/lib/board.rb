Dir[File.join(__dir__, 'pieces', '*.rb')].each {|file| require file}

class Board
  attr_accessor :board, :num_rows, :num_columns

  def initialize
    @num_rows = 8
    @num_columns = 8
    @board = Array.new(@num_rows){Array.new(@num_columns){nil}}
    reset_board
  end

  def get_all_spaces
    spaces = []
    0.upto(@num_rows-1) do |row|
      0.upto(@num_columns-1) do |column|
        spaces << Space.new(column, row)
      end
    end

    return spaces
  end

  def set(coord, piece)
    @board[coord.y][coord.x] = piece
  end

  def get(coord)
    return @board[coord.y][coord.x]
  end


  def to_hash
    hash_board = Array.new(@num_rows){Array.new(@num_columns){nil}}
    get_all_spaces.each do |space|
      column = space.x
      row = space.y
      piece = get(space)
      unless piece.nil?
        hash_board[row][column] = piece.to_hash
      else
        hash_board[row][column] = Hash.new()
      end 
    end

    return hash_board
  end


  def from_hash(hash_board)
    initialize()

    get_all_spaces.each do |space|
      column = space.x
      row = space.y
      unless hash_board[row][column].empty?
        piece_hash = hash_board[row][column]
        piece = Object.const_get(piece_hash[:piece_name]).new(piece_hash[:colour])
        piece.has_moved = piece_hash[:has_moved]
        set(space, piece)
      else
        set(space, nil)
      end
    end
  end

  def reset_board
    mock_board = [['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
                  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                  ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                  ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                  ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                  ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']]

    test_board = [['e', 'e', 'e', 'k', 'e', 'e', 'e', 'e'],
                  ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                  ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                  ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                  ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                  ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                  ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
                  ['r', 'e', 'e', 'k', 'e', 'e', 'e', 'r']]

    get_all_spaces.each do |space|
      column = space.x
      row = space.y

      colour = row < 2 ? Piece.black : Piece.white
      if mock_board[row][column] == 'r'
        set(space, Rook.new(colour))
      elsif mock_board[row][column] == 'n'
        set(space, Knight.new(colour))
      elsif mock_board[row][column] == 'b'
        set(space, Bishop.new(colour))
      elsif mock_board[row][column] == 'q'
        set(space, Queen.new(colour))
      elsif mock_board[row][column] == 'k'
        set(space, King.new(colour))
      elsif mock_board[row][column] == 'p'
        set(space, Pawn.new(colour))
      end
    end
  end

  def move_piece(curr_coord, moved_coord)
    set(moved_coord, get(curr_coord))
    set(curr_coord, nil)
  end

  def is_in_bounds?(coord)
    return coord.x >= 0 && coord.x < @num_columns && coord.y >= 0 && coord.y < @num_rows
  end

  def print_board
    top_labels = [" "] + ("A".."H").to_a
    side_labels = @num_rows.downto(1).to_a

    #Prints letter labels at top of board
    top_labels.each {|column_label| print column_label + " "}
    puts

    @board.each_with_index do |board_row, index|
      #Prints number labels at side of board
      print side_labels[index].to_s + " "
      board_row.each do |board_square|
        print (board_square.nil? ? "\u25A1".encode: board_square.symbol) + " "      
      end
      puts
    end
  end
  
  #Returns array pair of the piece object and it's coordinates
  def get_pieces(colour)
    black_pieces = []
    white_pieces = []

    0.upto(@num_columns-1) do |row_number|
      0.upto(@num_rows-1) do |column_number| 
        unless board[row_number][column_number].nil?
          curr_piece = board[row_number][column_number]
          black_pieces << [curr_piece, Space.new(column_number, row_number)] if curr_piece.colour == Piece.black
          white_pieces << [curr_piece, Space.new(column_number, row_number)] if curr_piece.colour == Piece.white
        end
      end
    end

    return black_pieces if colour == Piece.black
    return white_pieces if colour == Piece.white
    return black_pieces << white_pieces
  end

  def get_king(colour)
    get_pieces(colour).each {|piece| return piece if piece[0].class.name == "King"}
  end 

  def king_checked_if_move?(piece_coord, moved_coord, colour)
    original_piece = get(moved_coord)
    check = false
    
    #Moves piece and sees if a check is happening
    move_piece(piece_coord, moved_coord)
    team_king = get_king(colour)

    if team_king[0].is_being_checked?(team_king[1], self)
      check = true
    end

    #Reset board to original position
    set(piece_coord, get(moved_coord))
    set(moved_coord, original_piece)
    return check
  end

  def transform_pawns
    piece_options = ["Queen", "Rook", "Bishop", "Knight"]
    get_all_spaces.each do |space|
      piece = get(space)
      if piece.class.name == "Pawn"
        if piece.at_last_row?(space)
          puts "Options: " + piece_options.join(", ")
          puts "What piece do you want the pawn to become:"
          loop do
            piece_choice = gets.strip
            if piece_options.include?(piece_choice)
              set(space, Object.const_get(piece_choice).new(piece.colour))
              return
            end
            puts "Please pick a valid piece"
          end
        end
      end
    end
  end

  def space_under_attack?(space, attacking_colour)
    attacking_pieces = get_pieces(attacking_colour)
    attacking_pieces.each do |piece|
      #Is a chceck if a one of the enemies piece's can move to the square that the king is on
      type_of_piece = piece[0]
      coord = piece[1]
      if ["King", "Pawn"].include?(type_of_piece.class.name)
        return true if type_of_piece.is_attacking?(coord, space, self)
      else
        return true if type_of_piece.is_valid_move?(coord, space, self)
      end
    end   
    
    return false
  end
end

