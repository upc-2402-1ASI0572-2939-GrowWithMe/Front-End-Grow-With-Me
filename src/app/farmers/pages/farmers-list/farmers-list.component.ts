import {Component, OnInit} from '@angular/core';
import {FarmerService} from '../../farmer';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Farmer} from '../../models/farmer';

@Component({
  selector: 'app-farmers-list',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIcon,
    MatButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatIconButton
  ],
  templateUrl: './farmers-list.component.html',
  styleUrl: './farmers-list.component.css'
})
export class FarmersListComponent implements OnInit{
  displayedColumns = ['id', 'name', 'email', 'options'];
  farmersData: Farmer[] = [];

  constructor(private farmersService: FarmerService) {}

  ngOnInit(): void {
    this.loadFarmersData();
  }

  loadFarmersData(): void {

    this.farmersService.getFarmers().subscribe((data) => {
      this.farmersData = data;

    });
  }

  // Método para manejar el clic en un farmer
  showCrops(farmerId: number): void {
    // Redirigir a la pantalla de cultivos por farmer
    console.log(`Ver cultivos del farmer con ID: ${farmerId}`);
  }

}
