import { User } from "../models/user.js";

export const generateUserId = async () => {
  // Get the last created user (highest ID)
  const lastUser = await User.findOne({
    order: [["createdAt", "DESC"]],
  });

  let nextNumber = 1;

  if (lastUser && lastUser.userId) {
    // Extract number from "MDP-000123"
    const lastNumber = parseInt(lastUser.userId.split("-")[1], 10);
    nextNumber = lastNumber + 1;
  }

  // Pad with zeros (6 digits)
  const formattedNumber = String(nextNumber).padStart(6, "0");

  return `MDP-${formattedNumber}`;
};