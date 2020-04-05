const log = console.log;

const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const msg = document.querySelector('.msg')

weatherForm.addEventListener('submit' , e => {
    e.preventDefault();
    const {value} = input;
    msg.textContent = "loading";
    const url  = `/weather?address=${value}`;
    fetch(url).then((responce) => {
        responce.json().then( ({error , location , temp ,desc}) => {
            if (error){
                msg.textContent = error;
            } else {
                msg.textContent = `${location},temperatura de ${temp} C, ${desc}`
                input.value = ""
            }
        })
    })
})