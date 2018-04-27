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

//Pictures
var justinappropriate = [
    'images/justinappropriate_card.jpg',
    'images/justinappropriate_card2.jpg'
];

var sadogasm = [
    'images/sadogasm_card.jpg',
    'images/sadogasm_card2.jpg',
    'images/sadogasm_card3.jpg',
    'images/sadogasm_card4.jpg'
];

var sorocide = [
    'images/sorocide_card.jpg',
    'images/sorocide_card2.jpg'
];

var masokiss = [
    'images/masokiss_card.jpg',
    'images/masokiss_card2.jpg'
];

var switchblade = [
    'images/switchblade_card.jpg',
    'images/switchblade_card2.jpg',
    'images/switchblade_card3.jpg'
];

document.addEventListener('DOMContentLoaded', function () {
    randomize_cards()

    // Set up card stack
    var stack;
    stack = window.swing.Stack();

    [].forEach.call(document.querySelectorAll('.stack li'), function (targetElement) {
        stack.createCard(targetElement);

        targetElement.classList.add('in-deck');
    });

    // Card thrown out
    stack.on('throwout', function (e) {
        e.target.classList.remove('in-deck');

        var direction = null;

        if(String(e.throwDirection) == 'Symbol(LEFT)') {
            direction = 'left';

            var audio = new Audio(get_random_item(swipe_left_audio));
            audio.play();

        } else if(String(e.throwDirection) == 'Symbol(RIGHT)') {
            direction = 'right';

            var audio = new Audio(get_random_item(swipe_right_audio));
            audio.play();
        }

        var cardCount = get_stack_count();

        if (cardCount == 0){
            window.location.href = 'https://deathsexbloodbath.bandcamp.com/';
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
});

// Randomizes the cards
function randomize_cards() {

    // Select background image randomly
    document.getElementById("justinappropriate").style.backgroundImage = 'url(' + get_random_item(justinappropriate) + ')';
    document.getElementById("sadogasm").style.backgroundImage = 'url(' + get_random_item(sadogasm) + ')';
    document.getElementById("sorocide").style.backgroundImage = 'url(' + get_random_item(sorocide) + ')';
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

// Gets the number of cards on the stack
function get_stack_count() {
    var count = 0;

    var stack = document.getElementById("cardstack");
    for (var i =0; i < stack.children.length; i++) {
        if (stack.children[i].classList.value.indexOf('in-deck') !== -1) {
            count++;
        }
    }

    return count;
}
