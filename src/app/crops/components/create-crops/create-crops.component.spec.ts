import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCropsComponent } from './create-crops.component';

describe('CreateCropsComponent', () => {
  let component: CreateCropsComponent;
  let fixture: ComponentFixture<CreateCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCropsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
