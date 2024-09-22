const dom = {
    selectbox: document.getElementById('selectbox'),
    rooms: document.getElementById('rooms')
}
dom.selectbox.querySelector('.selectbox__selected').onclick = (event) => {
    dom.selectbox.classList.toggle('open')
}

document.body.onclick = (event) => {
    const { target } = event
    if (
      !target.matches('.selectbox')
        && !target.parentElement.matches('.selectbox')
        && !target.parentElement.parentElement.matches('.selectbox')
    ){
        dom.selectbox.classList.remove('open');
    }
} 
dom.selectbox.querySelector('.selectbox__list').onclick = (event) =>{
    const {target} = event
    if (target.matches('selectbox__item')){
        const value = target.dataset.room
        dom.selectbox.classList.remove('open')
        console.log(value)
    }
}

