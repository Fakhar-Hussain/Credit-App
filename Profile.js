import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, RefreshControl } from 'react-native';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { useBetween } from 'use-between';
import axios from 'axios';



const useShareableState = () => {
  const [itemProfile, setItemProfile] = useState([]);
  const [itemTaskProfile, setItemTaskProfile] = useState([]);
  const [ProfileCashIn, setProfileCashIn] = useState("")
  const [ProfileCashOut, setProfileCashOut] = useState("")

  return {
    itemProfile, setItemProfile,
    ProfileCashIn, setProfileCashIn,
    ProfileCashOut, setProfileCashOut,
    itemTaskProfile, setItemTaskProfile
  }
}






function Profile(props) {
  const { itemProfile, setItemProfile } = useBetween(useShareableState);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    setItemProfile([])
    setRefreshing(true);
    fetching(route.params.UserId)
    setRefreshing(false);
  }, [isFocused])

  let fetching = async (id) => {
    axios.get(`http://10.0.2.2:3000/userCredit/${id}`)
      .then(function (response) {
        let array = []
        array.push(...response.data)
        setItemProfile(array)
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
    fetching(route.params.UserId)
    wait(2000)
      .then(() => setRefreshing(false));
  }, []);


  return (
    <View>
      <View style={styles3.MainView}>

        {/* GreeN Profile */}

        <View style={styles3.GreenMainView}>
          <Text style={styles3.GreenMainTxt}>Cash In</Text>
          <View style={{ flexDirection: "row", marginTop: 3, }}>
            <Text style={styles3.GreenViewTxt1}>Rs</Text>
            <Text style={styles3.GreenViewTxt2}>
              {
                itemProfile.filter(i => i.profiletype === 'cashin').reduce((pre, cur) => {
                  return pre + (+cur.amount);
                }, 0)
              }
            </Text>
          </View>
        </View>

        {/* Red Profile */}

        <View style={styles3.RedMainView}>
          <Text style={styles3.RedMainTxt}>Cash Out</Text>
          <View style={{ flexDirection: "row", marginTop: 3, }}>
            <Text style={styles3.RedViewTxt1}>Rs</Text>
            <Text style={styles3.RedViewTxt2} numberOfLines={1}>
              {
                itemProfile.filter(i => i.profiletype === 'cashout').reduce((pre, cur) => {
                  return pre + (+cur.amount);
                }, 0)
              }
            </Text>
          </View>
        </View>
      </View>
      <View style={{ borderBottomWidth: 0.3, borderColor: "grey", width: "90%", marginLeft: "5%", marginTop: "23%" }}></View>


      <View style={{ flexDirection: "row", marginTop: 10, }}>
        <View style={{ marginTop: 5, marginLeft: 40 }}>
          <Text style={{ color: "#000", fontWeight: "bold", fontSize: 14 }}>Date</Text>
        </View>

        <View style={{ marginTop: 5, marginLeft: 85 }}>
          <Text style={{ color: "#000", fontWeight: "bold", fontSize: 14 }}>Cash-Out</Text>
        </View>
        <View style={{ marginTop: 5, marginLeft: 67 }}>
          <Text style={{ color: "#000", fontWeight: "bold", fontSize: 14 }}>Cash-In</Text>
        </View>
      </View>
      <View style={{ borderBottomWidth: 0.3, borderColor: "grey", width: "90%", marginLeft: "5%", marginTop: 8 }}></View>





      <ScrollView style={{ height: 370, zIndex: 1, marginTop: 4 }}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        }
      >
        {
          itemProfile.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity style={styles3.MainScroll} >
                  {/* Date Today */}
                  <View style={styles3.DateView}>
                    <Text style={styles3.DateTxt}>{item.date}</Text>
                  </View>
                  {/* Cash OUT  */}
                  <View style={styles3.CashOutView}>
                    <TextInput
                      style={styles3.CashOutTxt}
                      maxLength={7}
                      editable={false}
                      value={item.profiletype === 'cashout' ? item.amount : '-'}
                    />
                  </View>
                  {/* Cash IN */}
                  <View style={styles3.CashInView}>
                    <TextInput
                      style={styles3.CashInTxt}
                      maxLength={7}
                      editable={false}
                      value={item.profiletype === 'cashin' ? item.amount : '-'}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ borderBottomWidth: 0.8, borderColor: "grey", width: "90%", marginLeft: "5%", marginTop: -8 }}></View>
              </View>
            )
          })
        }

        <View style={{ marginBottom: 75 }}></View>
      </ScrollView>


      {/* Button Cash IN & Out */}

      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: "-18%", zIndex: 2 }}>

        <TouchableOpacity style={[styles3.Btn, { backgroundColor: "#0b7d02" }]}
          onPress={() => props.navigation.navigate('CASH-IN', { ProfileID: route.params.UserId })} >
          <Text style={[styles3.Btntxt, { color: "#d7f2d5" }]}>CASH-IN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles3.Btn, { backgroundColor: "#d40609" }]}
          onPress={() => props.navigation.navigate('CASH-OUT', { ProfileID: route.params.UserId })} >
          <Text style={[styles3.Btntxt, { color: "#ffdee2" }]}>CASH-OUT</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
const styles3 = StyleSheet.create({

  MainView: {
    flex: 1,
    width: "90%",
    marginHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },

  /* GreeN Profile */

  GreenMainView: {
    backgroundColor: "#d7f2d5",
    width: "45%",
    height: 70,
    borderRadius: 8
  },
  GreenMainTxt: {
    fontWeight: "bold",
    fontSize: 12,
    paddingLeft: 15,
    paddingTop: 11,
    color: "#0b7d02"
  },
  GreenViewTxt1: {
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: 4,
    color: "#0b7d02"
  },
  GreenViewTxt2: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 5,
    marginTop: -5,
    color: "#0b7d02"
  },


  /* Red Profile */

  RedMainView: {
    backgroundColor: "#f7c1c1",
    width: "45%",
    height: 70,
    borderRadius: 8
  },
  RedMainTxt: {
    fontWeight: "bold",
    fontSize: 12,
    paddingLeft: 15,
    paddingTop: 11,
    color: "#d40609"
  },
  RedViewTxt1: {
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: 4,
    color: "#d40609"
  },
  RedViewTxt2: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 5,
    marginTop: -5,
    color: "#d40609",
    maxWidth: "70%",
    // backgroundColor: "cyan"
  },


  // ScrollView Starting

  MainScroll: {
    height: 40,
    marginHorizontal: "5%",
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5
  },
  DateView: {
    // marginTop: 5, 
    marginLeft: 5,
    width: 85
  },
  DateTxt: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12
  },
  CashOutView: {
    marginTop: 0,
    marginLeft: 30,
    width: 100,
    alignItems: "center"
  },
  CashOutTxt: {
    color: "#d40609",
    fontWeight: "bold",
    fontSize: 15
  },
  CashInView: {
    marginTop: 0,
    marginLeft: 20,
    width: 100,
    alignItems: "center"
  },
  CashInTxt: {
    color: "#0b7d02",
    fontWeight: "bold",
    fontSize: 15
  },


  // Button CASH IN & OUT

  Btn: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: "42%",
    height: 45,
    borderRadius: 7,
    zIndex: 2,
    elevation: 7
  },
  Btntxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
});






















export function CashIN(props) {
  const { ProfileCashIn, setProfileCashIn } = useBetween(useShareableState);
  const moment = require('moment-timezone');
  const fetchCashin = (id) => {
    fetch("http://10.0.2.2:3000/userCredit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: ProfileCashIn,
        profiletype: "cashin",
        customerId: id,
        date: moment.tz('Asia/Karachi').format('MMMM Do YYYY, h:mm:ss a')

      })
    })
      .then(res => res.json())
    setProfileCashIn(''),
      props.navigation.goBack()
  }

  const SaveBtn = (id) => {
    if (ProfileCashIn == '') {
      return false;
    }
    else {
      fetchCashin(id)
    }
  }



  const route = useRoute()
  return (
    <View style={styles4.MainView}>
      <View style={{ borderWidth: 0.7, borderRadius: 5, flexDirection: "row", backgroundColor: "#d7f2d5", borderColor: '#0b7d02', elevation: 8, }}>
        <Text style={styles4.MainCustomerTxt}>Rs.</Text>
        <TextInput style={styles4.MainCustomerInputTxt} keyboardType={'number-pad'} placeholder={"xxxxxx"} placeholderTextColor="#0b7d02"
          value={ProfileCashIn} onChangeText={(text) => setProfileCashIn(text)} />
      </View>
      <TouchableOpacity style={styles4.Btn} onPress={() => SaveBtn(route.params.ProfileID)}>
        <Text style={styles4.Btntxt}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles4 = StyleSheet.create({

  MainView: {
    flex: 1,
    width: "84%",
    marginTop: 15,
    marginHorizontal: "8%",
  },
  MainCustomerTxt: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 0,
    paddingTop: 19,
    color: '#0b7d02',
    paddingLeft: 10,
  },
  MainCustomerInputTxt: {
    fontSize: 28,
    fontWeight: "bold",
    height: 60,
    width: "75%",
    marginTop: 0,
    marginLeft: 5,
    paddingLeft: 5,
    color: '#0b7d02',
  },

  Btn: {
    backgroundColor: '#0b7d02',
    alignItems: 'center',
    justifyContent: 'center',
    width: "40%",
    height: 35,
    borderRadius: 4,
    marginTop: "120%",
    marginHorizontal: "30%",
    zIndex: 2,
    borderColor: '#0b7d02',
    elevation: 8,

  },
  Btntxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
});
























export function CashOUT(props) {
  const { ProfileCashOut, setProfileCashOut } = useBetween(useShareableState);
  const moment = require('moment-timezone');

  const fetchCashout = (id) => {
    fetch("http://10.0.2.2:3000/userCredit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: ProfileCashOut,
        profiletype: "cashout",
        customerId: id,
        date: moment().tz('Asia/Karachi').format('MMMM Do YYYY, h:mm:ss a')
      })
    })
      .then(res => res.json())
    setProfileCashOut(''),
      props.navigation.goBack('')
  }

  const SaveBtn = (id) => {
    if (ProfileCashOut == '') {
      return false
    }
    else {
      fetchCashout(id)
    }
  }


  const route = useRoute()
  return (
    <View style={styles5.MainView}>
      <View style={{ borderWidth: 0.7, borderRadius: 5, flexDirection: "row", borderColor: '#d40609', backgroundColor: "#f7c1c1", elevation: 8 }}>
        <Text style={styles5.MainCustomerTxt}>Rs.</Text>
        <TextInput style={styles5.MainCustomerInputTxt} keyboardType={'number-pad'} placeholder={"×××××××"} placeholderTextColor="#d40609"
          value={ProfileCashOut} onChangeText={(text) => setProfileCashOut(text)} />
      </View>
      <TouchableOpacity style={styles5.Btn} onPress={() => SaveBtn(route.params.ProfileID)}>
        <Text style={styles5.Btntxt}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles5 = StyleSheet.create({

  MainView: {
    flex: 1,
    width: "84%",
    marginTop: 15,
    marginHorizontal: "8%",

  },
  MainCustomerTxt: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 0,
    paddingTop: 19,
    color: '#d40609',
    paddingLeft: 10,
  },
  MainCustomerInputTxt: {
    fontSize: 28,
    fontWeight: "bold",
    height: 60,
    width: "75%",
    marginTop: 0,
    marginLeft: 5,
    paddingLeft: 5,
    color: '#d40609',
    // backgroundColor: "red" 
  },



  Btn: {
    backgroundColor: '#d40609',
    alignItems: 'center',
    justifyContent: 'center',
    width: "40%",
    height: 35,
    borderRadius: 7,
    // top: "12%",
    marginTop: "120%",
    marginHorizontal: "30%",
    zIndex: 2,


  },
  Btntxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
});




export default Profile;