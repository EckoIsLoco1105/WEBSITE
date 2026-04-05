let quests = [];

function toggleModal(show) {
    const modal = document.getElementById('modal');
    modal.style.display = show ? 'flex' : 'none';
}

function addQuest() {
    const name = document.getElementById('quest-name').value;
    const instructions = document.getElementById('quest-instructions').value;
    const reward = document.getElementById('quest-reward').value;

    if (!name || !instructions || !reward) {
        alert("Please fill in all fields!");
        return;
    }

    const newQuest = {
        id: Date.now(),
        name: name,
        instructions: instructions,
        reward: reward,
        completed: false
    };

    quests.push(newQuest);
    renderQuests();
    toggleModal(false);

    // Clear inputs
    document.getElementById('quest-name').value = '';
    document.getElementById('quest-instructions').value = '';
    document.getElementById('quest-reward').value = '';
}

function deleteQuest(id) {
    quests = quests.filter(q => q.id !== id);
    renderQuests();
}

function toggleComplete(id) {
    const quest = quests.find(q => q.id === id);
    if (quest) {
        quest.completed = !quest.completed;
        renderQuests();
    }
}

function renderQuests() {
    const container = document.getElementById('quest-container');
    container.innerHTML = '';

    let activeCount = 0;
    let completedCount = 0;

    quests.forEach(quest => {
        if (quest.completed) completedCount++; else activeCount++;

        const card = document.createElement('article');
        card.className = `quest-card ${quest.completed ? 'finished' : ''}`;
        
        card.innerHTML = `
            <h3 class="card-title">${quest.name}</h3>
            <div class="card-label">Main Goal</div>
            <p class="card-description">${quest.instructions}</p>
            <div class="reward-group">
                <span class="reward-icon">🎁</span>
                <span>${quest.reward}</span>
            </div>
            <div class="card-actions">
                <button class="action-btn check-btn" onclick="toggleComplete(${quest.id})">✅</button>
                <button class="action-btn trash-btn" onclick="deleteQuest(${quest.id})">🗑️</button>
            </div>
        `;
        container.appendChild(card);
    });

    document.getElementById('active-count').innerText = activeCount;
    document.getElementById('completed-count').innerText = completedCount;
}