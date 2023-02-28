import { createPortal } from 'react-dom';
import { Audio } from 'react-loader-spinner';

import css from '../Loader/Loader.module.css';

const loaderRoot = document.querySelector('#loader-root');

const Loader = () => {
  return createPortal(
    <div className={css.style}>
      <Audio color=" #3f51b5" height={150} width={150} />
    </div>,
    loaderRoot
  );
};
export default Loader;
