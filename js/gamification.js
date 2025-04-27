// Gamification logic: points, badges, progress

function awardPoints(points) {
    const totalPoints = window.storage.updatePoints(points);
    console.log(`Awarded ${points} points. Total points: ${totalPoints}`);
    checkPointBasedBadges(totalPoints);
    updateProgressDisplay(); // Update UI elements if needed
}

function checkTopicCompletionBadge(topicId) {
    const topic = window.chapterData.topics.find(t => t.id === topicId);
    if (topic && topic.badgeId) {
        window.storage.addBadge(topic.badgeId);
    }
    checkPointBasedBadges(window.storage.getPoints()); // Re-check point badges in case topic completion pushes points over threshold
}

function checkPointBasedBadges(currentPoints) {
    const earnedBadges = window.storage.getBadges();
    window.chapterData.badges.forEach(badge => {
        if (badge.pointsRequired && currentPoints >= badge.pointsRequired && !earnedBadges.includes(badge.id)) {
            window.storage.addBadge(badge.id);
        }
    });
}

function updateProgressDisplay() {
    // Update progress bars, point displays, etc. on the current page
    // This function might need to be called from main.js or topics.js
    // depending on where the display elements are.
    const pointsDisplay = document.getElementById('points-display');
    if (pointsDisplay) {
        pointsDisplay.textContent = window.storage.getPoints();
    }

    // Example: Update a chapter progress bar
    const chapterProgressBar = document.getElementById('chapter-progress-bar');
    const chapterProgressText = document.getElementById('chapter-progress-text');
    if (chapterProgressBar && chapterProgressText) {
        const completedCount = window.storage.getCompletedTopics().length;
        const totalTopics = window.chapterData.topics.length;
        const progressPercent = totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0;
        chapterProgressBar.value = progressPercent;
        chapterProgressText.textContent = `${Math.round(progressPercent)}% Complete (${completedCount}/${totalTopics} topics)`;
    }

     // Update badge display
     const badgeContainer = document.getElementById('badges-earned');
     if (badgeContainer) {
         displayEarnedBadges(badgeContainer);
     }
}

function displayEarnedBadges(container) {
    const earnedBadges = window.storage.getBadges();
    container.innerHTML = '<h3>Badges Earned:</h3>';
    if (earnedBadges.length === 0) {
        container.innerHTML += '<p>No badges earned yet.</p>';
        return;
    }
    const ul = document.createElement('ul');
    ul.className = 'badge-list';
    earnedBadges.forEach(badgeId => {
        const badgeData = window.chapterData.badges.find(b => b.id === badgeId);
        if (badgeData) {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="../${badgeData.image}" alt="${badgeData.name}" title="${badgeData.description}" class="badge-icon">
                <span>${badgeData.name}</span>
            `;
            ul.appendChild(li);
        }
    });
    container.appendChild(ul);
}


// Make functions accessible globally
window.gamification = {
    awardPoints,
    checkTopicCompletionBadge,
    updateProgressDisplay,
    displayEarnedBadges
};
