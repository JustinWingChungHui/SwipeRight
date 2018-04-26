

document.addEventListener('DOMContentLoaded', function () {
    var swiperight = 0;
    var swipeleft = 1;

    // Randomize the cards
    var ul = document.getElementById("cardstack");
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }

    var stack;
    stack = window.swing.Stack();

    [].forEach.call(document.querySelectorAll('.stack li'), function (targetElement) {
        stack.createCard(targetElement);

        targetElement.classList.add('in-deck');
    });

    stack.on('throwout', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection, 'direction.');

        e.target.classList.remove('in-deck');

        e.target.children[swipeleft].removeAttribute("style");
        e.target.children[swiperight].removeAttribute("style");

        if(String(e.throwDirection) == 'Symbol(LEFT)') {
            e.target.children[swipeleft].style.display="block";
        }

        if(String(e.throwDirection) == 'Symbol(RIGHT)') {
            e.target.children[swiperight].style.display="block";
        }

        var cardCount = get_stack_count();

        if (cardCount == 0){
            window.location.href = 'https://deathsexbloodbath.bandcamp.com/';
        }
    });

    stack.on('throwin', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection, 'direction.');

        e.target.children[swipeleft].removeAttribute("style");
        e.target.children[swiperight].removeAttribute("style");
        e.target.classList.add('in-deck');
    });
});

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
