import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRestaurantComponent } from './approve-restaurant.component';

describe('ApproveRestaurantComponent', () => {
  let component: ApproveRestaurantComponent;
  let fixture: ComponentFixture<ApproveRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
