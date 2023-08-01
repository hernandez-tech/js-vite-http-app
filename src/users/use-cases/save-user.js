import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { userModelToLocalhost } from "../mappers/user-model-localhost.mapper";
import { User } from "../models/user";

/**
 *
 * @param {Like<User>} userLike
 */
export const saveUser = async (userLike) => {
  const user = new User(userLike);

  if (!user.firstName || !user.lastName || !user.balance)
    throw Error("Todos los campos son obligatorios");

  const userToSave = userModelToLocalhost(user);
  let userUpdated;

  if (user.id) {
    userUpdated = await updateUser(userToSave)
  }else {
    userUpdated = await createUser(userToSave);
  }

  return localhostUserToModel(userUpdated);
};

const createUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users`;

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const newUser = await res.json();
  console.log({ newUser });

  return newUser;
};

const updateUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;

  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const updateUser = await res.json();
  console.log({ updateUser });

  return updateUser;
};
