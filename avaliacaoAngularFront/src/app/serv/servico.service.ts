import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../modelo/Cidade';
import { Estados } from '../modelo/Estados';
import { Pessoa } from '../modelo/Pessoa';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  listarEstados(): Observable<Estados[]> {
    return this.http.get<Estados[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
  }
  listarEstadosId(indice: number): Observable<Estados> {
    return this.http.get<Estados>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + indice);
  }
  listarCidades(indice: number): Observable<Cidade[]> {
    return this.http.get<Cidade[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + indice + '/municipios?orderBy=nome');
  }
  listarUsuarios(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>('http://localhost:3000/cadastroPessoas');
  }
  cadastrarPessoa(p: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>('http://localhost:3000/cadastroPessoas', p);
  }

  removerPessoaServico(indice:number):Observable<Pessoa>{
    return this.http.delete<Pessoa>('http://localhost:3000/cadastroPessoas/'+indice);
  }

  alterarPessoaServico(p:Pessoa):Observable<Pessoa>{
    return this.http.put<Pessoa>('http://localhost:3000/cadastroPessoas/'+p.id,p);
  }
}
