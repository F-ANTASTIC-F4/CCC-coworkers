import Lottie from 'react-lottie-player';

import lottieJson from '../../public/animation/error.json';

const LottieAnimation = ({ animationData = lottieJson, ...props }: any) => (
  <Lottie animationData={animationData} {...props} />
);

export default LottieAnimation;
