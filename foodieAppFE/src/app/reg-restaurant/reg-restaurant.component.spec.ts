import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegRestaurantComponent } from './reg-restaurant.component';

describe('RegRestaurantComponent', () => {
  let component: RegRestaurantComponent;
  let fixture: ComponentFixture<RegRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
