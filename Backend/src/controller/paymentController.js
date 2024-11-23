const MonthlyPlan = require("../database/models/MonthlyPlan");

class PaymentController {
    constructor(subscriptionService) {
      this.subscriptionService = subscriptionService;
    }
  
    async getPaymentLink(req, res) {
      try {
        const { monthlyPlanId } = req.body;

        if (!monthlyPlanId) {
          return res.status(400).json({ error: true, msg: "No monthlyPlan provided" });
        }

        const monthlyPlan = await MonthlyPlan.findById(monthlyPlanId);
        if (!monthlyPlan) {
          return res.status(404).json({ error: true, msg: "MonthlyPlan not found" });
        }

        console.log("PLAN BACK", monthlyPlan);

        const payment = await this.subscriptionService.createPayment(monthlyPlan);
  
        return res.json(payment);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create payment" });
      }
    }
}

module.exports = PaymentController;