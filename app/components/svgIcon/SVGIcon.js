import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Svg, { Path } from 'react-native-svg'

export default class SVGIcon extends Component {
  static propTypes = {
    size: PropTypes.number,
    fill: PropTypes.array,
    viewBox: PropTypes.string,
    path: PropTypes.array.isRequired
  }

  static defaultProps = {
    fill: ['#039FFC'],
    size: 40,
    viewBox: '0 0 1024 1024'
  };

  render () {
    const { size, path, fill, style = {}, viewBox } = this.props
    return (
      <Svg
        width={size}
        height={size}
        style={style}
        viewBox={viewBox}>
        {path.map((item, i) => (
          <Path
            key={i}
            fill={fill[i] || fill[0]}
            d={item} />
        ))}
      </Svg>
    )
  }
}
