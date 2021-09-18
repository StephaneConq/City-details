import {Modals} from "../config/config";

export enum ModalAction {
  DISPLAY,
  HIDE
}

export interface ModalCommand {
  modal?: Modals;
  action?: ModalAction;
}
