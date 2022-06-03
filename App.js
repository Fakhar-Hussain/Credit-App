import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Khata from './Screens/Khata';
import AddCustomers from './Screens/Customers';
import Profile from './Screens/Profile';
import { CashIN } from './Screens/Profile';
import { CashOUT } from './Screens/Profile';
import axios from 'axios';
import { navigationRef } from './Components/RootNavigation';




const Stack = createNativeStackNavigator()

function App() {

  const DeleteItems = (id) => {
    return Alert.alert(
      "Are you sure?",
      "You want to delete this Credit-List?",
      [
        {
          text: "Yes",
          onPress: () => {
            axios.delete(`http://10.0.2.2:3000/user/${id}`)
            axios.delete(`http://10.0.2.2:3000/userCredit/${id}`)
            navigationRef.navigate("Khata");
            console.log("Yeah Kaam Hogaya");
          },
        },
        {
          text: "No",
        },
      ]
    );
  }




  return (
    <NavigationContainer ref={navigationRef} >
      <Stack.Navigator initialRouteName='Khata'
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            height: 60,
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      >
        <Stack.Screen name="Khata" component={Khata} />
        <Stack.Screen name="Customers" component={AddCustomers} />
        <Stack.Screen name="Profile" component={Profile}
          options={({ route }) => (
            {
              title: route.params.userName,
              headerRight: (props) => (
                <TouchableOpacity onPress={() => DeleteItems(route.params.UserId)}>
                  <Icon name="trash" size={21} color="#fff" />
                </TouchableOpacity>
              ),
            }
          )} />
        <Stack.Screen name="CASH-IN" component={CashIN} />
        <Stack.Screen name="CASH-OUT" component={CashOUT} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
