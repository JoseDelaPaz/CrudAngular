import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css'],
})
export class ListEmpleadosComponent implements OnInit {
  empleado: any[] = [];

  constructor(
    private _empleadoService: EmpleadoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmpleado();
  }

  getEmpleado() {
    this._empleadoService.getEmpleado().subscribe((data) => {
      this.empleado = [];
      data.forEach((element: any) => {
        this.empleado.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      // console.log(this.empleado);
    });
  }
  eliminarEmpleado(id: string) {
    this._empleadoService
      .eliminarEmpleados(id)
      .then(() => {
        console.log('listo');
        this.toastr.error('Eliminado correctamente.', 'Registro Eliminado');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
