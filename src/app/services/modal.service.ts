import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ModalCommand} from "../models/modal-command";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  commandModal = new BehaviorSubject<ModalCommand>({});

  constructor() {
  }
}
