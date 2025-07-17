import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { SeparatorComponent } from '../../components/separator/separator.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SeparatorComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css'
})
export class FormularioContatoComponent {

  contatoForm!: FormGroup;
  constructor() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      numero: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redesSociais: new FormControl(''),
      observacoes: new FormControl('')
    });
  }

  salvarContato() {
      console.log('Contato salvo:', this.contatoForm.value);
  }

  cancelar() {
    console.log('Ação de cancelamento executada');
  }
}
