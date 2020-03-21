import React from "react";

const Sidebar = ({todoLists}) => {
  const listItems = todoLists.map(list =>
    <li key={list._id}>
      {list.title}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  )
};

export default Sidebar;
