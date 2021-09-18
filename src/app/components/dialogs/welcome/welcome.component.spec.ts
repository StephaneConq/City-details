import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WelcomeComponent} from './welcome.component';
import {ModalAction} from "../../../models/modal-command";
import {ModalService} from "../../../services/modal.service";
import {Modals} from "../../../config/config";

let fakeModalService: ModalService;

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {

    fakeModalService = new ModalService();

    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      providers: [
        {provide: ModalService, useValue: fakeModalService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    component.close();
    expect(fakeModalService.commandModal.getValue().modal).toEqual(Modals.WELCOME);
    expect(fakeModalService.commandModal.getValue().action).toEqual(ModalAction.HIDE);
  });
});
