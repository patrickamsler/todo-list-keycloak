import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import ListView from "../../components/ListView/ListView";
import styles from './TodoList.module.scss';
import { Button, Header, Input, Segment } from "semantic-ui-react";
import { useKeycloak } from "@react-keycloak/web";
import { createList, getLists } from "../../utils/AxiosHelper";

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
          <Header as='h2'>{selectedList.title}</Header>
          <Input
              className={styles["todo-input"]}
              placeholder='Todo...'/>
          <Button secondary>Add</Button>
          <ListView
              list={selectedList}
          />
        </div>
      </Segment>
  )
};

export default TodoList;
