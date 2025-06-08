import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CropMonitoringComponent } from './crop-monitoring.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ElementRef } from '@angular/core';

describe('CropMonitoringComponent', () => {
  let component: CropMonitoringComponent;
  let fixture: ComponentFixture<CropMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CropMonitoringComponent,
        MatCardModule,
        MatButtonModule,
        MatIconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropMonitoringComponent);
    component = fixture.componentInstance;
    
    // Mock the chart canvas element
    const mockCanvas = document.createElement('canvas');
    const mockContext = mockCanvas.getContext('2d');
    spyOnProperty(component, 'timeChartRef').and.returnValue({
      nativeElement: mockCanvas
    } as ElementRef);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have temperature data', () => {
    expect(component.temperature).toBeDefined();
    expect(component.temperature.current).toBe(24.5);
    expect(component.temperature.min).toBe(19.2);
    expect(component.temperature.max).toBe(28.7);
  });
  
  it('should have humidity data', () => {
    expect(component.humidity).toBeDefined();
    expect(component.humidity.current).toBe(65.3);
    expect(component.humidity.min).toBe(42.8);
    expect(component.humidity.max).toBe(78.9);
  });
  
  it('should generate mock data', () => {
    expect(component.temperature.history.length).toBe(12);
    expect(component.humidity.history.length).toBe(12);
    expect(component.timeLabels.length).toBe(12);
  });
  
  it('should have an export function', () => {
    expect(component.exportData).toBeDefined();
  });
});