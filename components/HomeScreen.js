import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { TodoContext } from '../contexts/TodoContext.js';

const HomeScreen = () => {
  const { tarefas, adicionarTarefa, alternarConclusao, removerTarefa, setFilter } = useContext(TodoContext);
  const [texto, setTexto] = useState('');

  const handleAdd = () => {
    if (texto.trim()) {
      adicionarTarefa(texto);
      setTexto('');
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua tarefa..."
          onChangeText={setTexto}
          value={texto}
        />
        <TouchableOpacity style={styles.botao} onPress={handleAdd}>
          <Text style={styles.botaoTexto}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleFilterChange('all')}>
          <Text style={styles.filterButton}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('concluídas')}>
          <Text style={styles.completedMessage}>Concluídas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange('pendente')}>
          <Text style={styles.pendingMessage}>Pendentes</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Animated.View
            entering={SlideInRight.duration(500)}
            exiting={SlideOutLeft.duration(500)}
            style={styles.itemContainer}
          >
            <TouchableOpacity onPress={() => alternarConclusao(item.id)}>
              <Text style={[styles.itemTexto, item.concluida && styles.concluida]}>
                {item.texto}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.remover}>x</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
  botao: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 5,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemTexto: { fontSize: 16 },
  concluida: { textDecorationLine: 'line-through', color: '#888' },
  remover: { color: 'red', fontWeight: 'bold', marginLeft: 10 },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    fontSize: 16,
    color: '#007BFF', // Cor do texto
    fontWeight: 'bold', // Fonte do Texto
    paddingVertical: 10, // Espaçamento vertical
    paddingHorizontal: 20, // Espaçamento horizontal
    backgroundColor: '#cce5ff', // Fundo suave azul claro
    borderWidth: 2, // Largura da borda
    borderColor: '#007BFF', // Cor da borda (mesma cor do texto)
    borderRadius: 30, // Bordas arredondadas
    textAlign: 'center', // Alinhamento centralizado
    margin: 10, // Margem para o botão
    width: 'auto', // Largura automática conforme o conteúdo
  },
  completedMessage: {
    color: 'green', // Cor para indicar que a tarefa está concluída
    fontWeight: 'bold', // Fonte do Texto
    paddingVertical: 10, // Espaçamento vertical
    paddingHorizontal: 20, // Espaçamento interno
    backgroundColor: '#e0ffe0', // Fundo suave para a mensagem concluída
    borderWidth: 2, // Largura da borda
    borderColor: 'green', // Cor da borda (mesma cor do texto)
    borderRadius: 30, // Bordas arredondadas
    textAlign: 'center', // Alinhamento centralizado
    margin: 10, // Margem para o botão
    width: 'auto', // Largura automática conforme o conteúdo
  },
  pendingMessage: {
    color: 'red', // Cor para indicar que a tarefa está pendente
    fontWeight: 'bold', // Fonte do Texto
    paddingVertical: 10, // Espaçamento vertical
    paddingHorizontal: 20, // Espaçamento interno
    backgroundColor: '#f8d7da', // Fundo suave para a mensagem pendente
    borderWidth: 2, // Largura da borda
    borderColor: 'red', // Cor da borda (mesma cor do texto)
    borderRadius: 30, // Bordas arredondadas
    textAlign: 'center', // Alinhamento centralizado
    margin: 10, // Margem para o botão
    width: 'auto', // Largura automática conforme o conteúdo
  },
});

export default HomeScreen;
