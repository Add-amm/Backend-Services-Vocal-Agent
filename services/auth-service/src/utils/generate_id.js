import { User } from "../models/user.js";

export const generateUserId = async () => {
  // Get the last created user (highest ID)
  const count = await User.count();

  const nextNumber = count + 1;

  // Pad with zeros (6 digits)
  const formattedNumber = String(nextNumber).padStart(6, "0");

  return `MDP-${formattedNumber}`;
};