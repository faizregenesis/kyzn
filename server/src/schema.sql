CREATE TABLE IF NOT EXISTS invoices (
id SERIAL PRIMARY KEY,
created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
date DATE NOT NULL,
customer_name TEXT NOT NULL,
salesperson_name TEXT NOT NULL,
notes TEXT
);


CREATE TABLE IF NOT EXISTS invoice_items (
id SERIAL PRIMARY KEY,
invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
product_id TEXT NOT NULL,
product_name TEXT NOT NULL,
unit_price INTEGER NOT NULL, -- cents
quantity INTEGER NOT NULL CHECK (quantity > 0)
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  unit_price INTEGER NOT NULL, -- harga dalam cents (atau gunakan NUMERIC untuk desimal)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);