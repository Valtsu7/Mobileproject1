import { View, Text, Image, Pressable, Button } from "react-native"
import styles from "../../style/style"
import ProfilePicture from "./ProfilePicture"

export default Profile = ({navigation}, route) =>{
    return(
    <>
        <View style={{marginLeft: 15, marginTop: 10, flexDirection: "row" }}>

            <Pressable style={{marginTop: 17}}
                onPress={() => navigation.navigate('Home')}>
                <Text>Home</Text>
            </Pressable>
            {/* Logo */}
            {/*<Image
                source={require('../assets/flavorlogo2.png')}
                style={styles.logo}
            />*/}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ProfilePicture />
        </View>
    </>
    )
}