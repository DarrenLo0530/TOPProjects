require_relative 'piece'

class Queen < Piece
  def initialize(colour)
    super(colour)
    @symbol = @colour == @@black ? "\u265B".encode('utf-8') : "\u2655".encode('utf-8')
  end

  def is_valid_move?(current_pos, moved_pos, board)
    if taking_own_piece?(moved_pos, board)
      return false
    end

    return Piece.is_valid_horizontal?(current_pos, moved_pos, 10, board) ||
           Piece.is_valid_vertical?(current_pos, moved_pos, 10, board) || 
           Piece.is_valid_diagonal?(current_pos, moved_pos, 10, board)
  end
end