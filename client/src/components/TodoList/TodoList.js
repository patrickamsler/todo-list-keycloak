import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar/Sidebar";
import axios from 'axios';

const TodoList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3001/api/v1/lists/123',
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Sidebar
        todoLists={data}
      />
    </>
  )
};

export default TodoList;
