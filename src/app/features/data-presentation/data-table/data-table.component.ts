import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Data } from '../../../core/models/data.model';
import { CSS_COLOR_NAMES } from 'src/app/core/constants/colors';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @Input() data!: Data[];

  getColorValue(colorName: string) {
    return CSS_COLOR_NAMES[colorName as keyof typeof CSS_COLOR_NAMES]
  }

  trackById(_index: number, data: Data) {
    return data.id;
  }
}
