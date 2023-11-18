import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantravelComponent } from './plantravel.component';

describe('PlantravelComponent', () => {
  let component: PlantravelComponent;
  let fixture: ComponentFixture<PlantravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
