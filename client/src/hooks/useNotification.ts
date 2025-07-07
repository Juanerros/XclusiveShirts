import { toast } from 'react-toastify';

const useNotification = () => {
  const notify = (message: string, type = 'default', options = {}) => {
    switch (type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      case 'warning':
        toast.warn(message, options);
        break;
      case 'info':
        toast.info(message, options);
        break;
      default:
        toast(message, options);
    }
  };
  
  return notify ;
};

export default useNotification;