require 'json'

class HangManGame
  @@initial_guesses = 8

  def initialize 
    @guesses_left = 8
    @word_to_guess = get_random_word
    @every_letter_guessed = []
  end

  def get_save_path(file_name)
    "save_files/" + file_name + ".json"
  end

  def save_game(file_path)
    game_save = {
      guesses_left: @guesses_left,
      word_to_guess: @word_to_guess,
      every_letter_guessed: @every_letter_guessed,
    }

    File.open(file_path, "w") do |f|
      f.write(game_save.to_json)
    end 
  end

  def ask_user_save
    puts "Do you want to save your game?"
    answer = gets.chomp.strip.downcase
    
    if answer == 'yes'
      puts "What name do you want to save it under?"
      loop do
        file_name = gets.chomp.strip.gsub(/\s+/, '_')
        file_path = get_save_path(file_name)

        if File.file?(file_path)
          puts "A save file with that name already exists. Pick another name!"
        else
          save_game(file_path)
          break
        end
      end
    end
  end

  def load_game(file_path)
    save_data = JSON.parse(File.read(file_path), symbolize_names: true)
    @guesses_left = save_data[:guesses_left]
    @word_to_guess = save_data[:word_to_guess]
    @every_letter_guessed = save_data[:every_letter_guessed]
  end

  def ask_user_load
    #Do not ask to load save file if there are no save files available
    unless Dir.empty?('save_files')
      puts "Do you want to load a game?"
      load_game_answer = gets.chomp.strip.downcase

      if load_game_answer == 'yes'
        puts "Here are the available save files"

        #Prints all the file names of save files
        Dir.each_child('save_files') do |file_name|
          name_without_extension = File.basename(file_name, '.json')
          puts '- ' + name_without_extension
        end
        
        #Gets name of file user wants to load
        puts "What file would you like to load?"
        loop do
          file_name = gets.chomp.strip
          file_path = get_save_path(file_name)

          if File.file?(file_path)
            load_game(file_path)
            puts "Succesfully loaded file"
            break
          else 
            puts "Please enter one of the save file names listed previously"
          end
        end
      end
    end
  end

  def get_random_word
    #Load in words
    words = File.read("word_list.txt").split
    word_with_length = words.select {|word| word.length >=5 && word.length <= 12}

    #Get random word
    selected_word = word_with_length.sample.downcase
  end
  
  def correct_guess?(letter_guessed)
    return @word_to_guess.split('').count(letter_guessed) > 0
  end

  def game_won?
    #Checks that every letter in word to guess has been guessed
    @word_to_guess.split('').each do |letter|
      unless @every_letter_guessed.include?(letter)
        return false
      end
    end
    
    true
  end

  def display_game_information
    puts "Guesses left: #{@guesses_left}"
    word_progress = @word_to_guess.split('').map do |letter|
      @every_letter_guessed.include?(letter) ? letter : '_'
    end 

    puts "Used letters: " + @every_letter_guessed.join(', ')

    puts word_progress.join(" ")
  end

  def guess_is_allowed?(guess)
    if guess.length != 1
      puts "Please only enter one letter"
      return false
    elsif !(guess.downcase.ord >= 97 && guess.downcase.ord <= 122)
      puts "Please enter something from the alphabet"
      return false
    elsif @every_letter_guessed.include?(guess)
      puts "You already guessed that"
      return false
    end
      
    true
  end

  def get_user_guess
    letter_guessed = ''
    loop do 
      puts "Guess a singular letter: "
      letter_guessed = gets.chomp.downcase
      if guess_is_allowed?(letter_guessed)
        return letter_guessed
        break
      end
    end 
  end

  def play_one_turn
    letter_guessed = get_user_guess
    @every_letter_guessed.push(letter_guessed)

    unless correct_guess?(letter_guessed)
      puts "The letter #{letter_guessed} is incorrect"
      @guesses_left = @guesses_left - 1
    else 
      puts "The letter #{letter_guessed} is correct"
    end
    
    display_game_information
  end

  def play_game
    ask_user_load
    puts "\n\n"

    while !game_won? && @guesses_left > 0
      ask_user_save
      puts "\n\n"

      play_one_turn
      puts "\n\n"
    end

    if game_won?
      puts "Congratulations you won the game!"
    else
      puts "You lost! The word you needed to guess was #{@word_to_guess}"
    end
  end
end

game = HangManGame.new
game.play_game






