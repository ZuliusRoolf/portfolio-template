
import { projectsAddEventListeners } from './scripts/handle_projects.js';
import { populateBiography, populatePortfolio } from './scripts/load_content.js';

document.addEventListener('DOMContentLoaded', () => {
  // Run only if the biography template is still empty
  const professionEl = document.querySelector('.introduction__profession');
  if (!professionEl || professionEl.textContent == "template creator") {
    populateBiography(document);
  }

  const portfolioEl = document.querySelector('#projects');
  if (!portfolioEl || portfolioEl.children.length <= 1) {
    populatePortfolio(document);
  }
  projectsAddEventListeners(document);
});

function getWidestIntroductionElement() {
  const introduction = document.querySelector('.biography__introduction');
  const introductionWidth = introduction.getBoundingClientRect().width;
  return introductionWidth;
}

document.getElementById('if__biography__about').addEventListener('click', function (event) {
  event.preventDefault();
  const hiddenText = document.querySelector('.biography__about');
  const hiddenPicture = document.querySelector('.biography__picture');
  const imgElement = document.querySelector('.biography__picture img');
  const imgHeight = Math.floor(getWidestIntroductionElement()*0.7) + "px";
  imgElement.style.height = imgHeight;
  imgElement.style.width = imgHeight;

  if (hiddenText.style.maxHeight) {
    hiddenText.style.maxHeight = null;
    hiddenPicture.style.maxHeight = null;
    hiddenText.classList.remove('biography__about--show');
    hiddenPicture.classList.remove('biography__picture--show');
  } else {
    hiddenText.style.maxHeight = hiddenText.scrollHeight + "px";
    hiddenPicture.style.maxHeight = hiddenPicture.scrollHeight + "px";
    hiddenText.classList.add('biography__about--show');
    hiddenPicture.classList.add('biography__picture--show');
  }
});

