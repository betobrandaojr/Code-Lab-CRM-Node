
const express = require('express');

const verificarLogin = require('./intermediarios/autenticacaoUsuario');

const multer = require('./intermediarios/multer');
const listarCategorias = require('./controladores/categorias');
const usuario = require('./controladores/usuarios');
const produto = require('./controladores/produtos');
const cliente = require('./controladores/clientes');
const pedidos = require('./controladores/pedidos');

const validarCorpoRequisicao = require('./intermediarios/validarCorpoRequisicao');
const schemaClientes = require('./validacoes/schemaClientes');
const schemaUsuarios = require('./validacoes/schemaUsuarios');
const schemaProdutos = require('./validacoes/schemaProdutos');
const schemaLogin = require('./validacoes/schemaLogin');
const schemaPedidos = require('./validacoes/schemaPedidos');

const rotas = express();

rotas.get('/categorias', listarCategorias);
rotas.post('/usuario',validarCorpoRequisicao(schemaUsuarios),usuario.cadastrarUsuario);
rotas.post('/login',validarCorpoRequisicao(schemaLogin), usuario.login);

rotas.use(verificarLogin);

rotas.get('/usuario', usuario.detalharPerfilUsuario);
rotas.put('/usuario', validarCorpoRequisicao(schemaUsuarios),usuario.editarPerfilUsuario);

//rotas.post('/produto',multer.single('arquivo'),validarCorpoRequisicao(schemaProdutos),produto.cadastrarProduto);
//rotas.put('/produto/:id', validarCorpoRequisicao(schemaProdutos),produto.editarDadosProduto);
//rotas.get('/produto', produto.listarProdutos);
//rotas.get('/produto/:id', produto.detalharProduto);
//rotas.delete('/produto/:id', produto.excluirProduto);
//rotas.post('/produto/imagem',multer.single('arquivo'),produto.imagem);

rotas.post('/cliente',validarCorpoRequisicao(schemaClientes),cliente.cadastrarCliente);
rotas.put('/cliente/:id', validarCorpoRequisicao(schemaClientes),cliente.editarCliente);
rotas.get('/cliente', cliente.listarCliente);
rotas.get('/cliente/:id', cliente.detalharCliente);

//rotas.post('/pedido', validarCorpoRequisicao(schemaPedidos),pedidos.cadastrarPedidos);
//rotas.get('/pedido', pedidos.listarPedidos);

module.exports = rotas

