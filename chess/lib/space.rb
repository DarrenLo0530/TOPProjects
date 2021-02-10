class Space
  attr_accessor :x, :y
  def initialize(x, y)
    @x = x
    @y = y
  end

  def == (other_space)
    return @x == other_space.x && @y == other_space.y
  end

end
