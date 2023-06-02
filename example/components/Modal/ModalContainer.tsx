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
import AddContribution from "./contents/AddContribution";
import AddPlainte from "./contents/AddPlainte";

const ModalContainer = () => {
  const { modalStatus, type } = useSignal<ModalStateType>("modal");
  const { closeModal } = useActions("modal");

  const generateModalContent = () => {
    switch (type) {
      case ModalType.COMMUNIQUE:
        return <AddCommunique />;
      case ModalType.PLAINTE:
        return <AddPlainte />;
      case ModalType.EVENEMENT:
        return null;
      case ModalType.CONTRIBUTION:
        return <AddContribution />;
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
