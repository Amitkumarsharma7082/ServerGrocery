import jwt from "jsonwebtoken";

export const verfiyToken = async (req, reply) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startWith("Bearer ")) {
      return reply.status(401).send({ message: "Access token required" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verfiy(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    return true;
  } catch (error) {}
};
