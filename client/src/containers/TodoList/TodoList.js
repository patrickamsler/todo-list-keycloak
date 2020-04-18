import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ListView from "../../components/ListView/ListView";
import styles from './TodoList.module.scss';
import { Segment } from "semantic-ui-react";
import { useApi } from "../../utils/Api";

const TodoList = () => {
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState();
  const {getLists, createList, createTodo, updateTodo} = useApi();
  
  const refreshList = (selectedId) => {
    getLists()
        .then(response => {
          setLists(response.data);
          if (selectedId) {
            setSelectedListId(selectedId);
          } else {
            setSelectedListId(response.data[0]._id);
          }
        });
  };
  
  useEffect(() => {
    refreshList()
  }, []);
  
  const onListClick = (id) => {
    setSelectedListId(id);
  };
  
  const onCreateList = (title) => {
    createList({title})
        .then(response => {
          const newList = response.data;
          refreshList(newList._id);
        });
  };
  
  const onCreateTodo = (title) => {
    const todo = {
      title,
      done: false,
      description: ""
    };
    createTodo(selectedListId, todo)
        .then(refreshList(selectedListId));
  };
  
  const onUpdateTodo = (todo) => {
    updateTodo(selectedListId, todo);
  };
  
  const getSelectedList = () => {
    const list = lists.find(list => list._id === selectedListId);
    return list ? list : {};
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
              list={getSelectedList()}
              onCreateTodo={onCreateTodo}
              onUpdateTodo={onUpdateTodo}
          />
        </div>
      </Segment>
  )
};

export default TodoList;
