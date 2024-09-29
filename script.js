const dom = {
    selectbox: document.getElementById('selectbox'),
    selectboxList: document.querySelector('.selectbox__list'),
    rooms: document.getElementById('rooms'),
    settings: document.getElementById('settings'),
    settingsTabs: document.getElementById('settings-tabs'),
    settingsPanel: document.getElementById('settings-panel'),
    temperatureLine: document.getElementById('temperature-line'),
    temperatureRound: document.getElementById('temperature-round'),
    temperature: document.getElementById('temperature'),
    temperatureBtn: document.getElementById('temperature-btn'),
}
dom.selectbox.querySelector('.selectbox__selected').onclick = (event) => {
    dom.selectbox.classList.toggle('open')
}
const rooms = {
    all: 'Все комнаты',
    livingroom: 'Зал',
    bedroom : 'Спальня',
    kitchen: 'Кухня',
    bathroom: 'Ванная',
    studio: 'Кабинет',
    washingroom: 'Уборная',
}
let activeRoom = 'all';
const roomsData = {
  all: {
    temperature: 0,
    lights: 0,
    humidity: 0,
  },
  livingroom: {
    temperature: 0,
    lights: 0,
    humidity: 0,
  },
  bedroom : {
    temperature: 0,
    lights: 0,
    humidity: 0,
  },
  kitchen: {
    temperature: 0,
    lights: 0,
    humidity: 0,
  },
  bathroom: {
    temperature: 0,
    lights: 0,
    humidity: 0,
  },
  studio: {
    temperature: 0,
    lights: 0,
    humidity: 0,
  },
  washingroom: {
    temperature: 0,
    lights: 0,
    humidity: 0,
  }
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
    selectedSelectboxRoom.classList.remove('selected')
  }
  if (room != 'all') {
    const newSelectedRoom = dom.rooms.querySelector(`[data-room=${room}]`);
    newSelectedRoom.classList.add('selected');
    renderScreen(false)
  } else {
    renderScreen(true)

  }
    const selectedSelectboxRoom = dom.selectbox.querySelector('.selectbox__item.selected');
    selectedSelectboxRoom.classList.remove('selected');
    const newSelectedItem = dom.selectbox.querySelector(`[data-room=${room}]`);
    newSelectedItem.classList.add('selected');
    const selectboxSelected = dom.selectbox.querySelector('.selectbox__selected span')
    selectboxSelected.innerText = rooms[room]
    activeRoom = room;
    dom.temperature = roomsData

}

dom.rooms.querySelectorAll('.room').forEach(room => {
    room.onclick = (event) => {
    const value = room.dataset.room
    selectRoom(value)
    }
})

function renderScreen(isRooms){
    setTimeout(() => {
    if (isRooms){
        dom.rooms.style.display = 'grid'
        dom.settings.style.display = 'none'
    } else {
        dom.settings.style.display = 'block'
        dom.rooms.style.display = 'none'
    }
    }, 300)
}


/*ПАНЕЛЬ НАСТРОЕК КОМНАТЫ*/



function renderTemperature(temperature) {
  const min = 16;
  const max = 40;
  const range = max - min;
  const percent = range / 100;
  const lineMin = 54;
  const lineMax = 276;
  const lineRange = lineMax - lineMin;
  const linePercent = lineRange / 100;
  const roundMin = -240;
  const roundMax = 48;
  const roundRange = roundMax - roundMin;
  const roundPercent = roundRange / 100;


  if (temperature >= min && temperature <= max) {
    const finishPercent = Math.round((temperature - min) / percent);
    const lineFinishPercent = lineMin + linePercent * finishPercent;
    const roundFinishPercent = roundMin + roundPercent * finishPercent;
    dom.temperatureLine.style.strokeDasharray = `${lineFinishPercent} 276`;
    dom.temperatureRound.style.transform = `rotate(${roundFinishPercent}deg`;
    dom.temperature.innerText = temperature;
  }
}



function changeTemperature(){
  let mouseover = false;
  let mousedown = false;
  let position = 0;
  let range = 0;
  let change = 0;
  dom.temperatureBtn.onmouseover = () => mouseover = true;
  dom.temperatureBtn.onmouseout = () => mouseover = false;
  dom.temperatureBtn.onmouseup = () => mousedown = false;
  dom.temperatureBtn.onmousedown = (e) => {
     mousedown = true;
     position = e.offsetY;
     range = 0;
  }
  dom.temperatureBtn.onmousemove = (e) => {
    if (mouseover && mousedown) {
      range = e.offsetY - position;
      const newChange = Math.round(range / -50);
      if (newChange != change) {
        let temperature = +dom.temperature.innerText;
        if (newChange < change) {
          temperature = temperature - 1;
        } else {
          temperature = temperature + 1;
        }
        change = newChange;
        renderTemperature(temperature);
      }
    }  
  }
}
changeTemperature()
