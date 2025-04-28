const db = require('../database/db');

const Payment = {
  createPayment: (userId, amount, method, status) => {
    const query = `
      INSERT INTO payments (user_id, amount, method, status, created_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `;
    const params = [userId, amount, method, status];
    return new Promise((resolve, reject) => {
      db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  },

  updatePaymentStatus: (paymentId, newStatus) => {
    const query = `
      UPDATE payments
      SET status = ?
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.run(query, [newStatus, paymentId], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  },

  getPaymentById: (paymentId) => {
    const query = `
      SELECT * FROM payments WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.get(query, [paymentId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
};

module.exports = Payment;