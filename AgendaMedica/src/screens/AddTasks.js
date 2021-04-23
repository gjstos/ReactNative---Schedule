import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'

import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

export default class AddTask extends Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        return {
            type: this.props.typeApp,
            name: '',
            regPatient: '',
            shift: 'Manhã',
            room: '',
            situation: 'marcado',
            estimateAt: new Date(),
        }
    }

    getDatePicker = () => {
        let datePicker = (
            <DateTimePicker
                mode="date"
                value={this.state.estimateAt}
                onChange={(_, date) => {
                    date = date ? date : new Date()
                    this.setState({ estimateAt: date, showDatePicker: false })
                }}
            />
        )

        const dateString = moment(this.state.estimateAt).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.textTurn}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    // Função responsável por passar as consultas para o componente Agenda através de onSave()
    save = () => {
        if (!this.state.name.trim()) {
            Alert.alert('Dados inválidos', 'Informe os dados do agendamento')
            return
        }

        const data = { ...this.state }
        this.props.onSave && this.props.onSave(data)
        this.setState({...this.getInitialState() })
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide'
                transparent={true}
                onShow={() => this.setState({ ...this.getInitialState() })}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.cancel} onPress={this.props.onCancel}>
                        <Icon name="close" style={styles.buttonCancel} />
                    </TouchableOpacity>
                    <View style={styles.blank}></View>
                    <TouchableOpacity 
                        style={[(this.state.type === "Primeira consulta" ? styles.buttonF : styles.buttonS)]} 
                        onPress={this.save}
                    >
                        <Text style={styles.textButton}>Salvar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <TextInput placeholder="Nome" style={styles.input}
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name} />
                    <View style={styles.side}>
                        <Icon name="calendar" style={styles.icons} color={(this.state.type === "Primeira consulta" ? commonStyles.colors.first : commonStyles.colors.return)} />
                        {this.getDatePicker()}
                    </View>

                    <View style={styles.side}>
                        <Icon name="adjust" style={styles.icons} color={(this.state.type === "Primeira consulta" ? commonStyles.colors.first : commonStyles.colors.return)} />
                        <Text style={styles.textTurn}>Turno da </Text>
                        {/* <Picker
                            selectedValue={this.state.turn}
                            style={styles.pickTurn}
                            onValueChange={(itemValue, itemIndex) => this.setState({turn: itemValue})}>
                            <Picker.Item label="Manhã" value="Manhã" />
                            <Picker.Item label="Tarde" value="Tarde" />
                            <Picker.Item label="Noite" value="Noite" />
                        </Picker> */}
                    </View>

                    <View style={styles.side}>
                        <Icon name="user" style={styles.icons} color={(this.state.type === "Primeira consulta" ? commonStyles.colors.first : commonStyles.colors.return)} />
                        <TextInput keyboardType="numeric" placeholder="Registro Paciente" style={styles.inputNum}
                            onChangeText={regPatient => this.setState({ regPatient })}
                            value={this.regPatient} />
                    </View>

                    <View style={styles.side}>
                        <Icon name="share-square" style={styles.icons} color={(this.state.type === "Primeira consulta" ? commonStyles.colors.first : commonStyles.colors.return)} />
                        <TextInput keyboardType="numeric" placeholder="Sala" style={styles.inputNum}
                            onChangeText={room => this.setState({ room })}
                            value={this.state.room} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

var styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: commonStyles.colors.default,
    },
    container: {
        flex: 3,
        backgroundColor: commonStyles.colors.default,
        paddingLeft: 15,
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    buttonF: {
        backgroundColor: commonStyles.colors.first,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: '20%',
    },
    buttonS: {
        backgroundColor: commonStyles.colors.return,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: '20%',
    },
    textButton: {
        fontSize: 16,
        color: commonStyles.colors.default,
        fontWeight: 'bold',
    },
    blank: {
        width: '70%',
    },
    cancel: {
        padding: 10,
        width: '10%',
    },
    buttonCancel: {
        fontSize: 20,
        color: "#CECECE",
    },
    pick: {
        marginTop: 10,
        width: '45%',
        height: 40,
    },
    textTurn: {
        fontSize: 16,
    },
    pickTurn: {
        width: '35%',
        height: 20,
    },
    input: {
        width: '90%',
        fontSize: 30,
    },
    inputNum: {
        width: '90%',
        fontSize: 16,
        paddingBottom: 1,
        paddingTop: 1,
        marginTop: -5,
    },
    side: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 10,
        marginTop: 10,
    },
    icons: {
        fontSize: 20,
        paddingRight: 10,
    },
})