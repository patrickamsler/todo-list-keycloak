import React, {useEffect, useState} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from 'axios';
import ListView from "../../components/ListView/ListView";
import styles from './TodoList.module.scss';

const TodoList = () => {
  const [data, setData] = useState([]);
  const [selectedList, setSelectedList] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3001/api/v1/lists/123',
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
    <div className={styles.container}>
      <div className={styles["sidebar-container"]}>
        <div className={styles["sidebar-header"]}>

        </div>
        <Sidebar
          todoLists={data}
          listClickHandler={listClickHandler}
        />
      </div>
      <div className={styles["todo-container"]}>
        <div className={styles["todo-header"]}>
          {selectedList ? selectedList.title : ''}
        </div>
        <ListView
          list={selectedList}
        />
      </div>
    </div>
  )
};

export default TodoList;
