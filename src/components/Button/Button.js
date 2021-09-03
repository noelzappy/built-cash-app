import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'

const styles = {
  root: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
}

const Button = ({
  title,
  width,
  height,
  color,
  backgroundColor,
  onPress,
  icon,
  textStyle,
  style,
}) => {
  const btnStyle = [styles.root, { width, height, backgroundColor }, style]
  const txtStyle = [styles.text, { color }, textStyle]
  return (
    <TouchableOpacity onPress={onPress} style={btnStyle} activeOpacity={0.7}>
      {icon}
      {title && <Text style={txtStyle}>{title}</Text>}
    </TouchableOpacity>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  textStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
}

Button.defaultProps = {
  title: null,
  width: 'auto',
  height: 'auto',
  color: 'black',
  backgroundColor: '#cacaca',
  onPress: () => {},
  icon: null,
  textStyle: {},
  style: {},
}

export default Button
