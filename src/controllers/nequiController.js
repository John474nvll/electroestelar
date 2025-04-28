const Payment = require('../models/paymentModel');

const nequiController = {
  startNequiPayment: async (req, res) => {
    try {
      const { userId, amount } = req.body;

      if (!userId || !amount) {
        return res.status(400).json({ error: 'Datos incompletos' });
      }

      const newPayment = await Payment.createPayment(userId, amount, 'Nequi', 'Pendiente');

      res.status(201).json({
        message: 'Pago iniciado con Nequi',
        paymentId: newPayment.id
      });
    } catch (error) {
      console.error('Error iniciando pago con Nequi:', error);
      res.status(500).json({ error: 'Error interno' });
    }
  }
};

module.exports = nequiController;