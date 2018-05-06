const swiperight = 0;
const swipeleft = 1;

// Audio files
var swipe_right_audio = [
    'audio/yeah.mp3',
    'audio/iknow.mp3',
    'audio/comewithme.mp3',
    'audio/veryglad.mp3',
    'audio/nutella.mp3',
    'audio/cocaine.mp3',
    'audio/lickphone.mp3',
    'audio/whereimfrom.mp3',
    'audio/thankyou.mp3',
    'audio/letsfuck.mp3'
];

var swipe_left_audio = [
    'audio/sucks.mp3',
    'audio/whatthehell.mp3',
    'audio/kissyourdreams.mp3',
    'audio/sorry.mp3',
    'audio/youreshit.mp3',
    'audio/heythisisnt.mp3'
];

var iOS_audio =[];

//Pictures
var justinappropriate = [
    'images/justinappropriate_card.jpg',
    'images/justinappropriate_card2.jpg',
    'images/justinappropriate_card3.jpg',
    'images/justinappropriate_card4.jpg'
];

var sadogasm = [
    'images/sadogasm_card.jpg',
    'images/sadogasm_card2.jpg',
    'images/sadogasm_card3.jpg',
    'images/sadogasm_card4.jpg',
    'images/sadogasm_card5.jpg',
    'images/sadogasm_card6.jpg',
    'images/sadogasm_card7.jpg'
];

var sororicide = [
    'images/sororicide_card.jpg',
    'images/sororicide_card2.jpg',
    'images/sororicide_card3.jpg',
    'images/sororicide_card4.jpg',
    'images/sororicide_card5.jpg'
];

var masokiss = [
    'images/masokiss_card.jpg',
    'images/masokiss_card2.jpg',
    'images/masokiss_card3.jpg',
    'images/masokiss_card4.jpg'
];

var switchblade = [
    'images/switchblade_card.jpg',
    'images/switchblade_card2.jpg',
    'images/switchblade_card3.jpg',
    'images/switchblade_card4.jpg',
    'images/switchblade_card5.jpg',
    'images/switchblade_card6.jpg',
    'images/switchblade_card7.jpg'
];


document.addEventListener('DOMContentLoaded', function () {

    var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    randomize_cards()

    // Set up card stack
    var stack;
    stack = window.swing.Stack();

    [].forEach.call(document.querySelectorAll('.stack li'), function (targetElement) {
        stack.createCard(targetElement);

        targetElement.classList.add('in-deck');
    });

    // Card thrown out
    stack.on('throwoutleft', function (e) {
        e.target.classList.remove('in-deck');

        var audio = new Audio(get_random_item(swipe_left_audio));
        audio.play();
        audio.addEventListener("ended", check_stack_count);

        if (iOS) {
            check_stack_count();
        }
    });

    // Card thrown out
    stack.on('throwoutright', function (e) {
        e.target.classList.remove('in-deck');

        var audio = new Audio(get_random_item(swipe_right_audio));
        audio.play();
        audio.addEventListener("ended", check_stack_count);

        if (iOS) {
            check_stack_count();
        }
    });

    // Card being moved back to centre
    stack.on('throwin', function (e) {
        e.target.children[swipeleft].removeAttribute("style");
        e.target.children[swiperight].removeAttribute("style");
        e.target.classList.add('in-deck');

        var audio = new Audio('audio/phonepickup.mp3');
        audio.play();
    });

    // Card is being moved
    stack.on('dragmove', function(e){

        var direction = null;
        if (e.offset < -20) { 
            direction = 'left'
        } else if (e.offset > 20) {
            direction = 'right'
        }
        update_overlay(direction, e.target);
    });

    document.getElementById('resetButton').addEventListener('click', function() {
        location.reload();
    });

    // Add special touch events for iPhone because drage end event doesn't make sound
    // https://stackoverflow.com/questions/12517000/no-sound-on-ios-6-web-audio-api#12569290
    if (iOS) {

        // Build library of iOS audio
        iOS_audio = swipe_right_audio.concat(swipe_left_audio);

        // Show iOS messages
        var iOSMessages = document.getElementsByClassName('iOSOnly');
        for(var i = 0; i < iOSMessages.length; i++){
            iOSMessages[i].style.display = 'block';
        }

        var cards = document.getElementsByClassName("card");

        for(var i = 0; i < cards.length; i++){
            cards[i].addEventListener("touchend",  function(){
                var audio = new Audio(get_random_item(iOS_audio));
                audio.play();
            });
        }
    }

});

// Randomizes the cards
function randomize_cards() {

    // Select background image randomly
    document.getElementById("justinappropriate").style.backgroundImage = 'url(' + get_random_item(justinappropriate) + ')';
    document.getElementById("sadogasm").style.backgroundImage = 'url(' + get_random_item(sadogasm) + ')';
    document.getElementById("sororicide").style.backgroundImage = 'url(' + get_random_item(sororicide) + ')';
    document.getElementById("masokiss").style.backgroundImage = 'url(' + get_random_item(masokiss) + ')';
    document.getElementById("switchblade").style.backgroundImage = 'url(' + get_random_item(switchblade) + ')';

    //Randomize the card order
    var ul = document.getElementById("cardstack");
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
}

// GHets random item from an array
function get_random_item(array) {
    return array[Math.floor(Math.random()*array.length)];
}

// Updates the overlay of each card as its moved
function update_overlay(direction, target) {
    target.children[swipeleft].removeAttribute("style");
    target.children[swiperight].removeAttribute("style");

    if(direction == 'left') {
        target.children[swipeleft].style.display="block";
    }

    if(direction == 'right') {
        target.children[swiperight].style.display="block";
    }
};

// Checks the number of cards on the stack
function check_stack_count() {
    var stack_count = 0;
    var left_count = 0;
    var right_count = 0;

    var stack = document.getElementById("cardstack");
    for (var i =0; i < stack.children.length; i++) {
        if (stack.children[i].classList.toString().indexOf('in-deck') !== -1) {
            stack_count++;
        }

        if (stack.children[i].children[swiperight].style.display == "block") {
            right_count++;
        }

        if (stack.children[i].children[swipeleft].style.display == "block") {
            left_count++;
        }
    }

    // If stack is empty, then move to another website
    if (stack_count == 0) {

        var destination;

        if (left_count == 5) {
            // All left, booby prize Nickelback
            destination = 'https://www.youtube.com/watch?v=1cQh1ccqu8M';
        } else if (right_count == 5) {
            // All right, reward DSB video
            destination = 'https://www.youtube.com/watch?v=C1G5TRoSnNc';
        } else {
            // Bandcamp
            destination = 'https://deathsexbloodbath.bandcamp.com/';
        }

        window.location.href = destination;
    }
}
