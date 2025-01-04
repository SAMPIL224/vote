const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let votes = {};

app.post('/vote', (req, res) => {
    const { participantId } = req.body;
    const userIp = req.ip;

    if (userHasVoted(userIp)) {
        return res.status(400).json({ message: 'Vous avez déjà voté.' });
    }

    if (!votes[participantId]) {
        votes[participantId] = 0;
    }

    votes[participantId]++;
    recordUserVote(userIp);
    res.status(200).json({ message: 'Vote enregistré.' });
});

app.get('/results', (req, res) => {
    res.json(votes);
});

function userHasVoted(ip) {
    // Logique pour vérifier si l'utilisateur a déjà voté (par ex. en utilisant une base de données)
    return false;
}

function recordUserVote(ip) {
    // Logique pour enregistrer que l'utilisateur a voté (par ex. en utilisant une base de données)
}

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
