import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamListComponent } from './dream-list.component';

describe('DreamListComponent', () => {
  let component: DreamListComponent;
  let fixture: ComponentFixture<DreamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DreamListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DreamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
