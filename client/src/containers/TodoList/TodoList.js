import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from 'axios';
import ListView from "../../components/ListView/ListView";
import styles from './TodoList.module.scss';
import { Button, Header, Input, Segment } from "semantic-ui-react";

const TodoList = () => {
  const [data, setData] = useState([]);
  const [selectedList, setSelectedList] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
          'http://localhost:3001/api/v1/lists/58060233-0f2c-459b-89d9-ae4ebd9d41c9',
      );
      setData(result.data);
      if (result.data && result.data.length) {
        setSelectedList(result.data[0]);
      }
    };
    fetchData();
  }, []);
  
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
