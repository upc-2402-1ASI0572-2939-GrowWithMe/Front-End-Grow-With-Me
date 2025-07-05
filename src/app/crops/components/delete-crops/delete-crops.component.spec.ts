import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCropsComponent } from './delete-crops.component';

describe('DeleteCropsComponent', () => {
  let component: DeleteCropsComponent;
  let fixture: ComponentFixture<DeleteCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCropsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
