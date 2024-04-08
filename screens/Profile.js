import { View, Text, Image, Pressable, Button } from "react-native"
import styles from "../style/style"

export default Profile = (navigation, route) =>{
    return(
    <>
        <View style={{marginLeft: 15, marginTop: 10}}>
            {/* Logo */}
            <Image
                source={require('../assets/flavorlogo2.png')}
                style={styles.logo} 
            />
      </View>
    </>
    )
}