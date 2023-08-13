var express = require('express');
var router = express.Router();
const db = require("../db");
const { response } = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.buscarClientes()
    .then(clientes => {
      console.log(clientes);
      res.render("index", {title: "Express", clientes});
    })
    .catch(error => console.log(error));
});

router.get('/new', (req, res) => {
  res.render("cliente",{title: "Cadastro de Clientes", clientes:{}});
})

router.get('/edit/:clienteId', (req, res) => {
  const id = req.params.clienteId;
  db.buscarCliente(id)
    .then(clientes => { res.render("cliente", {title: "Edição de cliente", clientes})})
    .catch(error => console.log(error))
})

router.get('/delete/:clienteId', (req, res) => {
  const id = req.params.clienteId;
  db.excluirCliente(id)
    .then(result => res.redirect("/"))
    .catch(error => console.log(error))
})

router.post('/new', (req, res) =>{
  const id = req.body.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const cidade = req.body.cidade;

  console.log(id)

  const cliente = {nome, idade, cidade};
  const promise = id ? db.atualizarCliente(id, cliente)
                     : db.inserirCliente(cliente);

  promise
    .then(result =>{
      res.redirect("/");
    })
    .catch(error =>{
      return console.log(error);
    })
})

// https://cursos.luiztools.com.br/topico/02-tratar-erros/

module.exports = router;
