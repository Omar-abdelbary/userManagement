import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavadminComponent } from './navadmin.component';

describe('NavadminComponent', () => {
  let component: NavadminComponent;
  let fixture: ComponentFixture<NavadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
