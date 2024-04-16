import { StyleSheet, StatusBar } from 'react-native';
import { Container } from 'react-native-flex-grid';

export default StyleSheet.create({
 
  
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 150, 
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    }, 


  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 15,
    marginRight: 30, 
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    height: 36,
    
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingLeft: 10,
    
  },
  
  input: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10, 
    
  },
  inputItem: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10, 
  },


  view: {

   

  }, 

  text1: {

    fontSize: 32, 
    marginTop: -110, 
    marginLeft: 30, 

  }, 

  text: {

    fontSize: 32, 
    marginTop: 30, 
    marginLeft: 30, 
    

  }, 
  
});
