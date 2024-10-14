document.getElementById('startQuiz').addEventListener('click', async() => {
    // Show quiz container
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('adviceContainer').style.display = 'none';

    try{
         // Await the result of the quiz (wrapped in a function for async)
        const quizResult = await startQuiz();
        document.getElementById('result').innerText = quizResult;

        document.getElementById('adviceContainer').style.display = 'block';
    }catch (error) {
        // If the quiz answer is wrong
        document.getElementById('result').innerText = "Error: " + error;
    }
}
);

// Function for handling quiz logic asynchronously
const startQuiz = () => {
    return new Promise((resolve, reject) => {
        const question = "What do cats do for about 16 hours a day?";
        const options = [
            "a) Run a marathon",
            "b) Plot world domination",
            "c) Nap like there's no tomorrow",
            "d) Practice their meowing skills"
        ];

    // Display the question and options
    document.getElementById('question').innerText = question;
    const optionsContainer = document.getElementById('options');

    // const myQuizPromise = new Promise((resolve, reject) => {
    //     // Quiz question and options
    //     const question = "What do cats do for about 16 hours a day?";
    //     const options = [
    //         "a) Run a marathon",
    //         "b) Plot world domination",
    //         "c) Nap like there's no tomorrow",
    //         "d) Practice their meowing skills"
    //     ];

    //     // Display the question and options
    //     document.getElementById('question').innerText = question;
    //     const optionsContainer = document.getElementById('options');
    //     optionsContainer.innerHTML = ''; // Clear previous options
    //     options.forEach(option => {
    //         const button = document.createElement('button');
    //         button.innerText = option;
    //         button.onclick = () => {
    //             const answer = option; // Get selected answer
    //             if (answer === "c) Nap like there's no tomorrow") {
    //                 resolve("Congratulations! You resolved the quiz correctly and can now fetch the advice. ");
    //             } else {
    //                 reject("Sorry, that's not the right answer. Try again!");
    //             }
    //         };
    //         optionsContainer.appendChild(button);
    //     });
    // });

    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => {
            const answer = option; // Get selected answer
            if (answer === "c) Nap like there's no tomorrow") {
                resolve("Congratulations! You resolved the quiz correctly and can now fetch the advice.");
            } else {
                reject("Sorry, that's not the right answer. Try again!");
            }
        };
        optionsContainer.appendChild(button);
    });
});
};

// Event listener for fetching advice asynchronously
document.getElementById('fetchAdvice').addEventListener('click', async () => {
    const adviceId = document.getElementById('adviceId').value;

    if (adviceId) {
        try {
            // Await the result of the fetch call
            const advice = await fetchAdvice(adviceId);
            document.getElementById('advice').innerText = "Here's the advice for ID " + adviceId + ": " + advice;
        } catch (error) {
            // If an error occurs during fetching advice
            document.getElementById('advice').innerText = "Error: " + error;
        }
    } else {
        document.getElementById('advice').innerText = "Please enter a valid advice ID.";
    }
});

// Function to handle fetching advice asynchronously
const fetchAdvice = async (id) => {
    const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
    
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.slip.advice;
};


//     myQuizPromise
//         .then((message) => {
//             document.getElementById('result').innerText = message;
//             // Show advice container after quiz success
//             document.getElementById('adviceContainer').style.display = 'block';
//         })
//         .catch((error) => {
//             document.getElementById('result').innerText = "Error: " + error;
//         });

//     });

// document.getElementById('fetchAdvice').addEventListener('click', () => {
//     const adviceId = document.getElementById('adviceId').value;
//     if (adviceId) {
//         fetch(`https://api.adviceslip.com/advice/${adviceId}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json(); // Parse the JSON from the response
//             })
//             .then(data => {
//                 document.getElementById('advice').innerText = "Here's the advice for ID " + adviceId + ": " + data.slip.advice;
//             })
//             .catch((error) => {
//                 document.getElementById('advice').innerText = "Error: " + error;
//             });
//     } else {
//         document.getElementById('advice').innerText = "Please enter a valid advice ID.";
//     }
// });