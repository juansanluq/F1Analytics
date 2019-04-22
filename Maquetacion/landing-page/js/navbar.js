const md = new MobileDetect(window.navigator.userAgent);
var ul = document.getElementById('main-ul');
var toggle = document.getElementById('toggle');
let esMovil = false;
let esOrdenador = false;
let displayed = false;

if (md.mobile()) {
    esMovil = true;
    ul.style.display = 'none';
} else if (!md.mobile()){
    esOrdenador = true;
}

toggle.addEventListener('click', e => {
    if(!displayed) {
        ul.style.display = 'flex';
        displayed = true;
    } else if (displayed) {
        ul.style.display = 'none';
        displayed = false;
    }
    console.log('Cambio de estado');
});