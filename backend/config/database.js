const { Sequelize } = require('sequelize');
require('dotenv').config();

// PostgreSQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'zakhira_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: (msg) => console.log(`📊 [DB]: ${msg}`), // 👈 DB queries terminal mein dikhengi
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    console.log('📡 Connecting to PostgreSQL...');
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully!');
    
    // Sync models (dev mode mein)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };