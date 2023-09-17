import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DataSettings } from '../../../core/models/data-settings';

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataManagementComponent implements OnInit {
  @Input() settings?: DataSettings;
  @Output() settingsChanged = new EventEmitter<DataSettings>();

  managementForm = this.formBuilder.group({
    timer: [null, [Validators.required]], // todo add validation
    arraySize: [null, [Validators.required]],// todo add validation
    arrayIds: []
  });

  constructor(private formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    if (this.settings) {
      this.managementForm.patchValue(this.settings);
    }
  }

  applySettings() {
    if (this.managementForm.invalid) {
      return;
    }

    const { timer, arraySize, arrayIds } = this.managementForm.value;
    const settings: DataSettings = {
      timer,
      arraySize,
      arrayIds
    }

    this.settingsChanged.emit(settings);
  }


  get timer() {
    return this.managementForm.get('timer');
  }

  get arraySize() {
    return this.managementForm.get('arraySize');
  }
}
