import React, { useState } from 'react'
import { Button, Input, Modal } from 'semantic-ui-react'

const CreateListModal = () => {
  
  const [modalState, setModalState] = useState({open: false});
  
  const close = () => {
    setModalState({open: false});
  };
  
  const open = () => {
    setModalState({open: true});
  };
  
  return (
      <Modal
          trigger={<Button secondary onClick={open}>Create Todo List</Button>}
          size="tiny"
          open={modalState.open}
          onClose={close}
      >
        <Modal.Header>Create new Todo List</Modal.Header>
        <Modal.Content>
          <Input style={{width: "100%"}} />
        </Modal.Content>
        <Modal.Actions>
          <Button
              secondary
              onClick={close}
          >
            Cancel
          </Button>
          <Button
              primary
              onClick={close}
          >
            Create
          </Button>
        </Modal.Actions>
      </Modal>
  )
};

export default CreateListModal;
