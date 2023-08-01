import "./render-table.css";
import usersStore from "../../store/users-store";
import { showModal } from "../render-modal/render-modal";
import { deleteUserById } from "../../use-cases/delete-user-by-id";
import { getUserById } from "../../use-cases/user-by-id";

let table;

function createTable() {
  const table = document.createElement("table");
  const tableHeaders = document.createElement("thead");
  tableHeaders.innerHTML = `
    <tr>
      <th>#ID</th>
      <th>Balance</th>
      <th>FirsName</th>
      <th>LastName</th>
      <th>Active</th>
      <th>Actions</th>
    </tr>
    `;

  const tableBody = document.createElement("tbody");
  table.append(tableHeaders, tableBody);
  return table;
}

/**
 *
 * @param {MouseEvent} e
 */
async function tableSelectlistener(e) {
  const elementSelect = e.target.closest(".select-user");

  if (!elementSelect) return;

  const userId = elementSelect.getAttribute("data-id");

  showModal(userId);
}

async function tabelDeleteListener(e) {
  const elementDelete = e.target.closest(".delete-user");

  if (!elementDelete) return;

  const userId = elementDelete.getAttribute("data-id");

  const user = await getUserById(userId);

  const res = confirm(
    `¿Esta seguro de eliminar a ${user.firstName} con el id ${user.id}?`
  );

  if (res) {
    try {
      await deleteUserById(userId);
      await usersStore.reloadPage();
      document.querySelector("#current-page").innerText = usersStore.getCurrentPage();
      renderTable();
    } catch (error) {
      console.log(error);
    }
  }
}

export const renderTable = (element) => {
  const users = usersStore.getUsers();

  if (!table) {
    table = createTable();
    element.append(table);

    table.addEventListener("click", tableSelectlistener);
    table.addEventListener("click", tabelDeleteListener);
  }

  let tableHTML = "";
  users.forEach((user) => {
    const { id, balance, firstName, lastName, isActive } = user;
    tableHTML += `
    <tr>
        <td>${id}</td>
        <td>${balance}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${isActive}</td>
        <td>
        <a href='#' class="select-user" data-id=${id}>Select</a>
        |
        <a href='#' class="delete-user" data-id=${id}>Delete</a>
        </td>
    </tr>
    `;
  });

  table.querySelector("tbody").innerHTML = tableHTML;
};
