import { StyleSheet } from 'react-native'

export const defaultContainerStyle = StyleSheet.create({
    default: {
        flex: 1
    },
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: require('randomcolor')(),
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: "100%",
        backgroundColor: "white"
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
