def bubble_sort(array)
sorted_array = array.clone
continue_sorting = true

while continue_sorting
  continue_sorting = false

  sorted_array.each_with_index do |value, index|
    if index + 1 < sorted_array.length && sorted_array[index] > sorted_array[index+1]
      sorted_array[index], sorted_array[index+1] = sorted_array[index+1], sorted_array[index]
      continue_sorting = true
    end    
  end
end

return sorted_array
end    

array = [4,3,78,2,0,2]
sorted_array = bubble_sort(array)

p array
p sorted_array