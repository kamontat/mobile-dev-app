import { StyleSheet } from 'react-native';
import { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './DefaultStyles';

const welcomeScreenStyle = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'normal',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#004d40"
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#01579b"
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff4d40"
    }
});

const registerScreenStyle = StyleSheet.create({
    img: {
        width: "100%",
        height: IMAGE_HEIGHT,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30,
    }
});

export {
    registerScreenStyle,
    welcomeScreenStyle
};