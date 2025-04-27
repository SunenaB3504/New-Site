// Main script for homepage interactions

const mainPage = {
    init: function() {
        console.log("Homepage script loaded.");
        this.displayChapterTopics();
        this.displayBadges();
        window.gamification.updateProgressDisplay(); // Initial display update
    },

    displayChapterTopics: function() {
        const topicList = document.getElementById('topic-list');
        if (!topicList) return;

        topicList.innerHTML = ''; // Clear existing list
        const completedTopics = window.storage.getCompletedTopics();

        window.chapterData.topics.forEach(topic => {
            const listItem = document.createElement('li');
            const isCompleted = completedTopics.includes(topic.id);

            let statusText = isCompleted ? '✅ Completed' : '⏳ Pending'; // Changed here
            let statusClass = isCompleted ? 'completed' : 'pending';

            listItem.innerHTML = `
                <a href="${topic.file}">${topic.title}</a>
                <span class="topic-status ${statusClass}">${statusText}</span>
            `;
            topicList.appendChild(listItem);
        });
    },

    displayBadges: function() {
        const badgeList = document.getElementById('badge-list');
        if (!badgeList) return;

        badgeList.innerHTML = ''; // Clear existing list
        const earnedBadges = window.storage.getBadges();

        if (earnedBadges.length === 0) {
            badgeList.innerHTML = '<li>No badges earned yet. Keep learning!</li>';
            return;
        }

        earnedBadges.forEach(badgeId => {
            const badge = window.chapterData.badges.find(b => b.id === badgeId);
            if (badge) {
                const listItem = document.createElement('li');
                // Re-added the div.badge-icon and img tag
                listItem.innerHTML = `
                    <div class="badge-icon">
                        <img src="${badge.image || 'assets/images/NiaEd-.png'}" alt="${badge.name}" width="50" height="50">
                    </div>
                    <span>${badge.name}</span>
                `;
                listItem.title = badge.description; // Add description as a tooltip
                badgeList.appendChild(listItem);
            }
        });
    },
};

// Initialize the main page functionality when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    mainPage.init();
});
