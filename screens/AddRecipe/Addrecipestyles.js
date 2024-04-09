import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
 
  container: { //
    flex: 1,
  },

 
  scrollView: {
    marginHorizontal: 0,
    maxHeight: 200,
  },

  button: {
    fontSize: 20, 
    marginLeft: 80,
    marginRight: 80, 
    marginTop: 30,
    marginBottom: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20, 
    alignItems: 'center', 
    backgroundColor: '#FFAA00', 
    
  },

  text: { //
    fontSize: 22, 
    marginTop: 40,
    marginLeft: 65,
   
  }, 

  input1: {

    marginTop: 40, 
    marginBottom: 40,

  },


  input: { //
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 60,
    paddingHorizontal: 10, 
    
  },
 
  
});
