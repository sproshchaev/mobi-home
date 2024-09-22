const dom = {
    selectbox: document.getElementById('selectbox'),
    selectboxList: document.querySelector('.selectbox__list'),
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
dom.selectboxList.onclick = (event) => {
    const {target} = event
    if (target.matches('.selectbox__item')){
      const { room } = target.dataset
      const selectedItem = dom.selectboxList.querySelector('.selected')
      selectedItem.classList.remove('selected')
      target.classList.add('selected')
      dom.selectbox.classList.remove('open')
      selectRoom(room)
    }
}
function selectRoom(room) {
  const selectedRoom = dom.rooms.querySelector('.selected');
  if (selectedRoom) {
    selectedRoom.classList.remove('selected');
    }
}

