import React from "react";
import { List } from "semantic-ui-react";
import CreateListModal from "../CreateListModal/CreateListModal";

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
      <List.Item
          key={42}
      >
        <CreateListModal />
      </List.Item>
  );
  
  return (
      <List divided relaxed>{listItems}</List>
  )
};

export default Sidebar;
