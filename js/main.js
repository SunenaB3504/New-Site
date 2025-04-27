// Main script for homepage interactions

const mainPage = {
    init: function() {
        // This function is called by DOMContentLoaded now,
        // SCORM init happens in handleLoad triggered by body onload
        this.displayChapterTopics();
        this.displayBadges();
        this.updateChapterProgress();
        this.displayTotalPoints();
    },

    handleLoad: function() {
        console.log("Body loaded, initializing SCORM...");
        window.scorm.init();
        // Now initialize the rest of the page content
        this.displayChapterTopics();
        this.displayBadges();
        this.updateChapterProgress();
        this.displayTotalPoints();
    },

    handleUnload: function() {
        console.log("Body unloading, terminating SCORM...");
        // Optionally set exit status before quitting if needed
        // window.scorm.set("cmi.core.exit", "suspend"); // Or "" if truly exiting
        window.scorm.quit();
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

    updateChapterProgress: function() {
        // Implementation for updating chapter progress
    },

    displayTotalPoints: function() {
        // Implementation for displaying total points
    },

    checkAndReportChapterCompletion: function() {
        const completedTopics = window.storage.getCompletedTopics();
        const totalTopics = window.chapterData.topics.length;

        if (completedTopics.length >= totalTopics) {
            console.log("All topics completed. Setting SCORM status to completed.");
            window.scorm.setCompleted();
            // Optionally set passed/failed based on score
            // const score = window.storage.getPoints();
            // const maxScore = window.gamification.calculateMaxPossibleScore();
            // if (score >= (maxScore * 0.5)) { // Example: 50% to pass
            //     window.scorm.setPassed();
            // } else {
            //     window.scorm.setFailed();
            // }
            window.scorm.save(); // Ensure status is saved
        }
    }
};

// Initialize the main page functionality when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // mainPage.init(); // Initialization moved to handleLoad
});
