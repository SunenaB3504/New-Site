// Functions for interacting with localStorage

const STORAGE_KEY = 'mathAppProgress_Ch1';

function loadProgress() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { points: 0, completedTopics: [], badges: [] };
}

function saveProgress(progressData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
}

function updatePoints(pointsToAdd) {
    const progress = loadProgress();
    progress.points += pointsToAdd;
    saveProgress(progress);
    return progress.points;
}

function getPoints() {
    return loadProgress().points;
}

function markTopicComplete(topicId) {
    const progress = loadProgress();
    if (!progress.completedTopics.includes(topicId)) {
        progress.completedTopics.push(topicId);
        saveProgress(progress);
    }
}

function getCompletedTopics() {
    return loadProgress().completedTopics;
}

function addBadge(badgeId) {
    const progress = loadProgress();
    if (!progress.badges.includes(badgeId)) {
        progress.badges.push(badgeId);
        saveProgress(progress);
        console.log(`Badge earned: ${badgeId}`);
        // Optionally show a notification to the user here
        alert(`New Badge Earned: ${window.chapterData.badges.find(b => b.id === badgeId)?.name || badgeId}!`);
    }
}

function getBadges() {
    return loadProgress().badges;
}

// Make functions accessible globally (or use modules)
window.storage = {
    loadProgress,
    saveProgress,
    updatePoints,
    getPoints,
    markTopicComplete,
    getCompletedTopics,
    addBadge,
    getBadges
};
