import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private firestore: AngularFirestore) {}

  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('empleado').add(empleado);
  }

  getEmpleado(): Observable<any> {
    return this.firestore
      .collection('empleado', (ref) => ref.orderBy('fechaCreacion', 'asc'))
      .snapshotChanges();
  }

  eliminarEmpleados(id: string): Promise<any> {
    return this.firestore.collection('empleado').doc(id).delete();
  }

  editEmpleado(id: string): Observable<any> {
    return this.firestore.collection('empleado').doc(id).snapshotChanges();
  }

  actualizarEmpleado(id: string, data: any): Promise<any> {
    return this.firestore.collection('empleado').doc(id).update(data);
  }
}
