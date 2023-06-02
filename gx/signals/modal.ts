import { createSignal } from "@dilane3/gx";

export enum ModalType {
  COMMUNIQUE = "communique",
  EVENEMENT = "evenement",
  CONTRIBUTION = "contribution",
  PLAINTE = "plainte",
  DEFAULT = "default",
}

export type ModalStateType = {
  modalStatus: boolean;
  type: ModalType;
  payload: any;
};

const modalSignal = createSignal<ModalStateType>({
  name: "modal",
  state: {
    modalStatus: false,
    type: ModalType.DEFAULT,
    payload: null,
  },

  actions: {
    openModal: (state, payload) => {
      return payload;
    },
    closeModal: (state) => {
      state.modalStatus = false;
      return state;
    },
  },
});

export default modalSignal;
