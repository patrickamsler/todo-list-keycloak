import React, { useState } from "react";
import { Button, Checkbox, Header, Input, List } from "semantic-ui-react";
import styles from './ListView.module.scss';

const ListView = ({list, onCreateTodo, onUpdateTodo}) => {
  const [todoText, setTodoText] = useState("");
  const listItems = [];
  
  const onCheckboxClick = (todo) => {
    onUpdateTodo({...todo, done: !todo.done});
  };
  
  const onAddTodoClick = () => {
    onCreateTodo(todoText);
    setTodoText("");
  };
  
  if (list.todos) {
    listItems.push(list.todos.map(todo =>
        <List.Item
            key={todo._id}
        >
          <Checkbox
              key={todo._id}
              label={todo.title}
              onClick={() => onCheckboxClick(todo)}
              checked={todo.done}
          />
        </List.Item>
    ));
  }
  
  return (
      <>
        <Header as='h2'>{list.title}</Header>
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
