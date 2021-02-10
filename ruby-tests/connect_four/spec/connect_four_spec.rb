require "./lib/connect_four.rb"
require 'stringio'

describe ConnectFour do
  it "Initializes a 7x7 array of 'E'" do
    connect_four = ConnectFour.new
    test_grid = connect_four.grid.flatten.uniq
    expect(test_grid.length == 1 && test_grid[0] == 'E').to eql(true)
  end
  
  describe "#column_available?" do
    it "Returns false when you can't place in a row" do
      connect_four = ConnectFour.new
      #Places 7 pieces to fill up column
      6.times {connect_four.place_piece('R', 0)}
      #No room left in column
      expect(connect_four.column_available?(0)).to eql(false)
    end
  end

  describe "#place_piece" do
    it "Places a piece in the correct column" do
      connect_four = ConnectFour.new
      connect_four.place_piece('R', 3)
      expect(connect_four.grid[5][3]).to eql('◯')
    end

    it "Places a piece in the correct column if there is already a piece" do
      connect_four = ConnectFour.new
      connect_four.place_piece('R', 4)
      connect_four.place_piece('B', 4)
      expect(connect_four.grid[4][4]).to eql('⬤')
    end
  end

  describe "#print_grid" do
    it "Prints out the empty grid properly" do
      connect_four = ConnectFour.new
      expect{connect_four.print_grid}.to output(["E E E E E E E",
                                                 "E E E E E E E",
                                                 "E E E E E E E",
                                                 "E E E E E E E",
                                                 "E E E E E E E",
                                                 "E E E E E E E"].join("\n") + "\n").to_stdout
    end


    it "Prints out the red and blue pieces properly" do 
      connect_four = ConnectFour.new
      connect_four.place_piece('R', 4)
      connect_four.place_piece('B', 5)
      expect{connect_four.print_grid}.to output(["E E E E E E E",
                                                 "E E E E E E E",
                                                 "E E E E E E E",
                                                 "E E E E E E E",
                                                 "E E E E E E E",
                                                 "E E E E ◯ ⬤ E"].join("\n") + "\n").to_stdout
    end

    describe "#get_number_in_range" do
      it "Tests that it will receive correct input properly and convert it to a number" do
        connect_four = ConnectFour.new
        input = StringIO.new('3')
        $stdin = input

        expect(connect_four.get_number_in_range(0, 6)).to eql(3)
        $stdin = STDIN
      end

      it "Tests that it will not accept correct input and will end when correct input is put in" do 
        connect_four = ConnectFour.new
        input = StringIO.new()
        input.puts('10')
        input.puts('-1')
        input.puts('3')

        input.rewind

        $stdin = input
        
        expect{connect_four.get_number_in_range(0, 6)}.to output(["Please input a column to place the piece in (0 - 6)",
                                                   "Please enter a number between 0 - 6",
                                                   "Please enter a number between 0 - 6",
                                                   ""].join("\n")).to_stdout
        $stdin = STDIN
      end     
    end

    describe "#get_user_column" do
      it "Tests that it will not accept a column that is taken up and will display a message" do 
        connect_four = ConnectFour.new
        input = StringIO.new

        #HMM, added this cuz apparently unit tests shouldn't rely on outside methods
        allow(connect_four).to receive(:get_number_in_range).and_return(3, 4)
        allow(connect_four).to receive(:column_available?).and_return(false, true)
        
        expect{connect_four.get_user_column}.to output("That column is not available!\n").to_stdout
      end
    end
    

    describe "#get_winner" do 
      it "Tests that recognizes a vertcal victory" do 
        connect_four = ConnectFour.new
        connect_four.place_piece('R', 4)
        connect_four.place_piece('R', 4)
        connect_four.place_piece('R', 4)
        connect_four.place_piece('R', 4)
        expect(connect_four.get_winner).to eql(0)
      end

      it "Tests that recognizes a horizontal victory" do 
        connect_four = ConnectFour.new
        connect_four.place_piece('R', 1)
        connect_four.place_piece('R', 2)
        connect_four.place_piece('R', 3)
        connect_four.place_piece('R', 4)
        expect(connect_four.get_winner).to eql(0)
      end

      it "Tests that recognizes a diagonal victory(positive slope)" do 
        connect_four = ConnectFour.new
        connect_four.place_piece('R', 1)
        connect_four.place_piece('B', 2)
        connect_four.place_piece('R', 2)
        connect_four.place_piece('B', 3)
        connect_four.place_piece('B', 3)
        connect_four.place_piece('R', 3)
        connect_four.place_piece('B', 4)
        connect_four.place_piece('B', 4)
        connect_four.place_piece('B', 4)
        connect_four.place_piece('R', 4)
        expect(connect_four.get_winner).to eql(0)
      end

      it "Tests that recognizes a diagonal victory(negative slope)" do 
        connect_four = ConnectFour.new
        connect_four.place_piece('R', 4)
        connect_four.place_piece('B', 3)
        connect_four.place_piece('R', 3)
        connect_four.place_piece('B', 2)
        connect_four.place_piece('B', 2)
        connect_four.place_piece('R', 2)
        connect_four.place_piece('B', 1)
        connect_four.place_piece('B', 1)
        connect_four.place_piece('B', 1)
        connect_four.place_piece('R', 1)
        expect(connect_four.get_winner).to eql(0)
      end
    
    

      it "Tests that it doesnt falsely recognize a victory" do 
        connect_four = ConnectFour.new
        connect_four.place_piece('R', 4)
        connect_four.place_piece('R', 4)
        connect_four.place_piece('R', 4)
        expect(connect_four.get_winner).to eql(2)
      end
    end
  end
end


    
