require_relative "../space"

class Piece
  attr_accessor :colour, :symbol, :has_moved

  @@white = 0
  @@black = 1
  
  def initialize(colour)
    @colour = colour
    @symbol = nil
    @has_moved = false
  end

  def to_hash
    return {piece_name: self.class.name, colour: @colour, has_moved: @has_moved}
  end

  def self.black
    @@black
  end 

  def self.white
    @@white
  end

  def self.num_to_colour(colour)
    return "black" if colour == 1
    return "white" if colour == 0
    return nil
  end

  def is_valid_move?(current_pos, moved_pos, board)
  end

  def can_move?(current_pos, board)
    board.get_all_spaces.each do |possible_space|
      return true if is_valid_move?(current_pos, possible_space, board) && !board.king_checked_if_move?(current_pos, possible_space, @colour)
    end

    return false
  end

  #Utility functions that check if the move is a valid horizontal move given constraints used for (King, Queen, Bishop, ROok and Pawn)
  #Knight has unique function

  def self.is_valid_horizontal?(current_pos, moved_pos, max_dist, board)
    #Checks if move is strictly horizontal
    return false if current_pos.y != moved_pos.y
    #Checks that it does not exceed maximum travel distance
    return false if (moved_pos.x - current_pos.x).abs > max_dist || (moved_pos.x - current_pos.x).abs == 0

    smaller_column = [current_pos.x, moved_pos.x].min
    larger_column = [current_pos.x, moved_pos.x].max

    if smaller_column <= larger_column 
    #Checks that there is not piece in the way of the one space to the other
      (smaller_column + 1).upto(larger_column - 1) do |column_number|
        return false unless board.get(Space.new(column_number, current_pos.y)).nil?
      end
    end

    return true
  end

  def self.is_valid_vertical?(current_pos, moved_pos, max_dist, board)
   
    #Checks if move is strictly horizontal
    return false if current_pos.x != moved_pos.x
    #Checks that it does not exceed maximum travel distance
    return false if (moved_pos.y - current_pos.y).abs > max_dist || (moved_pos.y - current_pos.y).abs == 0

    smaller_row = [current_pos.y, moved_pos.y].min
    larger_row = [current_pos.y, moved_pos.y].max
    if smaller_row <= larger_row
    #Checks that there is not piece in the way of the one space to the other
      (smaller_row + 1).upto(larger_row - 1) do |row_number|
        return false unless board.get(Space.new(current_pos.x, row_number)).nil?
      end
    end

    return true
  end

  def self.is_valid_diagonal?(current_pos, moved_pos, max_dist, board)  
    #Has to be a diagonal with a slope of 1/-1
    return false if (current_pos.y - moved_pos.y).abs != (current_pos.x - moved_pos.x).abs

    #Checks that it does not exceed max distance
    return false if (moved_pos.y - current_pos.y).abs > max_dist || (moved_pos.y - current_pos.y).abs == 0
    #Checks that there are no pieces in between diagonal

    slope_direction = (moved_pos.y - current_pos.y)/(moved_pos.x - current_pos.x) < 0 ? -1 : 1
    left_pos = current_pos.x < moved_pos.x ? current_pos : moved_pos
    right_pos = current_pos.x < moved_pos.x ? moved_pos : current_pos
    
    move_dist = 1
    while(left_pos.x + move_dist < right_pos.x)
      moved_x = left_pos.x + move_dist
      moved_y = left_pos.y + slope_direction * move_dist
      return false unless board.get(Space.new(moved_x, moved_y)).nil?

      move_dist += 1
    end

    return true
  end

  def taking_own_piece?(pos, board)
    return !board.get(pos).nil? && board.get(pos).colour == @colour
  end

  def self.get_other_colour(colour)
    return colour ^ 1
  end

end