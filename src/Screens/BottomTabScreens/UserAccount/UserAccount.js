import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../../../contexts/AuthContext';
import firestore from "@react-native-firebase/firestore"
import UserPosts from './UserPosts';
import Ionicons from 'react-native-vector-icons/Ionicons'
import UserProfile from './UserProfile';


export default function UserAccount({ navigation }) {
  const { dispatch } = useAuthContext()
  const [isLoading, setIsLoading] = React.useState(false)
  // const [user, setUser] = React.useState({})
  let user = {}
  React.useEffect(() => {
    getUser()
    console.log(user)
  }, [])


  // getUser()
  const handleLogout = () => {
    setIsLoading(true)
    auth().signOut()
      .then(() => {
        dispatch({ type: "LOGOUT" })
      })
      .catch((err) => {
        console.error(err)


        alert("Something went wrong")
      })
    setIsLoading(true)
  }


  const getUser = async () => {

    if (auth().currentUser) {
      user = await firestore().collection("users").doc(auth().currentUser.uid).get()
    }
  }

  return (
    <>
      {isLoading ?
        <ActivityIndicator size='large' color="#a4161a" style={{ marginTop: 350 }} />


        : <View style={{ padding: 10 }}>
          <View style={styles.container} >

            <UserProfile />

            <View style={{ height: 20 }}>

            </View>
            <TouchableOpacity onPress={() => handleLogout()} style={styles.logout}>

              <Text style={{ textAlign: 'center', color: 'white', paddingVertical: 5 }}>
                Logout</Text>
            </TouchableOpacity>
          </View>


          {/* USER POSTS USER POSTS */}
          <Text style={{
            marginTop: 10, textAlign: 'center', color: 'black', fontSize: 20,
            fontWeight: 'bold', borderBottomWidth: 1, borderColor: '#caceb7', padding: 5, marginBottom: 10
          }} >Posts</Text>
          <View style={{ alignItems: 'center' }}>
            <ScrollView>

              <UserPosts />

            </ScrollView>
          </View>



        </View>



      }</>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    
  },
  logout: {
    backgroundColor: '#a4161a',  width:70,
    position:'absolute',right:2
  }
})