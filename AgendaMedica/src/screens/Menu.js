import React from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { DrawerNavigatorItems } from "react-navigation-drawer"
import Logo from "../../assets/imgs/icon.png"

import commonStyles from "../commonStyles"
import axios from "axios";

function Menu({...props}) {

    // Função responsável por encerrar a sessão atual do usuário e voltar à tela inicial
    const signout = () => {
        delete axios.defaults.headers.common['Authorization']
        props.navigation.navigate('Entry')
    }

    return (
        <View style={styles.container}>
            <View style={styles.userArea}>
                <Image source={Logo} style={styles.logo}/>
                <Text style={styles.textLogo}>AGENDA DIGITAL</Text>
            </View>
            <DrawerNavigatorItems {...props} />
            <TouchableOpacity onPress={signout} style={styles.exit}>
                <Text style={styles.logout}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        width: 60,
        height: 60,
    },
    userArea: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo: {
        width: 60,
        height: 62,
        marginRight: 10,
    },
    textLogo: {
        fontSize: 15,
        fontWeight: 'bold',
        color: commonStyles.colors.primary,
    },
    email: {
        fontSize: 15,
    },
    exit: {
        backgroundColor: commonStyles.colors.secondary,
    },
    logout: {
        margin: 15,
        color: commonStyles.colors.default,
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'normal',
        fontSize: 20
    },
})

export default Menu;