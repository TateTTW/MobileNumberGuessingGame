/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        this.number = getRandomNumber(100);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // get random number
    getRandomNumber: function () {
        return Math.floor((Math.random() * 10) + 1);
    },

    submitGuess: function () {
        var parentElement = document.getElementById('deviceready');
        var selectGuess = parentElement.querySelector('#selectGuess');
        var numGuess = parseInt(selectGuess.value);
        var num = Math.floor((Math.random() * 10) + 0);

        if (this.guesses.includes(numGuess)) {
            navigator.notification.alert(
                'You have already guessed that number',
                this.alertDismissed.bind(this),
                'Error',
                'OK'
            );
            return;
        }

        if (numGuess === this.number) {
            word = this.attempts > 1 ? 'Attempts' : 'Attempt'
            navigator.notification.alert(
                'You Won After ' + this.attempts + ' ' + word + '!',
                this.resetGame.bind(this),
                'Yay!',
                'Reset Game'
            );
        } else {
            this.attempts++;
            this.guesses[this.guesses.length] = numGuess;
            navigator.notification.alert(
                'Incorrect, Try Again.',  
                this.alertDismissed.bind(this), 
                'Boo!', 
                'OK'
            );
        } 
    },

    resetGame: function () {
        this.attempts = 1;
        this.number = this.getRandomNumber();
        this.guesses = [];
    },

    alertDismissed: function () {     
    },

    receivedEvent: function (id) {

        navigator.notification.alert(
            'A random number between 1 and 10 has been choosen. Guess what number it is by selecting a number from the dropdown menu and clicking Guess!',  // message
            this.alertDismissed.bind(this),
            'Instructions',
            'OK'
        );

        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var btnSubmit = parentElement.querySelector('#btnSubmit');

        this.number = this.getRandomNumber();
        this.attempts = 1;
        this.guesses = [];

        btnSubmit.addEventListener('click', this.submitGuess.bind(this),false);

        console.log('Received Event: ' + id);
    }
};

app.initialize();