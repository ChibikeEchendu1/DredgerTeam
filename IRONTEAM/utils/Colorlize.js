import {PixelRatio, Platform, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 360;

export default level => {
  if (level <= 40) {
    return '#FF0000';
  } else if (level <= 50) {
    return '#EF8C0B';
  } else if (level <= 75) {
    return '#028140';
  } else {
    return '#009E9E';
  }
};
