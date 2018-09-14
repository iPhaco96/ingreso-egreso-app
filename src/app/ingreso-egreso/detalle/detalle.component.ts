import { IngresoEgresoService } from './../ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from './../ingreso-egreso.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>,
    public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe(
        ingresoEgreso => {
          console.log(ingresoEgreso.items)

          this.items = ingresoEgreso.items;
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  borrarItem(item: IngresoEgreso) {
    console.log(item.uid);

    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
      .then(() => {
        Swal('Eliminado', item.descripcion, 'success');
      });
  }

}
