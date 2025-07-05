import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RoleService } from '../../../iam/services/role.service';
import { NotificationsService } from '../../services/notifications.service';
import { Notification } from '../../models/notification.entity';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  standalone: true,
  imports: [
    MatListModule,
    MatCardModule,
    MatCheckbox,
    MatIcon,
    NgForOf,
    FormsModule,
    MatChipListbox,
    MatChipOption
  ]
})
export class NotificationListComponent implements OnInit, OnDestroy {
  notificationsData: Notification[] = [];
  allSelected: boolean = false;
  selectedNotification: Notification | null = null;
  selectedCategories: string[] = [];
  private roleSubscription!: Subscription;

  categories = [
    { name: 'Creaciones', value: 'creation' },
    { name: 'Actualizaciones', value: 'update' },
    { name: 'Consultor', value: 'consultant' },
    { name: 'Buecer', value: 'buecer' }
  ];

  constructor(
    private notificationsService: NotificationsService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.roleSubscription = this.roleService.getRole$().subscribe(role => {
      this.loadNotificationsData(role);
    });
  }

  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
  }

  loadNotificationsData(role: string): void {
    this.notificationsService.getAll().subscribe((data) => {
      if (role === 'farmer') {
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
    notification.status = 'read';
  }

  deleteNotification(notification: Notification): void {
    const confirmDelete = confirm('Are you sure you want to delete this notification?');
    if (confirmDelete) {
      this.notificationsData = this.notificationsData.filter(n => n !== notification);
    }
  }

  deleteSelected(): void {
    const confirmDelete = confirm('Are you sure you want to delete the selected notifications?');
    if (confirmDelete) {
      this.notificationsData = this.notificationsData.filter(n => !n.selected);
    }
  }

  openNotificationDetail(notification: Notification): void {
    this.selectedNotification = notification;
    document.querySelector('.notification-detail-panel')?.classList.add('show');
  }

  closeNotificationDetail(): void {
    this.selectedNotification = null;
    document.querySelector('.notification-detail-panel')?.classList.remove('show');
  }

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

  selectNotification(notification: Notification): void {
    this.selectedNotification = notification;
    if (notification.status === 'unread') {
      this.markAsRead(notification);
    }
  }

  getTypeIcon(type: string): string {
    switch (type?.toLowerCase()) {
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
