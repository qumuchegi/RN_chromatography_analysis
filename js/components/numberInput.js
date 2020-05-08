import React,{useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

export default function NumberInput({inputLabel, onInput}){
  const [showWarn, setShowWarn] = useState(false)
  function proxyInput(value){
    if(!isNumber(value)){
      setShowWarn(true)
    }else{
      setShowWarn(false)
      onInput(value)
    }
  }
  function isNumber(str){
    return str.split('').every(i=>i<10&&i>=0)
  }
  return (
    <View style={StyleSheet.container}>
      <Text style={{
        marginTop: 10,
        marginBottom: 10
      }}>{inputLabel}</Text>
      <TextInput
        style={{
          backgroundColor: '#eee',
          padding: 5,
          fontSize: 20
        }}
        onChangeText={proxyInput}
      >

      </TextInput>
      {
        showWarn && <Text style={{color:'red'}}>请输入数字</Text>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container:{

  }
})