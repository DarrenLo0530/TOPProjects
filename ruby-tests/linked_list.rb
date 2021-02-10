class Node
  attr_accessor :value, :next_node
  def initialize(value = nil)
    @value = value
    @next_node = nil
  end
end

class LinkedList
  attr_accessor :head, :tail, :size

  def initialize
    @head = nil
    @tail = nil
    @size = 0
  end
  
  def append(value)
    @size += 1

    appended_node = Node.new(value)
    if @head.nil?
      @head = appended_node
    else
      @tail.next_node = appended_node
    end

    @tail = appended_node
  end

  def prepend(value)
    @size += 1

    pre_node = Node.new(value)
    pre_node.next_node = @head
    @head = pre_node

    if tail.nil?
      @tail = pre_node
    end
  end

  def at(index)
    curr_node = @head

    index.times do
      curr_node = curr_node.next_node
      if curr_node.nil?
        return nil
      end
    end

    return curr_node.value
  end

  def pop
    @size -= 1

    new_tail = @head
    if new_tail.nil?
      return nil
    end

    while new_tail.next_node != @tail
      new_tail = new_tail.next_node
    end

    new_tail.next_node = nil
    @tail = new_tail
  end

  def find(search_value)
    curr_node = @head
    index = 0

    until curr_node.nil?
      if curr_node.value == search_value
        return index
      end
      curr_node = curr_node.next_node

      index += 1
    end

    return nil
  end

  def contains?(search_value)
    find(search_value) ? true : false
  end

  def to_s
    string_representation = ''
    
    curr_node = @head
    until curr_node.nil?
      string_representation += curr_node.value.to_s + ' -> '
      curr_node = curr_node.next_node
    end

    string_representation += 'nil'
  end

  def insert_at(value, index)
    #Edge cases
    if index == 0
      prepend(value)
      return 
    elsif index == size
      append(value)
      return
    elsif index > size || index < 0 
      return
    end

    @size += 1
    inserted_node = Node.new(value)
    parent_node = @head
    
    (index-1).times do 
      parent_node = parent_node.next_node
    end

    inserted_node.next_node = parent_node.next_node
    parent_node.next_node = inserted_node
  end

  def remove_at(index)
    if index == 0
      @size -= 1
      @head = @head.next_node
      return 
    elsif index == size-1
      pop
      return
    elsif index >= size || index < 0
      return
    end

    @size -= 1
    parent_node = @head
    (index-1).times do
      parent_node = parent_node.next_node
    end

    parent_node.next_node = parent_node.next_node.next_node
  end   

end


new_linked_list = LinkedList.new()

new_linked_list.append(3)
new_linked_list.append(4) 
new_linked_list.prepend(2)
new_linked_list.prepend(1)
new_linked_list.append(5)

new_linked_list.insert_at(200, 1)
new_linked_list.remove_at(0)

p new_linked_list.head.value
p new_linked_list.tail.value
p new_linked_list.size

p new_linked_list.contains?(7)
p new_linked_list.contains?(3)

p new_linked_list.find(7)
p new_linked_list.find(3)

p new_linked_list.at(0)
p new_linked_list.at(4)


p new_linked_list.to_s

