'use strict';

class Stopwatch {
    static states = {
        STOPPED: 'stopped',
        RUNNING: 'running',
        PAUSED: 'paused'
    };

    constructor() {
        this.btnPlay = document.querySelector('button.play');
        this.btnPause = document.querySelector('button.pause');
        this.btnStop = document.querySelector('button.stop');
        this.btnDelete = document.querySelector('button.delete');
        this.btnArchive = document.querySelector('button.archive');
        this.timeUi = document.querySelector('h2.timer');
        this.lastTimeUi = document.querySelector('h3.last-time');
        this.archiveUi = document.querySelector('section.archive-results');

        this.startTime = new Date().getTime();
        this.intervalTimer;
        this.pausedTimeStart = 0;
        this.currentPausedTime = 0;
        this.totalPausedTime = 0;
        this.pauseTimerInterval;
        this.historyResults = [];

        this.state = Stopwatch.states.STOPPED;

        this.initializeBtnEvents();
    }

    initializeBtnEvents() {
        this.btnPlay.addEventListener('click', this.startTimer.bind(this));
        this.btnPause.addEventListener('click', this.pauseTimer.bind(this));
        this.btnStop.addEventListener('click', this.stopTimer.bind(this));

        this.btnArchive.addEventListener('click', () => {
            this.archiveUi.classList.toggle('active');
        });

        this.btnDelete.addEventListener('click', () => {
            this.historyResults.length = 0;
            this.fillArchiveUi();
            this.lastTimeUi.textContent = String.fromCharCode(160);
            this.archiveUi.classList.remove('active');
        });
    }

    startTimer() {
        if (this.state == Stopwatch.states.STOPPED) {
            this.state = Stopwatch.states.RUNNING;
            this.startTime = new Date().getTime();
            this.setTimer();
        } else if (this.state == Stopwatch.states.PAUSED) {
            this.state = Stopwatch.states.RUNNING;
            this.totalPausedTime += this.currentPausedTime;
            this.currentPausedTime = 0;
            clearInterval(this.pauseTimerInterval);
            this.setTimer();
        }
    }

    setTimer() {
        this.intervalTimer = setInterval(function () {
            let time = this.calculateTime();
            this.timeUi.textContent = time;
        }.bind(this), 10);
    }

    calculateTime() {
        let time = new Date().getTime() - this.startTime - this.totalPausedTime;

        const hours = Math.floor((time % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        const miliseconds = Math.floor((time % (1000)) / 10);
        return `${hours > 0 ? hours +':' : ''}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(miliseconds).padStart(2, "0")}`;
    }

    pauseTimer() {
        if (this.state == Stopwatch.states.RUNNING) {
            clearInterval(this.intervalTimer);
            this.state = Stopwatch.states.PAUSED;

            this.pausedTimeStart = new Date().getTime();
            this.pauseTimerInterval = setInterval(function () {
                this.currentPausedTime = new Date().getTime() - this.pausedTimeStart;

            }.bind(this), 10);
        } else if (this.state == Stopwatch.states.PAUSED) {
            this.startTimer();
        }
    }

    stopTimer() {
        if (this.state != Stopwatch.states.STOPPED) {
            clearInterval(this.intervalTimer);
            clearInterval(this.pauseTimerInterval);
            this.totalPausedTime += this.currentPausedTime;

            const time = this.state == Stopwatch.states.PAUSED ? this.timeUi.textContent : this.calculateTime();
            this.lastTimeUi.textContent = `Last time: ${time}`;

            this.totalPausedTime = this.currentPausedTime = 0;
            this.pausedTimeStart = 0;

            this.timeUi.textContent = '00:00:00';

            this.state = Stopwatch.states.STOPPED;
            this.historyResults.push(time);
            this.fillArchiveUi();
        }
    }

    fillArchiveUi() {
        this.archiveUi.innerHTML = '';

        if (this.historyResults.length) {
            this.historyResults.forEach((res, index) => {
                const div = document.createElement('div');
                div.classList.add('result');
                const order = document.createElement('span');
                order.classList.add('order');
                order.textContent = `Time ${index+1}:`
                const time = document.createElement('span');
                time.classList.add('time');
                time.textContent = res;

                this.archiveUi.appendChild(div);
                div.appendChild(order);
                div.appendChild(time);
            });
        } else {
            const div = document.createElement('div');
            div.classList.add('result');
            const time = document.createElement('span');
            time.classList.add('time');
            time.textContent = 'No history results';

            this.archiveUi.appendChild(div);
            div.appendChild(time);
        }
    }
}