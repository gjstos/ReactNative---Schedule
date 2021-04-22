import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'

import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'

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
    tasks: [{
        id: '0001',
        name: 'André',
        apptType: 'Primeira Consulta',
        estimatedAt: new Date(),
        doneAt: null,
        regPacient: '222',
        shift: 'Manhã',
        room: '2',
        observations: '',
    }, {
        id: '0002',
        name: 'Carlos',
        apptType: 'Retorno',
        regPacient: '222',
        estimatedAt: new Date(),
        doneAt: null,
        shift: 'Tarde',
        room: '2',
        observations: '',
    },]
}

export default class TaskList extends Component {
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        // const stateString = await AsyncStorage.getItem('tasksState')
        // const savedState = JSON.parse(stateString) || initialState
        // this.setState({
        //     showDoneTasks: savedState.showDoneTasks
        // }, this.filterTasks)

        // this.loadTasks()

        this.filterTasks()
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })
        // AsyncStorage.setItem('tasksState', JSON.stringify({
        //     showDoneTasks: this.state.showDoneTasks
        // }))
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date();
            }
        })

        this.setState({ tasks: tasks }, this.filterTasks)
    }

    addTask = async appointment => {
        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            name: appointment.name,
            regPacient: appointment.regPacient,
            apptType: appointment.type,
            estimatedAt: new Date(),
            doneAt: null,
            shift: appointment.turn,
            room: appointment.room,
            observations: appointment.situation,
        })

        this.setState({ tasks, showAddTask: false }, this.filterTasks)

        // try {
        //     await axios.post(`${server}/tasks`, {
        //        desc: newTask.desc,
        //        estimateAt: newTask.date 
        //     })

        //     this.setState({ showAddTask: false }, this.loadTasks)
        // } catch(e) {
        //     showError(e)
        // }
    }

    deleteTask = async taskId => {
        const tasks = this.state.tasks.filter(task => task.id != taskId)
        this.setState({tasks}, this.filterTasks)

        // try {
        //     await axios.delete(`${server}/tasks/${taskId}`)
        //     this.loadTasks()
        // } catch(e) {
        //     showError(e)
        // }
    }

    getImage = () => {
        // switch(this.props.daysAhead) {
        switch (0) {
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            default: return monthImage
        }
    }

    getColor = () => {
        // switch (this.props.daysAhead) {
        switch (0) {
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
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
                                size={20} color={commonStyles.colors.default} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.colors.default} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title || "Hoje"}</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask}/>} />
                </View>
                <ActionButton buttonColor={this.getColor()}>
                    <ActionButton.Item buttonColor={commonStyles.colors.return} title="Retorno"
                        onPress={() => { this.setState({ showAddTask: true, typeAppoint: "Retorno" }) }}>
                        <Icon name="calendar-o" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor={commonStyles.colors.first} title="Consulta"
                        onPress={() => { this.setState({ showAddTask: true, typeAppoint: "Primeira consulta" }) }}>
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
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.default,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
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
});