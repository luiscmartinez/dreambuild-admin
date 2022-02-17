import db from "../../../sequelize/models/index.js";

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
