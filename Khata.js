import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Khata = (props) => {

  const [newName, setNewName] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  let fetching = async () => {
    axios.get('http://10.0.2.2:3000/user')
      .then(function (response) {
        const newArr = [];
        newArr.push(...response.data);
        setNewName(newArr)
      })
      .catch(function (error) {
        alert(error.message);
      })
  }


  const wait = (timeout) => {
    return (
      new Promise(resolve => {
        setTimeout(resolve, timeout)
      })
    )
  }


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetching()
    // newColorFind()
    wait(2000)
      .then(() => setRefreshing(false));

  }, []);

  
  useEffect(() => {
    setRefreshing(true);
    fetching()
    setRefreshing(false);
  }, [isFocused])


  return (
    <View style={{ flex: 1 }}>
      {/* Customers Names */}

      <ScrollView style={{ minHeight: "100%", zIndex: 0, marginTop: 0, backgroundColor: "#fff" }}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
          />}
      >

        {
          newName.map((item, index) => {
            if (index < 0) {
              return false
            }
            else {
              return (
                <View key={index}>
                  <TouchableOpacity style={styles.MainView} onPress={() => props.navigation.navigate('Profile', { userName: item.name, UserId: item._id })}>
                    <View style={[styles.MainLogoView, { backgroundColor: "orange" }]}>
                      <Text style={styles.MainLogoTxt}>{item.name.charAt(0)}</Text>
                    </View>

                    <View style={styles.MainCustomerView}>
                      <Text style={styles.MainCustomerTxt}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ borderBottomWidth: 1, borderColor: "grey", width: "90%", marginLeft: "5%", marginTop: 0 }}></View>
                </View>
              );
            }
          })
        }

      </ScrollView>

      {/* Customers ADD Button */}

      <TouchableOpacity style={{ width: 60, height: 65, marginLeft: "77%", marginBottom: "20%", marginTop: "-25%", zIndex: 2 }}
        onPress={() => props.navigation.navigate('Customers')}>
        <Icon color={"#f4511e"} size={62} name="add-circle"></Icon>
      </TouchableOpacity>
    </View>
  );

}
const styles = StyleSheet.create({

  MainView: {
    minheight: 60,
    marginHorizontal: "5%",
    paddingVertical: "1.5%",
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5
  },
  MainLogoView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  MainLogoTxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  MainCustomerView: {
    width: "65%",
    marginVertical: 9,
    marginLeft: 12,
  },
  MainCustomerTxt: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16
  },

});


export default Khata;

