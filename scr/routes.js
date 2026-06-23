const express = require("express");
const { todos } = require("./data/memory")


const router = express.Router()

router.put('/todos/:id', (req, res) => {
    router.put('/todos/:id', (req, res) => {
        const id = Number(req.params.id);
        const { titulo, feito } = req.body;
        const tarefa = todos.find(todo => todo.id === id);
        // resto do código
    });
    if (!tarefa) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        });
    }
    tarefa.titulo = titulo;
    tarefa.feito = feito;
    return res.status(200).json({
        mensagem: "Tarefa atualizada com sucesso",
        tarefa
    });
});

router.get('/todos', (req, res) => {
    return res.status(200).json({
        tarefa: todos
    })
})

router.post('/todos', (req, res) => {
    const { titulo, descricao } = req.body;

    if (!titulo) {
        return res.status(400).json({ mensagem: "Titulo é obrigatório"})
    }

    const novaTarefa = {
        id: todos.length + 1,
        titulo,
        descricao,
        feito: false
    }
        
    todos.push(novaTarefa)

    res.status(201).json({
        mensagem: "Tarefa criada com sucesso",
        tarefaCriada: novaTarefa
    })
})


module.exports = router;