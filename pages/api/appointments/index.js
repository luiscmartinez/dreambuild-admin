import db from "../../../sequelize/models/index.js";
import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  const { phone, email, body } = req.body;
  if (phone || email) {
    const appointment = await db.Appointment.create({
      phone,
      email,
      body,
    });
    res.status(200).json({ appointment });
    return;
  }
  // bad request needs phone number or email
  return res
    .status(400)
    .json({ error: "bad request. Phone or Email required" });
}
