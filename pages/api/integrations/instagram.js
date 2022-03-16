import { getUserMedia } from "../../../lib/instagram/getUserMedia.js";
import db from "../../../sequelize/models/index.js";
import { withCors } from "../../../middleware/withCors.js";

async function handler(req, res) {
  try {
    const integration = await db.Integration.findOne({
      where: {
        provider: "instagram",
      },
    });
    const { accessToken } = integration;
    const mediaRes = await getUserMedia(accessToken);
    res.status(200).json(mediaRes.data);
    return;
  } catch (err) {
    console.log("GET INSTAGRAM MEDIA RESPONSE", err.response);
    res.status(500);
  }
}

export default withCors(handler);
