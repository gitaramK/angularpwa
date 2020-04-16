import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsListComponent } from './details-list.component';

describe('DetailsListComponent', () => {
  let component: DetailsListComponent;
  let fixture: ComponentFixture<DetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
