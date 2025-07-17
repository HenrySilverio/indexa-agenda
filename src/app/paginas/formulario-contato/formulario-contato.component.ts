import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SeparatorComponent } from '../../components/separator/separator.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { Contact } from '../../components/contacts/contacts'

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    HeaderComponent,
    SeparatorComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './formulario-contato.component.html',
  styleUrls: ['./formulario-contato.component.css'],
})
export class FormularioContatoComponent implements OnInit {
  contatoForm!: FormGroup;

  constructor(private contatoService: ContatoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redesSociais: new FormControl(''),
      observacoes: new FormControl(''),
    });
  }

  salvarContato() {
    if (this.contatoForm.invalid) {
      this.contatoForm.markAllAsTouched();
      return;
    }
    const { nome, numero } = this.contatoForm.value;
    const todos = this.contatoService.obterContatos();
    const novoId = todos.length ? Math.max(...todos.map(c => c.id)) + 1 : 1;

    const novoContato: Contact = {
      id: novoId,
      name: nome,
      phone: numero,
    };

    this.contatoService.salvarContato(novoContato);
    this.contatoForm.reset();
    this.router.navigate(['/lista-contatos']);
  }

  cancelar() {
    this.contatoForm.reset();
  }
}