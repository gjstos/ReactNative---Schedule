const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    // Expects name, password, typeUser, registry
    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash

            app.db('users')
                .insert({
                    name: req.body.name.toLowerCase(),
                    password
                })
                .returning('userId')
                .then((rows) => {
                    userId = rows[0]
                    switch (req.body.typeUser) {
                        case 'atendente':
                            app.db('attendant')
                                .insert({
                                    userId: userId,
                                    attendantRegistry: req.body.registry
                                })
                                .then(_ => res.status(204).send())
                                .catch(err => res.status(400).json(err))
                        case 'medico':
                            app.db('doctor')
                                .insert({
                                    userId: userId,
                                    medicalRegistry: req.body.registry
                                })
                                .then(_ => res.status(204).send())
                                .catch(err => res.status(400).json(err))
                        default:
                            err => res.status(400).json(err)
                    }
                })
                .catch(err => res.status(400).send(err))

        })
    }

    return { save }
}