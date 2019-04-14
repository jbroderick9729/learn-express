const express = require('express');
const morgan = require('morgan');

const app = express();

//sum problem
app.use(morgan('dev'));

app.get("/sum", (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const sum = a + b;

    res.json(`The sum of ${a} and ${b} is ${sum}`);
})

//cipher problem
app.get("/cipher", (req, res) => {
    const text = req.query.text;
    const shift = parseInt(req.query.shift);
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let c = text.charCodeAt(i);
        if (65 <= c && c <= 90) result += String.fromCharCode((c - 65 + shift) % 26 + 65);  // Uppercase
        else if (97 <= c && c <= 122) result += String.fromCharCode((c - 97 + shift) % 26 + 97);  // Lowercase
        else result += text.charAt(i);  // Copy
    }
    // return result;
    res.json(result);

})

app.get("/lotto", (req, res) => {
    const numbers = req.query.numbers; 
    let randomNumbers = [];
    for (let i = 1; i <= 6; i++) {
        randomNumbers.push(Math.ceil(Math.random() * 20));
    }
    let count = 0;
    let message = "";
    for (let i = 0; i < numbers.length; i++) {
        if (randomNumbers.indexOf(i) !== -1) {
            count++;
        }
    }
    if (count < 4) {
        message = "Sorry, you lose";
    } else if (count === 4) {
        message = "Congratulations, you win a free ticket";
    } else if (count === 5) {
        message = "Congratulations! You win $100!";
    } else {
        message = "Wow! Unbelievable! You could have won the mega millions!"
    }

    console.log(count)

    res.json(message);
})



app.listen(1026, () => {
    console.log('Express server is listening on port 1026 yallllllllll');
})