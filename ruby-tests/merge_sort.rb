def merge(low, middle, high, array)
  
  left_side = array[low..middle]
  right_side = array[middle+1..high]

  left_counter = 0
  right_counter = 0

  while left_counter < left_side.length || right_counter < right_side.length
    if (right_side[right_counter].nil?) || (!left_side[left_counter].nil? && left_side[left_counter] < right_side[right_counter])
      array[low + left_counter + right_counter] = left_side[left_counter]
      left_counter += 1
    else
      array[low + left_counter + right_counter] = right_side[right_counter]
      right_counter += 1
    end
  end
end

def merge_sort_util(low, high, array)
  if low >= high
    return
  end
  
  middle = (low + high)/2
  merge_sort_util(low, middle, array)
  merge_sort_util(middle + 1, high, array)
  merge(low, middle, high, array)
end

def merge_sort(array)
  array_copy = array.clone
  merge_sort_util(0, array_copy.length-1, array_copy)
  return array_copy
end

array = [43, 60, 62, 104, 108, 124, 141, 144, 206, 207, 211, 214, 
        220, 238, 246, 261, 307, 321, 330, 346, 359, 372, 416, 462, 
        528, 533, 546, 555, 558, 584, 663, 733, 753, 758, 764, 769, 
        783, 797, 817, 829, 832, 846, 873, 915, 934, 937, 943, 957, 
        960, 992]
        
p merge_sort(array)
