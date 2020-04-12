import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ListView from "../../components/ListView/ListView";
import styles from './TodoList.module.scss';
import { Segment } from "semantic-ui-react";
import { useKeycloak } from "@react-keycloak/web";
import { createList, createTodo, getLists, updateTodo } from "../../utils/AxiosHelper";

const TodoList = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState({});
  const [keycloak] = useKeycloak();
  
  const token = keycloak.token;
  
  useEffect(() => {
    getLists(token)
        .then(response => {
          setLists(response.data);
          if (response.data && response.data.length) {
            setSelectedList(response.data[0]);
          }
        });
  }, [token]);
  
  const onListClick = (id) => {
    const selectedList = lists.find(list => list._id === id);
    setSelectedList(selectedList);
  };
  
  const onCreateList = (title) => {
    createList(token, {title})
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
    createTodo(token, selectedList._id, todo)
        .then(response => {
          const newTodo = response.data;
          const listCopy = {...selectedList};
          listCopy.todos.push(newTodo);
          setSelectedList(listCopy);
        })
  };
  
  const onUpdateTodo = (todo) => {
    updateTodo(token, selectedList._id, todo)
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
