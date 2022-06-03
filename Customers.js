import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

const AddCustomers = (props) => {
  const [name, setName] = useState('');

  const SaveTask = () => {
    fetch("http://10.0.2.2:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'name': name
      })
    })
      .then(res => res.json())
      .then(setName(''))
      .then(async (data) => { })
      .then(props.navigation.navigate('Khata'))
  }

  useEffect(() => { }, []);

  return (
    <View style={styles.MainView} >
      <Text style={styles.MainCustomerTxt}>Customer's Name</Text>
      <TextInput
        style={styles.MainCustomerInputTxt}
        placeholder='Enter your name here'
        value={name}
        onChangeText={text => setName(text)}
      />

      <TouchableOpacity style={styles.Btn} onPress={() => SaveTask()} >
        <Text style={styles.Btntxt}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({

  MainView: {
    flex: 1,
    width: "84%",
    marginHorizontal: "8%",
  },
  MainCustomerTxt: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 12,
    // marginBottom : 8 , 
    marginLeft: 5,
  },
  MainCustomerInputTxt: {
    fontSize: 14,
    height: 50,
    borderWidth: 0.7,
    marginTop: 5,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 1
  },
  Btn: {
    backgroundColor: '#f4511e',
    alignItems: 'center',
    justifyContent: 'center',
    width: "50%",
    height: 40,
    borderRadius: 7,
    marginTop: "120%",
    marginHorizontal: "25%",
    zIndex: 2,
    borderColor: "#000",
    // borderWidth: 1,
    elevation: 10,
  },

  Btntxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
});




export default AddCustomers;
