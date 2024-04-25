import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
      
    logo: {
        width: 60, 
        height: 60, 
    },
    box:{
        border: 1,
        backgroundColor: '#ECF7D9', 
        padding: 10,
        borderRadius: 10,
    },

    header:{
        marginRight: 234,
        marginTop: 10,
        flexDirection: "row"
    },
    textInput: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    buttonStyle: {
        marginTop: 5,
        marginBottom: 5,

    },
    profileSubheader: {
        padding: 5,
        marginBottom: 10,
        fontWeight: 'bold',
        marginRight: 180,
        fontSize: 15,
    },
    text: { //
        fontSize: 15,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    headerText: {

    }
})