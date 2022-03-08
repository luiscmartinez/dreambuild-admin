import { getSession } from "next-auth/react";
import db from "../../../sequelize/models/index.js";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: "Unauthenticated user" });
    return;
  }
  const users = await db.User.findAll();
  console.log("users:", users);
  res.status(200).json({ users });
}
