import { User } from "../models/user";

/**
 * 
 * @param {Like<User>} localhosUser 
 * @returns {User}
 */
export const localhostUserToModel = (localhosUser) => {
  const { avatar, balance, first_name, gender, id, isActive, last_name } =
    localhosUser;

  return new User({
    avatar,
    balance,
    firstName: first_name,
    gender,
    id,
    isActive,
    lastName: last_name,
  });
};
