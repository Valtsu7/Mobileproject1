import { StyleSheet } from 'react-native';

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
        flex: 1, // Käytetään flexboxin ominaisuuksia
        marginBottom: 20,
        marginHorizontal: 5, // Välimatka korttien välillä
        alignItems: 'center',
        width: '50%' // Leveys asetetaan 50% jotta kaksi mahtuu rinnakkain
    },
    image: {
        width: '100%', // Kuvan leveys vastaa kortin leveyttä
        height: 200,
        borderRadius: 10,
    },
    recipeName: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    }
});
