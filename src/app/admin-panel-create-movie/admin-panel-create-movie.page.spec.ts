import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminPanelCreateMoviePage } from './admin-panel-create-movie.page';

describe('AdminPanelCreateMoviePage', () => {
  let component: AdminPanelCreateMoviePage;
  let fixture: ComponentFixture<AdminPanelCreateMoviePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelCreateMoviePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPanelCreateMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
