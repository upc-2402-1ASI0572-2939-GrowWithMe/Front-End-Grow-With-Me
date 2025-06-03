import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCropComponent } from './register-crop.component';

describe('RegisterCropComponent', () => {
  let component: RegisterCropComponent;
  let fixture: ComponentFixture<RegisterCropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
