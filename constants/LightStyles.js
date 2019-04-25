import {
    StyleSheet
} from 'react-native';

import colors from './Colors';
const {
    backgroundLight,
    mainTextLight,
    secondaryTextLight,
    userInputLight,
    submitBackgroundLight,
    buttonOutlineLight
} = colors;

export default lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundLight,
    },
    center: {
        justifyContent: 'center',
    },
    align: {
        alignItems: 'center'
    },
    userInput: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: userInputLight,
    },
    settingsWelcomeText: {
        fontSize: 36,
        color: mainTextLight
    },
    settingsText: {
        fontSize: 24,
        padding: 20,
        color: mainTextLight
    },
    welcomeText: {
        paddingLeft: 15,
        color: mainTextLight
    },
    activityCard: {
        flex: 1,
        marginTop: 1,
        paddingTop: 5,
        backgroundColor: submitBackgroundLight,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: buttonOutlineLight,
        elevation: 2,
        color: mainTextLight
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
        paddingLeft: 15
    },
    rowContainer: {
        flexDirection: 'row',
    },
    clock: {
        fontSize: 60,
        color: mainTextLight
    },
    timeAdjusterLabel: {
        fontSize: 24,
        paddingBottom: 15,
        color: mainTextLight,
    },
    touchableArrow: {
        width: 25,
        alignItems: 'center'
    },
    setTimeText: {
        paddingRight: 8,
        paddingLeft: 8,
        fontSize: 32,
        color: mainTextLight
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
        borderColor: buttonOutlineLight,
        borderRadius: 4,
    },
    buttonText: {
        color: mainTextLight
    },
    signInContainer: {
        justifyContent: 'flex-end',
        paddingRight: 20,
        paddingTop: 30,
        color: mainTextLight
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    signOutText: {
        color: secondaryTextLight,
    },
})
