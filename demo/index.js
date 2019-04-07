import Paintbrush from '../lib/index';
import './style.scss';

window.onload = () => {
  const canvasCtr = new Paintbrush('#canvasDiv', {
    canEdit: true,
    width: 600,
    height: 600
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    const id = target.getAttribute('id');
    if (target.tagName === 'BUTTON'){
      document.querySelector('.active').removeAttribute('class');
      target.setAttribute('class', 'active');
    }
    switch(id){
    case 'line':
    case 'straightLine':
    case 'arrowLine':
    case 'rect':
    case 'circle':
    case 'ellipse':
      canvasCtr.setType(id);
      break;
    case 'red':
    case 'green':
      canvasCtr.setStyle({ strokeStyle: id});
      break;
    case 'other':
      canvasCtr.setStyle({ strokeStyle: '#abcdef' });
      break;
    case 'lineWidth':
      canvasCtr.setStyle({ lineWidth: '5' });
      break;
    case 'clear':
      canvasCtr.clear(true);
      break;
    case 'delete':
      canvasCtr.switchToDlete();
      break;
    }
  });
};
