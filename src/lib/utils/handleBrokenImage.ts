import { DEFAULT_PROFILE_IMAGE } from './contants';

const handleBrokenImage = (e: any) => {
  e.target.src = DEFAULT_PROFILE_IMAGE;
  e.target.onerror = null;
};

export default handleBrokenImage;
