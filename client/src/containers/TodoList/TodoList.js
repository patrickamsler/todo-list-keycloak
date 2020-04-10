import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from 'axios';
import ListView from "../../components/ListView/ListView";
import styles from './TodoList.module.scss';
import { Button, Header, Input, Segment } from "semantic-ui-react";
import { useKeycloak } from "@react-keycloak/web";

const TodoList = () => {
  const [data, setData] = useState([]);
  const [selectedList, setSelectedList] = useState({});
  const [keycloak] = useKeycloak();
  
  const userId = keycloak.tokenParsed.sub;
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
          `${process.env.REACT_APP_API_HOST}/api/v1/lists/${userId}`,
      );
      setData(result.data);
      if (result.data && result.data.length) {
        setSelectedList(result.data[0]);
      }
    };
    fetchData();
  }, [userId]);
  
  const listClickHandler = (id) => {
    const selectedList = data.find(list => list._id === id);
    setSelectedList(selectedList);
  };
  
  return (
      <Segment className={styles.container}>
        <Segment className={styles["side-bar"]}>
            <Sidebar
                todoLists={data}
                listClickHandler={listClickHandler}
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
