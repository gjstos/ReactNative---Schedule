import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios'
    ? 'http://localhost:3000' : 'http://10.0.2.2:3000'

/**
 * Dispõe uma mensagem de alerta de erro para o usuário.
 * @param {string} err Erro a ser exibido
 */
function showError(err) {
    if (err.response && err.response.data) {
        Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
    } else {
        Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err.response.data}`)
    }
}

/**
 * Dispõe uma mensagem de sucesso para o usuário.
 * @param {msg} msg Mensagem a ser exibida
 */
function showSuccess(msg) {
    Alert.alert('Sucesso!', msg)
}

export { server, showError, showSuccess }