import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DataSettings } from '../../core/models/data-settings';
import { BehaviorSubject, Observable, Subscription, interval, map, scan, startWith, switchMap, withLatestFrom, } from 'rxjs';
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
      arraySize: 1,
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
      withLatestFrom(this.settings$),
      scan(({ items, idsMap }, [val, { arrayIds }]) => {
        // buffer items to show last 10
        if (val.length > this.amountOfItemsToDisplay) {
          items = val.slice(-this.amountOfItemsToDisplay);
        } else {
          items.push(...val);
          items = items.slice(-this.amountOfItemsToDisplay);

          // swap ids back
          items.forEach((item) => {
            const id = idsMap.get(item.id)
            if (id) {
              item.id = id;
              idsMap.delete(item.id);
            }
          });
        }

        // swap ids
        arrayIds.forEach((value, index) => {
          const item = items[index];
          if (item) {
            idsMap.set(value, item.id);
            item.id = value;
          }
        });

        return { items, idsMap };
      }, { idsMap: new Map<string, string>(), items: new Array<Data>() }),
      map(x => x.items)
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
