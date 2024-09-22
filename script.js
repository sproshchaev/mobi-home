const dom = {
    selectbox: document.getElementById('selectbox'),
    rooms: document.getElementById('rooms')
}
dom.selectbox.querySelector('.selectbox__selected').onclick = (event) => {
    if (!dom.selectbox.matches('.open')) {
        dom.selectbox.classList.add('open')
    }
}
