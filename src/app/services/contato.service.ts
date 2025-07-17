import { Injectable } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private contatos: Contact[] = [
    { id: 1, name: 'Ana', phone: '29 278869420' },
    { id: 2, name: 'Antônio', phone: '38 128451235' },
    { id: 3, name: 'Bruno', phone: '95 695521583' },
    { id: 4, name: 'Beatriz', phone: '25 854986459' },
    { id: 5, name: 'Carlos', phone: '94 543197849' },
    { id: 6, name: 'Cláudia', phone: '31 176437098' },
    { id: 7, name: 'Daniel', phone: '56 613692441' },
  ];

  constructor() {
    const contatosStorage = localStorage.getItem('contatos');
    const contatosParsed = contatosStorage ? JSON.parse(contatosStorage) : null;

    this.contatos = Array.isArray(contatosParsed) ? contatosParsed : this.contatos;

    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }

  obterContatos() {
    return this.contatos;
  }

  salvarContato(contato: Contact) {
    this.contatos.push(contato);
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }
}
