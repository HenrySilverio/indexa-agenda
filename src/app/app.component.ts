import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { SeparatorComponent } from './components/separator/separator.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import contacts from './contacts.json';
import { FormularioContatoComponent } from './paginas/formulario-contato/formulario-contato.component';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    ContainerComponent,
    HeaderComponent,
    SeparatorComponent,
    ContactsComponent,
    FormularioContatoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  contacts: Contact[] = contacts;
  filtroPorTexto = '';

  // retorna a lista total de contatos aplicando o filtro de texto
  filtrarPorTexto(): Contact[] {
    const txt = this.filtroPorTexto.trim().toUpperCase();
    if (!txt) {
      return this.contacts;
    }
    return this.contacts.filter(c =>
      c.name.toUpperCase().includes(txt)
    );
  }

  // aplica o filtro de texto e depois retorna só os que começam pela letra informada
  getContactsByLetter(letra: string): Contact[] {
    return this.filtrarPorTexto()
               .filter(c => c.name.toUpperCase().startsWith(letra));
  }

  trackById(_: number, item: Contact) {
    return item.id;
  }
}
