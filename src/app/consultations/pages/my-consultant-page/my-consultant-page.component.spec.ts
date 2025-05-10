import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConsultantPageComponent } from './my-consultant-page.component';

describe('MyConsultantPageComponent', () => {
  let component: MyConsultantPageComponent;
  let fixture: ComponentFixture<MyConsultantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyConsultantPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyConsultantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
