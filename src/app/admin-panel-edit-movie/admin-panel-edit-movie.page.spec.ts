import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminPanelEditMoviePage } from './admin-panel-edit-movie.page';

describe('AdminPanelEditMoviePage', () => {
  let component: AdminPanelEditMoviePage;
  let fixture: ComponentFixture<AdminPanelEditMoviePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelEditMoviePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPanelEditMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
