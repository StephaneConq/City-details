import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {Modals} from "../../../config/config";
import {ModalAction} from "../../../models/modal-command";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  display: ModalAction | undefined;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.modalService.commandModal.subscribe(command => {
      if (command.modal === Modals.WELCOME) {
        this.display = command.action;
      }
    })
  }

  get displayModal() {
    return this.display === ModalAction.DISPLAY;
  }

  close() {
    this.modalService.commandModal.next({
      modal: Modals.WELCOME,
      action: ModalAction.HIDE
    })
  }

}
