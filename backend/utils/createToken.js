import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only Cookie  (not accessible via JavaScript).
  res.cookie("jwt", token, {
    httpOnly: true,
    // Use secure cookies in production (requires HTTPS), but not in development
    secure: process.env.NODE_ENV !== "development",
    // sameSite: "strict" prevents CSRF attacks by blocking cookies from being sent with cross-site requests.
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
