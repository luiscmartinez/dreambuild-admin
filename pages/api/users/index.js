import { getSession } from "next-auth/react";
import crypto from "crypto";
import db from "../../../sequelize/models/index.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username } });
    const inputHash = crypto
      .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
      .toString("hex");
    const passwordsMatch = user.password === inputHash;
    if (passwordsMatch) {
      res.status(200).json({ user });
      return;
    }
    res.status(401).json({ success: false });
  }
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: "Unauthenticated user" });
    return;
  }
  const users = await db.User.findAll();
  res.status(200).json({ users });
}
