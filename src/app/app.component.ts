import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todos.store';
import { JsonPipe } from '@angular/common';
import { TodosListComponent } from './todos-list/todos-list.component';
import {  NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, TodosListComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  store = inject(TodosStore);

  constructor(library: FaIconLibrary, private spinner: NgxSpinnerService) {
    library.addIconPacks(fab, fas, far);
  }

  ngOnInit(): void {
    this.spinner.show();
    this.loadTodos()
      .then(() => {
        console.log("Todos loaded");
        this.spinner.hide();
      });
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  async loadTodos() {
    await this.store.loadAll();
  }
}
