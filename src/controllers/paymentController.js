const Payment = require('../models/paymentModel');

const paymentController = {
  updatePaymentStatus: async (req, res) => {
    try {
      const { paymentId, newStatus } = req.body;

      if (!paymentId || !newStatus) {
        return res.status(400).json({ error: 'Datos incompletos' });
      }

      const result = await Payment.updatePaymentStatus(paymentId, newStatus);

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Pago no encontrado' });
      }

      res.json({ message: 'Estado de pago actualizado' });
    } catch (error) {
      console.error('Error actualizando estado de pago:', error);
      res.status(500).json({ error: 'Error interno' });
    }
  }
};

module.exports = paymentController;