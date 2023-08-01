import { User } from "../models/user";
import { loadUserByPage } from "../use-cases/load-user-by-page";

const state = {
  currentPage: 0,
  users: [],
};

async function loadNextPage() {
  const users = await loadUserByPage(state.currentPage + 1);

  if (users.length === 0) return;

  state.currentPage += 1;
  state.users = users;
}

async function loadPreviousPage() {
  if (state.currentPage === 1) return;

  const users = await loadUserByPage(state.currentPage - 1);
  state.currentPage -= 1;
  state.users = users;
}

/**
 *
 * @param {User} updatedUser
 */
function onUserChange(updatedUser) {
  let auxi = false;

  state.users = state.users.map((user) => {
    if (user.id === updatedUser.id) {
      auxi = true;
      return updatedUser;
    }
    return user;
  });

  if (state.users.length < 10 && auxi) {
    state.users.push(updatedUser);
  }
}

async function reloadPage() {
  const users = await loadUserByPage(state.currentPage);

  if (users.length === 0) {
    await loadPreviousPage();
    return; 
  }

  state.users = users;
}

export default {
  loadNextPage,
  loadPreviousPage,
  onUserChange,
  reloadPage,

  /**
   * @returns {User[]}
   */
  getUsers: () => [...state.users],
  /**
   * @returns {Number}
   */
  getCurrentPage: () => state.currentPage,
};
