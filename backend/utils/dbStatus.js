const { getDB } = require('../config/db');

const isDbConnected = async () => {
  try {
    const db = getDB(); // throws if not connected
    await db.admin().ping(); // perform a lightweight ping
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = isDbConnected;
