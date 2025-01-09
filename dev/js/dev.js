class Event {
    constructor(id, title, summary, date) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.date = date;
    }
}

class Timeline {
    constructor() {
        this.events = JSON.parse(localStorage.getItem('timelineEvents')) || [];
        this.render();
    }

    addEvent(event) {
        if (this.events.some(e => e.title.toLowerCase() === event.title.toLowerCase())) {
            this.showAlert('Já existe um evento com este título.');
            return;
        }
        this.events.push(event);
        this.save();
        this.render();
        this.hideAlert();
    }

    editEvent(id) {
        const event = this.events[id];
        if (event) {
            document.getElementById('title').value = event.title;
            document.getElementById('summary').value = event.summary;
            document.getElementById('date').value = event.date;
            document.getElementById('modal-title').innerText = 'Editar Evento';
            this.showModal('event-modal');

            document.getElementById('event-form').onsubmit = (e) => {
                e.preventDefault();
                const title = document.getElementById('title').value.trim();
                const summary = document.getElementById('summary').value.trim();
                const date = document.getElementById('date').value.trim();

                if (!title || !summary || !/\d{2}\/\d{2}\/\d{4}/.test(date)) {
                    this.showAlert('Por favor, preencha todos os campos corretamente.');
                    return;
                }

                if (this.events.some((e, index) => e.title.toLowerCase() === title.toLowerCase() && index !== id)) {
                    this.showAlert('Já existe um evento com este título.');
                    return;
                }

                this.events[id] = new Event(id, title, summary, date);
                this.save();
                this.render();
                this.hideModal('event-modal');
                document.getElementById('event-form').reset();
                this.hideAlert();
            };
        }
    }

    deleteEvent(id) {
        this.showConfirm('Tem certeza que deseja excluir este evento?', () => {
            this.events.splice(id, 1);
            this.reassignIds();
            this.save();
            this.render();
        });
    }

    clearTimeline() {
        if (this.events.length === 0) {
            this.showAlert('A linha do tempo já está vazia.');
            return;
        }
        this.showConfirm('Tem certeza que deseja limpar a linha do tempo?', () => {
            this.events = [];
            localStorage.removeItem('timelineEvents');
            this.render();
        });
    }

    reassignIds() {
        this.events.forEach((event, index) => event.id = index);
    }

    save() {
        localStorage.setItem('timelineEvents', JSON.stringify(this.events));
    }

    render() {
        const timeline = document.getElementById('timeline');
        timeline.innerHTML = '';
        const clearButton = document.getElementById('clear-timeline-btn');
        clearButton.disabled = this.events.length === 0;
        this.events.forEach((event, index) => {
            const eventDiv = document.createElement('div');
            eventDiv.className = `event ${index % 2 === 0 ? 'left' : 'right'}`;
            eventDiv.innerHTML = `
                <div class="date"><p>${event.date}</p></div>
                <div class="content">
                    <div>
                        <div class="title"><h4>${event.title}</h4></div>
                        <p>${event.summary}</p>
                        <div class=button-group">
                            <button class="btn primary edit-btn">Editar</button>
                            <button class="btn danger delete-btn">Excluir</button>
                        </div>
                    </div>
                </div>
            `;
            timeline.appendChild(eventDiv);

            eventDiv.querySelector('.edit-btn').addEventListener('click', () => this.editEvent(index));
            eventDiv.querySelector('.delete-btn').addEventListener('click', () => this.deleteEvent(index));
        });
    }

    showAlert(message) {
        const alertDiv = document.getElementById('modal-alert');
        alertDiv.innerText = message;
        this.showModal('event-modal');
    }

    hideAlert() {
        const alertDiv = document.getElementById('modal-alert');
        alertDiv.innerText = '';
    }

    showConfirm(message, onConfirm) {
        const confirmMessage = document.getElementById('confirm-message');
        confirmMessage.innerText = message;
        this.showModal('confirm-modal');

        document.getElementById('confirm-ok-btn').onclick = () => {
            onConfirm();
            this.hideModal('confirm-modal');
        };

        document.getElementById('confirm-cancel-btn').onclick = () => {
            this.hideModal('confirm-modal');
        };
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
    }
}

const timeline = new Timeline();

document.getElementById('add-event-btn').addEventListener('click', () => {
    timeline.showModal('event-modal');
    document.getElementById('modal-title').innerText = 'Adicionar Evento';

    document.getElementById('event-form').onsubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value.trim();
        const summary = document.getElementById('summary').value.trim();
        const date = document.getElementById('date').value.trim();

        if (!title || !summary || !/\d{2}\/\d{2}\/\d{4}/.test(date)) {
            timeline.showAlert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        if (timeline.events.some(e => e.title.toLowerCase() === title.toLowerCase())) {
            timeline.showAlert('Já existe um evento com este título.');
            return;
        }

        const newEvent = new Event(timeline.events.length, title, summary, date);
        timeline.addEvent(newEvent);
        timeline.hideModal('event-modal');
        document.getElementById('event-form').reset();
    };
});

document.getElementById('close-modal-btn').addEventListener('click', () => {
    timeline.hideModal('event-modal');
    timeline.hideAlert();
});

document.getElementById('clear-timeline-btn').addEventListener('click', () => {
    timeline.clearTimeline();
});