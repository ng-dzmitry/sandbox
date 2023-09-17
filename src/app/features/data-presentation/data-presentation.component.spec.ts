import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPresentationComponent } from './data-presentation.component';

describe('DataPresentationComponent', () => {
  let component: DataPresentationComponent;
  let fixture: ComponentFixture<DataPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
