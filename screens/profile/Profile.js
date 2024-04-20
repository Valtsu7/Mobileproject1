// import { View, Text, Image, Pressable, Button } from "react-native";
// import styles from '../profile/ProfileStyles'
// import ProfilePicture from "./ProfilePicture"

// export default Profile = ({navigation}, route) =>{
//     return(
//     <>
//         <View style={{marginLeft: 15, marginTop: 10, flexDirection: "row" }}>

//             <Pressable style={{marginTop: 17}}
//                 onPress={() => navigation.navigate('Home')}>
//                 <Text>Home</Text>
//             </Pressable>
//             {/* Logo */}
//             <Image
//                 source={require('../../assets/flavorlogo2.png')}
//                 style={styles.logo}
//             />
//         </View>
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <ProfilePicture />
//         </View>
//     </>
//     )
// }
import { useState, useEffect } from 'react';
import { Text, View, Pressable, Button, TextInput, Alert, Image } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, USERS_REF } from '../../firebase/Config';
import { changePassword, logout, removeUser } from '../../components/Auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import ProfilePicture from "./ProfilePicture"
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../profile/ProfileStyles';

export default function Profile({ navigation }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmDelete, setConfirmDelete] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        (async () => {
          const docRef = doc(db, USERS_REF, auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setNickname(userData.nickname);
            setEmail(userData.email);
          }
          else {
            console.log("Error: No such document!");
          }
        })();
      }
      else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  
  const updateUserData = async () => {
    const colRef = collection(db, USERS_REF);
    await updateDoc(doc(colRef, auth.currentUser.uid), {
      nickname: nickname
    })
    .then(() => {
      Alert.alert("Account updated.")
    })
    .catch((error) => {
      console.log("Update failed: " + error.message);
      Alert.alert("Update failed: " + error.message);
    })
  }

  const handlePressLogout = async () => {
    logout();
    navigation.navigate('Login');
  };

  const handlePressChangePw = () => {
    if (!password) {
      Alert.alert('Password is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirming password is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match!');
    } else {
      setPassword('');
      setConfirmPassword('');
      changePassword(password, navigation);
    }
  };

  const handlePressDelete = () => {
    if (confirmDelete !== "DELETE") {
      Alert.alert('You must type DELETE to confirm.');
    }
    else {
      removeUser();
      setConfirmDelete('');
      logout();
      navigation.navigate('Login');
    }
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.headerItem}>
          <Text style={styles.header}>My Account</Text>
        </View>
        <Text style={styles.infoText}>Login to your account</Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')} />
        </Pressable>
        <Text style={styles.infoText}>Not having account yet?</Text>
        <Pressable style={styles.buttonStyle}>
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')} />
        </Pressable>
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={{marginTop: 17}}
            onPress={() => navigation.navigate('Home')}>
              <Text>Home</Text>
          </Pressable>
            {/* Logo */}
            <Image
              source={require('../../assets/flavorlogo2.png')}
              style={styles.logo}
            />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ProfilePicture />
        </View>

        <Text style={styles.profileSubheader}>Update account:</Text>
        <Text style={styles.text}>Account: {email}</Text>
        <Text style={styles.text}>Nickname: </Text>
        <TextInput 
          value={nickname}
          style={styles.text}
          onChangeText={setNickname}
        />
        <View style={styles.buttonStyle}>
          <Button 
            title="Update"
            onPress={() => updateUserData()}
          />
        </View>
        <Text style={styles.profileSubheader}>Change password:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your new password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm your new password*"
          value={confirmPassword}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
          secureTextEntry={true}
        />
        <View style={styles.buttonStyle}>
          <Button 
            title="Change password"
            onPress={handlePressChangePw} />
        </View>
      
        <Text style={styles.profileSubheader}>Delete account:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type DELETE here to confirm"
          value={confirmDelete}
          onChangeText={(confirmDelete) => setConfirmDelete(confirmDelete)}
          autoCapitalize="characters"
        />
        
        <View style={styles.buttonStyle}>
          <Button
            title="Delete account"
            color="red"
            onPress={() => handlePressDelete()} />
        </View>
        <Text style={styles.infoText}>
          Your data will be removed from the database!
        </Text>
        <View>
          <Text>
            <Button
            title='Logout'
            onPress={() => handlePressLogout()}></Button>
          </Text>
        </View>
      </View>
    );
  }
}