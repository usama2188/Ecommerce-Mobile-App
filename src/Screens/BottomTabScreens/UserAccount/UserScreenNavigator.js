import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import UserAccount from './UserAccount';
import { useAuthContext } from '../../../contexts/AuthContext';
import AuthScreenNavigator from '../../AuthScreens/AuthScreenNavigator';


const Stack = createStackNavigator();

export default function UserScreenNavigator() {
    const { isAuthenticated } = useAuthContext()
    return (
        <View style={{ flex: 1 }}>

            <Stack.Navigator initialRouteName='UserAccount'>
                <Stack.Group screenOptions={{
                    headerShown: false
                }}>

                    {isAuthenticated ?
                        <Stack.Screen name='UserAccount' component={UserAccount} />

                        : <Stack.Screen name='Auth' component={AuthScreenNavigator} />
                    }

                </Stack.Group>
            </Stack.Navigator>


        </View>
    )
}