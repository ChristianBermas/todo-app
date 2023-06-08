import { useState } from 'react';
import styles from './Home.module.css';
import { TodoList } from '../../services/fakeTodoList';

function Home() {
  const [todoListItem, setTodoListItem] = useState(TodoList);
  const [todoList, setTodoList] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [completedTask, setCompletedTask] = useState<number[]>([]);

  const handleAddList = () => {
    if (!todoList) return alert('Please input your task.');
    todoListItem.push({ name: todoList });
    setTodoList('');
    setTodoListItem(todoListItem);
  };

  const handleRemoveTask = () => {
    if (selectedIndex <= -1) return alert('Please select task to remove.');
    const todoListData = [...todoListItem];
    todoListData.splice(selectedIndex, 1);
    setTodoListItem(todoListData);
    setSelectedIndex(-1);
  };

  const handleTagCompleteTask = () => {
    if (selectedIndex <= -1)
      return alert('Please select task to mark as completed.');
    completedTask[selectedIndex] = selectedIndex;
    setCompletedTask(completedTask);
    setSelectedIndex(-1);
  };

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1>To-do App</h1>
        <input
          type='text'
          placeholder='Task...'
          value={todoList}
          onChange={(e) => setTodoList(e.currentTarget.value)}
        />
        <span className={styles.btn} onClick={handleAddList}>
          Add
        </span>
      </div>
      {todoListItem.length === 0 && <p>No item found</p>}
      {todoListItem.length > 0 && (
        <div className={styles.remove}>
          <span className={styles.btn} onClick={handleRemoveTask}>
            Remove
          </span>
          <span className={styles.btn} onClick={handleTagCompleteTask}>
            Tag as completed
          </span>
        </div>
      )}
      <ul>
        {todoListItem.map((list, index) => (
          <li
            className={
              selectedIndex === index
                ? completedTask.some((x) => x === index)
                  ? styles.checked
                  : styles.active
                : completedTask.some((x) => x === index)
                ? styles.checked
                : ''
            }
            key={index}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {list.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
