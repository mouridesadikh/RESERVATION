import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenumodalPage } from './menumodal.page';

describe('MenumodalPage', () => {
  let component: MenumodalPage;
  let fixture: ComponentFixture<MenumodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenumodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenumodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
