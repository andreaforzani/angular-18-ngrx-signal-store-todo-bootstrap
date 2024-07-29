import { Component, TemplateRef, effect, inject, viewChild } from '@angular/core';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonGroupComponent } from '../shared/radio-button-group/radio-button-group.component';
import { NgbDatepickerModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    RadioButtonGroupComponent,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodosStore);
  filter = viewChild.required(RadioButtonGroupComponent);

  addTodoForm: FormGroup;
  isFormSubmitted = false;

  private modalService = inject(NgbModal);

  modalRef!:NgbModalRef;

  constructor(library: FaIconLibrary, private fb: FormBuilder) {
    library.addIconPacks(fab, fas, far);

    this.addTodoForm = this.fb.group({
      title: ['', Validators.required],
    });

    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
      console.log("in effect: ", filter.value);
    });
  }

  get title() { return this.addTodoForm.get('title'); }

  saveForm() {
    this.isFormSubmitted = true;
    console.log(this.addTodoForm.value);
    if (this.addTodoForm.valid) {
      const newTodo: Todo = {
        title: this.addTodoForm.value.title,
        completed: false
      };
      this.addTodo(newTodo);
      this.modalRef.close();
    }
  }

  resetForm() {
    // this.editNannyForm.reset();
    this.addTodoForm.patchValue({
      title: "",
      description: "",
      kilometers: "",
      date: "",
    });
    this.isFormSubmitted = false;
    this.modalRef.close();
  }

  openForm(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content);
  }

  async addTodo(todo: Todo) {
    await this.store.addTodo(todo);
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
    console.log("onDeleteTodo");
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onTodoToggled(id: string, event: MouseEvent) {
    console.log("onTodoToggled");
    // event.stopPropagation();
    // console.log(event.target);
    if (event.target instanceof HTMLInputElement) {
      console.log(event.target.checked);
      await this.store.updateTodo(id, event.target.checked);
    }
  }

  onFilterTodos(event: any) {
    console.log(event);
    // console.log(event.target.value);
    const filter = event.target!.value as TodosFilter;
    this.store.updateFilters(filter);
  }
}
