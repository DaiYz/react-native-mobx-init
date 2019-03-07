import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  ListView,
  Platform,
  StyleSheet,
  Dimensions,
  Image,
  ViewPropTypes as RNViewPropTypes
} from 'react-native'
import Material from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'
const { width, height } = Dimensions.get('window')
// const NavHeight = system.ios.x ? (22 + 64) : Platform.OS === 'android' ? 44 : 64
const NavHeight = 84
const absoluteTop = (44 - 30) / 2
// const top = system.ios.x ? absoluteTop + 44 : Platform.OS === 'android' ? absoluteTop : absoluteTop + 20
const top = absoluteTop + 44

const AnimatedIcon = Animated.createAnimatedComponent(Material)
const listViewPropTypes = ListView.propTypes
const listViewDefaultProps = ListView.defaultProps
const ViewPropTypes = RNViewPropTypes || View.propTypes

export default class IconMenu extends Component {
  static propTypes = {
    ...listViewPropTypes,
    scrollImageHeight: PropTypes.number,
    headerTitle: PropTypes.string,
    backgroundImage: Image.propTypes.source,
    leftPress: PropTypes.func,
    renderAlwaysCenter: PropTypes.func,
    renderExtraHeader: PropTypes.func,
    fadeDistance: PropTypes.number,
    animationType: PropTypes.oneOf(['fadeIn', 'fadeOut']),
    headerRight: PropTypes.element
  }

  static defaultProps = {
    ...listViewDefaultProps,
    scrollImageHeight: 200,
    backgroundImage: { uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551353953305&di=765a3b25d3970442bf5720c414937fb8&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F0df3d7ca7bcb0a463914d40c6563f6246b60afd5.jpg' },
    headerTitle: '测试头部',
    renderAlwaysCenter: () => null,
    renderExtraHeader: () => null,
    fadeDistance: 200 + NavHeight,
    animationType: 'fadeOut',
    headerRight: null
  }

  constructor (props) {
    super(props)

    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

  _renderHeaderParallaxImage = () => {
    const { scrollY } = this.state
    const {
      scrollImageHeight,
      backgroundImage,
      renderAlwaysCenter
    } = this.props
    return (
      <View style={{ position: 'absolute',
        height: scrollImageHeight,
        width,
        justifyContent: 'center',
        alignItems: 'center' }}>
        <Animated.Image
          style={[styles.background, {
            height: scrollImageHeight,
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [-scrollImageHeight, 0, scrollImageHeight],
                outputRange: [scrollImageHeight / 2, 0, -scrollImageHeight]
              })
            }, {
              scale: scrollY.interpolate({
                inputRange: [-scrollImageHeight, 0, scrollImageHeight],
                outputRange: [2, 1, 1]
              })
            }]
          }]}
          source={backgroundImage} />
        <Animated.View
          style={{
            flex: 1,
            paddingTop: 20,
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [-scrollImageHeight, 0, scrollImageHeight],
                outputRange: [scrollImageHeight / 2, 0, -scrollImageHeight]
              })
            }]
          }}
        >
          {renderAlwaysCenter()}
        </Animated.View>
      </View>
    )
  }

  renderHeader = () => {
    const { scrollY } = this.state
    const { scrollImageHeight, renderExtraHeader } = this.props
    return (
      <View>
        <Animated.View style={{
          position: 'relative',
          paddingTop: NavHeight,
          height: scrollImageHeight,
          transform: [{
            translateY: scrollY.interpolate({
              inputRange: [-scrollImageHeight, 0, scrollImageHeight],
              outputRange: [0, 0, 0]
            })
          }]
        }} >
          {renderExtraHeader()}
        </Animated.View>
      </View>
    )
  }

  renderNavHeader = () => {
    const { scrollY } = this.state
    const { scrollImageHeight, headerTitle, fadeDistance, headerStyle, animationType, headerRight, headerTitleStyle } = this.props
    return <Animated.View style={[{
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      // paddingTop: system.ios.x ? 22 : 0,
      paddingTop: 22,
      backgroundColor: '#aaa',
      opacity: scrollY.interpolate({
        inputRange: [-scrollImageHeight, 0, fadeDistance],
        outputRange: animationType === 'fadeIn' ? [0, 0, 1] : [1, 1, 0]
      })
    }, headerStyle
    ]}>
      <View style={{
        height: Platform.select({ ios: 64, android: 44 }),
        justifyContent: 'flex-end',
        alignItems: 'center'

      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 44, justifyContent: 'center' }}>
          <Text style={[{ fontSize: 17,
            fontWeight: '600' }, headerTitleStyle]}>{headerTitle}</Text>
        </View>
      </View>
      <View style={{ position: 'absolute', top, right: 0 }}>
        {headerRight}
      </View>
    </Animated.View>
  }

  renderHeaderLeft = () => {
    const { scrollY } = this.state
    const { scrollImageHeight, leftPress, fadeDistance, animationType } = this.props
    return <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => leftPress()}
      style={
        {
          position: 'absolute',
          top,
          left: 12
        }
      }
    >
      <AnimatedIcon
        name={'keyboard-arrow-left'}
        size={30}
        style={{
          color: scrollY.interpolate({
            inputRange: [-scrollImageHeight, 0, fadeDistance],
            outputRange: animationType === 'fadeIn' ? ['#fff', '#fff', '#000'] : ['#fff', '#fff', '#fff']
          }),
          opacity: scrollY.interpolate({
            inputRange: [-scrollImageHeight, 0, fadeDistance],
            outputRange: animationType === 'fadeIn' ? [1, 1, 1] : [1, 1, 0]
          })
        }}
      />
    </TouchableOpacity>
  }

  render () {
    const { ...others } = this.props
    return (
      <View style={[{ flex: 1, backgroundColor: '#fff' }]}>
        {this._renderHeaderParallaxImage()}
        <ListView
          enableEmptySections
          scrollEventThrottle={16}
          renderHeader={() => this.renderHeader()}
          style={{ backgroundColor: 'transparent' }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
          {...others}
        />
        {this.renderNavHeader()}
        {this.renderHeaderLeft()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: '#2e2f31',
    width,
    resizeMode: 'cover'
  }
})
