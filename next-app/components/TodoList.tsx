import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import path as needed

interface Todo {
  id: string;
  text: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, text: doc.data().text })));
    });
    return () => unsubscribe();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      await addDoc(collection(db, 'todos'), { text: newTodo });
      setNewTodo('');
    }
  };

  const deleteTodo = (id: string) => deleteDoc(doc(db, 'todos', id));

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}