import React from "react";

const ListView = ({list}) => {
  let listItems = [];
  if (list.todos) {
    listItems = list.todos.map(list =>
      <li key={list._id}>
        {list.title}
      </li>
    );
  }
  return (
    <ul>{listItems}</ul>
  )
};

export default ListView;
