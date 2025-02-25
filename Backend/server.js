const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../Frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.use(express.json());

app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    if (isNaN(num1) || isNaN(num2)) {
        result = 'Please enter valid numbers';
    } else {
        switch (operation) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num2 !== 0 ? (num1 / num2).toFixed(2) : 'Cannot divide by zero'; break;
            default: result = 'Invalid operation';
        }
    }

    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
