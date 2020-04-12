import React, { useState } from 'react'
import { Button, Input, Modal } from 'semantic-ui-react'

const CreateListModal = ({onCreateList}) => {
  
  const [modalState, setModalState] = useState({open: false});
  const [listTitle, setListTitle] = useState('');
  
  const close = (create) => {
    if (create) {
      onCreateList(listTitle);
    }
    setModalState({open: false});
    setListTitle('');
  };
  
  const open = () => {
    setModalState({open: true});
    setListTitle('');
  };
  
  return (
      <Modal
          trigger={<Button style={{marginTop: "20px"}} secondary onClick={open}>Create Todo List</Button>}
          size="tiny"
          open={modalState.open}
          onClose={close}
      >
        <Modal.Header>Create new Todo List</Modal.Header>
        <Modal.Content>
          <Input
              style={{width: "100%"}}
              value={listTitle}
              onChange={e => setListTitle(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
              secondary
              onClick={() => close(false)}
          >
            Cancel
          </Button>
          <Button
              primary
              onClick={() => close(true)}
              disabled={listTitle.length === 0}
          >
            Create
          </Button>
        </Modal.Actions>
      </Modal>
  )
};

export default CreateListModal;
