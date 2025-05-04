import {Component, OnInit} from '@angular/core';
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {SidebarComponent} from "../../../public/components/sidebar/sidebar.component";
import {MatColumnDef, MatTableModule} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CropsService} from '../../services/crops/crops.service';
import {EditCropsComponent} from '../edit-crops/edit-crops.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-table-crops',
  imports: [
    MatSidenav,
    MatSidenavContainer,
    SidebarComponent,
    MatTableModule,
    MatColumnDef,
    MatButton,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './table-crops.component.html',
  styleUrl: './table-crops.component.css'
})
export class TableCropsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'area', 'options'];
  cropsData: any[] = [];

  constructor(public cropsService: CropsService, public dialog: MatDialog) {}



  ngOnInit() {
    this.loadCropsData();
  }

  loadCropsData() {
    this.cropsService.getCrops().subscribe((data) => {
      this.cropsData = data;
    });
  }

  onRegister() {
    // Lógica para registrar un nuevo cultivo (puedes abrir un modal o redirigir a otra página)
    console.log('Registrar Cultivo');
  }

  openEditDialog(crop: any): void {
    const dialogRef = this.dialog.open(EditCropsComponent, {
      width: '400px',
      data: { crop: { ...crop } },  // Pasa una copia del cultivo actual
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Cultivo editado:', result);
        // Aquí puedes hacer la lógica para actualizar el cultivo en tu array de cultivos.
      }
    });
  }

}
