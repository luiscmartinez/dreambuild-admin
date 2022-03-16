import Cors from "cors";

async function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export const withCors = (handler, methods = []) => {
  const cors = Cors({
    methods: ["GET", "HEAD", ...methods],
    origin: process.env.WHITELIST_DOMAIN,
  });
  return async (req, res) => {
    runMiddleware(req, res, cors);
    return handler(req, res);
  };
};
