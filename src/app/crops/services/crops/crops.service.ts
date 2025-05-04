import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropsService {

  // Simulación de datos de cultivos
  private cropsData = [
    { id: 1, name: 'Cultivo 1', type: 'Hortalizas', area: '120 m²' },
    { id: 2, name: 'Cultivo 2', type: 'Frutas', area: '200 m²' },
    { id: 3, name: 'Cultivo 3', type: 'Verduras', area: '150 m²' },
    { id: 4, name: 'Cultivo 4', type: 'Hortalizas', area: '100 m²' }
  ];

  constructor() {}

  // Simula la obtención de cultivos desde una API
  getCrops(): Observable<any[]> {
    return of(this.cropsData);  // Utiliza 'of' para devolver los datos simulados como un observable
  }


  // Método simulado para eliminar un cultivo
  deleteCrop(id: number): Observable<any> {
    const index = this.cropsData.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cropsData.splice(index, 1);
      return of({ message: 'Cultivo eliminado' });
    }
    return of(null);
  }
}
