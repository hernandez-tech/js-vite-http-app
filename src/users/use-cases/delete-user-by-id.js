
/**
 * 
 * @param {String|Number} id 
 * @returns 
 */
export const deleteUserById = async (id) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;

  const res = await fetch(url, {
    method: "DELETE",
  });

  const deleteUser = await res.json();
  console.log({ deleteUser });

  return true;
};
