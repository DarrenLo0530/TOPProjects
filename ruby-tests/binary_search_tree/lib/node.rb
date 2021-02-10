class Node
  attr_accessor :value, :left_node, :right_node, :height  
  include Comparable

  def initialize(value = nil)
    @value = value
    @left_node = nil
    @right_node = nil
    @height = 1
  end

  def <=>(other_node)
    if other_node.nil?
      return value <=> other_node
    end
    
    return @value <=> other_node.value
  end

  #Converts a list of nodes to a list of the nodes' values
  def self.nodes_to_values(node_list)
    values = node_list.map do |node|
      node.value
    end
  end
end