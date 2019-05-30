import {
    StyleSheet
} from 'react-native';

import colors from './Colors';
const {
    backgroundColor,
    mainTextColor,
    secondaryTextColor,
    userInputColor,
    submitBackgroundColor,
    buttonOutlineColor
} = colors;

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    scrollView: {
        backgroundColor: backgroundColor,
    },
    center: {
        justifyContent: 'center',
    },
    align: {
        alignItems: 'center'
    },
    userInput: {
        flex: 1,
        padding: 20,
        marginBottom: 10,
        backgroundColor: userInputColor,
        fontFamily: 'Lato',
        color: mainTextColor,
    },
    userInputContainer: {
        margin: 20
    },
    settingsWelcomeText: {
        fontSize: 36,
        color: mainTextColor,
        fontFamily: 'Lato',
    },
    settingsText: {
        fontSize: 24,
        padding: 20,
        color: mainTextColor,
        fontFamily: 'Lato',
    },
    settingsPicker: {
        width: 90,
        height: 50,
        color: mainTextColor,
    },
    settingsPickerItem: {
        color: mainTextColor,
        backgroundColor: backgroundColor,
    },
    welcomeText: {
        paddingLeft: 15,
        paddingRight: 10,
        color: mainTextColor,
        fontFamily: 'Lato',
    },
    activityCard: {
        flex: 1,
        marginTop: 1,
        paddingTop: 5,
        backgroundColor: submitBackgroundColor,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: buttonOutlineColor,
        elevation: 2,
        color: mainTextColor,
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
    flex: {
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
        color: mainTextColor,
        fontFamily: 'Lato',
        marginBottom: 25
    },
    timeAdjusterLabel: {
        fontSize: 24,
        paddingBottom: 15,
        color: mainTextColor,
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
        color: mainTextColor,
        fontFamily: 'Lato',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 50,
        height: 50,
        padding: 20
    },
    button: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: mainTextColor,
        borderRadius: 7,
        height: 48,
    },
    buttonText: {
        color: backgroundColor,
        fontFamily: 'Lato',
        fontWeight: 'bold'
    },
    addButton: {
        width: 60
    },
    signInContainer: {
        justifyContent: 'flex-end',
        paddingRight: 20,
        paddingTop: 30,
        color: mainTextColor
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    signOutText: {
        color: secondaryTextColor,
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
        color: secondaryTextColor,
        fontFamily: 'Lato',
    },
    logInButton: {
        width: 300,
    },
    clearButton: {
        backgroundColor: backgroundColor,
        borderWidth: 1,
        borderColor: mainTextColor,
    },
    clearButtonText: {
        color: mainTextColor
    },
    logoBig: {
        width: 178,
        height: 60,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: backgroundColor
    },
    introContentContainer: {
        flex: 2,
        marginTop: 25,
        backgroundColor: backgroundColor,
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
        borderColor: mainTextColor,
    },
    paginationDotActive: {
        backgroundColor: mainTextColor
    },
    introButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    marginTop: {
        marginTop: 20,
    },
    colorGridContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorDot: {
        height: 55,
        width: 55,
        borderRadius: 55,
        margin: 20,
    },
    loadingOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
    }
})
