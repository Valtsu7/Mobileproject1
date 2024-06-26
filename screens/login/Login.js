import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, Button, Image } from 'react-native';
import { logout, signIn, resetPassword } from '../../components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../login/loginstyles';



export default function Login({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPw, setShowForgotPw] = useState(false);
  const [emailForgotPw, setEmailForgotPw] = useState('');
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handlePressLogin = () => {
    if (!email) {
      Alert.alert('Email is required.');
    }
    else if (!password) {
      Alert.alert('Password is required.');
    }
    else {
      signIn(email, password);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setEmail('');
          setPassword('');
          navigation.navigate('Login');
        }
      });
    }
  };

  const handlePressLogout = () => {
    logout();
  }

  const handlePressResetPw = () => {
    if (!emailForgotPw) {
      Alert.alert('Email is required.');
    }
    else {
      resetPassword(emailForgotPw);
      setShowForgotPw(false);
    }
  }

  const handlePressForgotPw = () => {
    setShowForgotPw(!showForgotPw);
  }

  if (isLoggedIn) {
    return(
      
      
      
      <View style={styles.container}>
        
        <Text style={styles.header}>
          Welcome to FlavorFriends!
        </Text>
        <Text style={styles.header}>
          
        </Text>
        
        <View style={styles.headerItem}>
          
          <Text style={styles.header}>Log out    </Text>
          
          <Pressable style={styles.logoutIcon} onPress={handlePressLogout}>
            <MaterialIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>
        
        <Text style={styles.infoText}>
          Go to your account...
        </Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Profile"
            onPress={() => navigation.navigate('Profile')} />
        </Pressable>
      </View>
    )
  }
  else { 
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Welcome to FlavorFriends!
        </Text>
        <Text style={styles.header}>
          
        </Text>

        <View style={styles.headerItem}>
          
          <Text style={styles.header}>Login</Text>
        </View>
        <Text style={styles.infoText}>Login to your account</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <Pressable style={styles.buttonStyle}>
          <Button 
            title="Login"
            onPress={handlePressLogin} />
        </Pressable>
        <Text style={styles.infoText}>Not having account yet?</Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')} />
        </Pressable>
        <Pressable style={styles.buttonStyle}>
          <Text 
            style={styles.link}
            onPress={handlePressForgotPw}>Forgot password?</Text>
        </Pressable>
        { showForgotPw &&
          <>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email*"
              value={emailForgotPw}
              onChangeText={(emailForgotPw) => setEmailForgotPw(emailForgotPw)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Pressable style={styles.buttonStyle}>
              <Button
                title="Reset password"
                onPress={() => handlePressResetPw()} />
            </Pressable>
            <Text style={styles.infoText}>
              Be sure to check your spam folder after resetting!
            </Text>
          </>
        }
      </View>
    );
  }
}

