import React from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet, Text, Dimensions, findNodeHandle, Image, TextInput, Keyboard } from 'react-native'
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
@inject('account', 'find')
@observer
export default class FindScreen extends React.Component {

  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true
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

  async componentDidMount () {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => {console.log(e, 'show')})
    this.keyboardWillChangeListener = Keyboard.addListener('keyboardWillChangeFrame', (e) => {console.log(e, 'change')})
    await this.props.find.getList()
  }

  _renderItem ({item, index}) {
    return (
      <View style={styles.slide}>
        <Image source={{uri: item.logo}} style={{width: 80, height: 80}}/>
        <Text>{item.name}</Text>
      </View>
    );
  }

  imageLoaded =() => {
    this.setState({ viewRef: findNodeHandle(this._carousel) });
  }

  onPress = () => {
    this.setState({show: true})
  }

  loadMore = async() => {
    const {find} = this.props
    console.log(this.onEndReachedCalledDuringMomentum)
    if (find.list.length < 10 || find.loading || this.onEndReachedCalledDuringMomentum) return null
    await find.getList(true)
    this.onEndReachedCalledDuringMomentum = true;
  }

  render () {
    const {find} = this.props
    return (
      <View style={{flex: 1}}>
       <FlatList
         refreshing={find.loading}
         onRefresh={async()=> await find.getList()}
         onEndReachedThreshold={0.2}
         onEndReached={this.loadMore}
         keyExtractor={(item, index) => `${index}`}
         data={find.list}
         onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
         renderItem={this._renderItem}
       />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    marginVertical: 20
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
