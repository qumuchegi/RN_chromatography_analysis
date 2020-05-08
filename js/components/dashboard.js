import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Image,
  View,
} from 'react-native';
import {withRouter} from 'react-router';
import home1 from '../assets/imgs/home1.png';
import home2 from '../assets/imgs/home2.png';
import project1 from '../assets/imgs/project1.png';
import project2 from '../assets/imgs/project2.png';

const navigations = [
  {name: '首页', path: '/home', selected_img: home2, not_select_img: home1},
  {
    name: '项目介绍',
    path: '/prj-intro',
    selected_img: project2,
    not_select_img: project1,
  },
];

const screenHeight = Math.round(Dimensions.get('window').height);

export default withRouter(Dashboard);
function Dashboard(props) {
  const [selectedNav, setSelectedNav] = useState('首页');
  useEffect(() => {
    navigateTo('首页', '/home');
  }, []);

  const {children} = props;

  function navigateTo(name, path) {
    let {history} = props;
    setSelectedNav(name);
    history.push(path);
  }

  return (
    <SafeAreaView>
      <View>
        <View>{children}</View>
        <View style={styles.bottom_navigation_container}>
          {navigations.map(({name, path, selected_img, not_select_img}) =>
            <TouchableHighlight
              key={name}
              underlayColor={'white'}
              style={{
                flex: 1,
                display: 'flex',
                justifyContent:'center',
                flexDirection:'row',
              }}
              onPress={() => navigateTo(name, path)}>
              <View>
                <Image
                  source={selectedNav === name ? selected_img:not_select_img}
                  style={styles.bottom_navigation_item_image}
                />
              </View>
            </TouchableHighlight>)}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  bottom_navigation_container:{
    padding: 5,
    position: "absolute",
    height: 100,
    top: screenHeight - 100,
    bottom:0,
    left:0,
    right:0,
    backgroundColor: 'white',
    borderTopColor: "#eee",
    borderTopWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:"space-around",
  },
  bottom_navigation_item_image: {
    width: 40,
    height: 40,
    margin: 'auto',
  }
})