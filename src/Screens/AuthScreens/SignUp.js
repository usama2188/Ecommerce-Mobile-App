// import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native'
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { useAuthContext } from '../../contexts/AuthContext';
import auth from '@react-native-firebase/auth';

const initialState = { email: '', password: '' }
export default function SignUp({ navigation }) {
  const [userCreds, setUserCreds] = React.useState("");
  const { dispatch } = useAuthContext
  const [state, setState] = React.useState(initialState)

  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))

  }

  const handleSignUp = () => {
    let { email, password} = state
    if (!email) return alert("Email is invalid")
    if (!password) return alert("Password is invalid")
    // if (!username) return alert("Username is invalid")

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user

        dispatch({ type: "LOGIN", payload: { user } })
        console.log('User account created  !');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
  }


  return (

    <View style={styles.flexContainer}>
      {/* <ImageBackground source={bg} style={styles.img} > */}

      <View>

        <View><Text style={styles.heading}>SignUp</Text></View>
        <View style={styles.screenStyle}>

          <TextInput
            style={{ marginTop: 10 }}
            mode="outlined"
            label="Email"
            // value={text}
            name="email"
            onChangeText={value => handleChange("email", value)}
            outlineColor='#0466c8'
            activeOutlineColor='#4361ee'
          />
          {/* <TextInput
            style={{ marginTop: 10 }}
            mode="outlined"
            label="Username"
            // value={text}
            name="username"
            onChangeText={value => handleChange("username", value)}
            outlineColor='#0466c8'
            activeOutlineColor='#4361ee'
          /> */}
          <TextInput
            style={{ marginTop: 10 }}
            mode="outlined"
            label="Password"
            // value={text}
            name="password"
            onChangeText={value => handleChange("password", value)}
            outlineColor='#0466c8'
            activeOutlineColor='#4361ee'
            secureTextEntry
            right={<TextInput.Icon name="eye" />}
            fontSize=''
          />

        </View>
        <View style={{ marginTop: 30 }}>
          <Button
            onPress={handleSignUp}
            title='Sign Up'
          />
        </View>

        <View >
          <Text style={{ textAlign: "center", fontSize: 15, marginTop: 50 }}
            onPress={() => navigation.navigate('login')}
          >

            Already have an account?</Text>
        </View>

      </View>
      {/* </ImageBackground> */}
    </View>
  )
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  img: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Roboto'

  },
  screenStyle: {
    width: 300,

  },
  inputStyle: {
    fontSize: "10",

  }
  , text: {
    textAlign: 'center'
  }


})