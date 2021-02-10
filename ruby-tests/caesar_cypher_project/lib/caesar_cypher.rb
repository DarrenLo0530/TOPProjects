def caesar_cypher(word, shift)
  encrypted_word = ""
  word.each_byte do |letter_code|
    if letter_code >= 65 && letter_code <= 90
      encrypted_word += ((letter_code - 65 + shift) % 26 + 65).chr
    elsif letter_code >= 97 && letter_code <= 122
      encrypted_word += ((letter_code - 97 + shift) % 26 + 97).chr
    else
      encrypted_word += letter_code.chr;
    end
  end

  return encrypted_word;

end
