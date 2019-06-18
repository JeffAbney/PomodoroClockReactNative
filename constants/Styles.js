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
    buttonOutlineColor,
    accentText
} = colors;

export default styles = StyleSheet.create({
    headingText: {
        fontFamily: 'Lato-Bold',
        fontSize: 21,
        color: mainTextColor
    },
    secondaryText: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: mainTextColor
    },
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    scrollView: {
        backgroundColor: backgroundColor,
    },
    mainBackgroundColor: {
        backgroundColor: backgroundColor,
    },
    center: {
        justifyContent: 'center',
    },
    align: {
        alignItems: 'center'
    },
    userInput: {
        height: 20,
        marginBottom: 20,
        paddingBottom: 5,
        fontFamily: 'Lato',
        fontSize: 16,
        color: mainTextColor,
        borderBottomColor: mainTextColor,
        borderBottomWidth: 1,
    },
    userInputContainer: {
        marginTop: 40,
        marginBottom: 0,
        marginLeft: 40,
        marginRight: 40
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
    projectCard: {
        flexDirection: 'row',
        marginTop: 8,
        backgroundColor: submitBackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        color: mainTextColor,
        fontFamily: 'Lato-Bold',
        width: 268,
        height: 52,
    },
    projectCardText: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: backgroundColor,
        paddingLeft: 15
    },
    trashButton: {
        height: 22,
        width: 17,
        marginLeft: 15,
        marginRight: 15,
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
    margin50: {
        margin: 50,
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
        fontSize: 116,
        color: mainTextColor,
        fontFamily: 'Lato-Bold',
        margin: 50
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
    goButtonContainer: {
        width: 200
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
        fontFamily: 'Lato-Bold',
    },
    buttonIcon: {
        height: 48,
        zIndex: 1000,
        width: 100
    },
    addButton: {
        width: 60
    },
    goButton: {
        width: 180
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
        marginTop: 5,
        marginLeft: -12,
        height: 85,
        width: 85,
    },
    backButtonIcon: {
        marginTop: 30,
        marginLeft: 5,
        height: 75,
        width: 75
    },
    pieIcon: {
        height: 28,
        width: 28
    },
    listIcon: {
        width: 37,
        height: 18,
    },
    redirectText: {
        paddingTop: 10,
        color: secondaryTextColor,
        fontFamily: 'Lato',
    },
    logInButton: {
        flexDirection: 'row',
        width: 270,
        marginBottom: 25
    },
    logInButtonText: {
        backgroundColor: mainTextColor,
        height: 48
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
        marginTop: 5,
        backgroundColor: backgroundColor,
    },
    viewPager: {
        height: 100,
        justifyContent: 'center',
        width: 200,
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
        justifyContent: 'flex-start',
        height: 50,
    },
    marginTop: {
        marginTop: 20,
    },
    colorGridContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    colorDot: {
        height: 45,
        width: 45,
        borderRadius: 45,
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
    },
    logInPromptText: {
        color: accentText,
        fontSize: 21,
        justifyContent: 'space-evenly',
        fontFamily: 'Lato-Bold',
        textDecorationLine: 'underline'
    },
    longInPromptTextSecondary: {
        color: accentText,
        fontSize: 15,
        justifyContent: 'space-evenly',
        fontFamily: 'Lato-Bold'
    },
    addIcon: {
        marginRight: 10,
        height: 24,
        width: 24
    },
    taskViewBar: {
        paddingLeft: 50,
        paddingRight: 150,
        borderBottomColor: mainTextColor,
        borderBottomWidth: 1,
        marginBottom: 30
    },
    taskViewIconContainer: {
        padding: 7,
        width: 65,
        justifyContent: 'center',
        alignItems: 'center'
    },
    taskViewActive: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopColor: mainTextColor,
        borderTopWidth: 1,
        borderLeftColor: mainTextColor,
        borderLeftWidth: 1,
        borderRightColor: mainTextColor,
        borderRightWidth: 1
    },
    taskViewInactive: {
        borderBottomColor: mainTextColor,
        borderBottomWidth: 1,
        zIndex: 1000
    },
    taskDisplay: {
        alignItems: 'center'
    },
    aboutSectionText: {
        fontFamily: 'Lato-Bold',
        fontSize: 13,
        color: mainTextColor,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 20
    },
    socialIcon: {
        height: 45,
        width: 45,
        marginLeft: 20,
        marginRight: 20
    },
    shareText: {
        fontSize: 20,
        lineHeight: 25,
        marginBottom: 15,
        marginTop: 20,
        textAlign: 'center'
    },
    checkBox: {
        marginRight: 10,
        height: 16,
        width: 16
    },
    customDrawerNavigator: {
        flex: 1,
        backgroundColor: mainTextColor,
        paddingTop: 30
    },
    navSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    navItemText: {
        fontSize: 36,
        fontFamily: 'Lato-Bold',
        color: backgroundColor,
        lineHeight: 56,
        letterSpacing: -1,
    },
    drawerItemIconContainer: {
        marginLeft: 25,
        marginRight: 25,
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: -10,
        marginTop: -10
    }
})
