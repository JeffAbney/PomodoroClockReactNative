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
        fontFamily: 'Lato',
    },
    settingsWelcomeText: {
        fontSize: 36,
        color: mainTextLight,
        fontFamily: 'Lato',
    },
    settingsText: {
        fontSize: 24,
        padding: 20,
        color: mainTextLight,
        fontFamily: 'Lato',
    },
    settingsPicker: {
        width: 90,
        height: 50,
    },
    welcomeText: {
        paddingLeft: 15,
        paddingRight: 10,
        color: mainTextLight,
        fontFamily: 'Lato',
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
        color: mainTextLight,
        fontFamily: 'Lato',
    },
    paddingTop: {
        paddingTop: 15,
    },
    padding: {
        padding: 25
    },
    margin: {
        margin: 35,
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
        color: mainTextLight,
        fontFamily: 'Lato',
    },
    timeAdjusterLabel: {
        fontSize: 24,
        paddingBottom: 15,
        color: mainTextLight,
        fontFamily: 'Lato',
    },
    touchableArrow: {
        width: 25,
        alignItems: 'center'
    },
    setTimeText: {
        paddingRight: 8,
        paddingLeft: 8,
        fontSize: 32,
        color: mainTextLight,
        fontFamily: 'Lato',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 50,
        width: 300,
        height: 50,
        backgroundColor: 'green'
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: mainTextLight,
        borderRadius: 7,
        height: 48,
    },
    buttonText: {
        color: backgroundLight,
        fontFamily: 'Lato',
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
        fontFamily: 'Lato',
    },
    drawerIcon: {
        marginTop: 30,
        marginLeft: 15,
        height: 18,
        width: 19,
    },
    redirectText: {
        paddingTop: 10,
        color: secondaryTextLight,
        fontFamily: 'Lato',
    },
    logInButton: {
        width: 300,
    },
    logoBig: {
        width: 178,
        height: 60,

    },
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: backgroundLight
    },
    introContentContainer: {
        flex: 2,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: backgroundLight
    },
    viewPager: {
        height: 100,
        justifyContent: 'center',
    },
    viewPageStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paginationContainer: {
        height: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationDot: {
        margin: 7,
        height: 7,
        width: 7,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: mainTextLight,
    },
    paginationDotActive: {
        backgroundColor: mainTextLight
    },

})
