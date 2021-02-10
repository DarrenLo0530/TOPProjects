def stock_picker(stock_prices)
  min_price = 1.0/0.0
  min_price_day = 0
  
  max_profit = 0
  max_profit_days = [0, 0]
  
stock_prices.each_with_index do |price, index|
    if price < min_price 
      min_price_day = index
      min_price = price
    end

    if price - min_price > max_profit
      max_profit = price - min_price
      max_profit_days[0] = min_price_day
      max_profit_days[1] = index
    end
  end
  
  return max_profit_days
end
p stock_picker([17,3,6,9,15,8,6,1,10])
