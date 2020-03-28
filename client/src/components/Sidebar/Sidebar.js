import React from "react";
import { Button, List, Segment } from "semantic-ui-react";

const Sidebar = ({todoLists, listClickHandler}) => {
  const listItems = todoLists.map(list =>
      <List.Item
          key={list._id}
          onClick={() => listClickHandler(list._id)}
          icon='list alternate'
          content={list.title}
      />
  );
  
  listItems.push(
      <List.Item>
        <Button secondary>Create Todo List</Button>
      </List.Item>
  );
  
  return (
      <List divided relaxed>{listItems}</List>
  )
};

export default Sidebar;
