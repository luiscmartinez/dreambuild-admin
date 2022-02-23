import db from "../../../sequelize/models/index.js";
import { getSession } from "next-auth/react";
import Cors from "cors";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ error: "Unauthenticated user" });
      return;
    }
    const appointments = await db.Appointment.findAll();
    return res.status(200).json({ appointments });
  } else if (req.method === "POST") {
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
  } else if (req.method === "DELETE") {
    return;
  }
  // bad request needs phone number or email
  return res
    .status(400)
    .json({ error: "bad request. Phone or Email required" });
}
