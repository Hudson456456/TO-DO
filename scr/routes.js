const express = require("express");
const connectDB = require("./data/database");
const router = express.Router();

router.put("/todos/:id", async (req, res) => {

    const id = Number(req.params.id);
    const { titulo, feito } = req.body;

    const db = await connectDB();

    const tarefa = await db.get(
        "SELECT * FROM tarefas WHERE id = ?",
        [id]
    );

    if (!tarefa) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        });
    }

    await db.run(
        "UPDATE tarefas SET titulo = ?, feito = ? WHERE id = ?",
        [titulo, feito, id]
    );

    const tarefaAtualizada = await db.get(
        "SELECT * FROM tarefas WHERE id = ?",
        [id]
    );

    return res.status(200).json({
        mensagem: "Tarefa atualizada com sucesso",
        tarefa: tarefaAtualizada
    });

});

router.delete("/todos/:id", async (req, res) => {

    const id = Number(req.params.id);

    const db = await connectDB();

    const tarefa = await db.get(
        "SELECT * FROM tarefas WHERE id = ?",
        [id]
    );

    if (!tarefa) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        });
    }

    await db.run(
        "DELETE FROM tarefas WHERE id = ?",
        [id]
    );

    return res.status(200).json({
        mensagem: "Tarefa removida com sucesso"
    });

});


// LISTAR TODAS AS TAREFAS
router.get("/todos", async (req, res) => {

    const db = await connectDB();

    const todos = await db.all("SELECT * FROM tarefas");

    return res.status(200).json({
        tarefas: todos
    });

});


// CRIAR UMA TAREFA
router.post("/todos", async (req, res) => {

    const { titulo } = req.body;

    if (!titulo) {
        return res.status(400).json({
            mensagem: "Título é obrigatório"
        });
    }

    const db = await connectDB();

    const resultado = await db.run(
        "INSERT INTO tarefas (titulo, feito) VALUES (?, ?)",
        [titulo, false]
    );

    const novaTarefa = await db.get(
        "SELECT * FROM tarefas WHERE id = ?",
        [resultado.lastID]
    );

    return res.status(201).json({
        mensagem: "Tarefa criada com sucesso",
        tarefa: novaTarefa
    });

});


// ATUALIZAR UMA TAREFA
router.put("/todos/:id", async (req, res) => {

    const id = Number(req.params.id);

    const { titulo, feito } = req.body;

    const db = await connectDB();

    const tarefa = await db.get(
        "SELECT * FROM tarefas WHERE id = ?",
        [id]
    );

    if (!tarefa) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        });
    }

    await db.run(
        "UPDATE tarefas SET titulo = ?, feito = ? WHERE id = ?",
        [titulo, feito, id]
    );

    const tarefaAtualizada = await db.get(
        "SELECT * FROM tarefas WHERE id = ?",
        [id]
    );

    return res.status(200).json({
        mensagem: "Tarefa atualizada com sucesso",
        tarefa: tarefaAtualizada
    });

});


// DELETAR UMA TAREFA
router.delete("/todos/:id", async (req, res) => {

    const id = Number(req.params.id);

    const db = await connectDB();

    const tarefa = await db.get(
        "SELECT * FROM tarefas WHERE id = ?",
        [id]
    );

    if (!tarefa) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        });
    }

    await db.run(
        "DELETE FROM tarefas WHERE id = ?",
        [id]
    );

    return res.status(200).json({
        mensagem: "Tarefa removida com sucesso"
    });

});

module.exports = router;