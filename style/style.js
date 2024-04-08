import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
 
  container: {
    flex: 1,
    
  },
  scrollView: {
    backgroundColor: '#fff',
    marginHorizontal: 0,
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


});
