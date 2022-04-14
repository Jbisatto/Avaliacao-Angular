# Projeto Avaliativo de Angular

  
O Objetivo desse projeto foi um cadastro de pessoas, contendo nome, email, telefone, estado e cidade. O Estado e a Cidade são listadas através de uma Api online (https://servicodados.ibge.gov.br/api/docs/localidades). A aplicação conta com validações e máscaras de acordo com seus campos, também não cadastra pessoas com mesmo nome. Possui uma página de estatísticas, onde mostra a quantidade de pessoas cadastrada por Estado, caso haja algum estado que não tenha uma pessoa cadastrada, o mesmo não aparece na lista. O Front-end foi desenvolvido em Angular e o Back-end para armazenar os dados em Node.


## Requerimentos 

  

1. Angular CLI

  

2. Node.js 



  
  

## Configuração 

  

**1. Clonar a aplicação** 

  

```bash 

https://github.com/Jbisatto/Avalia-o-Angular.git 

``` 

**2. Instalar o Node**

Caso não tenha o Node instalado, acesse https://nodejs.org/en/ e instale.

## Execução 

  
**1. Executar Servidor Back-end**

Dentro da pasta "avaliacaoAngularBack” abra um terminal de comando e execute os seguintes comandos: 

```bash 

npx json-server usuario.json

``` 

O Servidor estará funcionando no endereço:
http://localhost:3000/cadastroPessoas

**2. Executar a Aplicação Front-end**

Dentro da pasta "avaliacaoAngularFront” abra um terminal de comando e execute os seguintes comandos: 

*  Instalar as dependências:

```bash 

npm i

``` 
*  Executar o servidor:
```bash 

ng serve

``` 

O Servidor estará funcionando no endereço:
http://localhost:4200/ 
