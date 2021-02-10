def fib(n)
  fibonacci_numbers = [0, 1]

  while fibonacci_numbers.length <= n
    current_n = fibonacci_numbers.length
    fibonacci_numbers[current_n] = fibonacci_numbers[current_n - 1] + fibonacci_numbers[current_n - 2]
  end

  return fibonacci_numbers
end

def fib_rec(n)
  if n <= 1
    (0..n).to_a
  else
    prev_fib = fib_rec(n-1)
    prev_fib.append(prev_fib[n-1] + prev_fib[n-2])
  end
end
p fib_rec(30)