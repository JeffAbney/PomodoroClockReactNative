import {
    StyleSheet
} from 'react-native';

import colors from './Colors';
const {
    backgroundDark,
    mainTextDark,
    secondaryTextDark,
    userInputDark,
    submitBackgroundDark,
    buttonOutlineDark
} = colors;

export default darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundDark,
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
        backgroundColor: userInputDark,
    },
    settingsWelcomeText: {
        fontSize: 36,
        color: mainTextDark
    },
    welcomeText: {
        paddingLeft: 15,
        color: mainTextDark
    },
    signInText: {
        color: mainTextDark
    },
    activityCard: {
        flex: 1,
        marginTop: 1,
        paddingTop: 5,
        backgroundColor: submitBackgroundDark,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: buttonOutlineDark,
        elevation: 2,
        color: mainTextDark
    },
    paddingTop: {
        paddingTop: 15,
    },
    padding: {
        padding: 15
    },
    clockContainer: {
        flex: 1
    },
    SignUpScreenContainer: {
        paddingTop: 35,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        backgroundColor: backgroundDark
    },
    rowContainer: {
        flexDirection: 'row',
    },
    clock: {
        fontSize: 60,
        color: mainTextDark
    },
    timeAdjusterLabel: {
        fontSize: 24,
        paddingBottom: 15,
        color: mainTextDark,
    },
    touchableArrow: {
        width: 25,
        alignItems: 'center'
    },
    setTimeText: {
        paddingRight: 8,
        paddingLeft: 8,
        fontSize: 32,
        color: mainTextDark
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
        borderColor: buttonOutlineDark,
        borderRadius: 4,
    },
    buttonText: {
        color: mainTextDark
    },
    signInContainer: {
        justifyContent: 'flex-end',
        paddingRight: 20,
        paddingTop: 30,
        color: mainTextDark
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    signOutText: {
        color: secondaryTextDark,
    },
    redirectText: {
        paddingTop: 10,
        color: secondaryTextDark,
    },
})