import React from "react";

const Sidebar = ({todoLists, listClickHandler}) => {
  const listItems = todoLists.map(list =>
    <li
      key={list._id}
      onClick={() => listClickHandler(list._id)}
    >
      {list.title}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  )
};

export default Sidebar;
