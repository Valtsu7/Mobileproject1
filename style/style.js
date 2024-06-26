import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
 
  container: {
    flex: 1,
  },

  shoppingListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#ECF7D9'
  },
  scrollView: {
    marginHorizontal: 0,
    maxHeight: 200,
  },

  button: {
    marginBottom: 20,
  },
 
  header: {
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
  logoContainer: {
    
  },
  logo: {
    width: 60, 
    height: 60, 
  },

  logo2: {
    width: 60, 
    height: 60, 
    position: 'absolute',
    left: 300,
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
  profileContainer: {
    position: 'relative', 
  },
  profileBackground: {
    position: 'absolute', 
    backgroundColor: 'white',
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    top: -2, 
    left: -4, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  foodImage: {
    width: '120%', 
    height: 200, 
    position: 'absolute', 
    top: 10, 
    left: 0,
  },

  text: {
    fontSize: 22, 
    marginLeft: 40,
   
  }, 

  text1: {
    fontSize: 15, 
    fontWeight: 'bold',
    marginLeft: 60, 
    marginTop: 30, 
   
  }, 
  title: {
    fontSize: 20,
    marginBottom: 10,
    
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {

    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    textAlign: 'center',
    marginHorizontal: 70,
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
  }
  
});
