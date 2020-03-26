import React from "react";
import { List, Segment } from "semantic-ui-react";

const Sidebar = ({todoLists, listClickHandler}) => {
  const listItems = todoLists.map(list =>
      <List.Item
          key={list._id}
          onClick={() => listClickHandler(list._id)}
          icon='list alternate'
          content={list.title}
      />
  );
  
  return (
      <List>{listItems}</List>
  )
};

export default Sidebar;
