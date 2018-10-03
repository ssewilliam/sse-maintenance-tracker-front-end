import { notify } from 'react-notify-toast';
const notifyDone = (message = '', type = '', color = '') => {
  notify.show(message, type, 2000, color);
};

export default notifyDone;
