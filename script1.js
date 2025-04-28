function logout() {
    alert('Logging out...');
    // Add your logout logic here
}

function goBack() {
    window.history.back();
}

// Add drag-and-drop functionality
const list = document.getElementById('draggable-list');
let draggedItem = null;

list.addEventListener('dragstart', function(event) {
    draggedItem = event.target;
    setTimeout(function() {
        draggedItem.style.display = 'none';
    }, 0);
});

list.addEventListener('dragend', function(event) {
    setTimeout(function() {
        draggedItem.style.display = 'block';
        draggedItem = null;
    }, 0);
});

list.addEventListener('dragover', function(event) {
    event.preventDefault();
});

list.addEventListener('dragenter', function(event) {
    event.preventDefault();
    event.target.style.borderTop = '2px solid #007bff';
});

list.addEventListener('dragleave', function(event) {
    event.target.style.borderTop = '';
});

list.addEventListener('drop', function(event) {
    event.preventDefault();
    event.target.style.borderTop = '';
    if (event.target.tagName === 'LI') {
        list.insertBefore(draggedItem, event.target.nextSibling);
    }
});
