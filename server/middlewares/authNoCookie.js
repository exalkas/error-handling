import jwt, { decode } from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    console.log("Auth here", req.headers.authorization.split(" ")[1]);

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🚀 ~ decoded:", decoded);

    req.user = decoded.id;

    next();
  } catch (error) {
    console.log("🚀 ~ error in auth without cookie:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
}
