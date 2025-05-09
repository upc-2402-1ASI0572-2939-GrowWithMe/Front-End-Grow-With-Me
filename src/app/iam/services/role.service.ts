// core/services/role.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly key = 'userRole';
  private defaultRole: 'farmer' | 'consultant' = 'farmer';

  private roleSubject: BehaviorSubject<'farmer' | 'consultant'>;

  constructor() {
    const storedRole = localStorage.getItem(this.key) as 'farmer' | 'consultant';
    this.roleSubject = new BehaviorSubject<'farmer' | 'consultant'>(storedRole || this.defaultRole);
  }

  getRole$() {
    return this.roleSubject.asObservable();
  }

  getCurrentRole(): 'farmer' | 'consultant' {
    return this.roleSubject.value;
  }

  setRole(role: 'farmer' | 'consultant') {
    localStorage.setItem(this.key, role);
    this.roleSubject.next(role);
  }

  toggleRole() {
    const newRole = this.roleSubject.value === 'farmer' ? 'consultant' : 'farmer';
    this.setRole(newRole);
  }
}
