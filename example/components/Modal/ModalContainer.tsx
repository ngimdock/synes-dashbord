import { Modal, ModalBody } from "@roketid/windmill-react-ui";
import { useSignal, useActions } from "@dilane3/gx";
import React from "react";
import { ModalStateType, ModalType } from "gx/signals/modal";
import AddCommunique from "./contents/AddCommunique";
import AddMember from "./contents/AddMember";
import AddContribution from "./contents/AddContribution";
import AddPlainte from "./contents/AddPlainte";
import AddEvent from "./contents/AddEvent";

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
        return <AddEvent />;
      case ModalType.ADD_MEMBER:
        return <AddMember />;
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
