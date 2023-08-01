import usersStore from "../../store/users-store";
import { renderTable } from "../reder-table/render-table";
import "./render-button.css";

/**
 *
 * @param {HTMLDivElement} element
 */
export const renderButtons = (element) => {
  const nextButton = document.createElement("button");
  nextButton.textContent = " Next > ";

  const prevButton = document.createElement("button");
  prevButton.textContent = "< Prev ";

  const currentPageLabel = document.createElement("span");
  currentPageLabel.id = "current-page";
  currentPageLabel.textContent = usersStore.getCurrentPage();

  element.append(prevButton, currentPageLabel, nextButton);

  // EventListeners
  nextButton.addEventListener("click", async () => {
    await usersStore.loadNextPage();
    currentPageLabel.textContent = usersStore.getCurrentPage();
    renderTable(element);
  });

  prevButton.addEventListener("click", async () => {
    await usersStore.loadPreviousPage();
    currentPageLabel.textContent = usersStore.getCurrentPage();
    renderTable(element);
  });

};
