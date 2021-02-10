require_relative 'node.rb'

def in_bounds(position)
  if(position.x >= 0 && position.x <= 7 && position.y >= 0  && position.y <= 7)
    return true
  end

  return false
end

def knight_path(positions, end_position, visited_spaces)
  movement_options = [[2, 1], [-2, -1], [-2, 1], [2, -1], [1, 2], [-1, -2], [-1, 2], [1, -2]]

  next_positions = []

  positions.each_with_index do |position, parent|
    if position == end_position
      return [position]
    end

    movement_options.each do |move|
      new_x = position.x + move[0]
      new_y = position.y + move[1]


      new_position = Node.new(new_x, new_y, parent)
            
      if in_bounds(new_position) && !visited_spaces[new_y][new_x]
        visited_spaces[new_y][new_x] = true
        next_positions.push(new_position)
      end
    end
  end
  
  path = knight_path(next_positions, end_position, visited_spaces)
  path.unshift(positions[path.first.parent])

  return path
end
    
def knight_moves(start_node, end_node)
  visited_array = []
  8.times do 
    row = []
    8.times do
      row.push(false)
    end
    visited_array.push(row)
  end

  visited_array[start_node[1]][start_node[0]] = true

  node_path = knight_path([Node.from_a(start_node)], Node.from_a(end_node), visited_array)
  readable_path = node_path.map do |node|
    node.to_a
  end

  puts "You made it in #{readable_path.length - 1} moves! Here's your path: "
  p readable_path
end
