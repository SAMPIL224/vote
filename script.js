let votes = {};

function vote(participantId) {
    if (localStorage.getItem('voted')) {
        alert('Vous avez déjà voté.');
        return;
    }

    if (!votes[participantId]) {
        votes[participantId] = 0;
    }

    votes[participantId]++;
    localStorage.setItem('voted', true);
    updateResults();
}

function updateResults() {
    const totalVotes = Object.values(votes).reduce((acc, curr) => acc + curr, 0);

    document.querySelectorAll('.participant').forEach(participant => {
        const id = parseInt(participant.getAttribute('data-id'));
        const percentage = (votes[id] || 0) / totalVotes * 100;
        participant.querySelector('.gauge').style.width = `${percentage}%`;
        participant.querySelector('.percentage').textContent = `${percentage.toFixed(2)}%`;
    });
}
