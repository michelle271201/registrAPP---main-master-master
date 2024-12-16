import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private clases: any[] = [];

  constructor() {}

  agregarClase(clase: any) {
    this.clases.push(clase);
  }

  obtenerClases() {
    return this.clases;
  }
}
