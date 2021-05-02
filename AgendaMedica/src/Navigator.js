import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createDrawerNavigator } from "react-navigation-drawer"

import Auth from "./screens/Auth"
import TaskList from "./screens/TaskList"
import Entry from "./screens/Entry"

// import AuthOrApp from './screens/AuthOrApp'
import Menu from "./screens/Menu"
import commonStyles from "./commonStyles"



/**
 * Configurações do Menu
 * @constant menuConfig
 * @memberof Navigator
 * @property {string} initialRouteName - Valor Padrão: Today
 * @property {Menu} contentComponent- Componente Menu
 * @property {object} contentOptions - estilização do componente
 */
const menuConfig = {
    initialRouteName: "Today",
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: "normal",
            fontSize: 20,
        },
        activeLabelStyle: {
            color: commonStyles.colors.secondary,
            fontWeight: "bold",
        },
    },
}
/**
 * Rotas
 * @constant menuRoutes
 * @memberof Navigator
 * @property {object} Today
 * @property {string} Today.name - nome do componente
 * @property {object} Today.screen - 
 * @property {object} Today.navigationOptions - 
 * @property {string} Today.navigationOptions.title - título do componente
 * @property {object} Tomorrow
 * @property {string} Tomorrow.name - nome do componente
 * @property {object} Tomorrow.screen - 
 * @property {object} Tomorrow.navigationOptions - 
 * @property {string} Tomorrow.navigationOptions.title - título do componente
 * @property {object} Week
 * @property {string} Week.name - nome do componente
 * @property {object} Week.screen - 
 * @property {object} Week.navigationOptions - 
 * @property {string} Week.navigationOptions.title - título do componente
 * @property {object} Month
 * @property {string} Month.name - nome do componente
 * @property {object} Month.screen - 
 * @property {object} Month.navigationOptions - 
 * @property {string} Month.navigationOptions.title - título do componente
 */
const menuRoutes = {
    Today: {
        name: "Today",
        screen: (props) => <TaskList title='Hoje' daysAhead={0} {...props} />,
        navigationOptions: {
            title: "Hoje",
        },
    },
    Tomorrow: {
        name: "Tomorrow",
        screen: (props) => <TaskList title='Amanhã' daysAhead={1} {...props} />,
        navigationOptions: {
            title: "Amanhã",
        },
    },
    Week: {
        name: "Week",
        screen: (props) => <TaskList title='Semana' daysAhead={7} {...props} />,
        navigationOptions: {
            title: "Semana",
        },
    },
    Month: {
        name: "Month",
        screen: (props) => <TaskList title='Mês' daysAhead={30} {...props} />,
        navigationOptions: {
            title: "Mês",
        },
    },
}

menuRoutes.displayName = "menuRoutes"

/**
 * @memberof Navigator
 * @constant {createDrawerNavigator} menuNavigator - menu de navegação
 */
const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)

/**
 * @constant mainRoutes
 * @memberof Navigator
 * @property {object} Entry
 * @property {string} Entry.name 
 * @property {Entry} Entry.screen
 * @property {object} Auth
 * @property {string} Auth.name 
 * @property {Auth} Auth.screen
 * @property {object} Home
 * @property {string} Home.name 
 * @property {NavigationNavigator<any, NavigationProp<NavigationState>>} Home.screen
 */
const mainRoutes = {
    Entry: {
        name: "Entry",
        screen: Entry,
    },
    Auth: {
        name: "Auth",
        screen: Auth,
    },
    Home: {
        name: "Home",
        screen: menuNavigator,
    },
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: "Entry",
})

/**
 *  @namespace Navigator
 */
export default createAppContainer(mainNavigator)
