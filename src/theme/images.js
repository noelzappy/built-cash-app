import { Asset } from 'expo-asset'

// svg
import LoginImg from '../../assets/images/LoginImg.svg'
import NotFound from '../../assets/images/not_found.svg'
import onboarding_1 from '../../assets/images/onboarding/1.svg'
import onboarding_2 from '../../assets/images/onboarding/2.svg'
import onboarding_3 from '../../assets/images/onboarding/3.svg'
import onboarding_4 from '../../assets/images/onboarding/4.svg'

export const svgs = {
  LoginImg,
  NotFound,
  onboarding_1,
  onboarding_2,
  onboarding_3,
  onboarding_4,
}

// png/jpeg
export const images = {
  logo_sm: require('../../assets/images/logo-sm.png'),
  logo_lg: require('../../assets/images/logo-lg.png'),
}

// image preloading
export const imageAssets = Object.keys(images).map((key) =>
  Asset.fromModule(images[key]).downloadAsync(),
)
