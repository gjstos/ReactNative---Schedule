import React from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"
import Icon from "react-native-vector-icons/FontAwesome"

import moment from "moment"
import "moment/locale/pt-br"

import commonStyles from "../commonStyles"

/** 
 * @namespace Task 
 */
export default (props) => {
    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: "line-through" } : {}

    const typeAppointment = props.apptType === "Primeira consulta" ?
        {
            backgroundColor: commonStyles.colors.first,
            paddingLeft: 2,
        } :
        {
            backgroundColor: commonStyles.colors.return,
            paddingLeft: 2,
        }
    /**
     * @memberof Task
     * @constant {date} date - Data da Consulta
     */
    const date = props.doneAt ? props.doneAt : props.estimatedAt
    /**
     * @memberof Task
     * @constant {date} formattedDate - Formatação da Data
     */
    const formattedDate = moment(date).locale("pt-br")
        .format("ddd, D [de] MMMM")

    /**
     * Exibe botão de cancelar consulta
     * @function getRightContent 
     * @memberof Task 
     * @return {TouchableOpacity} - botão que permite cancelar consulta
     */
    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.appointmentId)}>
                <Icon name="trash" size={30} color='#FFF' />
            </TouchableOpacity>
        )
    }

    /**
     * Exibe ícone de cancelamento de consulta
     * @function getLeftContent
     * @memberof Task
     * @return {View} - Ícone de cancelamento
     */
    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name="trash" size={20} color='#FFF'
                    style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Cancelar</Text>
            </View>
        )
    }

    /**
     * Utilizada para verificar se a consulta foi concluída
     * @function getCheckView 
     * @memberof Task
     * @param {date} doneAt - Data de Conclusão da Consulta
     * @return {View} View com estilo de pendente 
     * @return {View} View com estilo concluído 
     */
    function getCheckView(doneAt) {
        if (doneAt != null) {
            return (
                <View style={styles.done}>
                    <Icon name='check' size={20} color='#FFF'></Icon>
                </View>
            )
        } else {
            return (
                <View style={styles.pending}></View>
            )
        }
    }

    return (
        <Swipeable
            renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.appointmentId)}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.onToggleTask(props.appointmentId)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}>{props.regPatient} | {props.name}</Text>
                    <Text style={[styles.desc, typeAppointment, doneOrNotStyle]}>Sala: {props.room} | {props.apptType}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

/**
 * @memberof Task
 * @constant {StyleSheet} style - estilização do componente
 */
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: "#AAA",
        borderBottomWidth: 1,
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#FFF",
    },
    checkContainer: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#555",
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: "#4D7031",
        alignItems: "center",
        justifyContent: "center",
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    },
    right: {
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 20,
    },
    left: {
        flex: 1,
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
    },
    excludeIcon: {
        marginLeft: 10,
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: "#FFF",
        fontSize: 20,
        margin: 10,
    },
})