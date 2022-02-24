import db from "../../../sequelize/models/index.js";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { appointmentId } = req.query;

  if (!appointmentId) {
    return res.status(400);
  }
  if (req.method === "GET") {
    const appointment = await db.Appointment.findByPk(appointmentId);
    return res.status(200).json({ appointment });
  }
  if (req.method === "PUT") {
    const appointment = await db.Appointment.update(
      { read: true },
      {
        where: {
          id: appointmentId,
        },
      }
    );
    // returns [1]
    return res.status(200).json({ appointment });
  }
}
