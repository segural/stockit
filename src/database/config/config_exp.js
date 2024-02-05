module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mssql",
    dialectOptions: {
      instanceName: "SQLEXPRESS",
      options: {
        encrypt: false, // For secure connections
      },
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mssql",
    dialectOptions: {
      instanceName: "SQLEXPRESS",
      options: {
        encrypt: false, // For secure connections
      },
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mssql",
    dialectOptions: {
      instanceName: "SQLEXPRESS",
      options: {
        encrypt: false, // For secure connections
      },
    },
  },
};