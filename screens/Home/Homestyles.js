import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
 
  container: {  //
    flex: 1,
  },

  
  scrollView: {  //
    marginHorizontal: 0,
    
  },

  button: {
    marginBottom: 20,
  },
 
  header: {  //
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 0, 
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoContainer: { //
    
  },
  logo: {  //
    width: 60, 
    height: 60, 
  },

  logo2: {
    width: 60, // Muuta kuvan leveys sopivaksi
    height: 60, // Muuta kuvan korkeus sopivaksi
    position: 'absolute',
    left: 300
  },

  searchContainer: {  //
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
  searchInput: {  //
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingLeft: 10,
  },
  profileContainer: {  //
    position: 'relative', 
  },
  profileBackground: {  //
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

  foodImage: {  //
    width: '120%', 
    height: 200, 
    
  },

  text: { //
    fontSize: 22, 
    marginLeft: 40,
    
   
  }, 

  text1: { //
    fontSize: 15, 
    fontWeight: 'bold',
    marginLeft: -20, 
    marginTop: 30, 
    marginBottom: 20, 
    textAlign: 'center',
  }, 

  recipeContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 5,
    marginLeft: 20, 
    borderRadius: 10,
    alignItems: 'center',
  },

  image: {
  
     width: 250, 
     height: 350, 
     marginLeft: 0, 
     borderRadius: 20, 
  },
 
  recipeName: {
    position: "absolute" ,
    top: 250, 
    left: 20, 
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30, 
  },
  
});
