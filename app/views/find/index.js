import React from 'react'
import { View, TouchableOpacity, ScrollView, StyleSheet, Text, Dimensions, findNodeHandle, FlatList, Modal, Image, TextInput, Keyboard } from 'react-native'
import { inject, observer } from 'mobx-react'
import {Svg} from 'react-native-svg'
import testData from '../../test'
import Carousel from 'react-native-snap-carousel'
const images = [{
  url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
  url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}, {
  url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
}]

const {height, width} = Dimensions.get('window')
@inject('account')
@observer
export default class FindScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {backgroundColor: "red"},
        {backgroundColor: 'blue'},
        {backgroundColor: 'green'},
        {backgroundColor: 'gray'},
        {backgroundColor: 'yellow'},
        {backgroundColor: 'purple'},
        {backgroundColor: 'red'},
        {backgroundColor: 'red'},
      ],
      entries: [
        {
          title: 'Beautiful and dramatic Antelope Canyon',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          illustration: 'https://i.imgur.com/UYiroysl.jpg'
        },
        {
          title: 'Earlier this morning, NYC',
            subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
        },
        {
          title: 'White Pocket Sunset',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
          illustration: 'https://i.imgur.com/MABUbpDl.jpg'
        },
        {
          title: 'Acrocorinth, Greece',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
        },
        {
          title: 'The lone tree, majestic landscape of New Zealand',
            subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
        },
        {
          title: 'Middle Earth, Germany',
            subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/lceHsT6l.jpg'
        }
      ],
      viewRef: null,
      show: false,
      color: '#fff'
    }
  }

  componentDidMount () {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => {console.log(e, 'show')})
    this.keyboardWillChangeListener = Keyboard.addListener('keyboardWillChangeFrame', (e) => {console.log(e, 'change')})

  }

  _renderItem ({item, index}) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{ item.title }</Text>
        <Image source={{uri: item.posters.thumbnail}} style={{width: 50, height: 50}}/>
      </View>
    );
  }

  imageLoaded =() => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  onPress = () => {
    this.setState({show: true})
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <TextInput
          placeholder={'11111'}
            style={{width, height: 40}}
        />

        <Carousel
          loop
          ref={(c) => { this._carousel = c; }}
          data={testData.movies}
          renderItem={this._renderItem}
          sliderWidth={width}
          itemWidth={200}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  }
})
