import React, {useRef} from 'react';
import { Text, View, SafeAreaView, Alert, Platform, Button } from 'react-native';
import { WebView } from 'react-native-webview';
const htmlFile = Platform.OS === 'android' ? {uri: 'file:///android_asset/html/webview-charts.html'} : require('./html/webview-html.html');

export default function App(){
  const webref = useRef()
 
  function onclick(){
    webref.current.postMessage('123')
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
          javaScriptEnabled={true}
          source={htmlFile}
          onLoad={()=>{  webref.current.postMessage('123') }}
          injectedJavaScript={`document.getElementById('chart-container').innerText = '1'`}
        />
      </View>
      <Button onPress={()=>onclick} title='点我'/>
      <Text> test webview </Text>
    </SafeAreaView>
  )
}