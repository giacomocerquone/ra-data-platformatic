CREATE TABLE cars (
  id INTEGER PRIMARY KEY,
  name     TEXT NOT NULL, 
  brand   TEXT NOT NULL, 
  car_owner INTEGER,
  FOREIGN KEY(car_owner) REFERENCES users(id)
);
