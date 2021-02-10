require_relative 'piece'

class Knight < Piece  
  def initialize(colour)
    super(colour)
    @symbol = @colour == @@black ? "\u265E".encode('utf-8') : "\u2658".encode('utf-8')
  end

  def is_valid_move?(current_pos, moved_pos, board)
    return false if taking_own_piece?(moved_pos, board)

    change_x = (moved_pos.x - current_pos.x).abs
    change_y = (moved_pos.y - current_pos.y).abs
    
    return change_x * change_y == 2
  end
end
