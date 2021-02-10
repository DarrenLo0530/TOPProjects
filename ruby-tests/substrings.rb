def substrings(word, substrings_possibilities)
  lower_case_word = word.downcase
  all_appearances = {}
  substrings_possibilities.each do |substring|
    number_of_matches = lower_case_word.scan(/#{substring.downcase}/).length
    
    if number_of_matches > 0
      all_appearances[substring.to_sym] = number_of_matches
    end
  end

  return all_appearances  
            
end

dictionary = ["below","down","go","going","horn","how","howdy","it","i","low","own","part","partner","sit"]
puts substrings("Howdy partner, sit down! How's it going?", dictionary)