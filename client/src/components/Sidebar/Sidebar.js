import React from "react";
import { List } from "semantic-ui-react";
import CreateListModal from "../CreateListModal/CreateListModal";
import UserMenu from "../UserMenu/UserMenu";

const Sidebar = ({todoLists, listClickHandler}) => {
  const listItems = [];
  listItems.push(
      <UserMenu
          key={12}
      />
  );
  
  listItems.push(todoLists.map(list =>
      <List.Item
          key={list._id}
          onClick={() => listClickHandler(list._id)}
          icon='list alternate'
          content={list.title}
      />
  ));
  
  listItems.push(
      <List.Item
          key={42}
      >
        <CreateListModal/>
      </List.Item>
  );
  
  return (
      <List divided relaxed>{listItems}</List>
  )
};

export default Sidebar;
