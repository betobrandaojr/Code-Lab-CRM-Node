const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJWT.js');
const pool = require('../conexao.js');

const verificarLogin = async (req, res, next) => { 
    const { authorization} = req.headers;

    if (!authorization) {
      return  res.status(401).json({ mensagem: 'Não autorizado.' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { usuario_id } = jwt.verify(token, senhaJwt);

        const usuario = await pool.query('select * from usuarios where usuario_id = $1', [usuario_id]);

        if (!usuario) {
           return res.status(401).json({ mensagem: 'Não autorizado.' });
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' })
    }
};

module.exports = verificarLogin;