class Node
  attr_accessor :x, :y, :parent

  include Comparable
  def initialize(x, y, parent)
    @x = x
    @y = y
    @parent = parent
  end

  def ==(other_node)
    return @x == other_node.x && @y == other_node.y
  end

  def to_a 
    return [@x, @y]
  end

  def self.from_a(array)
    return self.new(array[0], array[1], nil)
  end
end