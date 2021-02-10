require_relative 'piece'

class Pawn < Piece
  def initialize(colour)
    super(colour)
    @symbol = @colour == @@black ? "\u265F".encode('utf-8') : "\u2659".encode('utf-8')
  end

  def is_attacking?(current_pos, moved_pos, board)
    return Piece.is_valid_diagonal?(current_pos, moved_pos, 1, board)
  end


  def is_valid_move?(current_pos, moved_pos, board)
    move_direction = @colour == @@white ? -1 : 1
    starting_row = @colour == @@black ? 1 : 6

    return false if taking_own_piece?(moved_pos, board)
    #Checks that pawn is moving in the right direction
    return false unless (moved_pos.y - current_pos.y)*move_direction > 0

    max_forward_dist = current_pos.y == starting_row ? 2 : 1

    if Piece.is_valid_vertical?(current_pos, moved_pos, max_forward_dist, board)
      #Must not take a piece when moving
      return board.get(moved_pos).nil?
    else
      #Must take a piece when moving
      return !board.get(moved_pos).nil? && is_attacking?(current_pos, moved_pos, board)
    end
  end
  

  def at_last_row?(coord)
    last_row = @colour == @@black ? 7 : 0
    return last_row == coord.y
  end

end
