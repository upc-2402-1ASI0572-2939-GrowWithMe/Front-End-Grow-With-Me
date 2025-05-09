import { Component, OnInit } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { SidebarComponent } from '../../../public/components/sidebar/sidebar.component';
import { MatColumnDef, MatTableModule } from '@angular/material/table';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CropsService } from '../../services/crops/crops.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCropsComponent } from '../edit-crops/edit-crops.component';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import {Crop} from '../../models/crop.entity';

@Component({
  selector: 'app-table-crops',
  standalone: true,
  imports: [
    MatTableModule,
    MatColumnDef,
    MatIconButton,
    MatIcon,
    MatButton,
  ],
  templateUrl: './table-crops.component.html',
  styleUrl: './table-crops.component.css'
})
export class TableCropsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'productName', 'category', 'area', 'options'];
  cropsData: Crop[] = [];

  constructor(
    public cropsService: CropsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCropsData();
  }

  loadCropsData(): void {
    this.cropsService.getCrops().subscribe((data) => {
      this.cropsData = data;
    });
  }

  onRegister(): void {
    console.log('Register Crop');
  }

  goToCalendar(id: string): void {
    this.router.navigate([`/crops/${id}/calendar`]);
  }

  openEditDialog(crop: Crop): void {
    const dialogRef = this.dialog.open(EditCropsComponent, {
      width: '400px',
      data: { crop: { ...crop } },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Edited crop:', result);
        // Reload data if needed
      }
    });
  }
}
