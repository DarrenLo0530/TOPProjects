#Implementation of a self-balanced binary search tree(AVL) after not having implemented one in a few months
require_relative 'node.rb'

class Tree
  attr_accessor :root
  def initialize
    @root = nil
  end

  def get_height(node)
    #Assume nodes that don't exist have a height of 0
    if node.nil?
      return 0
    end

    return node.height
  end

  #Gives another name to the function
  alias :depth :get_height

  def update_height(node)
    node.height = 1 + [get_height(node.right_node), get_height(node.left_node)].max
  end

  def get_min_node(root_node)
    if root_node.left_node.nil?
      return root_node
    end

    return get_min_node(root_node.left_node)
  end

  def get_balance(node)
    if node.nil?
      return 0
    end

    return get_height(node.left_node) - get_height(node.right_node)
  end

  def right_rotation(imbalanced_node)
    #Rotation code
    pivot = imbalanced_node.left_node
    imbalanced_node.left_node = pivot.right_node

    pivot.right_node = imbalanced_node

    #Adjust heights
    update_height(imbalanced_node)
    update_height(pivot)

    #Pivot node has taken place of imbalanced node
    return pivot
  end

  def left_rotation(imbalanced_node)
    #Rotation code
    pivot = imbalanced_node.right_node
    imbalanced_node.right_node = pivot.left_node
    
    pivot.left_node = imbalanced_node

    #Adjust heights
    update_height(imbalanced_node)
    update_height(pivot)

    #Pivot node has taken place of imbalanced node
    return pivot
  end

  def insert_util(curr_node = @root, value)   
    #General insertion code 
    if curr_node.nil?
      return Node.new(value)
    end

    #Traverses the tree to find insertion spot
    if value > curr_node.value
      curr_node.right_node = insert_util(curr_node.right_node, value)
    elsif value < curr_node.value
      curr_node.left_node = insert_util(curr_node.left_node, value)
    else
      #Don't do anything since the number is already in the binary tree
      return curr_node
    end

    update_height(curr_node)

    #Balancing code
    #Checking for imbalances
    balance_fac = get_balance(curr_node)
    #Left-left 
    if balance_fac > 1 && value < curr_node.left_node.value
      return right_rotation(curr_node)
    #Right-right 
    elsif balance_fac < -1 && value > curr_node.right_node.value
      return left_rotation(curr_node)
    #Right-left
    elsif balance_fac < -1 && value < curr_node.right_node.value
      curr_node.right_node = right_rotation(curr_node.right_node)
      return left_rotation(curr_node)
    #Left-right
    elsif balance_fac > 1 && value > curr_node.left_node.value
      curr_node.left_node = left_rotation(curr_node.left_node)
      return right_rotation(curr_node)
    end

    #No adjustments were made so return the original node that was there
    return curr_node
  end

  def delete_util(curr_node = @root, value)
    #If current node is nil, that means value does not exist in tree so nothing is deleted
    if curr_node.nil?
      return nil
    end

    #Traverse tree to find the node to delete
    if value > curr_node.value
      curr_node.right_node = delete_util(curr_node.right_node, value)
    elsif value < curr_node.value
      curr_node.left_node = delete_util(curr_node.left_node, value)
    #Correct node found
    else
      #No child nodes
      if curr_node.left_node.nil? && curr_node.right_node.nil?
        curr_node = nil
      #Two child nodes
      elsif !curr_node.left_node.nil? && !curr_node.right_node.nil?
        #Node that takes the deleted node's place
        replacement_node = get_min_node(curr_node.right_node)
        #Insert replacement node value in place of the node we want to delete
        curr_node.value = replacement_node.value
        #Delete original version of the replacement node
        curr_node.right_node = delete_util(curr_node.right_node, replacement_node.value)
        curr_node.value = replacement_node.value
      else
        if curr_node.left_node.nil?
          curr_node = curr_node.right_node
        else
          curr_node = curr_node.left_node
        end
      end
    end

    #Do nothing if current node does not exist
    if curr_node.nil?
      return nil
    end

    #Rebalance the tree
    update_height(curr_node)

    balance_fac = get_balance(curr_node)
    #Left left
    if balance_fac > 1 && get_balance(curr_node.left_node) >= 0
      return right_rotation(curr_node)
    #left right
    elsif balance_fac > 1 && get_balance(curr_node.left_node) < 0
      curr_node.left_node = left_rotation(curr_node.left_node)
      return right_rotation(curr_node)
    #Right right
    elsif balance_fac < -1 && get_balance(curr_node.right_node) < 0
      return left_rotation(curr_node)
    #Right left
    elsif balance_fac < -1 && get_balance(curr_node.right_node) >= 0
      curr_node.right_node = right_rotation(curr_node.right_node)
      return left_rotation(curr_node)
    end    

    return curr_node
  end

  def insert(value)
    @root = insert_util(value)
  end

  def delete(value)
    @root = delete_util(value)
  end
  
  def build_tree(unfiltered_data)
    #Filters data so that it is only unique values
    data = unfiltered_data.uniq

    #Inserts for each value
    data.each do |value|
      insert(value)
    end
  end

  def find(curr_node = @root, value)
    #If current node is nil that means the value is not in the tree
    if curr_node.nil?
      return nil
    end

    #Traverses the tree
    if value > curr_node.value
      find_util(curr_node.right_node, value)
    else
      find_util(curr_node.left_node, value)
    end
  end

  def balanced?(curr_node = @root)
    if curr_node.nil?
      return true
    end
    
    #Checks that current node is balanced
    if (get_balance(curr_node)).abs <= 1
      #Checks that child nodes are balanced
      return balanced?(curr_node.left_node) || balanced?(curr_node.right_node)
    end

    return false
  end

  #Traversal methods
  def level_order

    #Nodes in current level
    to_visit = [@root]
    level_order_data = []
    
    #Looping through the levels
    until to_visit.empty?
      next_node = to_visit.shift

      if next_node != nil
        block_given? ? yield(next_node) : level_order_data.push(next_node)
        to_visit.push(next_node.left_node, next_node.right_node)
      end
    end

    block_given? ? nil : level_order_data
  end

  def level_order_rec(to_visit = [@root], level_order_data = [], &block)
    if to_visit.empty?
      return block_given? ? nil : level_order_data
    end

    next_node = to_visit.shift
    unless next_node.nil?
      block_given? ? yield(next_node) : level_order_data.push(next_node)
      to_visit.push(next_node.left_node, next_node.right_node)
    end

    return level_order_rec(to_visit, level_order_data, &block)
  end

  ['preorder', 'inorder', 'postorder'].each do |func_name|
    define_method(func_name) do |curr_node = @root, data = [], &block|
      if curr_node.nil?
        return nil
      end

      block ? block.call(curr_node) : data.push(curr_node) if func_name == 'preorder'

      self.send(func_name, curr_node.left_node, data, &block)
      block ? block.call(curr_node) : data.push(curr_node) if func_name == 'inorder'

      self.send(func_name, curr_node.right_node, data, &block)
      block ? block.call(curr_node) : data.push(curr_node) if func_name == 'postorder'

      return block_given? ? nil : data
    end 
  end

  def print_orders
    puts "Level order:"
    puts  Node.nodes_to_values(level_order).join(' ')

    puts "Preorder: "
    puts  Node.nodes_to_values(preorder).join(' ')

    puts "Inorder: "
    puts Node.nodes_to_values(inorder).join(' ')

    puts "Postorder: "
    puts Node.nodes_to_values(postorder).join(' ')
  end
end