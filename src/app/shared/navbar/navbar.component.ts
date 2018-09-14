import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscription: Subscription = new Subscription()
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(
        auth => {
          this.nombre = auth.user.nombre
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
