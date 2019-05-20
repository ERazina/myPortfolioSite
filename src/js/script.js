// let button = document.getElementById('submit');


// button.addEventListener('click', (e) => {
//     if(button.classList.contains('.blocked')){
//         e.preventDefault();
//     }
//     else{

//     }
// });

let link = document.getElementById('link');
let modal = document.getElementById('modal');
let close = document.getElementById('close');
let scroll = document.getElementById('scroll');
let skills = document.getElementById('skills');
console.dir(skills);
link.addEventListener('click', (e) => {
    modal.classList.add('opened');
    modal.classList.remove('closed');
});

close.addEventListener('click', (e) => {
    modal.classList.add('closed');
    modal.classList.remove('opened');
});

// click outside
document.addEventListener('mouseup', (e) => {
    if(e.target.classList.contains('modal-layer')){
        modal.classList.add('closed');
        modal.classList.remove('opened'); 
    }
});

let bar = document.getElementById('progressBar');
let inner = document.getElementById('inner');
// function progressBar(percent, element){

// 	// var progressBarWidth = percent * element.width() / 100;

// 	inner.animate({
// 		width: progressBarWidth
// 	}, 500).html(percent + "%&nbsp;");
// };

// progressBar(50, (bar));

scroll.addEventListener('click', (e) => {
    // e.preventDefault();
    // let id = e.target.parentElement;
    
    let id  = e.target.parentElement.getAttribute('href');
    // console.log(id);
    let top = skills.getBoundingClientRect().top;
    // console.log(top);
    // skills.scrollTop = 100 + 'px';
});

