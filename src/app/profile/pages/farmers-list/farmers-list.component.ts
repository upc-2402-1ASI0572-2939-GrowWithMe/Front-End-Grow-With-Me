import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Farmer} from '../../models/farmer.entity';
import {FarmersService} from '../../services/farmers/farmers.service';

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
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatIconButton
  ],
  templateUrl: './farmers-list.component.html',
  styleUrl: './farmers-list.component.css'
})

/**
 * Component to display a list of farmers.
 * Role: for consultant view.
 */
export class FarmersListComponent implements OnInit{
  displayedColumns = ['id', 'name', 'email', 'options'];
  farmersData: Farmer[] = [];

  constructor(private farmersService: FarmersService) {}

  ngOnInit(): void {
    this.loadFarmersData();
  }

  loadFarmersData(): void {

    this.farmersService.getAll().subscribe((data: Farmer[]) => {
      this.farmersData = data;

    });
  }

  // Metodo para manejar el clic en un farmer
  showCrops(farmerId: number): void {
    // Redirigir a la pantalla de cultivos por farmer
    console.log(`Show crops for the farmer ID: ${farmerId}`);
  }

}
