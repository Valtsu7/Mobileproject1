import { useState, useEffect } from 'react';
import { Text, View, Pressable, Button, TextInput, Alert, Image, SafeAreaView } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, USERS_REF } from '../../firebase/Config';
import { changePassword, logout, removeUser } from '../../components/Auth';
import { collection, doc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import ProfilePicture from "./ProfilePicture"
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../profile/ProfileStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Profile = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmDelete, setConfirmDelete] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const docRef = doc(db, USERS_REF, auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setNickname(userData.nickname);
          setEmail(userData.email);
          
          // Fetch recipes created by the user
          const recipesRef = collection(db, 'recipes');
          const q = query(recipesRef, where("createdBy", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const userRecipes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setRecipes(userRecipes);
        } else {
          console.log("Error: No such document!");
        }
      } else {
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
    });
  };

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
  };

  const toggleRecipesDisplay = () => {
    setShowRecipes(!showRecipes);
  };

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
    );
  } else {
    return (
      <GestureHandlerRootView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Pressable style={{marginTop: 17}}
                onPress={() => navigation.navigate('Home')}>
                  <MaterialIcons name="arrow-left" size={24} color="black" />
              </Pressable>
              {/* Logo */}
              <Image
                source={require('../../assets/flavorlogo2.png')}
                style={styles.logo}
              />
            </View>

            <View style={styles.box}>
              <Text style={styles.profileSubheader}>Update account:</Text>
              <Text style={styles.accountText}>Account: {email}</Text>
              <View>
                <Text style={styles.text}>Nickname: </Text>
                <TextInput 
                  value={nickname}
                  style={styles.textInput2}
                  onChangeText={setNickname}
                />
              </View>
              <View style={styles.buttonStyle}>
                <Button 
                  title="Update"
                  onPress={() => updateUserData()}
                />
              </View>
            </View>

            <View style={styles.box}>
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
            </View>

            <View style={styles.box}>
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
            </View>

            <View>
              <Text>
                <Button
                title='Logout'
                onPress={() => handlePressLogout()}></Button>
              </Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.profileSubheader}>Your Recipes:</Text>
              <Button
                title={showRecipes ? "Hide Recipes" : "Show Recipes"}
                onPress={toggleRecipesDisplay}
              />
              {showRecipes && recipes.map((recipe) => (
                <View key={recipe.id} style={styles.recipeItem}>
                  <Image
                    source={{ uri: recipe.recipeImage }}
                    style={styles.recipeImage}
                  />
                  <Text style={styles.recipeName}>{recipe.recipeName}</Text>
                  <Text style={styles.text2}>{recipe.recipeDetails}</Text>
                  <Text style={styles.text1}>Ingredients</Text>
                  <Text style={styles.text}>{recipe.recipeIngredients}</Text>
                  <Text style={styles.text1}>Instructions</Text>
                  <Text style={styles.text}>{recipe.recipeInstructions}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    );
  };
};

export default Profile;
