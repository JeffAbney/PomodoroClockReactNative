import {
    StyleSheet
} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        justifyContent: 'center',
    },
    align: {
        alignItems: 'center'
    },
    userinput: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: 'blue'
    },
    settingsWelcomeText: {
        fontSize: 36,
    },
    welcomeText: {
        paddingLeft: 15,
    },
    activityCard: {
        flex: 1,
        marginTop: 1,
        paddingTop: 5,
        backgroundColor: 'grey',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'black',
        elevation: 2
    },
    paddingTop: {
        paddingTop: 15,
    },
    padding: {
        padding: 15
    },
    clockContainer: {
        flex: 1,
        backgroundColor: 'blue',
    },
    SignUpScreenContainer: {
        paddingTop: 35,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15
    },
    rowContainer: {
        flexDirection: 'row',
    },
    clock: {
        fontSize: 60,
    },
    timeAdjusterLabel: {
        fontSize: 24,
        paddingBottom: 15,
    },
    touchableArrow: {
        width: 25,
        alignItems: 'center'
    },
    setTimeText: {
        paddingRight: 8,
        paddingLeft: 8,
        fontSize: 32,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 50,
        width: 300,
        height: 50,
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 4,
    },
    signInContainer: {
        justifyContent: 'flex-end',
        paddingRight: 20,
        paddingTop: 30,
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    signOutText: {
        color: 'grey',
      },
})