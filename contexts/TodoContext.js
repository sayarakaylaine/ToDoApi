import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [tarefas, setTarefas] = useState([]);
    const [filtro, setFilter] = useState("all");

    // Carregar tarefas do AsyncStorage ao iniciar
    useEffect(() => {
        const loadTasks = async () => {
            const savedTasks = await AsyncStorage.getItem("tarefas");
            if (savedTasks) {
                setTarefas(JSON.parse(savedTasks));
            }
        };
        loadTasks();
    }, []);

    // Salvar tarefas no AsyncStorage ao alterar
    useEffect(() => {
        AsyncStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    const adicionarTarefa = (tarefa) => {
        const novaTarefa = { id: Date.now(), texto: tarefa, concluida: false };
        setTarefas((antigas) => [...antigas, novaTarefa]);
    };

    const alternarConclusao = (id) => {
        setTarefas((antigas) =>
            antigas.map((t) =>
                t.id === id ? { ...t, concluida: !t.concluida } : t
            )
        );
    };

    const removerTarefa = (id) => {
        setTarefas((antigas) => antigas.filter((t) => t.id !== id));
    };

    const filtrarTarefas = () => {
        if (filtro === "concluídas") return tarefas.filter((tarefa) => tarefa.concluida);
        if (filtro === "pendente") return tarefas.filter((tarefa) => !tarefa.concluida);
        return tarefas;
    };

    return (
        <TodoContext.Provider
            value={{ tarefas: filtrarTarefas(), adicionarTarefa, alternarConclusao, removerTarefa, setFilter }}
        >
            {children}
        </TodoContext.Provider>
    );
};