import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api/tasks';
const estados = ['pending', 'in_progress', 'completed', 'cancelled'];

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  // Cargar tareas al iniciar
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTasks(data.tasks || []))
      .catch(err => console.error('Error al cargar tareas:', err));
  }, []);

  
  const addTask = () => {
    if (title.trim() === '') return;
    const newTask = { title, description, status };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then(res => res.json())
      .then(created => {
        setTasks([...tasks, created]);
        setTitle('');
        setDescription('');
        setStatus('pending');
      })
      .catch(err => console.error('Error al crear tarea:', err));
  };

  const updateStatus = (id, newStatus) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, status: newStatus }),
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(tasks.map(t => (t.id === id ? updated : t)));
      })
      .catch(err => console.error('Error al actualizar tarea:', err));
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
      })
      .catch(err => console.error('Error al eliminar tarea:', err));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h2>📝 Lista de Tareas</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {estados.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={addTask}>Agregar tarea</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              <strong>Estado:</strong>{' '}
              <select
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value)}
              >
                {estados.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </p>
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
