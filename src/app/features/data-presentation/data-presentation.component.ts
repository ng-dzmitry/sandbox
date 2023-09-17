import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DataSettings } from '../../core/models/data-settings';
import { BehaviorSubject, Observable, Subscription, interval, map, scan, startWith, switchMap, } from 'rxjs';
import { Data } from '../../core/models/data.model';
import { generateData } from 'src/app/core/utils/data.utils';

@Component({
  selector: 'app-data-presentation',
  templateUrl: './data-presentation.component.html',
  styleUrls: ['./data-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataPresentationComponent implements OnInit, OnDestroy {
  initialSettings: DataSettings =
    {
      timer: 3000,
      arraySize: 3,
      arrayIds: []
    };

  data$!: Observable<Data[]>;
  dataReceived$ = new BehaviorSubject<Data[]>([]);

  amountOfItemsToDisplay = 10;

  settings$ = new BehaviorSubject<DataSettings>(this.initialSettings);

  dataGeneratorWorker!: Worker;

  subscriptions = new Subscription();

  ngOnInit(): void {
    this.registerDataProducer();

    this.data$ = this.dataReceived$.pipe(
      scan((acc, val) => {
        // buffer items to show last 10
        if (val.length > this.amountOfItemsToDisplay) {
          acc = val.slice(-this.amountOfItemsToDisplay);
          return acc;
        } else {
          acc.push(...val);
          return acc.slice(-this.amountOfItemsToDisplay);
        }
      }, new Array<Data>())
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  registerDataProducer() {
    if (typeof Worker !== 'undefined') {
      this.dataGeneratorWorker = new Worker(new URL('../../core/web-workers/data-generator.worker', import.meta.url));

      this.dataGeneratorWorker.onmessage = ({ data }) => {
        this.dataReceived$.next(data);
      };
    }

    const dataSubscription = this.settings$.pipe(
      switchMap((settings) => interval(settings.timer).pipe(
        startWith(null),
        map(() => settings)
      ))).subscribe(settings => {
        if (this.dataGeneratorWorker) {
          this.dataGeneratorWorker.postMessage(settings.arraySize);
        } else {
          // fallback
          const data = generateData(settings.arraySize);
          this.dataReceived$.next(data);
        }
      });

    this.subscriptions.add(dataSubscription);
  }

  applySettings(settings: DataSettings) {
    this.settings$.next(settings);
  }
}
