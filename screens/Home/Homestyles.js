import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
 
  container: {  //
    flex: 1,
    backgroundColor: '#ECF7D9',
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
    fontFamily: 'Raleway-Italic', 
    marginTop: 30
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
    backgroundColor: '#fff',
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
    top: 270, 
    left: 14, 
    right: 0, 
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30, 
   
  },
  
 categories: {

  backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    marginLeft: 10, 
    borderRadius: 10,
    alignItems: 'center',
 

 }, 

 categoryImage: {

  width: 100, 
  height: 100, 
  borderRadius: 20, 
 }, 

 text2: {

  fontSize: 15, 
  fontWeight: 'bold',
  marginTop: 10, 


 }, 

 recipes1: {
  width: 200,  // kiinteä leveys kaikille elementeille
  minHeight: 200,  // minimikorkeus, joka voi kasvaa tarpeen mukaan
  flexDirection: 'column',
  padding: 10,
  margin: 5,
  backgroundColor: '#fff',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 3,
  marginLeft: 20, 
  marginBottom: 60, 
},
recipes1image: {
  width: '100%',
  height: 150,  // kiinteä korkeus kuvalle
  borderRadius: 8,
  
},
recipes1text: {
  marginTop: 10,
  fontSize: 16,  // pienempi fonttikoko voi auttaa mahtuvuudessa
  fontWeight: 'bold',
  color: '#333',
  flexWrap: 'wrap',  // sallii tekstin mennä useammalle riville
  textAlign: 'center', 
 
  
},


food: {

  width: 305, 
  height: 300, 
  borderRadius: 8,
  marginLeft: 39, 

}, 


view: {
 
  backgroundColor: '#AFF7AE', 
  marginTop: 60, 
 marginBottom: 60, 

}, 


text77: {

   marginTop: 40, 
   fontSize: 37, 
   marginBottom: 40,
   paddingHorizontal: 10, 
   textAlign: 'center', 
   fontFamily: 'Raleway-Italic', 
  
},

text78: {

    marginTop: 30, 
    marginBottom: 40, 
    textAlign: 'center', 
    fontSize: 26, 
    color: '#666666', 
    fontFamily: 'Raleway-Italic', 

},


text88: { //
  fontSize: 20, 
  fontWeight: 'bold',
  marginLeft: 30, 
  marginTop: 50, 
  marginBottom: 20, 
  
}, 


text8: { //
  fontSize: 20, 
  fontWeight: 'bold',
  marginLeft: 30, 
  
  marginBottom: 20, 
  
}, 

text9: { //
  fontSize: 25, 
  
  color: '#666666',
  marginTop: 10, 
  marginBottom: 20, 
  textAlign: 'center',
  fontFamily: 'Raleway-Italic', 
}, 


recipeContainer1: {
  backgroundColor: '#fff',
  padding: 10,
  margin: 5,
  marginLeft: 20, 
  borderRadius: 10,
  alignItems: 'center',
  marginTop: 30, 
  marginBottom: 100, 
},

image1: {

   width: 250, 
   height: 350, 
   marginLeft: 0, 
   borderRadius: 20, 
},

recipeName1: {
  position: "absolute" ,
  top: 270, 
  left: 14, 
  right: 0, 
  textAlign: 'center',
  fontWeight: 'bold',
  color: 'white',
  fontSize: 30, 
},







});