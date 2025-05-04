import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCropsComponent } from './table-crops.component';

describe('TableCropsComponent', () => {
  let component: TableCropsComponent;
  let fixture: ComponentFixture<TableCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCropsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
