import React, { useEffect, useState } from "react";
import { Button, Checkbox, Header, Input, List } from "semantic-ui-react";
import styles from './ListView.module.scss';

const ListView = ({list, onCreateTodo, onUpdateTodo}) => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    if (list.todos) {
      setTodos(list.todos.slice());
    }
  }, [list.todos]);
  
  const listItems = [];
  const listTitle = list?.title;
  
  const onCheckboxClick = (id) => {
    const copyTodos = todos.slice();
    const idx = copyTodos.findIndex(todo => todo._id === id);
    copyTodos[idx].done = !copyTodos[idx].done;
    setTodos(copyTodos);
    onUpdateTodo(copyTodos[idx]);
  };
  
  const onAddTodoClick = () => {
    onCreateTodo(todoText);
    setTodoText("");
  };
  
  if (todos) {
    listItems.push(todos.map(todo =>
        <List.Item
            key={todo._id}
        >
          <Checkbox
              key={todo._id}
              label={todo.title}
              onClick={() => onCheckboxClick(todo._id)}
              checked={todo.done}
          />
        </List.Item>
    ));
  }
  
  return (
      <>
        <Header as='h2'>{listTitle}</Header>
        <Input
            className={styles["todo-input"]}
            placeholder='Todo...'
            onChange={e => setTodoText(e.target.value)}
            value={todoText}
        />
        <Button
            secondary
            onClick={onAddTodoClick}
            disabled={!todoText}
        >
          Add
        </Button>
        <List>{listItems}</List>
      </>
  )
};

export default ListView;
