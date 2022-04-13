import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cidade } from '../modelo/Cidade';
import { Estados } from '../modelo/Estados';
import { ServicoService } from '../serv/servico.service';
import emailMask from 'text-mask-addons/dist/emailMask';
import { Pessoa } from '../modelo/Pessoa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pg-principal',
  templateUrl: './pg-principal.component.html',
  styleUrls: ['./pg-principal.component.css']
})
export class PgPrincipalComponent implements OnInit {
  indicePessoa: number = 0;
  emailMask = emailMask;
  mNome: boolean = false;
  btnVisivel: boolean = true;
  estado: Estados = new Estados();
  estados: Estados[] = [];
  cidades: Cidade[] = [];
  pessoas: Pessoa[] = [];
  objPessoa: Pessoa = new Pessoa();


  formulario = new FormGroup({
    mensagemNome: new FormControl(),
    cbxEstado: new FormControl(null, Validators.required),
    cbxCidade: new FormControl(null, Validators.required),
    campoNome: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Zà-úÀ-Ú_ ]*$')]),
    campoEmail: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    campoTelefone: new FormControl()

  });

  constructor(private servico: ServicoService) { }

  ngOnInit(): void {
    this.limparCombo();
    this.obterPessoas();
    this.obterEstados();
    this.obterCidades(0);

  }

  obterEstados = () => {
    this.servico.listarEstados()
      .subscribe(retorno => this.estados = retorno);
  }
  obterPessoas = () => {
    this.servico.listarUsuarios()
      .subscribe(retorno => this.pessoas = retorno);
  }
  obterEstadosId = (indice: number) => {
    this.servico.listarEstadosId(indice)
      .subscribe(retorno => this.estado = retorno);
  }
  obterCidades = (indice: number) => {
    return new Promise((resolve, reject) => {
      this.servico.listarCidades(indice)
        .subscribe(retorno => {
          this.cidades = retorno;
          resolve(retorno);
        });
    })

  }

  selecaoEstado = () => {
    this.obterCidades(this.estados[this.formulario.value.cbxEstado].id);
    this.validaCbxEstado()
  }
  selecaoCidade = () => {
    this.validaCbxCidade()
  }


  cadastrar = () => {
    if (this.verificaPessoa()) {
      this.servico.cadastrarPessoa(this.objPessoa)
        .subscribe(retorno => this.pessoas.push(retorno));
      this.limparCombo();
    } else {
      this.verificaCampos();
    }
  }


  verificaPessoa = () => {
    console.log(this.formulario.value.cbxCidade)
    if (this.formulario.valid && this.validaCbxEstado() && this.validaCbxCidade()) {
      Swal.fire('Boa!', 'Deu tudo certo!', 'success')
      this.validaFormulario();
      return true
    } else {
      Swal.fire('Erro!!!', 'Preencha corretamente os campos', 'error')
      return false
    }
  }

  verificaCampos() {
    this.validaNome();
    this.validaEmail();
    this.validaTelefone();
  }


  validaNome() {
    if (!this.formulario.get('campoNome')?.valid) {
      document.getElementsByName("nome")[0].style.border = "1px solid red"
    } else {
      document.getElementsByName("nome")[0].style.border = "1px solid black"
    }
  }
  validaEmail() {
    if (!this.formulario.get('campoEmail')?.valid) {
      document.getElementsByName("email")[0].style.border = "1px solid red"
    } else {
      document.getElementsByName("email")[0].style.border = "1px solid black"
    }
  }
  validaTelefone() {
    if (!this.formulario.get('campoTelefone')?.valid) {
      document.getElementsByName("telefone")[0].style.border = "1px solid red"
    } else {
      document.getElementsByName("telefone")[0].style.border = "1px solid black"
    }
  }

  validaCbxEstado = () => {
    if (this.formulario.value.cbxEstado == 'A') {
      document.getElementsByName("cbxEstado")[0].style.border = "1px solid red"
      return false;
    } else {
      document.getElementsByName("cbxEstado")[0].style.border = "1px solid black"
      return true;
    }
  }
  validaCbxCidade = () => {
    if (this.formulario.value.cbxCidade == 'B') {
      document.getElementsByName("cbxCidade")[0].style.border = "1px solid red"
      return false;
    } else {
      document.getElementsByName("cbxCidade")[0].style.border = "1px solid black"
      return true;
    }
  }

  validaFormulario = () => {
    this.objPessoa.nome = this.formulario.value.campoNome;
    this.objPessoa.email = this.formulario.value.campoEmail;
    this.objPessoa.cidade = this.cidades[this.formulario.value.cbxCidade].nome;
    this.objPessoa.estado = this.estados[this.formulario.value.cbxEstado].nome;
    this.objPessoa.telefone = this.formulario.value.campoTelefone;
  }

  async selecionarPessoa(indice: number) {
    this.btnVisivel = false;
    this.indicePessoa = indice;
    this.formulario.get("campoNome")?.setValue(this.pessoas[indice].nome);
    this.formulario.get("campoEmail")?.setValue(this.pessoas[indice].email);
    this.formulario.get("campoTelefone")?.setValue(this.pessoas[indice].telefone);
    this.formulario.get("cbxEstado")?.setValue(this.buscaIndexEstado(this.pessoas[indice].estado));

    await this.obterCidades(this.estados[this.buscaIndexEstado(this.pessoas[indice].estado)].id);

    this.formulario.get("cbxCidade")?.setValue(this.buscaIndexCidade(this.pessoas[indice].cidade));


  }

  cancelar = () => {
    this.btnVisivel = true;
    this.limparCombo();
  }

  limparCombo() {
    this.formulario.reset();
    this.formulario.get("cbxEstado")?.setValue("A");
    this.formulario.get("cbxCidade")?.setValue("B");

  }
  buscaIndexEstado = (nome: string) => {
    for (let i = 0; i < this.estados.length; i++) {
      if (nome == this.estados[i].nome) {
        return i;
      }
    }
    return 0;
  }
  buscaIndexCidade = (nome: string) => {
    for (let i = 0; i < this.cidades.length; i++) {
      if (nome == this.cidades[i].nome) {
        return i;
      }
    }
    return 0;
  }

  removerPessoa = () => {
    this.servico.removerPessoaServico(this.pessoas[this.indicePessoa].id)
      .subscribe(retorno => {
        // let indiceVetor = this.pessoas.findIndex(objVetor => { return objVetor.id == this.objPessoa.id })
        this.pessoas.splice(this.indicePessoa, 1)
      });
    this.limparCombo();
  }

  alterarPessoa = () => {
    if (this.verificaPessoa()) {
      this.servico.alterarPessoaServico(this.objPessoa)
        .subscribe(retorno => this.pessoas[this.pessoas.findIndex((p => p.id == this.objPessoa.id))] = retorno);
      this.limparCombo();
    }

  }

}
