require './lib/caesar_cypher.rb'

describe "#caesar_cypher" do
  it "Checks if it works on a general word(Includes numbers and symbols" do
    expect(caesar_cypher("abc23!-=$", 3)).to eql("def23!-=$")
  end

  it "Checks if it works with multiple words" do
    expect(caesar_cypher("hello jim", 1)).to eql("ifmmp kjn")
  end

  it "Checks if it works with empty strings" do
    expect(caesar_cypher("", 3)).to eql("")
  end

  it "Checks that it works with shifts greater than 26" do 
    expect(caesar_cypher("hello", 28)).to eql("jgnnq") 
  end
end