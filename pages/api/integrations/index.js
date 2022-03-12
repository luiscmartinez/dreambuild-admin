import db from "../../../sequelize/models/index.js";
import { getSession } from "next-auth/react";
import { queryUserNode } from "../../../lib/instagram/getUser.js";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ error: "Unauthenticated user" });
      return;
    }
    const integration = await db.Integration.findOne({
      where: {
        userId: session.user.id,
        provider: "instagram",
      },
    });
    if (integration) {
      const instagramUser = await queryUserNode(integration.accessToken);

      console.log("instagramUser", instagramUser.data);

      res.status(200).json({ integration: instagramUser.data });
    }
    res.status(200).json({ integration });
  } catch (err) {
    console.log("integration error", err.response);
    res.status(500);
  }
}
