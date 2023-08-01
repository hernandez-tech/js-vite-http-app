import { User } from "../../models/user";
import { getUserById } from "../../use-cases/user-by-id";
import "./render-modal.css";
import modalHTML from "./render-modal.html?raw";

let modal,
  form,
  loadedUser = {};

/**
 *
 * @param {String|Number} id
 * @returns
 */
export async function showModal(id) {
  modal?.classList.remove("hide-modal");
  loadedUser = {};

  if (!id) return;

  const user = await getUserById(id);
  setFormValues(user);
}

export function hideModal() {
  modal?.classList.add("hide-modal");
  form?.reset();
}

/**
 *
 * @param {User} user
 */
const setFormValues = (user) => {
  const { firstName, lastName, balance, isActive } = user;

  form.querySelector('[name="firstName"]').value = firstName;
  form.querySelector("[name=lastName]").value = lastName;
  form.querySelector("[name=balance]").value = balance;
  form.querySelector("[name=isActive]").checked = isActive;

  loadedUser = user;
};

/**
 *
 * @param {HTMLDivElement} element
 * @param {(userLike<Object>)=> Promise<void> } callback
 * @returns
 */

export const renderModal = (element, callback) => {
  if (modal) return;

  modal = document.createElement("div");
  modal.classList.add("contenedor-modal", "hide-modal");
  modal.innerHTML = modalHTML;
  form = modal.querySelector("form");
  
  modal.addEventListener("click", (e) => {
    const event = e.target;
    if (event.className !== "contenedor-modal") return;
    hideModal();
  });
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const userLike = { ...loadedUser };
    const isActive = document.querySelector("#is-active").checked;

    for (const [key, value] of formData) {
      if (key === "balance") {
        userLike[key] = Number(value);
        continue;
      }

      if (key === "isActive") {
        userLike[key] = value === "on" ? true : false;
        continue;
      }


      if (!isActive) {
        userLike["isActive"] = false;
        continue;
      }

      userLike[key] = value;
    }

    await callback(userLike);

    // Limpiando el formulario
    hideModal();
  });

  element.append(modal);
};
