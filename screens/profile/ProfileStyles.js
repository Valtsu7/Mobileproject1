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
        marginTop: 20,
        marginBottom: 20,
    },

    header:{
        marginRight: 250,
        marginTop: 10,
        flexDirection: "row"
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    textInput2:{
        height: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        marginRight: 200,
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
    text: { 
        fontSize: 17,
        paddingBottom: 7
    },
    scrollContainer: {
        flexGrow: 1,
    },
    accountText: {
        fontSize: 17,
        paddingBottom: 6,
    }, 

    recipeImage: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginLeft: 77, 
        marginTop: 30, 
        marginBottom: 30, 
        
      }, 

      recipeName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 70, 
        marginTop: 20, 
        
      },
      
      text: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 20, 
      },
 
      text1: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 30, 
        
      },

      text2: {
        fontSize: 20,
        marginLeft: 40, 
        marginRight: 40, 
        marginTop: 30, 
      },


      recipeItem: {
        
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderLeftWidth: 2, // Lisää pystyviiva vasemmalle
        borderRightWidth: 2, // Lisää pystyviiva oikealle
        borderLeftColor: 'black', // Vaihda viivan väriä tästä
        borderRightColor: 'black', // Vaihda viivan väriä tästä
        padding: 10,
      },
      

      
})