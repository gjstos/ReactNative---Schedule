const moment = require('moment')

module.exports = app => {
    const getAppointment = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()
        
        app.db
            .from('appointment')
            .where('appointment.userId', '=', req.user.userId)
            .where('estimatedAt', '<=', date)
            .innerJoin('patient', 'appointment.patientId', 'patient.patientId')
            .then((a => res.status(200).send(a)))
    }

    // Expects name, apptType, shift, room, situation, user.userId, estimatedAt, regPatient
    const save = (req, res) => {
        if (!req.body.name.trim() || !req.body.apptType.trim() || !req.body.shift.trim() || !req.body.room.trim() || !req.body.situation.trim()) {
            return res.status(400).send('Preencha todos os campos!')
        }

        app.db('patient')
            .insert({
                name: req.body.name,
                regPatient: req.body.regPatient,
                userId: req.user.userId,
            })
            .returning('patientId')
            .then((rows) => {
                patientId = rows[0]
                app.db('appointment')
                    .insert({
                        apptType: req.body.apptType,
                        shift: req.body.shift,
                        room: req.body.room,
                        situation: req.body.situation,
                        estimatedAt: req.body.estimatedAt,
                        userId: req.user.userId,
                        patientId: patientId,
                    })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(400).json(err))
            })

    }

    const remove = (req, res) => {
        app.db('appointment')
            .where({ appointmentId: req.params.id, userId: req.user.userId })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado agendamento com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const updateTaskDoneAt = (req, res, doneAt) => {
        app.db('appointment')
            .where({ appointmentId: req.params.id, userId: req.user.userId })
            .update({ doneAt })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {
        app.db('appointment')
            .where({ appointmentId: req.params.id, userId: req.user.userId })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }

                const doneAt = task.doneAt ? null : new Date()
                updateTaskDoneAt(req, res, doneAt)
            })
            .catch(err => res.status(400).json(err))
    }

    return { getAppointment, save, remove, toggleTask }
}