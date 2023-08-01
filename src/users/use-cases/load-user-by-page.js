import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";

/**
 *
 * @param {Number} page número del paginador
 * @returns {Promise<User[]>}
 */
export const loadUserByPage = async (page = 1) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;

  const data = await fetch(url).then((res) => res.json());

  const users = data.map(localhostUserToModel);

  return users;
};
