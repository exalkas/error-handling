import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    console.log("Auth here", req.cookies);

    const decoded = jwt.verify(
      req.cookies.social_media,
      process.env.JWT_SECRET
    );
    console.log("🚀 ~ decoded:", decoded);

    req.user = decoded.id;

    next();
  } catch (error) {
    console.log("🚀 ~ error in auth:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
}
