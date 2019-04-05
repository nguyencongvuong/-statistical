import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberByAreaComponent } from './subscriber-by-area.component';

describe('SubscriberByAreaComponent', () => {
  let component: SubscriberByAreaComponent;
  let fixture: ComponentFixture<SubscriberByAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberByAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberByAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
