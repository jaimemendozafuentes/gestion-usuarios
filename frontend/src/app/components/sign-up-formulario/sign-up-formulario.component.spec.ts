import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormularioComponent } from './sign-up-formulario.component';

describe('SignUpFormularioComponent', () => {
  let component: SignUpFormularioComponent;
  let fixture: ComponentFixture<SignUpFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
