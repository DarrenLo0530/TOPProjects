require_relative 'piece'

class Bishop < Piece
  def initialize(colour)
    super(colour)
    @symbol = @colour == @@black ? "\u265D".encode('utf-8') : "\u2657".encode('utf-8')
  end

  def is_valid_move?(current_pos, moved_pos, board)    
    return false if taking_own_piece?(moved_pos, board)
    return Piece.is_valid_diagonal?(current_pos, moved_pos, 10, board)
  end
end
