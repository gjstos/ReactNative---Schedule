module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)

    app.route('/appointments')
        .all(app.config.passport.authenticate())
        .get(app.api.appointment.getAppointment)
        .post(app.api.appointment.save)

    app.route('/appointments/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.appointment.remove)

    app.route('/appointments/:id/toggle')
        .all(app.config.passport.authenticate())
        .put(app.api.appointment.toggleTask)
}