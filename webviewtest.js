import React, {useRef} from 'react';
import { Text, View, SafeAreaView, Alert, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
const htmlFile = Platform.OS === 'android' ? {uri: 'file:///android_asset/html/webview-charts.html'} : require('./html/webview-html.html');

export default function App(){
  const webref = useRef()
  function start(){
    Alert.alert('开始加载')
  }
  function end(){
    Alert.alert('结束加载')
  }
  function err(){
    Alert.alert('加载输错')
  }
  return (
    <SafeAreaView>
      <View  style={{
          marginTop: 100,
          height: 300,
          width: 400,
          borderStyle: 'solid',
          borderColor: 'red', 
          borderWidth: 3
        }}>
      <WebView
          originWhitelist={['*']}
          ref={webref}
          style={{width: 400, fontSize: 20}}
          source={htmlFile}
        />
      </View>
      <Text> test webview </Text>
    </SafeAreaView>
  )
}