import { Component, Input, OnInit } from '@angular/core';
import { Pessoa } from '../modelo/Pessoa';
import { ServicoService } from '../serv/servico.service';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent implements OnInit {

  pessoas: Pessoa[] = [];
  myMap: Map<string, number> = new Map();

  constructor(private servico: ServicoService) { }

  async ngOnInit(): Promise<void> {

     await this.obterPessoas();     
     this.estatisticasEstados();
    
    
  }

  obterPessoas = () => {
    return new Promise((resolve, reject) => {
      this.servico.listarUsuarios()
        .subscribe(retorno => {
          this.pessoas = retorno,
          resolve(retorno)
        });
    })
  }

  estatisticasEstados() {

    for (let i = 0; i < this.pessoas.length; i++) {

      if (this.myMap.has(this.pessoas[i].estado)) {
        this.myMap.set(this.pessoas[i].estado, this.myMap.get(this.pessoas[i].estado) as number + 1)
      } else {
        this.myMap.set(this.pessoas[i].estado, 1)
      }

    }
    console.table(this.myMap)
  }
}
