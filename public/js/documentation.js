Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-initial-line-feed': true,
});


function filterElements() {
  const search = document.getElementById('doc-search').value.toUpperCase();
  const elements = document.getElementById('doc-menu-tab').getElementsByTagName('a');

  for (const elt of elements) {
    if (elt.innerHTML.toUpperCase().indexOf(search) !== -1) {
      elt.style.display = '';
    } else {
      elt.style.display = 'none';
    }
  }
}

document.getElementById('doc-search').addEventListener('keyup', () => filterElements());
