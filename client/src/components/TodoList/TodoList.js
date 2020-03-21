import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar/Sidebar";
import axios from 'axios';
import ListView from "./ListView/ListView";

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
    <>
      <Sidebar
        todoLists={data}
        listClickHandler={listClickHandler}
      />
      <ListView
        list={selectedList}
      />
    </>
  )
};

export default TodoList;
