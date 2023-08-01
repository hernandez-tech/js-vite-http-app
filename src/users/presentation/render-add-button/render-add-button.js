import "./render-add-button.css";
import { showModal } from "../render-modal/render-modal";

/**
 *
 * @param {HTMLDivElement} element
 */
export const renderAddButton = (element) => {
  const faqButton = document.createElement("button");
  faqButton.textContent = "+";
  faqButton.classList.add("faq-button");

  //eventListener
  faqButton.addEventListener("click", () => {
    showModal();
  });

  element.append(faqButton);
};
