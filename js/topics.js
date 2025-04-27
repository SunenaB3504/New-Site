// Logic for individual topic pages

const topicPage = {
    currentTopicId: null,
    topicData: null,
    exercises: [],
    correctAnswersCount: 0,
    topicPoints: 0,
    counterValue: 0,
    counterMin: 0,
    counterMax: 10,
    counterDisplayElement: null,
    incrementButton: null,
    decrementButton: null,
    pvcInputElement: null,
    pvcChartContainer: null,
    pvcUpdateButton: null,
    pvcExpandedFormContainer: null,
    pvcInputLakhsElement: null,
    pvcChartLakhsContainer: null,
    pvcUpdateLakhsButton: null,
    pvcExpandedFormLakhsContainer: null,
    efbInputElement: null,
    efbUpdateButton: null,
    efbSumResultElement: null,
    efbPlaceResultElement: null,
    compareNum1Element: null,
    compareNum2Element: null,
    compareBtnGt: null,
    compareBtnLt: null,
    compareBtnEq: null,
    compareFeedbackElement: null,
    compareNextBtn: null,
    currentGameNum1: 0,
    currentGameNum2: 0,

    initTopic: function(topicId) {
        this.currentTopicId = topicId;
        this.topicData = window.chapterData.topics.find(t => t.id === topicId);

        if (!this.topicData) {
            console.error(`Topic data not found for ID: ${topicId}`);
            document.getElementById('exercise-container').innerHTML = '<p>Error: Topic data not found.</p>';
            return;
        }

        this.exercises = this.topicData.exercises || [];
        this.loadExercises();
        this.updateTopicPointsDisplay();

        // Check if topic is already completed
        if (window.storage.getCompletedTopics().includes(this.currentTopicId)) {
            this.showCompletionMessage("You have already completed this topic.");
        }

        // Note: Interactive element initialization is now called separately
        // from the HTML after initTopic runs.
    },

    // New function to initialize the interactive counter
    initInteractiveCounter: function(min = 0, max = 10, startValue = 0) {
        this.counterMin = min;
        this.counterMax = max;
        this.counterValue = Math.max(min, Math.min(max, startValue)); // Clamp start value

        this.counterDisplayElement = document.getElementById('counter-display');
        this.incrementButton = document.getElementById('increment-btn');
        this.decrementButton = document.getElementById('decrement-btn');

        if (this.counterDisplayElement && this.incrementButton && this.decrementButton) {
            this.updateCounterDisplay(); // Set initial display

            this.incrementButton.onclick = () => this.incrementCounter();
            this.decrementButton.onclick = () => this.decrementCounter();
        } else {
            console.warn("Counter elements not found on this page.");
        }
    },

    updateCounterDisplay: function() {
        if (this.counterDisplayElement) {
            this.counterDisplayElement.textContent = this.counterValue;
        }
        // Enable/disable buttons based on min/max
        if (this.incrementButton) {
            this.incrementButton.disabled = (this.counterValue >= this.counterMax);
        }
        if (this.decrementButton) {
            this.decrementButton.disabled = (this.counterValue <= this.counterMin);
        }
    },

    incrementCounter: function() {
        if (this.counterValue < this.counterMax) {
            this.counterValue++;
            this.updateCounterDisplay();
        }
    },

    decrementCounter: function() {
        if (this.counterValue > this.counterMin) {
            this.counterValue--;
            this.updateCounterDisplay();
        }
    },

    // Initializer for the chart on Topic 2
    initInteractivePlaceValueChart: function() {
        this.pvcInputElement = document.getElementById('pvc-input');
        this.pvcChartContainer = document.getElementById('pvc-chart');
        this.pvcUpdateButton = document.getElementById('pvc-update-btn');
        this.pvcExpandedFormContainer = document.getElementById('pvc-expanded-form');

        if (this.pvcInputElement && this.pvcChartContainer && this.pvcUpdateButton && this.pvcExpandedFormContainer) {
            this.pvcUpdateButton.onclick = () => this.updatePlaceValueChart();
            // Optional: Update chart on input change as well (can be noisy)
            // this.pvcInputElement.oninput = () => this.updatePlaceValueChart();
        } else {
            console.warn("Place Value Chart elements not found on this page.");
        }
    },

    // Update function for the chart on Topic 2
    updatePlaceValueChart: function() {
        if (!this.pvcInputElement || !this.pvcChartContainer || !this.pvcExpandedFormContainer) return;

        const numberStr = this.pvcInputElement.value.trim();
        const number = parseInt(numberStr, 10);

        // Clear previous content
        this.pvcChartContainer.innerHTML = '';
        this.pvcExpandedFormContainer.innerHTML = '';

        if (isNaN(number) || number < 0 || numberStr.length === 0 || numberStr.length > 6) {
            this.pvcChartContainer.innerHTML = '<p>Please enter a valid number between 0 and 999,999.</p>';
            return;
        }

        const places = [
            { name: 'Ones', value: 1, period: 'Ones' },
            { name: 'Tens', value: 10, period: 'Ones' },
            { name: 'Hundreds', value: 100, period: 'Ones' },
            { name: 'Thousands', value: 1000, period: 'Thousands' },
            { name: 'Ten Thousands', value: 10000, period: 'Thousands' },
            { name: 'Lakhs', value: 100000, period: 'Lakhs' }
        ];

        let remainingNumber = number;
        let expandedParts = [];

        // Generate chart columns (reversed order in HTML via flex-direction: row-reverse)
        places.forEach(place => {
            const digit = Math.floor(remainingNumber / place.value) % 10;

            const column = document.createElement('div');
            column.className = 'pvc-column';
            column.dataset.period = place.period; // Add data attribute for styling periods

            const placeName = document.createElement('div');
            placeName.className = 'pvc-place-name';
            placeName.textContent = place.name;

            const digitDisplay = document.createElement('div');
            digitDisplay.className = 'pvc-digit';
            // Display digit only if the number is large enough or it's the ones place
            if (number >= place.value || place.value === 1) {
                 digitDisplay.textContent = digit;
            } else {
                 digitDisplay.textContent = ''; // Keep empty for smaller numbers
            }


            column.appendChild(placeName);
            column.appendChild(digitDisplay);
            this.pvcChartContainer.appendChild(column);

            // Build expanded form part
            if (digit > 0) {
                expandedParts.push(`${digit} x ${place.value.toLocaleString('en-IN')}`); // Use Indian locale for commas if desired
            } else if (number === 0 && place.value === 1) {
                 expandedParts.push("0"); // Special case for zero
            }
        });

        // Display expanded form
        if (expandedParts.length > 0) {
             this.pvcExpandedFormContainer.innerHTML = `<strong>Expanded Form:</strong> ${expandedParts.reverse().join(' + ')} = ${number.toLocaleString('en-IN')}`;
        } else if (number === 0) {
             this.pvcExpandedFormContainer.innerHTML = `<strong>Expanded Form:</strong> 0 = 0`;
        }


    },

    // New function to initialize the interactive place value chart for Topic 3 (up to Lakhs)
    initInteractivePlaceValueChartLakhs: function() {
        this.pvcInputLakhsElement = document.getElementById('pvc-input-lakhs');
        this.pvcChartLakhsContainer = document.getElementById('pvc-chart-lakhs');
        this.pvcUpdateLakhsButton = document.getElementById('pvc-update-btn-lakhs');
        this.pvcExpandedFormLakhsContainer = document.getElementById('pvc-expanded-form-lakhs');

        if (this.pvcInputLakhsElement && this.pvcChartLakhsContainer && this.pvcUpdateLakhsButton && this.pvcExpandedFormLakhsContainer) {
            this.pvcUpdateLakhsButton.onclick = () => this.updatePlaceValueChartLakhs();
        } else {
            console.warn("Place Value Chart (Lakhs) elements not found on this page.");
        }
    },

    // New function to update the place value chart for Topic 3 (up to Lakhs)
    // This is very similar to updatePlaceValueChart, just uses different element IDs
    updatePlaceValueChartLakhs: function() {
        if (!this.pvcInputLakhsElement || !this.pvcChartLakhsContainer || !this.pvcExpandedFormLakhsContainer) return;

        const numberStr = this.pvcInputLakhsElement.value.trim();
        const number = parseInt(numberStr, 10);

        // Clear previous content
        this.pvcChartLakhsContainer.innerHTML = '';
        this.pvcExpandedFormLakhsContainer.innerHTML = '';

        // Validate input (up to 6 digits)
        if (isNaN(number) || number < 0 || number > 999999 || numberStr.length === 0) {
             // Allow empty input to clear chart, but show message for invalid numbers
             if (numberStr.length > 0 && (isNaN(number) || number < 0 || number > 999999)) {
                this.pvcChartLakhsContainer.innerHTML = '<p>Please enter a valid number between 0 and 999,999.</p>';
             } else if (numberStr.length === 0) {
                 this.pvcChartLakhsContainer.innerHTML = '<p>Enter a number and click \'Show in Chart\'.</p>';
             }
            return;
        }


        const places = [ // Same places definition is fine
            { name: 'Ones', value: 1, period: 'Ones' },
            { name: 'Tens', value: 10, period: 'Ones' },
            { name: 'Hundreds', value: 100, period: 'Ones' },
            { name: 'Thousands', value: 1000, period: 'Thousands' },
            { name: 'Ten Thousands', value: 10000, period: 'Thousands' },
            { name: 'Lakhs', value: 100000, period: 'Lakhs' }
        ];

        let remainingNumber = number;
        let expandedParts = [];

        // Generate chart columns (uses the same CSS classes)
        places.forEach(place => {
            const digit = Math.floor(remainingNumber / place.value) % 10;

            const column = document.createElement('div');
            column.className = 'pvc-column';
            column.dataset.period = place.period;

            const placeName = document.createElement('div');
            placeName.className = 'pvc-place-name';
            placeName.textContent = place.name;

            const digitDisplay = document.createElement('div');
            digitDisplay.className = 'pvc-digit';
            // Display digit only if the number is large enough or it's the ones place
             if (number >= place.value || place.value === 1) {
                 digitDisplay.textContent = digit;
             } else {
                 digitDisplay.textContent = ''; // Keep empty for smaller numbers
             }

            column.appendChild(placeName);
            column.appendChild(digitDisplay);
            this.pvcChartLakhsContainer.appendChild(column); // Append to the correct container

            // Build expanded form part
            if (digit > 0) {
                expandedParts.push(`${digit} x ${place.value.toLocaleString('en-IN')}`);
            } else if (number === 0 && place.value === 1) {
                 expandedParts.push("0");
            }
        });

        // Display expanded form
        if (expandedParts.length > 0) {
             this.pvcExpandedFormLakhsContainer.innerHTML = `<strong>Expanded Form:</strong> ${expandedParts.reverse().join(' + ')} = ${number.toLocaleString('en-IN')}`;
        } else if (number === 0) {
             this.pvcExpandedFormLakhsContainer.innerHTML = `<strong>Expanded Form:</strong> 0 = 0`;
        }
    },

    // New function to initialize the interactive expanded form builder
    initInteractiveExpandedFormBuilder: function() {
        this.efbInputElement = document.getElementById('efb-input');
        this.efbUpdateButton = document.getElementById('efb-update-btn');
        this.efbSumResultElement = document.getElementById('efb-sum-result');
        this.efbPlaceResultElement = document.getElementById('efb-place-result');

        if (this.efbInputElement && this.efbUpdateButton && this.efbSumResultElement && this.efbPlaceResultElement) {
            this.efbUpdateButton.onclick = () => this.updateExpandedFormBuilder();
        } else {
            console.warn("Expanded Form Builder elements not found on this page.");
        }
    },

    // New function to update the expanded form builder display
    updateExpandedFormBuilder: function() {
        if (!this.efbInputElement || !this.efbSumResultElement || !this.efbPlaceResultElement) return;

        const numberStr = this.efbInputElement.value.trim();
        const number = parseInt(numberStr, 10);

        // Clear previous results
        this.efbSumResultElement.textContent = '';
        this.efbPlaceResultElement.textContent = '';

        // Validate input (up to 6 digits)
        if (isNaN(number) || number < 0 || number > 999999 || numberStr.length === 0) {
            let message = 'Enter a number above.';
             if (numberStr.length > 0 && (isNaN(number) || number < 0 || number > 999999)) {
                message = 'Invalid number (0-999,999).';
             }
            this.efbSumResultElement.textContent = message;
            return;
        }

        const places = [ // Same places definition is fine
            { name: 'Ones', value: 1, period: 'Ones' },
            { name: 'Tens', value: 10, period: 'Ones' },
            { name: 'Hundreds', value: 100, period: 'Ones' },
            { name: 'Thousands', value: 1000, period: 'Thousands' },
            { name: 'Ten Thousands', value: 10000, period: 'Thousands' },
            { name: 'Lakhs', value: 100000, period: 'Lakhs' }
        ];

        let remainingNumber = number;
        let sumParts = [];
        let placeParts = [];

        // Generate parts (iterate from largest place for correct order)
        places.slice().reverse().forEach(place => {
            // Calculate digit for the current place value
            const digit = Math.floor(remainingNumber / place.value);

            if (digit > 0) {
                const placeValue = digit * place.value;
                sumParts.push(placeValue.toLocaleString('en-IN')); // Add the value (e.g., 80,000)
                placeParts.push(`${digit} x ${place.value.toLocaleString('en-IN')}`); // Add the multiplication (e.g., 8 x 10,000)

                remainingNumber -= placeValue; // Subtract the value from the remaining number
            } else if (number === 0 && place.value === 1) {
                // Special case for input 0
                sumParts.push("0");
                placeParts.push("0");
            }
        });

        // Display results
        if (sumParts.length > 0) {
            this.efbSumResultElement.textContent = sumParts.join(' + ');
            this.efbPlaceResultElement.textContent = placeParts.join(' + ');
        } else if (number === 0) {
             this.efbSumResultElement.textContent = "0";
             this.efbPlaceResultElement.textContent = "0";
        } else {
            // Should not happen with validation, but as fallback
            this.efbSumResultElement.textContent = 'Could not expand.';
        }
    },

    // New function to initialize the interactive comparison game
    initInteractiveComparisonGame: function() {
        this.compareNum1Element = document.getElementById('compare-num1');
        this.compareNum2Element = document.getElementById('compare-num2');
        this.compareBtnGt = document.getElementById('compare-btn-gt');
        this.compareBtnLt = document.getElementById('compare-btn-lt');
        this.compareBtnEq = document.getElementById('compare-btn-eq');
        this.compareFeedbackElement = document.getElementById('compare-feedback');
        this.compareNextBtn = document.getElementById('compare-next-btn');

        if (this.compareNum1Element && this.compareNum2Element && this.compareBtnGt && this.compareBtnLt && this.compareBtnEq && this.compareFeedbackElement && this.compareNextBtn) {
            this.compareBtnGt.onclick = () => this.checkComparisonAnswer('>');
            this.compareBtnLt.onclick = () => this.checkComparisonAnswer('<');
            this.compareBtnEq.onclick = () => this.checkComparisonAnswer('=');
            this.compareNextBtn.onclick = () => this.generateComparisonNumbers();

            this.generateComparisonNumbers(); // Load the first pair
        } else {
            console.warn("Comparison Game elements not found on this page.");
        }
    },

    // Generates two random numbers for the comparison game
    generateComparisonNumbers: function() {
        // Generate numbers up to 6 digits
        const maxNum = 999999;
        this.currentGameNum1 = Math.floor(Math.random() * (maxNum + 1));
        this.currentGameNum2 = Math.floor(Math.random() * (maxNum + 1));

        // Occasionally make them equal
        if (Math.random() < 0.1) { // 10% chance of being equal
            this.currentGameNum2 = this.currentGameNum1;
        }

        this.compareNum1Element.textContent = this.currentGameNum1.toLocaleString('en-IN');
        this.compareNum2Element.textContent = this.currentGameNum2.toLocaleString('en-IN');

        // Clear feedback and enable buttons
        this.compareFeedbackElement.innerHTML = '';
        this.compareFeedbackElement.className = 'feedback';
        this.compareBtnGt.disabled = false;
        this.compareBtnLt.disabled = false;
        this.compareBtnEq.disabled = false;
    },

    // Checks the user's comparison choice
    checkComparisonAnswer: function(userChoice) {
        let correctAnswer;
        if (this.currentGameNum1 > this.currentGameNum2) {
            correctAnswer = '>';
        } else if (this.currentGameNum1 < this.currentGameNum2) {
            correctAnswer = '<';
        } else {
            correctAnswer = '=';
        }

        if (userChoice === correctAnswer) {
            this.compareFeedbackElement.textContent = 'Correct!';
            this.compareFeedbackElement.className = 'feedback correct';
            // Optionally award points for game interaction?
            // window.gamification.awardPoints(1); // Example: 1 point per correct comparison
        } else {
            this.compareFeedbackElement.textContent = `Not quite! The correct answer is ${correctAnswer}`;
            this.compareFeedbackElement.className = 'feedback incorrect';
        }

        // Disable buttons after answering
        this.compareBtnGt.disabled = true;
        this.compareBtnLt.disabled = true;
        this.compareBtnEq.disabled = true;
    },

    loadExercises: function() {
        const container = document.getElementById('exercise-container');
        if (!container) return;
        container.innerHTML = ''; // Clear loading message

        this.exercises.forEach((exercise, index) => {
            const exerciseDiv = document.createElement('div');
            exerciseDiv.className = 'exercise fade-in';
            exerciseDiv.id = `exercise-${exercise.id}`;

            let inputHtml = '';
            if (exercise.type === 'fill-in-blank') {
                // Handle single or multiple blanks
                const parts = exercise.question.split('__');
                inputHtml = parts[0];
                const answerArray = Array.isArray(exercise.answer) ? exercise.answer : [exercise.answer];
                for (let i = 0; i < answerArray.length; i++) {
                    inputHtml += `<input type="text" id="answer-${exercise.id}-${i}" data-exercise-id="${exercise.id}" data-input-index="${i}" size="5">`;
                    if (parts[i + 1]) {
                        inputHtml += parts[i + 1];
                    }
                }
            } else {
                // Add other exercise types here (e.g., multiple choice)
                inputHtml = `<p>Unsupported exercise type: ${exercise.type}</p>`;
            }

            exerciseDiv.innerHTML = `
                <label for="answer-${exercise.id}-0"><strong>Q${index + 1}:</strong> ${inputHtml}</label>
                <button onclick="topicPage.checkAnswer('${exercise.id}')">Check Answer</button>
                <div class="feedback" id="feedback-${exercise.id}"></div>
            `;
            container.appendChild(exerciseDiv);
        });
    },

    checkAnswer: function(exerciseId) {
        const exercise = this.exercises.find(ex => ex.id === exerciseId);
        const feedbackDiv = document.getElementById(`feedback-${exercise.id}`);
        const inputs = document.querySelectorAll(`input[data-exercise-id="${exerciseId}"]`);

        if (!exercise || !feedbackDiv || inputs.length === 0) {
            console.error("Could not find exercise elements for ID:", exerciseId);
            return;
        }

        let isCorrect = true;
        const userAnswers = [];

        inputs.forEach(input => {
            userAnswers.push(input.value.trim().toLowerCase());
        });

        const correctAnswers = Array.isArray(exercise.answer)
            ? exercise.answer.map(a => String(a).toLowerCase())
            : [String(exercise.answer).toLowerCase()];

        if (userAnswers.length !== correctAnswers.length) {
            isCorrect = false; // Should not happen with current setup, but good check
        } else {
            for (let i = 0; i < correctAnswers.length; i++) {
                if (userAnswers[i] !== correctAnswers[i]) {
                    isCorrect = false;
                    break;
                }
            }
        }

        if (isCorrect) {
            feedbackDiv.innerHTML = `Correct! +${exercise.points} points`; // Use innerHTML in case previous hint was there
            feedbackDiv.className = 'feedback correct';
            window.gamification.awardPoints(exercise.points);
            this.topicPoints += exercise.points;
            this.updateTopicPointsDisplay();
            this.correctAnswersCount++;

            // Disable input and button after correct answer
            inputs.forEach(input => input.disabled = true);
            const button = feedbackDiv.previousElementSibling; // Assumes button is right before feedback div
             if (button && button.tagName === 'BUTTON') {
                 button.disabled = true;
                 button.textContent = 'Answered';
             }


            // Check if all exercises are completed
            if (this.correctAnswersCount === this.exercises.length) {
                this.showCompletionButton();
            }
        } else {
            let feedbackHTML = 'Incorrect.'; // Start the feedback message

            // Add the hint if available
            if (exercise.hint) {
                feedbackHTML += `<br><small><em>Hint: ${exercise.hint}</em></small>`;
            }

            // Add the correct answer
            const correctAnswerDisplay = Array.isArray(exercise.answer) ? exercise.answer.join(', ') : exercise.answer;
            feedbackHTML += `<br><strong>Correct Answer: ${correctAnswerDisplay}</strong>`;

            feedbackDiv.innerHTML = feedbackHTML; // Update the feedback div
            feedbackDiv.className = 'feedback incorrect';
            // Simple shake animation for feedback
            feedbackDiv.style.animation = 'shake 0.5s';
            setTimeout(() => { feedbackDiv.style.animation = ''; }, 500);

            // Optional: Disable input/button after showing the answer to prevent point farming?
            // inputs.forEach(input => input.disabled = true);
            // const button = feedbackDiv.previousElementSibling;
            // if (button && button.tagName === 'BUTTON') {
            //     button.disabled = true;
            //     button.textContent = 'Answer Shown';
            // }
        }
    },

    updateTopicPointsDisplay: function() {
        const topicPointsEl = document.getElementById('topic-points');
        if (topicPointsEl) {
            topicPointsEl.textContent = this.topicPoints;
        }
    },

    showCompletionButton: function() {
        const completeBtn = document.getElementById('complete-topic-btn');
        if (completeBtn && !window.storage.getCompletedTopics().includes(this.currentTopicId)) {
            completeBtn.style.display = 'block';
            completeBtn.onclick = () => this.completeTopic();
        }
    },

    completeTopic: function() {
        window.storage.markTopicComplete(this.currentTopicId);
        window.gamification.checkTopicCompletionBadge(this.currentTopicId);
        this.showCompletionMessage(`Topic completed! You earned ${this.topicPoints} points in this topic.`);
        const completeBtn = document.getElementById('complete-topic-btn');
        if(completeBtn) completeBtn.style.display = 'none'; // Hide button after completion
        // Optionally update overall progress display if visible on the page
        // window.gamification.updateProgressDisplay();
    },

    showCompletionMessage: function(message) {
        const feedbackDiv = document.getElementById('topic-completion-feedback');
        if (feedbackDiv) {
            feedbackDiv.textContent = message;
            feedbackDiv.className = 'feedback correct'; // Use 'correct' style for positive feedback
            feedbackDiv.style.display = 'block';
        }
    }
};

// Add simple shake animation CSS dynamically if needed, or put in style.css
const styleSheet = document.styleSheets[0];
try {
    styleSheet.insertRule(`
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `, styleSheet.cssRules.length);
} catch (e) {
    console.warn("Could not insert shake animation rule:", e);
}


// Make topicPage object accessible globally
window.topicPage = topicPage;
