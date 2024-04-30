import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
 
  container: { //
    flex: 1,
    backgroundColor: '#ECF7D9',
  },

 
  scrollView: {
    marginHorizontal: 0,
    maxHeight: 200,
  },

  button: {
    fontSize: 20, 
    marginLeft: 80,
    marginRight: 80, 
    marginTop: -20,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20, 
    alignItems: 'center', 
    backgroundColor: '#AFF7AE', 
    
  },

  button1: {
    fontSize: 20, 
    marginLeft: 80,
    marginRight: 80, 
    marginTop: 0,
    marginBottom: 50,
    alignItems: 'center', 
   
    
  },


  button2: {
    fontSize: 20, 
    marginLeft: 80,
    marginRight: 80, 
    marginTop: 30,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20, 
    alignItems: 'center', 
    backgroundColor: '#AFF7AE', 
    
  },


  button3: {
    fontSize: 20, 
    marginLeft: 80,
    marginRight: 80, 
    marginTop: 10,
    marginBottom: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20, 
    alignItems: 'center', 
   
   
    
  },


  text: { //
    fontSize: 30, 
    marginTop: 40,
    textAlign: 'center', 
    fontWeight: 'bold', 
   
  }, 

  text1: {
    fontSize: 18, 
    marginLeft: 35, 
    marginRight: 60,
    marginBottom: 15,
    marginTop: 15,  
    fontFamily: 'Raleway-Italic',

  }, 

  input1: {

    marginTop: 10, 
    marginBottom: 40,

  },


  input2: {
    
    padding: 20,               // Padding around the contents
    borderRadius: 10,          // Rounded corners
    marginVertical: 10,        // Vertical space between each item
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    borderWidth: 1,            // Optional border
    borderColor: '#ccc'        // Light gray border color
  },
  text7: {
    fontSize: 16,              // Font size for the category label
    color: '#333',             // Dark gray text color
    fontWeight: 'bold',        // Bold font weight for the text
    marginBottom: 10           // Margin below the label
  },
  picker: {
    height: 50,                // Fixed height for picker
    width: '100%',             // Full width
    backgroundColor: 'white',  // White background for the dropdown
    color: '#555',             // Darker text color for the items
    borderRadius: 5            // Rounded corners for picker
  }, 


  input: { //
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 35,
    paddingHorizontal: 10, 
    
  },

  plus: {

    position: "absolute", 
    top: -10, 
    left: -60, 

  },

  container1: {

    marginLeft: 20, 
    


  },

  text2: {

    fontSize: 22, 
    

  },


  tagtext: {

     fontSize: 22, 
     marginLeft: 80, 
     marginRight: 60,
     marginBottom: 0,
     marginTop: 25,  
     fontWeight: 'bold',
  }, 

  tagtext1: {

    fontSize: 16, 
    marginLeft: 25, 
    marginRight: 25,
    marginBottom: 15,
    marginTop: 15, 
     

 }, 

 
  
});
