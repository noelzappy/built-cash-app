import { Asset } from 'expo-asset'

// svg
import Logo from '../../assets/images/logo.svg'
import LoginImg from '../../assets/images/LoginImg.svg'
import NotFound from '../../assets/images/not_found.svg'

export const svgs = {
  logo: Logo,
  LoginImg,
  NotFound,
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
