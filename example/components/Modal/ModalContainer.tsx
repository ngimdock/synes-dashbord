import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@roketid/windmill-react-ui";
import { useSignal, useActions } from "@dilane3/gx";
import React from "react";
import { ModalStateType, ModalType } from "gx/signals/modal";
import AddCommunique from "./contents/AddCommunique";
import AddMember from "./contents/AddMember";

const ModalContainer = () => {
  const { modalStatus, type } = useSignal<ModalStateType>("modal");
  const { closeModal } = useActions("modal");

  const generateModalContent = () => {
    switch (type) {
      case ModalType.COMMUNIQUE:
        return <AddCommunique />;
      case ModalType.EVENEMENT:
        return null;
      case ModalType.ADD_MEMBER: 
        return <AddMember />;

      default:
        return null;
    }
  };

  return (
    <div>
      <Modal isOpen={modalStatus} onClose={closeModal}>
        <ModalBody>{generateModalContent()}</ModalBody>
      </Modal>
    </div>
  );
};

export default ModalContainer;
