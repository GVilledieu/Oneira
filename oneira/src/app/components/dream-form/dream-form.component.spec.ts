import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamFormComponent } from './dream-form.component';

describe('DreamFormComponent', () => {
  let component: DreamFormComponent;
  let fixture: ComponentFixture<DreamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DreamFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DreamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
