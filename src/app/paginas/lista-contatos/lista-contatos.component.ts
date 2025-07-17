import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContactsComponent } from '../../components/contacts/contacts.component';
import { ContainerComponent } from '../../components/container/container.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SeparatorComponent } from '../../components/separator/separator.component';
import { ContatoService } from '../../services/contato.service';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    ContainerComponent,
    HeaderComponent,
    SeparatorComponent,
    ContactsComponent,
    RouterLink,
  ],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css',
})
export class ListaContatosComponent implements OnInit {
  alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  contacts: Contact[] = [];
  filtroPorTexto = '';

  constructor(private contatoService: ContatoService) {}

  ngOnInit() {
    this.contacts = this.contatoService.obterContatos();
  }
  filtrarPorTexto(): Contact[] {
    const txt = this.filtroPorTexto.trim().toUpperCase();
    if (!txt) {
      return this.contacts;
    }
    return this.contacts.filter((c) => c.name.toUpperCase().includes(txt));
  }

  getContactsByLetter(letra: string): Contact[] {
    return this.filtrarPorTexto().filter((c) =>
      c.name.toUpperCase().startsWith(letra)
    );
  }

  trackById(_: number, item: Contact) {
    return item.id;
  }
}
