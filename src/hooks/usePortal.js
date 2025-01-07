import { useState } from 'react';

const usePortal = (id) => {
  const [container] = useState(() => {
    let element = document.getElementById(id);
    if (!element) {
      element = document.createElement('div');
      element.id = id;
      document.body.appendChild(element);
    }
    return element;
  });

  return container;
};

export default usePortal;
