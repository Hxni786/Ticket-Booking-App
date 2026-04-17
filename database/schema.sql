CREATE DATABASE IF NOT EXISTS ticket_booking;
USE ticket_booking;

CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  poster VARCHAR(500),
  release_date DATE,
  category ENUM('movie', 'event', 'travel') DEFAULT 'movie',
  genre VARCHAR(100),
  duration VARCHAR(50),
  rating DECIMAL(3,1),
  price DECIMAL(10,2),
  description TEXT,
  available_seats INT DEFAULT 100,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
