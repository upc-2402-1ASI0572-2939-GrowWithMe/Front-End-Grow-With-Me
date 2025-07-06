import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';

import { RoleService } from '../../../iam/services/role.service';
import { NotificationsService } from '../../services/notifications.service';
import { Notification } from '../../models/notification.entity';
import { NotificationCardComponent } from '../../components/notification-card/notification-card.component';
import {MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/select';
import {MatFormField} from '@angular/material/form-field';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    MatCheckbox,
    MatIcon,
    MatCardModule,
    MatListModule,
    MatChipListbox,
    MatChipOption,
    NotificationCardComponent,
    NgIf,
    MatIconButton,
    MatFormField,
    MatLabel,
    MatInput
  ]
})
export class NotificationListComponent implements OnInit, OnDestroy {
  notificationsData: Notification[] = [];
  allSelected = false;
  selectedNotification: Notification | null = null;
  selectedCategories: string[] = [];
  searchTerm: string = '';
  private roleSubscription!: Subscription;

  categories = [
    { name: 'Creations', value: 'creation' },
    { name: 'Updates', value: 'update' },
   // { name: 'Consultant', value: 'consultant' },
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
  hasSelected(): boolean {
    return this.notificationsData.some(n => n.selected);
  }

  deleteSelected(): void {
    const confirmDelete = confirm('Are you sure you want to delete the selected notifications?');
    if (confirmDelete) {
      this.notificationsData = this.notificationsData.filter(n => !n.selected);
      if (this.selectedNotification?.selected) {
        this.selectedNotification = null;
      }
      this.allSelected = false;
    }
  }

  deleteSingleNotification(notification: Notification): void {
    const confirmDelete = confirm('Are you sure you want to delete this notification?');
    if (confirmDelete) {
      this.notificationsData = this.notificationsData.filter(n => n !== notification);
      if (this.selectedNotification === notification) {
        this.selectedNotification = null;
      }
    }
  }


  loadNotificationsData(role: string): void {
    if (role === 'farmer') {
      this.notificationsService.getAllNotificationsForFarmer().subscribe(data => {
        console.log('Farmer notifications:', data);
        this.notificationsData = data;
      });
    } else {
      this.notificationsService.getAll().subscribe(data => {
        console.log('All notifications:', data);
        this.notificationsData = data;
      });
    }
  }
  filteredNotifications(): Notification[] {
    let filtered = this.notificationsData;

    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(notification => {
        const title = notification.title.toLowerCase();
        return (
          (title.includes('welcome') && this.selectedCategories.includes('creation')) ||
          (title.includes('crop status') && this.selectedCategories.includes('update'))
        //  (title.includes('consultant') && this.selectedCategories.includes('consultant'))
        );
      });
    }

    if (this.searchTerm.trim()) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    return filtered;
  }

  toggleAll(): void {
    this.notificationsData.forEach(n => n.selected = this.allSelected);

    if (this.allSelected) {
      this.selectedNotification = null;
    }
  }



  markAsRead(notification: Notification): void {
    notification.status = 'read';
  }

  selectNotification(notification: Notification): void {
    this.selectedNotification = notification;
    if (notification.status === 'unread') {
      this.markAsRead(notification);
    }
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

  getTypeIcon(title: string): string {
    const lower = title.toLowerCase();
    if (lower.includes('welcome')) return 'person_add';
    if (lower.includes('crop status')) return 'eco';
    return 'notifications';
  }
  getTypeColor(type: string): string {
    switch (type?.toLowerCase()) {
      case 'creation': return '#e8f5e9'; // Verde claro
      case 'update': return '#e3f2fd';   // Azul claro
      case 'alert': return '#fff8e1';    // Amarillo claro
      case 'consultant': return '#fce4ec'; // Rosa claro
      default: return '#e0e0e0';
    }
  }
  getTypeLabel(type: string): string {
    switch (type?.toLowerCase()) {
      case 'creation': return 'Creation';
      case 'update': return 'Update';
      case 'delete': return 'Deletion';
      case 'consultant': return 'Consultant';
      default: return 'Notification';
    }
  }

}
