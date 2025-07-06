import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Notification } from '../../models/notification.entity';

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent {
  @Input() notification!: Notification;
  getTypeIcon(title: string): string {
    const lower = title.toLowerCase();
    if (lower.includes('welcome')) return 'person_add';
    if (lower.includes('crop status')) return 'eco';
    return 'notifications';
  }

  getTypeColor(title: string): string {
    const lower = title.toLowerCase();
    if (lower.includes('welcome')) return '#e8f5e9'; // verde claro
    if (lower.includes('crop status')) return '#e3f2fd'; // azul claro
    return '#f5f5f5'; // gris claro por defecto
  }

}
