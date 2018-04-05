import { StyleSheet } from 'react-native';

export const defaultContainerStyle = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: '#000',
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
