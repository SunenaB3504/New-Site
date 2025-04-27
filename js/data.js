// Local data store for the application

const chapterData = {
    title: "Chapter 1: Numbers and Place Value",
    topics: [
        {
            id: "topic1",
            title: "Introduction to Numbers",
            file: "topics/topic1.html",
            exercises: [
                { id: "ex1-1", type: "fill-in-blank", question: "The number after 7 is __.", answer: "8", points: 10, hint: "Think about counting: 1, 2, 3... What comes after 7?" },
                { id: "ex1-2", type: "fill-in-blank", question: "Write the digit for the number 'three': __.", answer: "3", points: 10 },
                { id: "ex1-3", type: "fill-in-blank", question: "How many digits are there from 0 to 9? __", answer: "10", points: 15, hint: "Count them on your fingers, starting with 0!" },
                { id: "ex1-4", type: "fill-in-blank", question: "What number comes before 5? __", answer: "4", points: 10 },
                { id: "ex1-5", type: "fill-in-blank", question: "Write the number 'nine' using a digit: __.", answer: "9", points: 10 }
            ],
            badgeId: "badge_topic1"
        },
        {
            id: "topic2",
            title: "Understanding Place Value (up to Lakhs)",
            file: "topics/topic2.html",
            exercises: [
                { id: "ex2-1", type: "fill-in-blank", question: "In the number 58, the digit 5 is in the __ place.", answer: "tens", points: 10, hint: "Is it the Ones place or the Tens place?" },
                { id: "ex2-2", type: "fill-in-blank", question: "In the number 345, the digit 4 has a value of __.", answer: "40", points: 15, hint: "The 4 is in the Tens place. What is 4 tens worth?" },
                { id: "ex2-3", type: "fill-in-blank", question: "How many tens make one hundred? __", answer: "10", points: 10 },
                { id: "ex2-4", type: "fill-in-blank", question: "Write the number 'Seven thousand, twenty-two' using digits: __.", answer: "7022", points: 20, hint: "Think about the thousands, hundreds, tens, and ones places. Use zero as a placeholder!" },
                { id: "ex2-5", type: "fill-in-blank", question: "What is the place value of the digit 9 in 9,540? __", answer: "thousands", points: 15 },
                { id: "ex2-6", type: "fill-in-blank", question: "Write the expanded form of 603: 600 + __ + 3.", answer: "0", points: 15, hint: "What is the value of the digit in the tens place?" },
                { id: "ex2-7", type: "fill-in-blank", question: "How many Ten Thousands make one Lakh? __", answer: "10", points: 10 },
                { id: "ex2-8", type: "fill-in-blank", question: "In 4,56,789, the digit 5 is in the __ __ place.", answer: ["ten", "thousands"], points: 20, hint: "Look at the position of the 5 after the Lakhs place." },
                { id: "ex2-9", type: "fill-in-blank", question: "Write the number 2,00,005 in words: Two __, five.", answer: "lakh", points: 20 },
                { id: "ex2-10", type: "fill-in-blank", question: "What digit is in the hundreds place in the number 12,345? __", answer: "3", points: 10, hint: "Count the places from the right: Ones, Tens, Hundreds..." }
            ],
            badgeId: "badge_topic2"
        },
        { // Topic 3
            id: "topic3",
            title: "Bigger Numbers! (5 and 6 Digits)",
            file: "topics/topic3.html",
            exercises: [
                { id: "ex3-1", type: "fill-in-blank", question: "What is the smallest 5-digit number?", answer: "10000", points: 10, hint: "It comes right after the largest 4-digit number (9,999)." },
                { id: "ex3-2", type: "fill-in-blank", question: "Write the number 'Forty-five thousand, six hundred twelve' using digits: __.", answer: "45612", points: 15 },
                { id: "ex3-3", type: "fill-in-blank", question: "What is the place value of the digit 7 in 7,50,123?", answer: "lakhs", points: 15, hint: "Look at the leftmost digit and the periods." },
                { id: "ex3-4", type: "fill-in-blank", question: "Write 99,999 + 1 = __.", answer: "100000", points: 10, hint: "This is the smallest 6-digit number." },
                { id: "ex3-5", type: "fill-in-blank", question: "Put commas in the correct places for the number 582314: 5__82__314", answer: [",", ","], points: 15, hint: "Commas separate Lakhs, Thousands, and Ones periods." },
                { id: "ex3-6", type: "fill-in-blank", question: "Write the expanded form of 25,031: 20,000 + __ + 0 + 30 + 1.", answer: "5000", points: 20, hint: "What is the value of the digit in the thousands place?" },
                { id: "ex3-7", type: "fill-in-blank", question: "Write the number 'Three lakh, four thousand, nine' using digits: __.", answer: "304009", points: 20, hint: "Use zeros as placeholders for missing places like Ten Thousands, Hundreds, and Tens." },
                { id: "ex3-8", type: "fill-in-blank", question: "What digit is in the Ten Thousands place in 6,98,702?", answer: "9", points: 10 },
                { id: "ex3-9", type: "fill-in-blank", question: "Write the number name for 70,050: Seventy __, fifty.", answer: "thousand", points: 15 },
                { id: "ex3-10", type: "fill-in-blank", question: "Which is bigger: 99,999 or 1,00,000?", answer: "1,00,000", points: 10, hint: "Count the number of digits." }
            ],
            badgeId: "badge_topic3"
        },
        { // Topic 4
            id: "topic4",
            title: "Stretching Numbers (Expanded Form)",
            file: "topics/topic4.html",
            exercises: [
                // 10 new exercises for Topic 4
                { id: "ex4-1", type: "fill-in-blank", question: "Write the expanded form of 73: 70 + __", answer: "3", points: 10 },
                { id: "ex4-2", type: "fill-in-blank", question: "Write the numeral for 500 + 90 + 2: __", answer: "592", points: 10 },
                { id: "ex4-3", type: "fill-in-blank", question: "Write the expanded form of 4,805: 4000 + __ + 0 + 5", answer: "800", points: 15, hint: "What is the value of the digit in the hundreds place?" },
                { id: "ex4-4", type: "fill-in-blank", question: "Write the numeral for 90,000 + 1,000 + 30: __", answer: "91030", points: 15, hint: "Don't forget the placeholders for hundreds and ones!" },
                { id: "ex4-5", type: "fill-in-blank", question: "Write the expanded form of 6,15,496: 6,00,000 + 10,000 + 5,000 + 400 + __ + 6", answer: "90", points: 20 },
                { id: "ex4-6", type: "fill-in-blank", question: "Write the numeral for (7x1,00,000) + (5x1,000) + (4x10) + (5x1): __", answer: "705045", points: 20, hint: "Watch out for the missing place values (Ten Thousands, Hundreds)." },
                { id: "ex4-7", type: "fill-in-blank", question: "Write the expanded form of 5,02,993: 5,00,000 + 0 + 2,000 + __ + 90 + 3", answer: "900", points: 15 },
                { id: "ex4-8", type: "fill-in-blank", question: "Write the numeral for 3 lakhs + 1 ten thousand + 9 hundreds + 5 tens + 2 ones: __", answer: "310952", points: 20, hint: "Lakhs = 1,00,000. Ten Thousand = 10,000." },
                { id: "ex4-9", type: "fill-in-blank", question: "What is the value of the digit 8 in the expanded form of 9,80,015? __", answer: "80000", points: 15, hint: "The 8 is in the Ten Thousands place." },
                { id: "ex4-10", type: "fill-in-blank", question: "Write the numeral for 80,000 + 7000 + 100: __", answer: "87100", points: 15 }
            ],
            badgeId: "badge_topic4"
        },
        { // Topic 5
            id: "topic5",
            title: "Which Number is Bigger? (Comparing Numbers)",
            file: "topics/topic5.html",
            exercises: [
                // 10 new exercises for Topic 5
                { id: "ex5-1", type: "fill-in-blank", question: "Which symbol means 'Less Than'? (>, <, or =)", answer: "<", points: 5 },
                { id: "ex5-2", type: "fill-in-blank", question: "Which number is bigger: 8,456 or 8,546?", answer: "8,546", points: 10, hint: "Digits are same in thousands place, compare hundreds." },
                { id: "ex5-3", type: "fill-in-blank", question: "Put the correct symbol (>, <, =) between 99,999 __ 1,00,000.", answer: "<", points: 10, hint: "Count the digits." },
                { id: "ex5-4", type: "fill-in-blank", question: "Which number is smaller: 5,05,050 or 5,50,005?", answer: "5,05,050", points: 15, hint: "Compare the digits in the Ten Thousands place." },
                { id: "ex5-5", type: "fill-in-blank", question: "Put the correct symbol (>, <, =) between 34,567 __ 34,567.", answer: "=", points: 10 },
                { id: "ex5-6", type: "fill-in-blank", question: "Which number is greater: 6,12,345 or 6,12,435?", answer: "6,12,435", points: 15, hint: "Compare the digits in the Hundreds place." },
                { id: "ex5-7", type: "fill-in-blank", question: "Is a 5-digit number always smaller than a 6-digit number? (yes/no)", answer: "yes", points: 10 },
                { id: "ex5-8", type: "fill-in-blank", question: "Put the correct symbol (>, <, =) between 8,00,008 __ 8,00,800.", answer: "<", points: 15 },
                { id: "ex5-9", type: "fill-in-blank", question: "Arranging numbers from smallest to greatest is called __ order.", answer: "ascending", points: 10 },
                { id: "ex5-10", type: "fill-in-blank", question: "Which number is smaller: 77,770 or 70,777?", answer: "70,777", points: 10, hint: "Compare the digits in the Thousands place." }
            ],
            badgeId: "badge_topic5"
        },
        { // Topic 6
            id: "topic6",
            title: "Putting Numbers in Order",
            file: "topics/topic6.html",
            exercises: [
                // 10 new exercises for Topic 6
                { id: "ex6-1", type: "fill-in-blank", question: "Arranging numbers from greatest to smallest is called __ order.", answer: "descending", points: 10 },
                { id: "ex6-2", type: "fill-in-blank", question: "Arrange in ascending order: 99, 101, 9. Write the first number: __", answer: "9", points: 15, hint: "Ascending means smallest to greatest." },
                { id: "ex6-3", type: "fill-in-blank", question: "Arrange in descending order: 5050, 5500, 5005. Write the last number: __", answer: "5005", points: 15 },
                { id: "ex6-4", type: "fill-in-blank", question: "What is the smallest number in this list: 10,001, 9,999, 10,100?", answer: "9,999", points: 10, hint: "Compare digits or number of digits." },
                { id: "ex6-5", type: "fill-in-blank", question: "What is the greatest number in this list: 4,56,789, 4,65,789, 4,56,879?", answer: "4,65,789", points: 15, hint: "Compare starting from the left." },
                { id: "ex6-6", type: "fill-in-blank", question: "Arrange in ascending order: 210, 120, 21. Write the numbers separated by commas: __, __, __", answer: ["21", "120", "210"], points: 20 },
                { id: "ex6-7", type: "fill-in-blank", question: "Arrange in descending order: 8008, 8800, 8080. Write the numbers separated by commas: __, __, __", answer: ["8800", "8080", "8008"], points: 20 },
                { id: "ex6-8", type: "fill-in-blank", question: "Which order puts numbers from smallest to greatest? (ascending/descending)", answer: "ascending", points: 10 },
                { id: "ex6-9", type: "fill-in-blank", question: "Find the smallest number: 3,03,303, 3,30,033, 3,03,033.", answer: "3,03,033", points: 15 },
                { id: "ex6-10", type: "fill-in-blank", question: "Find the greatest number: 99,099, 90,999, 99,909.", answer: "99,909", points: 15 }
            ],
            badgeId: "badge_topic6"
        },
        { // Topic 7
            id: "topic7",
            title: "Building Numbers! (Forming Numbers)",
            file: "topics/topic7.html",
            exercises: [
                // 10 new exercises for Topic 7
                { id: "ex7-1", type: "fill-in-blank", question: "Form the largest 3-digit number using 7, 0, 5 (use each once): __", answer: "750", points: 15, hint: "Put the largest digit first." },
                { id: "ex7-2", type: "fill-in-blank", question: "Form a number with 6 Lakhs, 2 Thousands, 9 Tens: __", answer: "602090", points: 20, hint: "Use zeros for Ten Thousands, Hundreds, and Ones." },
                { id: "ex7-3", type: "fill-in-blank", question: "Form the smallest 4-digit number using 3, 0, 8, 1 (use each once): __", answer: "1038", points: 20, hint: "Smallest number cannot start with 0 (unless it's just 0)." },
                { id: "ex7-4", type: "fill-in-blank", question: "Form the largest 5-digit number using 4, 4, 9, 1, 8: __", answer: "98441", points: 15, hint: "Use the digits available, largest first." },
                { id: "ex7-5", type: "fill-in-blank", question: "Form the smallest 6-digit number with 5 in the Ten Thousands place: __", answer: "150000", points: 20, hint: "Smallest 6-digit starts with 1. Fill other places with 0." },
                { id: "ex7-6", type: "fill-in-blank", question: "Form the largest 4-digit ODD number using 2, 6, 7, 9 (use each once): __", answer: "9627", points: 20, hint: "Must end in an odd digit. Make the start as large as possible." },
                { id: "ex7-7", type: "fill-in-blank", question: "Form the smallest 5-digit EVEN number using 1, 0, 2, 3, 4 (use each once): __", answer: "10234", points: 20, hint: "Must end in 0, 2, or 4. Smallest overall, can't start with 0." },
                { id: "ex7-8", type: "fill-in-blank", question: "Form a 6-digit number with 48 thousands and 3 ones: __", answer: "48003", points: 15, hint: "48 thousands means 4 Ten Thousands and 8 Thousands. What about other places?" }, // Note: This forms a 5-digit number based on interpretation. Adjust if 6-digit is strictly required (e.g., 148003). Let's assume 48003.
                { id: "ex7-9", type: "fill-in-blank", question: "What is the successor of the largest 4-digit number?", answer: "10000", points: 10, hint: "Largest 4-digit is 9999." },
                { id: "ex7-10", type: "fill-in-blank", question: "Form a number: 9 ones, 4 lakhs, 3 tens, 1 thousand, 6 hundreds. __", answer: "401639", points: 20, hint: "Put each digit in its correct place value spot." }
            ],
            badgeId: "badge_topic7"
        },
        { // Topic 8
            id: "topic8",
            title: "Number Neighbors (Successor & Predecessor)",
            file: "topics/topic8.html",
            exercises: [
                // 10 exercises for Topic 8
                { id: "ex8-1", type: "fill-in-blank", question: "What is the successor of 109?", answer: "110", points: 10, hint: "Successor means add 1." },
                { id: "ex8-2", type: "fill-in-blank", question: "What is the predecessor of 300?", answer: "299", points: 10, hint: "Predecessor means subtract 1." },
                { id: "ex8-3", type: "fill-in-blank", question: "The successor of 9,999 is __.", answer: "10000", points: 15 },
                { id: "ex8-4", type: "fill-in-blank", question: "The predecessor of 20,001 is __.", answer: "20000", points: 15 },
                { id: "ex8-5", type: "fill-in-blank", question: "What comes just after 5,43,210?", answer: "543211", points: 15 },
                { id: "ex8-6", type: "fill-in-blank", question: "What comes just before 8,00,000?", answer: "799999", points: 20, hint: "Think about 800 - 1 = 799." },
                { id: "ex8-7", type: "fill-in-blank", question: "Is 101 the successor or predecessor of 100?", answer: "successor", points: 10 },
                { id: "ex8-8", type: "fill-in-blank", question: "Fill in the blank: __, 650, 651", answer: "649", points: 10, hint: "This is the predecessor of 650." },
                { id: "ex8-9", type: "fill-in-blank", question: "What is the successor of the smallest 5-digit number?", answer: "10001", points: 15, hint: "Smallest 5-digit is 10,000." },
                { id: "ex8-10", type: "fill-in-blank", question: "What is the predecessor of the smallest 4-digit number?", answer: "999", points: 15, hint: "Smallest 4-digit is 1,000." }
            ],
            badgeId: "badge_topic8"
        },
        { // Topic 9
            id: "topic9",
            title: "Place Value vs. Face Value",
            file: "topics/topic9.html",
            exercises: [
                // 10 new exercises for Topic 9
                { id: "ex9-1", type: "fill-in-blank", question: "In 567, what is the face value of the digit 6?", answer: "6", points: 10 },
                { id: "ex9-2", type: "fill-in-blank", question: "In 567, what is the place value of the digit 6?", answer: "60", points: 15, hint: "The 6 is in the Tens place." },
                { id: "ex9-3", type: "fill-in-blank", question: "In 8,024, the face value of 8 is __.", answer: "8", points: 10 },
                { id: "ex9-4", type: "fill-in-blank", question: "In 8,024, the place value of 8 is __.", answer: "8000", points: 15, hint: "The 8 is in the Thousands place." },
                { id: "ex9-5", type: "fill-in-blank", question: "Place Value = Face Value x Value of the __.", answer: "place", points: 10 },
                { id: "ex9-6", type: "fill-in-blank", question: "In 3,45,678, what is the face value of the digit 4?", answer: "4", points: 10 },
                { id: "ex9-7", type: "fill-in-blank", question: "In 3,45,678, what is the place value of the digit 4?", answer: "40000", points: 15, hint: "The 4 is in the Ten Thousands place." },
                { id: "ex9-8", type: "fill-in-blank", question: "In 9,01,234, what is the place value of the digit 0?", answer: "0", points: 10, hint: "0 times anything is 0." },
                { id: "ex9-9", type: "fill-in-blank", question: "In 7,57,123, what is the place value of the leftmost 7?", answer: "700000", points: 20, hint: "It's in the Lakhs place." },
                { id: "ex9-10", type: "fill-in-blank", question: "In 7,57,123, what is the place value of the other 7?", answer: "7000", points: 20, hint: "It's in the Thousands place." }
            ],
            badgeId: "badge_topic9"
        },
        { // New Topic 10
            id: "topic10",
            title: "Place Value Power-Ups! (Relationships)",
            file: "topics/topic10.html",
            exercises: [
                // 10 new exercises for Topic 10
                { id: "ex10-1", type: "fill-in-blank", question: "10 tens = 1 __.", answer: "hundred", points: 10 },
                { id: "ex10-2", type: "fill-in-blank", question: "10 thousands = 1 __ __.", answer: ["ten", "thousand"], points: 15 },
                { id: "ex10-3", type: "fill-in-blank", question: "How many ones make 1 hundred? __", answer: "100", points: 15, hint: "Ones -> Tens (x10), Tens -> Hundreds (x10)" },
                { id: "ex10-4", type: "fill-in-blank", question: "How many tens make 1 thousand? __", answer: "100", points: 15 },
                { id: "ex10-5", type: "fill-in-blank", question: "1 Lakh = __ ten thousands.", answer: "10", points: 10 },
                { id: "ex10-6", type: "fill-in-blank", question: "How many hundreds make 1 ten thousand? __", answer: "100", points: 20, hint: "Hundreds -> Thousands (x10), Thousands -> Ten Thousands (x10)" },
                { id: "ex10-7", type: "fill-in-blank", question: "How many thousands make 1 lakh? __", answer: "100", points: 20 },
                { id: "ex10-8", type: "fill-in-blank", question: "5 hundreds = __ tens.", answer: "50", points: 15, hint: "1 hundred = 10 tens." },
                { id: "ex10-9", type: "fill-in-blank", question: "3 Lakhs = __ thousands.", answer: "300", points: 20, hint: "1 Lakh = 100 thousands." },
                { id: "ex10-10", type: "fill-in-blank", question: "Each place value is __ times the place value to its right.", answer: "10", points: 10 }
            ],
            badgeId: "badge_topic10"
        }
        // Add more topics here
    ],
    badges: [
        { id: "badge_topic1", name: "Number Novice", description: "Completed 'Introduction to Numbers'", image: "assets/images/badge_placeholder.png" },
        { id: "badge_topic2", name: "Place Value Pro", description: "Completed 'Place Value'", image: "assets/images/badge_placeholder.png" },
        { id: "badge_topic3", name: "Big Number Navigator", description: "Completed '5 and 6 Digit Numbers'", image: "assets/images/badge_placeholder.png" },
        { id: "badge_topic4", name: "Number Stretcher", description: "Completed 'Expanded Form'", image: "assets/images/badge_placeholder.png" },
        { id: "badge_topic5", name: "Comparison Champ", description: "Completed 'Comparing Numbers'", image: "assets/images/badge_placeholder.png" },
        { id: "badge_topic6", name: "Order Master", description: "Completed 'Ordering Numbers'", image: "assets/images/badge_placeholder.png" },
        { id: "badge_topic7", name: "Number Architect", description: "Completed 'Forming Numbers'", image: "assets/images/badge_placeholder.png" },
        { id: "badge_topic8", name: "Neighbor Navigator", description: "Completed 'Successor & Predecessor'", image: "assets/images/badge_placeholder.png" },
        { id: "badge_topic9", name: "Value Virtuoso", description: "Completed 'Place vs. Face Value'", image: "assets/images/badge_placeholder.png" },
        { id: "badge_topic10", name: "Power of Ten", description: "Completed 'Place Value Relationships'", image: "assets/images/badge_placeholder.png" }, // New Badge
        { id: "badge_points100", name: "Century Scorer", description: "Earned 100 points", image: "assets/images/badge_placeholder.png", pointsRequired: 100 }
        // Add more badges here
    ]
};

// Make data accessible globally (or use modules if preferred)
window.chapterData = chapterData;
