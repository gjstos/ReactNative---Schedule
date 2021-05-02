import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import commonStyles from '../commonStyles'

import Logo from '../../assets/imgs/icon.png'

/**
 * @namespace Entry
 */
class Entry extends Component {

    /**
     * Realiza a mudança da tela atual para a tela de login.
     * 
     * @memberof Entry
     */
    login = () => {
        this.props.navigation.navigate('Auth', {
            stageNew: false,
        });
    }

    /**
     * Realiza a mudança da tela atual para a tela de cadastro.
     * 
     * @memberof Entry
     */
    register = () => {
        this.props.navigation.navigate('Auth', {
            stageNew: true,
        });
    }

    /**
     * Renderiza o componente na tela.
     *
     * @function render
     * @memberof Entry
     * @returns {View}
     */
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header1}></View>
                <View style={styles.header2}></View>
                <View style={styles.image}>
                    <Image source={Logo} />
                    <Text style={styles.textImage}>AGENDA</Text>
                    <Text style={styles.textImage}>DIGITAL</Text>
                </View>
                <View style={styles.header3}></View>
                <View style={styles.body}>
                    <TouchableOpacity
                        onPress={this.login} // Chamar função login
                        style={styles.buttonEntry}>
                        <Text style={styles.textEntry}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.register} // Enviar para função que leva a registrar
                        style={styles.buttonRegistry}>
                        <Text style={styles.textRegistry}>Registrar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Agenda Digital ©</Text>
                    <Text style={styles.footerText}>Este software é gratuito e OpenSource, versões modificadas devem se manter gratuitas, estando proibida a comercialização.</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    header1: {
        flex: 0.3,
        backgroundColor: commonStyles.colors.secondary,
    },
    header2: {
        flex: 0.1,
        backgroundColor: commonStyles.colors.primary,
    },
    header3: {
        flex: 0.1,
        backgroundColor: commonStyles.colors.secondary,
    },
    image: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textImage: {
        fontSize: 27,
        fontWeight: 'bold',
        color: commonStyles.colors.primary,
    },
    body: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.primary,
    },
    buttonEntry: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'white',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonRegistry: {
        marginTop: 10,
        padding: 10,
        backgroundColor: commonStyles.colors.primary,
        borderWidth: 2,
        borderColor: '#FFF',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textEntry: {
        fontSize: 20,
        color: commonStyles.colors.primary,
        fontWeight: 'bold',
    },
    textRegistry: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.primary,
    },
    footerText: {
        fontSize: 9.5,
        color: 'white',
        width: '95%',
        textAlign: 'center',
    },
})

export default Entry