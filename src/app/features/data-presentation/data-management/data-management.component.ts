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
    arrayIds: ['']// todo add validation
  });

  constructor(private formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    if (this.settings) {
      const { timer, arraySize, arrayIds } = this.settings;
      this.managementForm.patchValue({
        timer,
        arraySize,
        arrayIds: arrayIds.join(','),
      });
    }
  }

  applySettings() {
    if (this.managementForm.invalid) {
      return;
    }

    const { timer, arraySize, arrayIds } = this.managementForm.value;

    const parsedIds = this.parseArrayIds(arrayIds || '');
    const settings: DataSettings = {
      timer,
      arraySize,
      arrayIds: parsedIds
    }

    this.settingsChanged.emit(settings);
  }

  private parseArrayIds(ids: string): string[] {
    return ids.replaceAll(' ', '').split(',').filter(x => !!x)
  }


  get timer() {
    return this.managementForm.get('timer');
  }

  get arraySize() {
    return this.managementForm.get('arraySize');
  }
}
