import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BooklistPage } from './booklist.page';

describe('BooklistPage', () => {
  let component: BooklistPage;
  let fixture: ComponentFixture<BooklistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooklistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BooklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
