-- Insert Categories
INSERT INTO category (name) VALUES
('Pizza'),
('Burgers'),
('Snacks');

-- Insert Menu Items
INSERT INTO menu (name, price, image, category_id) VALUES
('Margherita Pizza', 249, '🍕', 1),
('Cheese Burst Pizza', 349, '🧀', 1),
('Veggie Burger', 199, '🍔', 2),
('Aloo Tikki Burger', 179, '🥪', 2),
('French Fries', 99, '🍟', 3);
