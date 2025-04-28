// updates.js

// Function to simulate fetching updates from an API
function fetchUpdates() {
    // Simulated update data with more details
    const updates = [
        {
            mineName: "Jharkhand Mine A",
            title: "New Coal Reserve Discovered",
            content: "A new coal reserve has been discovered in Jharkhand, expected to significantly boost the local economy.",
            date: "September 1, 2024",
            laborData: {
                workers: 2500,
                safetyTraining: "Ongoing",
                accidentReports: "2 minor incidents"
            },
            productionData: {
                totalProduction: "6000 tons",
                monthlyIncrease: "7%"
            },
            environmentalImpact: {
                airQualityIndex: "Good",
                waterUsage: "1800 cubic meters"
            },
            communityEngagement: {
                projects: "4 ongoing projects",
                workshops: "3 conducted last month"
            }
        },
        {
            mineName: "Chhattisgarh Mine B",
            title: "Safety Measures Enhanced",
            content: "Coal mines in Chhattisgarh have implemented enhanced safety protocols following recent inspections.",
            date: "August 31, 2024",
            laborData: {
                workers: 1800,
                safetyTraining: "Completed",
                accidentReports: "No incidents reported"
            },
            productionData: {
                totalProduction: "4500 tons",
                monthlyIncrease: "3%"
            },
            environmentalImpact: {
                airQualityIndex: "Moderate",
                waterUsage: "2000 cubic meters"
            },
            communityEngagement: {
                projects: "2 ongoing projects",
                workshops: "1 conducted last month"
            }
        },
        {
            mineName: "Odisha Mine C",
            title: "August Production Report",
            content: "Coal production increased by 5% in August compared to the previous month, marking a positive trend in productivity.",
            date: "August 30, 2024",
            laborData: {
                workers: 2200,
                safetyTraining: "Pending",
                accidentReports: "1 major incident"
            },
            productionData: {
                totalProduction: "5200 tons",
                monthlyIncrease: "5%"
            },
            environmentalImpact: {
                airQualityIndex: "Poor",
                waterUsage: "2500 cubic meters"
            },
            communityEngagement: {
                projects: "5 ongoing projects",
                workshops: "4 conducted last month"
            }
        }
    ];

    return updates;
}

// Function to display updates on the page
function displayUpdates() {
    const updatesContainer = document.getElementById("updates-container");
    const updates = fetchUpdates();

    // Clear existing updates
    updatesContainer.innerHTML = '';

    // Add new updates to the container
    updates.forEach(update => {
        const updateElement = document.createElement("div");
        updateElement.classList.add("update");

        updateElement.innerHTML = `
            <h2>${update.title}</h2>
            <p>${update.content}</p>
            <p class="date">Date: ${update.date}</p>
            <div class="labor-data">
                <p>Number of Workers: ${update.laborData.workers}</p>
                <p>Work Safety Training: ${update.laborData.safetyTraining}</p>
                <p>Accident Reports: ${update.laborData.accidentReports}</p>
            </div>
            <div class="mine-data">
                <h3 class="section-title">Production Data</h3>
                <div class="section-content">
                    <p>Total Production: ${update.productionData.totalProduction}</p>
                    <p>Monthly Production Increase: ${update.productionData.monthlyIncrease}</p>
                </div>
                <h3 class="section-title">Environmental Impact</h3>
                <div class="section-content">
                    <p>Air Quality Index: ${update.environmentalImpact.airQualityIndex}</p>
                    <p>Water Usage: ${update.environmentalImpact.waterUsage}</p>
                </div>
                <h3 class="section-title">Community Engagement</h3>
                <div class="section-content">
                    <p>Community Projects: ${update.communityEngagement.projects}</p>
                    <p>Health and Safety Workshops: ${update.communityEngagement.workshops}</p>
                </div>
            </div>
        `;

        updatesContainer.appendChild(updateElement);
    });
}

// Update the content when the page loads
document.addEventListener("DOMContentLoaded", function() {
    displayUpdates();
});
