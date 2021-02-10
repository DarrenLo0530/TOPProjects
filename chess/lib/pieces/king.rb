require_relative 'piece'

class King < Piece
  def initialize(colour)
    super(colour)
    @symbol = @colour == @@black ? "\u265A".encode('utf-8') : "\u2654".encode('utf-8')
  end

  def is_being_checked?(current_pos, board)
    return board.space_under_attack?(current_pos, Piece.get_other_colour(@colour))
  end

  def can_move?(current_pos, board)

    board.get_all_spaces.each do |possible_space|
      if is_valid_move?(current_pos, possible_space, board) && !is_being_checked?(possible_space, board)
        return true
      end
    end

    return false
  end
  
  def is_valid_castle?(current_pos, moved_pos, board)
    #Castle is illegal if previously moved the king
    return false if @has_moved
    #Castle must move on the same row and move two spaces
    return false if current_pos.y != moved_pos.y || (current_pos.x - moved_pos.x).abs != 2

    #Find rook that is in the direction of castle
    castled_rook = nil
    castle_row = current_pos.y
    move_direction = (moved_pos.x - current_pos.x)/(moved_pos.x - current_pos.x).abs

    rook_x = move_direction < 0 ? 0 : 7
    rook_position = Space.new(rook_x, castle_row)
    castled_rook = board.get(rook_position)
    
    #Makes sure the piece is a rook and has not moved yet
    return false if castled_rook.class.name != "Rook" || castled_rook.has_moved

    smaller_column = [rook_x, current_pos.x].min
    larger_column = [rook_x, current_pos.x].max

    #Checks that none of the spaces(inclusive) between king and rook are being attacked
    smaller_column.upto(larger_column) do |column|
      return false if board.space_under_attack?(Space.new(column, castle_row), Piece.get_other_colour(@colour))
    end

    #Checks that there are no pieces in between rook and king
    (smaller_column+1).upto(larger_column-1) do |column|
      return false unless board.get(Space.new(column, castle_row)).nil?
    end

    #It is a valid castle
    #Move the rook, King is moved after
    castled_rook.has_moved = true
    board.move_piece(rook_position, Space.new(current_pos.x + move_direction, castle_row))
    return true   
  end

  #Only separated for king since it is the only piece that can't move to a square if that square is being attacked
  #This results in circular dependency with is_valid_move? and is_being_checked? if not separated
  def is_attacking?(current_pos, attacked_pos, board)
    return Piece.is_valid_diagonal?(current_pos, attacked_pos, 1, board) ||
           Piece.is_valid_horizontal?(current_pos, attacked_pos, 1, board) ||
           Piece.is_valid_vertical?(current_pos, attacked_pos, 1, board)
  end

  def is_valid_move?(current_pos, moved_pos, board)    
    return false if taking_own_piece?(moved_pos, board)
    return false if is_being_checked?(moved_pos, board)

    return is_valid_castle?(current_pos, moved_pos, board) || is_attacking?(current_pos, moved_pos, board)
  end

end
