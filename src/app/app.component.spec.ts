import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {SearchbarComponent} from "./components/searchbar/searchbar.component";
import {WelcomeComponent} from "./components/dialogs/welcome/welcome.component";
import {ModalService} from "./services/modal.service";
import {Modals} from "./config/config";
import {ModalAction} from "./models/modal-command";

let modalService: ModalService;

describe('AppComponent', () => {
  beforeEach(async () => {
    window['google'] = {
      maps: {
        // @ts-ignore
        Maps() {
        },
        // @ts-ignore
        LatLng: function () {},
        ControlPosition: {
          BOTTOM_CENTER: 11,
          BOTTOM_LEFT: 10,
          BOTTOM_RIGHT: 12,
          LEFT_BOTTOM: 6,
          LEFT_CENTER: 4,
          LEFT_TOP: 5,
          RIGHT_BOTTOM: 9,
          RIGHT_CENTER: 8,
          RIGHT_TOP: 7,
          TOP_CENTER: 2,
          TOP_LEFT: 1,
          TOP_RIGHT: 3,
        }
      }
    };
    modalService = new ModalService();
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [
        AppComponent,
        SearchbarComponent,
        WelcomeComponent
      ],
      providers: [{provide: ModalService, useValue: modalService}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /*it(`should have as title 'test-interflora'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('test-interflora');
  });*/

  it(`should init map'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.initMap();
    expect(app.center).toBeDefined();
    expect(app.mapOptions).toBeDefined();
  });

  it(`should display modal`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.displayWelcomeModal();
    setTimeout(() => {
      expect(modalService.commandModal.getValue()).toBeDefined();
      expect(modalService.commandModal.getValue().modal).toEqual(Modals.WELCOME);
      expect(modalService.commandModal.getValue().action).toEqual(ModalAction.DISPLAY);
    }, 1000);
  });

});
