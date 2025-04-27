// Gamification logic (points, badges)

const gamification = {
    awardPoints: function(points) {
        const totalPoints = window.storage.updatePoints(points);
        console.log(`Awarded ${points} points. Total: ${totalPoints}`);
        this.updateProgressDisplay(); // Update visual display
        this.checkPointBadges(totalPoints);

        // Report score to LMS (optional: report more frequently or just at end)
        // this.reportScoreToLMS(totalPoints);
    },

    // New function to calculate max possible score from exercises
    calculateMaxPossibleScore: function() {
        let maxScore = 0;
        window.chapterData.topics.forEach(topic => {
            if (topic.exercises) {
                topic.exercises.forEach(exercise => {
                    maxScore += exercise.points || 0;
                });
            }
        });
        // Add points from interactive elements if they award points
        // Example: maxScore += 50; // If interactive elements give up to 50 points total
        return maxScore;
    },

    // Optional: Centralized function to report score
    reportScoreToLMS: function(score) {
         // Use the standard SCORM API wrapper functions
         if (typeof ScormSetValue === 'function') { // Check if SCORM functions are available
            const maxScore = this.calculateMaxPossibleScore();
            ScormSetValue("cmi.core.score.raw", score);
            ScormSetValue("cmi.core.score.max", maxScore);
            ScormSetValue("cmi.core.score.min", 0);
            ScormCommit(); // Commit score changes
            console.log(`Reported score to LMS: ${score}/${maxScore}`);
         } else {
             console.warn("SCORM API functions not available, cannot report score.");
         }
    },


    checkCompletion: function() {
        // This function might be better placed in main.js or topics.js
        // depending on how overall completion is determined.
        // See topicPage.checkAndReportChapterCompletion for an example.
    },

    checkPointBadges: function(currentPoints) {
        const earnedBadges = window.storage.getBadges();
        window.chapterData.badges.forEach(badge => {
            if (badge.pointsRequired && currentPoints >= badge.pointsRequired && !earnedBadges.includes(badge.id)) {
                window.storage.addBadge(badge.id);
            }
        });
    },

    checkTopicCompletionBadge: function(topicId) {
        const topic = window.chapterData.topics.find(t => t.id === topicId);
        if (topic && topic.badgeId) {
            window.storage.addBadge(topic.badgeId);
        }
        this.checkPointBadges(window.storage.getPoints()); // Re-check point badges in case topic completion pushes points over threshold
    },

    updateProgressDisplay: function() {
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
             this.displayEarnedBadges(badgeContainer);
         }
    },

    displayEarnedBadges: function(container) {
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
                // Check if badgeData.image exists before creating img tag
                const imgSrc = badgeData.image ? `../${badgeData.image}` : ''; // Use empty string if no image
                const imgTag = imgSrc ? `<img src="${imgSrc}" alt="${badgeData.name}" title="${badgeData.description}" class="badge-icon">` : '';

                li.innerHTML = `
                    ${imgTag}
                    <span>${badgeData.name}</span>
                `;
                ul.appendChild(li);
            }
        });
        container.appendChild(ul);
    }
};

// Make gamification object accessible globally
window.gamification = gamification;
