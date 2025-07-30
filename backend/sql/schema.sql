DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS category;

-- 1. Category Table
CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- 2. Menu Table
CREATE TABLE menu (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT,
  category_id INT REFERENCES category(id)
);

-- 3. Orders Table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Order Items Table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  menu_id INT REFERENCES menu(id),
  qty INT NOT NULL
);
