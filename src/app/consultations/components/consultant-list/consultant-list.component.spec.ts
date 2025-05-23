import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantListComponent } from './consultant-list.component';

describe('ConsultantListComponent', () => {
  let component: ConsultantListComponent;
  let fixture: ComponentFixture<ConsultantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultantListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
