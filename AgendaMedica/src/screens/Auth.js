import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';
import axios from 'axios';
import { server, showError, showSuccess } from '../common';

const initialState = {
    name: '',
    registry: '',
    password: '',
    typeUser: '',
    confirmPassword: '',
    error: ''
}

class Auth extends Component {
    state = {
        stageNew: this.props.navigation.state.params.stageNew,
        ...initialState
    };

    /**
     * Utilizado para realizar o logout do usuário atual
     * @async
     */
    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                name: this.state.name,
                password: this.state.password,
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
            this.props.navigation.navigate('Home'); // Próxima tela desejada
        }
        catch (err) {
            showError(err);
        }
    };

    /**
     * Utilizado para realizar o login do usuário
     * @async
     */
    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                typeUser: this.state.typeUser,
                registry: this.state.registry,
                password: this.state.password,
            });

            showSuccess('Usuário cadastrado com sucesso!');
            this.setState({ stageNew: false, ...initialState });
        } catch (err) {
            showError(err)
        }
    };

    /**
     * Verifica o estado da tela para saber se o usuário irá realizar ou o login ou o cadastro.
     * @async
     */
    signinOrSignup = async () => {
        if (this.state.stageNew) {
            this.signup();
        } else {
            this.signin()
        }
    };

    /**
     * Cancela a ação anterior do usuário.
     */
    cancel = () => {
        this.props.navigation.navigate('Entry');
    };

    render() {
        const validations = []
        validations.push(this.state.name)
        validations.push(this.state.password)

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.registry)
        }

        const validForm = validations.reduce((t, a) => t && a)

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.state.stageNew ? 'Registro' : 'Entrar'}
                </Text>

                <AuthInput
                    placeholder="Nome"
                    icon='user'
                    style={styles.input}
                    autoFocus={true}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                />
                {this.state.stageNew && (
                    <AuthInput
                        placeholder="Registro"
                        icon='at'
                        style={styles.input}
                        value={this.state.registry}
                        onChangeText={registry => {
                            this.setState({ registry })
                            if (registry.length > 5) this.setState({ typeUser: 'medico' })
                            else this.setState({ typeUser: 'atendente' })
                        }}
                    />
                )}
                <AuthInput
                    placeholder="Senha"
                    style={styles.input}
                    icon='lock'
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />

                <TouchableOpacity
                    disabled={!validForm}
                    onPress={this.signinOrSignup} // Chamar função login ou registro
                    style={[styles.button, validForm ? {} : { backgroundColor: '#CECECE', borderColor: '#CECECE', }]}>
                    <Text style={styles.textButton}>
                        {this.state.stageNew ? 'Registrar' : 'Entrar'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.cancel}
                    style={styles.buttonCancel}>
                    <Text style={styles.textCancel}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: commonStyles.colors.default,
        fontSize: 20,
        padding: 5,
        fontWeight: 'bold',
    },
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.secondary,
    },

    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#FFF',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonCancel: {
        marginTop: 10,
        padding: 10,
        backgroundColor: commonStyles.colors.secondary,
        borderWidth: 2,
        borderColor: commonStyles.colors.default,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textButton: {
        fontSize: 20,
        color: commonStyles.colors.primary,
        fontWeight: 'bold',
    },
    textCancel: {
        fontSize: 20,
        color: commonStyles.colors.default,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 10,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 10,
    },
});

export default Auth;