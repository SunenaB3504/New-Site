// Main script for index.html (Homepage)

document.addEventListener('DOMContentLoaded', () => {
    console.log("Homepage script loaded.");
    loadHomepageData();
    window.gamification.updateProgressDisplay(); // Initial display update
});

function loadHomepageData() {
    const chapterTitleElement = document.getElementById('chapter-title');
    const topicListElement = document.getElementById('topic-list');
    const badgesContainer = document.getElementById('badges-earned');

    if (!window.chapterData) {
        console.error("Chapter data not loaded!");
        if (chapterTitleElement) chapterTitleElement.textContent = "Error loading data";
        if (topicListElement) topicListElement.innerHTML = '<li>Error loading topics.</li>';
        return;
    }

    // Set Chapter Title
    if (chapterTitleElement) {
        chapterTitleElement.textContent = window.chapterData.title;
        // Update document title as well
        document.title = `${window.chapterData.title} - Homepage`;
    }

    // Populate Topic List
    if (topicListElement) {
        topicListElement.innerHTML = ''; // Clear loading message
        const completedTopics = window.storage.getCompletedTopics();

        window.chapterData.topics.forEach(topic => {
            const li = document.createElement('li');
            li.className = 'fade-in'; // Add animation class

            const link = document.createElement('a');
            link.href = topic.file; // Assumes relative path from index.html
            link.textContent = topic.title;

            const status = document.createElement('span');
            status.className = 'topic-status';
            if (completedTopics.includes(topic.id)) {
                status.textContent = '✓ Completed';
                status.classList.add('completed');
            } else {
                status.textContent = 'Pending';
            }

            li.appendChild(link);
            li.appendChild(status);
            topicListElement.appendChild(li);
        });
    } else {
        console.error("Topic list element not found.");
    }

    // Display Earned Badges
    if (badgesContainer) {
        window.gamification.displayEarnedBadges(badgesContainer);
    } else {
        console.error("Badges container element not found.");
    }
}
