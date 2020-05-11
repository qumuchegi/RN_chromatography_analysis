import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function Picker({pickLabel, onPick, pickedValue, items, placeholderContent}){
  return (
    <View>
      <Text style={{
        marginTop: 10,
        marginBottom: 10
        }}>{pickLabel}</Text>
      <View style={styles.pcikerContainer}>
        <RNPickerSelect
          placeholder={{label: placeholderContent, value: null}}
          doneText="确定"
          onValueChange={onPick}
          value={pickedValue}
          style={{
            width: '100%',
          }}
          items={items}
        />
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
  pcikerContainer:{
    color: '#888',
    borderStyle: 'solid',
    borderColor: '#bbb',
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#eee',
    //display: 'flex',
    //flexDirection: 'row',
    //justifyContent: 'center',
    marginTop: 2
  }
})

