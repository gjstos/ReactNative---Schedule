import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    LogBox
} from 'react-native'

import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { server, showError } from '../common';

import commonStyles from '../commonStyles'
import Task from '../components/Task'
import AddTask from './AddTasks'

import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    typeAppoint: "Primeira consulta",
    tasks: []
}

/**
 * Classe responsável por gerir a tela que lista todas as consultas.
 * @namespace TaskList
 */
export default class TaskList extends Component {
    state = {
        ...initialState
    }

    /**
     * Verifica o estado do componente e executa as funções loadTasks e filterTasks.
     * 
     * @async
     * @function componentDidMount
     * @memberof TaskList
     */
    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)

        this.loadTasks()

        this.filterTasks()
    }


    /**
     * Acessa ao servidor para carregar a lista de consultas.
     * Caso haja erro, será exibido uma mensagem para o usuário.
     * 
     * @async
     * @function loadTasks
     * @memberof TaskList
     */
    loadTasks = async () => {
        try {
            const maxDate = moment()
                .add({ days: this.props.daysAhead })
                .format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/appointments?date=${maxDate}`)

            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (e) {
            showError(e)
        }
    }

    /**
     * Verifica o estado do componente e executa as funções loadTasks e filterTasks.
     * 
     * @async
     * @function filterTasks
     * @memberof TaskList
     */
    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTasks: this.state.showDoneTasks
        }))
    }

    /**
     * Executa a atualização do estado da lista de consultas pelo filtro definido.
     *
     * @async
     * @function toggleFilter
     * @memberof TaskList
     */
    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    /**
     * Executa a atualização do estado da lista de consultas pelo filtro definido.
     * Caso haja erro, será exibido uma mensagem para o usuário.
     *
     * @async
     * @function toggleTask
     * @memberof TaskList
     */
    toggleTask = async taskId => {
        try {
            await axios.put(`${server}/appointments/${taskId}/toggle`)
            this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    /**
     * Adiciona um consulta à lista de consultas.
     * Caso haja erro, será exibido uma mensagem para o usuário.
     *
     * @async
     * @function addTask
     * @memberof TaskList
     */
    addTask = async appointment => {
        try {
            await axios.post(`${server}/appointments`, {
                name: appointment.name,
                apptType: appointment.type,
                shift: appointment.shift,
                room: appointment.room,
                situation: appointment.situation,
                estimatedAt: appointment.estimateAt,
                regPatient: appointment.regPatient,
            })

            this.setState({ showAddTask: false }, this.loadTasks)
        } catch (e) {
            showError(e)
        }

        this.setState({ tasks: tasks, showAddTask: false }, this.filterTasks)
    }

    /**
     * Remove um consulta da lista de consultas.
     * Caso haja erro, será exibido uma mensagem para o usuário.
     *
     * @asyncCaso haja erro, será exibido uma mensagem para o usuário.
     * @function deleteTask
     * @memberof TaskList
     */
    deleteTask = async taskId => {
        try {
            await axios.delete(`${server}/appointments/${taskId}`)
            this.loadTasks()
        } catch (e) {
            showError(e)
        }
    }

    /**
     * Remove um consulta da lista de consultas.
     *
     * @async
     * @function deleteTask
     * @memberof TaskList
     * @returns {todayImage}
     */
    getImage = () => {
        switch (5) {
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            default: return monthImage
        }
    }

    /**
     * Retorna uma cor dependendo do dia escolhido pelo usuário.
     *
     * @async
     * @function getColor
     * @memberof TaskList
     * @returns {string}
     */
    getColor = () => {
        switch (this.props.daysAhead) {
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }

    /**
     * Renderiza o componente na tela.
     *
     * @function render
     * @memberof TaskList
     * @returns {View}
     */
    render() {
        LogBox.ignoreLogs(['Warning: ...']);
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    typeApp={this.state.typeAppoint}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask} />
                <ImageBackground source={this.getImage()}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars'
                                size={30} color={commonStyles.colors.default} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={30} color={commonStyles.colors.default} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>
                            {moment().add({ days: this.props.daysAhead }).locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View backgroundColor={this.getColor()} style={styles.situation}></View>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.appointmentId}`}
                        renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />} />
                </View>
                <ActionButton buttonColor={this.getColor()} >
                    <ActionButton.Item buttonColor={commonStyles.colors.return} title="Retorno"
                        onPress={() => { this.setState({ showAddTask: true, typeAppoint: "Retorno" }) }}>
                        <Icon name="calendar-o" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor={commonStyles.colors.first} title="Consulta"
                        onPress={() => {
                            this.setState({ showAddTask: true, typeAppoint: "Primeira consulta" })
                        }}>
                        <Icon name="calendar" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.default,
        fontSize: 50,
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.default,
        fontSize: 20,
        marginBottom: 50,
        textAlign: 'center'
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    situation: {
        flex: 0.2,
        borderTopWidth: 0.4,
        borderBottomWidth: 0.4,
        borderColor: 'white',
    },
});