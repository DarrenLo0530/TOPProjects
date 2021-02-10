class ConnectFour
  attr_accessor :grid

  def initialize
    @grid = Array.new(7) {Array.new(7) {'E'}}
    @@max_row = 5
    @@max_column = 6
    @@red_piece = "\u25EF".encode('utf-8')
    @@blue_piece = "\u2B24".encode('utf-8')
    @@player_info = [{char: 'R', colour: 'RED'}, {char: 'B', colour: 'BLUE'}]
  end

  def column_available?(column)
    return @grid[0][column] == 'E' ? true : false
  end
  
  def place_piece(piece_type, column)
    piece_icon = piece_type == 'R' ? @@red_piece : @@blue_piece

    @@max_row.downto(0) do |row_number|
      if grid[row_number][column] == 'E'
        grid[row_number][column] = piece_icon
        return
      end
    end
  end

  def is_in_bounds? (row, column)
    return row >= 0 && row <= @@max_row && column >= 0 && column <= @@max_column
  end

  def print_grid
    0.upto(@@max_row) do |row_number|
      row_display = grid[row_number].join(' ')
      puts row_display
    end
  end

  def get_number_in_range(min, max)
    puts "Please input a column to place the piece in (#{min} - #{max})"
    begin
      number = Integer(gets.chomp)
      raise unless number.between?(min, max)
      return number
    rescue
      puts "Please enter a number between #{min} - #{max}"
      retry
    end
  end

  def get_user_column
    #Keep asking for a column until they choose a column that is not taken yet
    while true
      column_chosen = get_number_in_range(0, @@max_column)
      return column_chosen if column_available?(column_chosen)
      puts "That column is not available!"
    end 
  end

  def get_winner_horizontal
    [@@red_piece, @@blue_piece].each_with_index do |piece, player_number|
      four_in_row = ([piece]*4).join("")
      #Checks horizontal
      grid.each do |row| 
        row_string = row.join("")
        return player_number if row_string.include?(four_in_row)
      end
    end
    return 2
  end

  def get_winner_vertical
    [@@red_piece, @@blue_piece].each_with_index do |piece, player_number|
      four_in_row = ([piece]*4).join("")
      #Checks vertical
      0.upto(@@max_column) do |column_number|
        column = []
        0.upto(@@max_row) do |row_number| 
          column += [grid[row_number][column_number]]
        end

        column_string = column.join("")
        return player_number if column_string.include?(four_in_row)
      end
    end

    return 2
  end

  def get_winner_diagonal
    diagonal_options = [[1, -1], [1, 1]]
    [@@red_piece, @@blue_piece].each_with_index do |piece, player_number|
      0.upto(1) do |diagonal_direction|
        0.upto(@@max_row) do |row_number|
          0.upto(@@max_column) do |column_number|
            x, y = column_number, row_number
            consecutive_counter = 0
            4.times do
              if is_in_bounds?(y, x) && grid[y][x] == piece
                consecutive_counter += 1
                x += diagonal_options[diagonal_direction][0]
                y += diagonal_options[diagonal_direction][1]
              else
                break
              end
            end
            if consecutive_counter >= 4
              return player_number
            end
          end
        end
      end
    end
    return 2
  end

  def get_winner 
    return get_winner_horizontal if get_winner_horizontal != 2 
    return get_winner_vertical if get_winner_vertical != 2
    return get_winner_diagonal
  end

  def game_is_tie?
    #Checks if the game is a tie or not
    game_tie = true
    0.upto(@@max_column) {|column| game_tie = game_tie && !column_available?(column)}
    return game_tie
  end

  def play_game
    #Return 1 if Red wins, 2 if blue wins, 0 if game is not over
    turn_counter = 0

    while get_winner == 2
      if game_is_tie?
        puts "Game Over! The game ended in a tie"
        #Leave the function so you never check who wins
        return
      end

      #Get the character and colour that represents the player whose turn it is
      player_char = @@player_info[turn_counter % 2][:char]
      player_colour = @@player_info[turn_counter % 2][:colour]
      
      puts "It is currently #{player_colour}'s turn"
      player_column_chosen = get_user_column
      place_piece(player_char, player_column_chosen)

      #Print the grid and move on to the next turn
      print_grid
      turn_counter += 1

      #Separates every turn for better clarity
      puts "\n\n"
    end
    player_who_won = @@player_info[get_winner][:colour]
    puts "Game Over!"
    puts "Player #{player_who_won} wins the game!"
  end
end