

-- Insert Categories
INSERT INTO category (name) VALUES
('Pizza'),
('Burgers'),
('Snacks');

-- Insert Menu Items
INSERT INTO menu (name, price, image, category_id) VALUES
('Margherita Pizza', 249, '/image/pizza.jpg', 1),
('Cheese Burst Pizza', 349, '/image/cheese-pizza.avif', 1),
('Veggie Burger', 199, '/image/paneer-burger.jpg', 2),
('Aloo Tikki Burger', 179, '/image/aloo-tikki-burger.jpg', 2),
('French Fries', 99, '/image/french-fries.jpg', 3);