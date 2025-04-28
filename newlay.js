
document.getElementById('handover-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const handoverData = {
        shiftDate: document.getElementById('shiftDate').value,
        supervisor: document.getElementById('supervisor').value,
        importantNotes: document.getElementById('importantNotes').value,
        pendingTasks: document.getElementById('pendingTasks').value,
        safetyConcerns: document.getElementById('safetyConcerns').value,
        equipmentStatus: document.getElementById('equipmentStatus').value
    };

    console.log('Handover Data:', handoverData);

    // Code to save the data and update the dashboard
    addHandoverToDashboard(handoverData);
});

function addHandoverToDashboard(handoverData) {
    const handoverList = document.getElementById('handover-list');

    const handoverEntry = document.createElement('div');
    handoverEntry.classList.add('handover-entry');
    handoverEntry.innerHTML = `
        <h3>${handoverData.shiftDate} - ${handoverData.supervisor}</h3>
        <p><strong>Important Notes:</strong> ${handoverData.importantNotes}</p>
        <p><strong>Pending Tasks:</strong> ${handoverData.pendingTasks}</p>
        <p><strong>Safety Concerns:</strong> ${handoverData.safetyConcerns}</p>
        <p><strong>Equipment Status:</strong> ${handoverData.equipmentStatus}</p>
    `;

    handoverList.appendChild(handoverEntry);
}
