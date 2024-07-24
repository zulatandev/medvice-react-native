import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const TodoItem = ({ todo, onDelete, onEdit, onCompleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, newText);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewText(todo.title);
  };

  const onToggleCompletion = () => {
    onCompleted(todo.id, !todo.completed);
  };

  return (
    <View style={styles.todoItem}>
      <CheckBox
        checked={todo.completed}
        onPress={() => onToggleCompletion(todo.id)}
      />
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={newText}
          onChangeText={setNewText}
        />
      ) : (
        <Text style={[styles.text, todo.completed && styles.completedText]}>
          {todo.title}
        </Text>
      )}
      <Button title={isEditing ? "Save" : "Edit"} onPress={handleEdit} />
      <Button title={isEditing ? "Cancel" : "Delete"} onPress={() => isEditing ? handleCancel() : onDelete(todo.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 2,
    padding: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    padding: 5,
  },
});

export default TodoItem;
