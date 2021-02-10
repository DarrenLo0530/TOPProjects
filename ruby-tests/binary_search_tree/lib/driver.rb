require_relative 'binary_tree.rb'

data_array = Array.new(20) {rand(1..500)}

bt = Tree.new()

#Build tree
bt.build_tree(data_array)

#Tree is balanced?
puts "Tree is balanced: " + bt.balanced?.to_s

bt.print_orders

#Insert new elements
insert_elements = Array.new(20) {rand(1..500)}
insert_elements.each do |value|
  bt.insert(value)
end

puts "\n\n"

puts "AFTER INSERTION:"
puts "Tree is balanced after insertion: " + bt.balanced?.to_s
bt.print_orders


puts "\n\n"

puts "AFTER DELETION:"
deleted_elements = Array.new(20) {(insert_elements + data_array).sample}
deleted_elements.each do |value|
  bt.delete(value)
end

puts "Deleted elements were: "  + deleted_elements.sort.join(' ')
puts "Tree is balanced after deletion: " + bt.balanced?.to_s
bt.print_orders

puts "\n\n"




