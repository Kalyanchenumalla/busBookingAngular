import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketconfirmComponent } from './ticketconfirm.component';

describe('TicketconfirmComponent', () => {
  let component: TicketconfirmComponent;
  let fixture: ComponentFixture<TicketconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
