import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
 
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      recipeCard: {
        marginBottom: 20,
        alignItems: 'center',
      },
      image: {
        width: 300,
        height: 200,
        borderRadius: 10,
      },
      recipeName: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
      }
  
});
