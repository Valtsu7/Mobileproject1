import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ECF7D9',
    },
    headerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginRight: 10,
      
    },
    infoText: {
      fontSize: 16,
      marginBottom: 10,
    },
    textInput: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 5,
      marginBottom: 10,
      paddingLeft: 10,
    },
    buttonStyle: {
      width: '80%',
      marginBottom: 10,
      
    },
    link: {
      color: '#000000',
      textDecorationLine: 'underline',
    },
    logo: {  
      width: 60, 
      height: 60, 
    },
    logoutIcon: {
      position: 'absolute',
      right: 0,
    },
    
  });
  
  export default styles;