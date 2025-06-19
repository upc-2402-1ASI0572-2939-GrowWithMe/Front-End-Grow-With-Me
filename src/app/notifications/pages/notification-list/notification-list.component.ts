import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RoleService } from '../../../iam/services/role.service';
import { NotificationsService } from '../../services/notifications.service';
import { Notification } from '../../models/notification.entity';
import {MatCheckbox} from '@angular/material/checkbox';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatChipListbox, MatChipOption} from '@angular/material/chips';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  imports: [MatListModule, MatCardModule, MatCheckbox, MatIcon, NgIf, NgForOf, FormsModule, NgClass, MatChipListbox, MatChipOption, MatIconButton]
})
export class NotificationListComponent implements OnInit {
  notificationsData: Notification[] = [];
  allSelected: boolean = false;
  selectedNotification: Notification | null = null;  // Propiedad para almacenar la notificación seleccionada

  constructor(
    private notificationsService: NotificationsService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadNotificationsData();
  }

  loadNotificationsData(): void {
    const currentRole = this.roleService.getCurrentRole();

    this.notificationsService.getAll().subscribe((data) => {
      if (currentRole === 'farmer') {
        this.notificationsData = data.filter(notification => notification.farmerId === 1);
      } else {
        this.notificationsData = data;
      }
    });
  }

  toggleAll(): void {
    this.allSelected = !this.allSelected;
    this.notificationsData.forEach(notification => notification.selected = this.allSelected);
  }

  toggleNotification(notification: Notification): void {
    notification.selected = !notification.selected;
  }

  markAsRead(notification: Notification): void {
    notification.status = 'read';  // Cambiar el estado de la notificación
  }

  deleteNotification(notification: Notification): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta notificación?');
    if (confirmDelete) {
      this.notificationsData = this.notificationsData.filter(n => n !== notification);
    }
  }

  deleteSelected(): void {
    const selectedNotifications = this.notificationsData.filter(n => n.selected);
    const confirmDelete = confirm('¿Deseas eliminar las notificaciones seleccionadas?');
    if (confirmDelete) {
      this.notificationsData = this.notificationsData.filter(n => !n.selected);
    }
  }

  // Función para abrir los detalles de la notificación seleccionada
  openNotificationDetail(notification: Notification): void {
    this.selectedNotification = notification;
    // Agregar la clase 'show' al panel lateral
    document.querySelector('.notification-detail-panel')?.classList.add('show');
  }

  // Función para cerrar el panel lateral
  closeNotificationDetail(): void {
    this.selectedNotification = null;
    // Eliminar la clase 'show' para ocultar el panel lateral
    document.querySelector('.notification-detail-panel')?.classList.remove('show');
  }

  // Agrega estas propiedades y métodos a tu componente
  categories = [
    { name: 'Creaciones', value: 'creation' },
    { name: 'Actualizaciones', value: 'update' },
    { name: 'Consultor', value: 'consultant' },
    { name: 'Buecer', value: 'buecer' }
  ];
  selectedCategories: string[] = [];

// Filtro de notificaciones
//   get filteredNotifications() {
//     if (this.selectedCategories.length === 0) {
//       return this.notificationsData;
//     }
//     return this.notificationsData.filter(notification =>
//       this.selectedCategories.includes(notification.type)
//     );
//   }

// Manejo de categorías
  isCategorySelected(category: any): boolean {
    return this.selectedCategories.includes(category.value);
  }

  toggleCategory(category: any): void {
    if (this.isCategorySelected(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category.value);
    } else {
      this.selectedCategories = [...this.selectedCategories, category.value];
    }
  }

// Selección de notificación
  selectNotification(notification: Notification): void {
    this.selectedNotification = notification;
    if (notification.status === 'unread') {
      this.markAsRead(notification);
    }
  }


  // Agrega estos métodos para manejar los tipos
  getTypeIcon(type: string): string {
    switch(type?.toLowerCase()) {
      case 'creation':
      case 'creaciones':
        return 'add_circle';
      case 'update':
      case 'actualizaciones':
        return 'update';
      case 'delete':
        return 'delete';
      case 'consultor':
        return 'question_answer';
      default:
        return 'notifications';
    }
  }

  getTypeLabel(type: string): string {
    switch (type?.toLowerCase()) {
      case 'creation':
      case 'creaciones':
        return 'Creación';
      case 'update':
      case 'actualizaciones':
        return 'Actualización';
      case 'delete':
        return 'Eliminación';
      case 'consultor':
        return 'Consultor';
      default:
        return 'Notificación';
    }
  }
}
