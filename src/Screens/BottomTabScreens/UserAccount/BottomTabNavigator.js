import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavuriteItems from '../FavuriteItems/FavuriteItems';
import HomeScreenNavigator from '../../Frontend/HomeScreenNavigator';
import SearchTab from '../SearchTab.js/SearchTab';
import AddPost from '../Post/AddPost';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from 'react-native-vector-icons/SimpleLineIcons'
import Heart from 'react-native-vector-icons/SimpleLineIcons'
import Search from 'react-native-vector-icons/Ionicons'
import Plus from 'react-native-vector-icons/AntDesign'
import User from 'react-native-vector-icons/AntDesign'
import { IconButton, MD3Colors } from 'react-native-paper';
import auth from "@react-native-firebase/auth"
import { useAuthContext } from '../../../contexts/AuthContext';
import UserScreenNavigator from './UserScreenNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabScreen({ navigation }) {
    const { isAuthenticated, dispatch } = useAuthContext()


    const handleLogout = () => {
        console.log(isAuthenticated)
        auth().signOut()
            .then(() => {
                dispatch({ type: "LOGOUT" })
            })
            .catch((err) => {
                console.error(err)
                alert("Something went wrong")
            })
    }



    return (
        <Tab.Navigator initialRouteName='Search'
            screenOptions={{
                //bottom tab styling
                tabBarStyle: {
                    // backgroundColor:'black',
                    position: "absolute",
                    bottom: 15,
                    height: 60,
                    borderRadius: 10,
                    width: 320,
                    marginHorizontal: 19,
                    // shasdow
                    shadowColor: "#000",
                    shadowOpacity: 0.5,
                    shadowOffset: {
                        width: 10,
                        height: 10,
                    }

                }
            }}
        >

            {/* BottomTabS */}
            <Tab.Group
                screenOptions={{ tabBarShowLabel: false }}>

                <Tab.Screen name='Home' component={HomeScreenNavigator}

                    options={{
                        headerShown: true,
                        tabBarIcon: (({ color }) => <Home name='home' color={color} size={25} 
                        
                        />)
                    }}
                />



                <Tab.Screen name='Search' component={SearchTab}
                    options={{
                        headerShown:false,
                        tabBarIcon: (({ color }) => <Search name='search-outline' size={30} color={color}
                     />)
                    }}
                />



                <Tab.Screen name='AddPost' component={AddPost}

                    options={{

                        tabBarIcon: (({ color }) => <Plus name='pluscircle' size={38} color={color} />),
                        headerShown: false,
                    }} />


                <Tab.Screen name='Favurite Item' component={FavuriteItems}
                    options={{tabBarBadge:3,
                        tabBarIcon: (({ color }) => <Heart name='heart' color={color} size={26} />),
                        tabBarActiveTintColor: 'red', headerTitleAlign: 'center'
                    }}
                />

                <Tab.Screen name='Account' component={UserScreenNavigator}
                    options={{
                        tabBarIcon: (({ color }) => <User name='user' color={color} size={25} />),
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            <IconButton
                                icon="logout"
                                iconColor={MD3Colors.error50}
                                size={26}
                                onPress={handleLogout}
                            />
                        ),
                        headerLeft: () => (
                            <IconButton
                                icon="account"
                                iconColor='blue'
                                size={26}
                                onPress={() => navigation.navigate("Home")}
                            />
                        )

                    }}

                />




            </Tab.Group>
        </Tab.Navigator>

    )
}