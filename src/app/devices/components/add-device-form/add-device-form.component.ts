import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { DeviceService } from '../../services/device.service';
import { Crop } from '../../../crops/models/crop.entity';
import { CropsService } from '../../../crops/services/crops/crops.service';

@Component({
  selector: 'app-add-device-form',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './add-device-form.component.html',
  styleUrl: './add-device-form.component.css'
})
export class AddDeviceFormComponent implements OnInit {
  @Input() cropId!: number;
  @Input() farmerId!: number;
  @Output() submitAddDevice = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  @Output() deviceCreated = new EventEmitter<void>();

  name: string = '';
  submitted: boolean = false;
  successModalVisible: boolean = false;
  crops: Crop[] = [];

  constructor(
    private deviceService: DeviceService,
    private cropsService: CropsService
  ) {}

  ngOnInit(): void {
    if (!this.farmerId) {
      const id = localStorage.getItem('userId');
      if (!id) return;
      this.farmerId = Number(id);
    }

    this.cropsService.getAllCropsByFarmerId(this.farmerId).subscribe({
      next: crops => this.crops = crops,
      error: err => console.error('Error loading crops:', err)
    });
  }

  handleSuccessAccept() {
    this.successModalVisible = false;
    this.closeModal.emit();
    this.deviceCreated.emit();
  }

  submitForm(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;

    this.deviceService.createDevice(this.cropId, this.name).subscribe({
      next: () => {
        this.successModalVisible = true;
        form.resetForm();
        this.submitted = false;
      },
      error: err => {
        console.error('Error creating device:', err);
      }
    });
  }
}
