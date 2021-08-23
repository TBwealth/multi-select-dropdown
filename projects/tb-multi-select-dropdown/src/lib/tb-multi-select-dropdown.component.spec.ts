import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbMultiSelectDropdownComponent } from './tb-multi-select-dropdown.component';

describe('TbMultiSelectDropdownComponent', () => {
  let component: TbMultiSelectDropdownComponent;
  let fixture: ComponentFixture<TbMultiSelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TbMultiSelectDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TbMultiSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
