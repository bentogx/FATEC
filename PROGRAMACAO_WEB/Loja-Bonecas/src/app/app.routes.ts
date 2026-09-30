import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Produtos } from './produtos/produtos';
import { Contato } from './contato/contato';
import { Carrinho } from './carrinho/carrinho';
import { Cadastro } from './cadastro/cadastro';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'produtos', component: Produtos },
  { path: 'contato', component: Contato },
  { path: 'carrinho', component: Carrinho },
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' },
];
