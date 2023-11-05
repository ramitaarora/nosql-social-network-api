const connection = require('../config/connection');
const { User, Thought } = require('../models');
const users = require('./data');

connection.once('open', async () => {
    console.log('connected');
      // Delete the collections if they exist
      let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
      if (userCheck.length) {
        await connection.dropCollection('users');
      }
  
      let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
      if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
      }

    await User.collection.insertMany(users);
  
    // Log out the seed data to indicate what should appear in the database
    console.table(students);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  });
  