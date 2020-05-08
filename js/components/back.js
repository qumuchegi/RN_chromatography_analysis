import React from 'react';
import {View, Text, TouchableHighlight, Image, Dimensions} from 'react-native';
import leftImg from '../assets/imgs/left.png';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function Back({history, curTitle}) {
  function back() {
    history.go(-1);
  }
  return (
    <View
    style={{
      borderBottomWidth: 2,
      borderBottomColor: '#ddd',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      justifyContent: 'space-between',
    }}>
      <TouchableHighlight
        onPress={back}
        underlayColor="white"
        style={{ width: 100 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }}>
          <Image source={leftImg} style={{width: 20, height: 20}}></Image>
          <Text style={{fontSize: 18}}>返回</Text>
        </View>
      </TouchableHighlight>
      <Text style={{
          fontSize: 18,
          color: '#aaa',
        }}>
        {curTitle}
      </Text>
    </View>
  );
}
