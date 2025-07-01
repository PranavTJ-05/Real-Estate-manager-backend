import getJwtToken from "../helpers/getJwtToken.js";

const cookieToken = (user, res) => {
  const token = getJwtToken(user.id, user.email, user.role);
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    sameSite: "Strict", // Prevent CSRF attacks
  };
  user.password = undefined; // Remove password from user object
  user.createdAt = undefined; // Remove createdAt from user object

  res.status(200).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
  return { token, options };
}

export default cookieToken;