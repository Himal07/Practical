import mongoose from 'mongoose';
import User from './models/User.js';
import MenuItem from './models/MenuItem.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@restaurant.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created: admin@restaurant.com (password: admin123)');

    // Create staff user
    const staffUser = new User({
      name: 'Staff Member',
      email: 'staff@restaurant.com',
      password: 'staff123',
      role: 'staff'
    });
    await staffUser.save();
    console.log('Staff user created: staff@restaurant.com (password: staff123)');

    // Create menu items
    const menuItems = [
      // Appetizers
      { name: 'Spring Rolls', description: 'Crispy vegetable spring rolls with dipping sauce', category: 'appetizer', price: 5.99, available: true },
      { name: 'Garlic Bread', description: 'Toasted bread with garlic butter', category: 'appetizer', price: 4.99, available: true },
      
      // Main Courses
      { name: 'Grilled Chicken', description: 'Tender grilled chicken with vegetables', category: 'main', price: 14.99, available: true },
      { name: 'Pasta Carbonara', description: 'Classic Italian pasta with bacon and cream', category: 'main', price: 12.99, available: true },
      { name: 'Fish & Chips', description: 'Crispy battered fish with fries', category: 'main', price: 13.99, available: true },
      { name: 'Vegetable Stir Fry', description: 'Fresh vegetables in Asian sauce', category: 'main', price: 11.99, available: true },
      
      // Desserts
      { name: 'Chocolate Cake', description: 'Rich chocolate cake with frosting', category: 'dessert', price: 6.99, available: true },
      { name: 'Ice Cream', description: 'Vanilla ice cream', category: 'dessert', price: 4.99, available: true },
      
      // Beverages
      { name: 'Coffee', description: 'Freshly brewed coffee', category: 'beverage', price: 2.99, available: true },
      { name: 'Orange Juice', description: 'Fresh orange juice', category: 'beverage', price: 3.99, available: true }
    ];

    await MenuItem.insertMany(menuItems);
    console.log('Menu items created');

    console.log('\n✓ Database setup completed successfully!');
    console.log('\nYou can now login with:');
    console.log('Admin: admin@restaurant.com / admin123');
    console.log('Staff: staff@restaurant.com / staff123');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
