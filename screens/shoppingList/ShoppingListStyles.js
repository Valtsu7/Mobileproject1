import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
 
  shoppingListContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    
    backgroundColor: '#ECF7D9'
  },
  scrollView: {
    marginHorizontal: 0,
    maxHeight: 250,
  },

  button: {
    margin: 30,
    marginTop: 40,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#AFF7AE',
    borderWidth: 1,
    borderRadius: 3,
    fontWeight: 'bold',
    width: 350,
    textAlign: 'center'
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
    width: 80, 
    height: 80, 
    
  },

  logo2: {
    width: 60, // Muuta kuvan leveys sopivaksi
    height: 60, // Muuta kuvan korkeus sopivaksi
    position: 'absolute',
    left: 300
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
    fontSize: 18, 
    padding: 20,
    textAlign: 'center'
  }, 

  text1: {
    fontSize: 15, 
    fontWeight: 'bold',
    marginLeft: 60, 
    marginTop: 30, 
   
  }, 
  title: {
    fontSize: 15,
    textAlign: 'center',
    margin: 20,
    padding: 15,
    width: 450,
    borderRadius: 10,
    backgroundColor: '#AFF7AE',
    fontSize: 22,
  },

  title1: {
    fontSize: 15,
    textAlign: 'center',
    padding: 15,
    minWidth: 410,
    borderRadius: 10,
    backgroundColor: '#AFF7AE',
    fontSize: 22,
  },
  

  input: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    padding: 10
    
    
  },
  inputItem: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10, 
    backgroundColor: '#AFF7AE'
  },
  editList: {
    margin: 20,
    borderWidth: 1,
    maxHeight: 200,
    fontSize: 16,
    width: 350,
    padding: 20,
    paddingTop: 20,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#AFF7AE'
  },
  listName:{
    borderWidth: 1,
    borderRadius: 5,
    width: 400,
    height: 80,
    padding: 25,
    backgroundColor: '#AFF7AE',
    // textAlign: 'center',
    fontSize: 20
  },
  
  buttons: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#AFF7AE',
    margin: 10,
    width: 200,
    
    maxHeight: 40
  },
  itemCount: {
    textAlign: 'right',
    marginBottom: 30,
    fontStyle: 'italic'
  },
  previous: {
    
  },
  
  item: {
    borderWidth: 1,
    padding: 10,
    width: 310,
    minHeight: 20,
    margin: 10,
    fontStyle: 'italic',
    fontSize: 17,
    backgroundColor: '#AFF7AE'
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 30
  },

  enterListName: {
    borderWidth: 2
  }
});
