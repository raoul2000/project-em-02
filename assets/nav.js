
/**
 * Deselect all navbar items
 */
function deselectNavItems() {
  let buttons = document.querySelectorAll('ul.nav  li.active');
  Array.prototype.forEach.call(buttons, function (button) {
    button.classList.remove('active');
  });
}

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
  deselectNavItems();
}

/**
 * Show only the section selected by the user.
 */
function handleSectionTrigger(event) {
  hideAllSections();
  // display the selected section
  const sectionId = event.target.dataset.section; // page-1
  const sectionView = document.getElementById(sectionId);
  
  sectionView.dispatchEvent(
    new CustomEvent('before-show')
  );
  sectionView.classList.remove('hidden');

  event.target.parentElement.classList.add('active');
  sectionView.dispatchEvent(
    new CustomEvent('after-show')
  );
}

/**
 * Show the modal dialog.
 * If the target element is included in the navbar and should
 * by set as active, it must have a data-nav attribute.
 */
function handleModalTrigger(event) {
  // behave like a navbar item
  if(event.target.dataset.nav) {
    deselectNavItems();
    event.target.parentElement.classList.add('active');
  }
  // show the modal
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
