import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ListView from "../../components/ListView/ListView";
import styles from './TodoList.module.scss';
import { Segment } from "semantic-ui-react";
import { useApi } from "../../utils/Api";

const TodoList = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState({});
  const {getLists, createList, createTodo, updateTodo} = useApi();
  
  useEffect(() => {
    getLists()
        .then(response => {
          setLists(response.data);
          if (response.data && response.data.length) {
            setSelectedList(response.data[0]);
          }
        });
  }, []);
  
  const onListClick = (id) => {
    const selectedList = lists.find(list => list._id === id);
    setSelectedList(selectedList);
  };
  
  const onCreateList = (title) => {
    createList({title})
        .then(response => {
          const newList = response.data;
          setLists([...lists, newList]);
          setSelectedList(newList);
        });
  };
  
  const onCreateTodo = (title) => {
    const todo = {
      title,
      done: false,
      description: ""
    };
    createTodo(selectedList._id, todo)
        .then(response => {
          const newTodo = response.data;
          const listCopy = {...selectedList};
          listCopy.todos.push(newTodo);
          setSelectedList(listCopy);
        })
  };
  
  const onUpdateTodo = (todo) => {
    updateTodo(selectedList._id, todo)
        .then(response => {
          const updatedTodo = response.data;
          const todos = selectedList.todos.map(todo => {
            if (todo._id === updatedTodo._id) {
              return updatedTodo;
            } else {
              return todo;
            }
          });
          const listCopy = {...selectedList, todos};
          setSelectedList(listCopy);
        })
  };
  
  return (
      <Segment className={styles.container}>
        <Segment className={styles["side-bar"]}>
          <Sidebar
              todoLists={lists}
              onListClick={onListClick}
              onCreateList={onCreateList}
          />
        </Segment>
        <div className={styles["todo-list"]}>
          <ListView
              list={selectedList}
              onCreateTodo={onCreateTodo}
              onUpdateTodo={onUpdateTodo}
          />
        </div>
      </Segment>
  )
};

export default TodoList;
