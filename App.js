import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';
import axios from 'axios';
import TodoItem from './components/TodoItem';

const API_URL = 'https://medivice-api-go.vercel.app/api/todo'; // Replace with your actual API URL

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (title.trim().length > 0) {
      try {
        const response = await axios.post(API_URL, { title, completed: false });
        setTodos([...todos, response.data]);
        setTitle('');
      } catch (error) {
        Alert.alert('Error', 'Failed to add todo');
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete todo');
    }
  };

  const editTodo = async (id, newText) => {
    try {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...newText, text: newText } : todo
      ));
    } catch (error) {
      Alert.alert('Error', 'Failed to edit todo');
    }
  };

  const completeTodo = async (id, completed) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      try {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed } : todo
        ));
      } catch (error) {
        Alert.alert('Error', 'Failed to update todo');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Todo List
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          value={title}
          onChangeText={setTitle}
        />
        <Button title="Add" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onCompleted={completeTodo}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    padding: 5,
  },
});

export default App;
