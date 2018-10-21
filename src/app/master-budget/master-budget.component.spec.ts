import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBudgetComponent } from './master-budget.component';

describe('MasterBudgetComponent', () => {
  let component: MasterBudgetComponent;
  let fixture: ComponentFixture<MasterBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
