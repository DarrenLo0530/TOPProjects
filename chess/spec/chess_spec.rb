require_relative '../lib/game.rb'


describe '#Game' do 
  describe '#is_proper_coord?' do 
    it "verifies a coord is improper" do 
      g = Game.new()
      expect(g.is_proper_coord?("A10")).to eql(false)
    end

    it "verifies a coord is proper" do 
      g = Game.new()
      expect(g.is_proper_coord?("H8")).to eql(true)
    end
  end

  describe '#convert_coord_to_num' do 
    it "properly converts a coordinate" do 
      g = Game.new()
      expect(g.convert_coord_to_num("H8")).to eq(Space.new(7, 0))
    end
  end

  describe '#play_game' do 
    it "#properly detects a checkmate" do 
      g = Game.new()
      input = StringIO.new()

      #Don't load a file
      input.print("no\n")
      #Moves for a checkmate
      input.print("no\nF2\nF3\n")
      input.print("no\nE7\nE6\n")
      input.print("no\nG2\nG4\n")
      input.print("no\nD8\nH4\n")
      input.rewind
      $stdin = input
      g.play_game
      expect(g.get_game_state).to eq(Piece.black)
      $stdin = STDIN
    end
  end

  it "#properly detects a stalemate" do
    g = Game.new()
    input = StringIO.new()
    
    #Dont load a file
    input.print("no\n")
    #Moves for a stalemate
    input.print("no\nE2\nE3\n")
    input.print("no\nA7\nA5\n")
    input.print("no\nD1\nH5\n")
    input.print("no\nA8\nA6\n")
    input.print("no\nH5\nA5\n")
    input.print("no\nH7\nH5\n")
    input.print("no\nA5\nC7\n")
    input.print("no\nA6\nH6\n")
    input.print("no\nH2\nH4\n")
    input.print("no\nF7\nF6\n")
    input.print("no\nC7\nD7\n")
    input.print("no\nE8\nF7\n")
    input.print("no\nD7\nB7\n")
    input.print("no\nD8\nD3\n")
    input.print("no\nB7\nB8\n")
    input.print("no\nD3\nH7\n")
    input.print("no\nB8\nC8\n")
    input.print("no\nF7\nG6\n")
    input.print("no\nC8\nE6\n")
    input.rewind
    $stdin = input
    g.play_game
    expect(g.get_game_state).to eq(2)
    $stdin = STDIN
  end 

end