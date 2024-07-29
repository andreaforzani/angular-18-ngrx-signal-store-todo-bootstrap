import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodosFilter } from '../../store/todos.store';

@Component({
  selector: 'radio-button-group',
  standalone: true,
  imports: [],
  templateUrl: './radio-button-group.component.html',
  styleUrl: './radio-button-group.component.scss'
})
export class RadioButtonGroupComponent {
  @Output() change = new EventEmitter<Event>();
  @Input() value:TodosFilter = 'all';

  onRadioChange(event: Event) {
    // console.log(event);
    // console.log(event.target.value);
    // const filter = event.target.value as TodosFilter;
    this.change.emit(event);
  }
}
