
/**
 * Add class *hidden* to the sections that don't already have one
 */
function hideAllSections () {
  const sections = document.querySelectorAll('section');
  Array.prototype.forEach.call(sections, function (section) {
    if(section.classList.contains('hidden') === false) {
      section.classList.add('hidden');
    }
  });
}

/**
 * Show the section selected by the user.
 */
function handleSectionTrigger(event) {
  hideAllSections();
  const sectionId = event.target.dataset.section; // page-1
  document.getElementById(sectionId).classList.remove('hidden');
}

/**
 * Show the modal dialog
 */
function handleModalTrigger(event) {
  const modalId = event.target.dataset.modal;
  $('#'+modalId).modal();
}

/**
 * Handle navigation among pages and modals
 */
document.body.addEventListener('click', function (event) {
  if (event.target.dataset.section) {
    console.log("section click");
    handleSectionTrigger(event);
  } else if (event.target.dataset.modal) {
    console.log("modal click show");
    handleModalTrigger(event);
  }
});
