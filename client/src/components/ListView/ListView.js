import React from "react";
import { Checkbox, List } from "semantic-ui-react";

const ListView = ({list}) => {
  const listItems = [];
  
  if (list.todos) {
    listItems.push(list.todos.map(list =>
        <List.Item
            key={list._id}
        >
          <Checkbox
              key={list._id}
              label={list.title}
          />
        </List.Item>
    ));
  }
  
  return (
      <List>{listItems}</List>
  )
};

export default ListView;
