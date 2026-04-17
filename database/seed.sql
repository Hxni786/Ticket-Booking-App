USE ticket_booking;

INSERT INTO movies (title, poster, release_date, category, genre, duration, rating, price, description, available_seats) VALUES
-- Movies
('Dune: Part Three', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400', '2025-11-15', 'movie', 'Sci-Fi', '2h 45m', 9.1, 15.99, 'The epic conclusion to the Dune saga.', 120),
('The Grand Illusion', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400', '2025-10-03', 'movie', 'Drama', '2h 10m', 8.7, 12.99, 'A timeless masterpiece returns to screens.', 85),
('Neon Requiem', 'https://images.unsplash.com/photo-1605106702842-01a887a31122?w=400', '2025-09-20', 'movie', 'Thriller', '1h 58m', 8.2, 13.99, 'A cyberpunk noir thriller set in 2099.', 95),
('Echoes of Tomorrow', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400', '2025-08-14', 'movie', 'Sci-Fi', '2h 22m', 7.9, 11.99, 'Time travel meets emotional drama.', 60),
('The Last Summit', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400', '2025-07-04', 'movie', 'Adventure', '2h 05m', 8.4, 12.99, 'A breathtaking mountaineering adventure.', 110),

-- Events
('Coldplay: Music of the Spheres World Tour', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400', '2025-12-01', 'event', 'Concert', '3h 00m', 9.5, 89.99, 'Coldplay live in an unforgettable concert experience.', 5000),
('TEDx Islamabad 2025', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400', '2025-11-22', 'event', 'Conference', '6h 00m', 8.8, 49.99, 'Ideas worth spreading — live in Islamabad.', 800),
('Lahore Food Festival', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400', '2025-10-18', 'event', 'Festival', '8h 00m', 8.0, 25.00, 'A celebration of Pakistani culinary culture.', 2000),
('Digital Art Expo Karachi', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400', '2025-09-05', 'event', 'Exhibition', '5h 00m', 7.6, 20.00, 'Cutting-edge digital art from regional artists.', 300),

-- Travel
('Lahore → Karachi Express', 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400', '2025-08-01', 'travel', 'Train', '14h 30m', 7.5, 35.00, 'Comfortable overnight train journey.', 200),
('Islamabad → Dubai Flight', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400', '2025-08-20', 'travel', 'Flight', '3h 15m', 8.3, 299.00, 'Direct flight to Dubai International Airport.', 150),
('Hunza Valley Tour Package', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', '2025-07-10', 'travel', 'Tour', '5 Days', 9.2, 450.00, 'A 5-day guided tour through the majestic Hunza Valley.', 30),
('Karachi → Istanbul Flight', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400', '2025-09-15', 'travel', 'Flight', '6h 45m', 8.1, 520.00, 'Direct route to the heart of Istanbul.', 180);
