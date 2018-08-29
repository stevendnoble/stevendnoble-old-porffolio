def intersection(rect1, rect2)
  return if 
  left_x = [rect1[:left_x], rect2[:left_x].max

end

#  (1, 1) to (5, 5)
a = { left_x: 1, bottom_y: 1, width: 4, height: 4 }
b = { left_x: 2, bottom_y: 2, width: 2, height: 2 }
c = { left_x: 6, bottom_y: 1, width: 4, height: 4 }
d = { left_x: 5, bottom_y: 1, width: 4, height: 4 }
e = { left_x: 2, bottom_y: 0, width: 2, height: 8 }
f = { left_x: 0, bottom_y: 4, width: 4, height: 4 }

puts intersection(a, b) == { left_x: 2, bottom_y: 2, width: 2, height: 2 }
puts intersection(a, c) == nil
puts intersection(a, d) == { left_x: 5, bottom_y: 1, width: 0, height: 4 }
puts intersection(a, e) == { left_x: 2, bottom_y: 1, width: 2, height: 4 }
puts intersection(a, f) == { left_x: 1, bottom_y: 4, width: 3, height: 1 }