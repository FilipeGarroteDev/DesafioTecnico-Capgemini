<div align="center">

# 💻 Desafio Técnico - Capgemini 
  [Sobre](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#fleety) | [Funcionalidades](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#funcionalidades) | [Tecnologias](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#tecnologias) | [Rodar com Docker](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#como-rodar-o-projeto-com-docker) | [Rodar localmente](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#como-rodar-a-aplica%C3%A7%C3%A3o-localmente) | [Rodar testes](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#como-rodar-a-aplica%C3%A7%C3%A3o-localmente) | [Informações Importantes](https://github.com/FilipeGarroteDev/Fleety-AutoService-Fullstack#informa%C3%A7%C3%B5es-importantes-para-o-uso-da-aplica%C3%A7%C3%A3o)


</div>

<br>

<div align="left">

## 📂 Escopo do case 

</div>

Esse projeto faz parte do desafio técnico para a vaga de Desenvolvedor Chatbot Jr., da Capgemini, e consiste em uma API REST, desenvolvida em Node.js, através da qual é possível validar sequências de letras em uma matriz quadrada NxN. Há dois endpoints por meio dos quais é possível, dada uma array de strings, verificar se há uma sequência válida, bem como obter as estatísticas referentes às sequências válidas, inválidas e relação sequências válidas/total.

### 1. Endpoint POST /sequence:
Esse endpoint receberá como parâmetro, um JSON com a sequência de letras (Array de Strings), onde, cada elemento desse array representa uma linha de uma **matriz quadrada de (NxN)**, como nos exemplos abaixo:

```json
{
    "letters": ["DUHBHB", "DUBUHD", "UBUUHU", "BHBDHH", "DDDDUB", "UDBDUH"]
}
```

<img align="center" src="https://i.imgur.com/hIcJ2i8.png" />

• Uma sequência válida é aquela com **2 ou mais sequências de quatro letras iguais** em qualquer direção: horizontal, vertical ou diagonal.
• As letras da string **só podem ser: (B, U, D, H)**

Esta API deve retornar um json com **"is_valid": boolean**.   
Caso seja encontrada uma sequência válida, deve ser **true**, caso seja uma sequência inválida, deve ser **false**.  

Exemplo da resposta:  

**HTTP 200 OK**


```json
{
    "is_valid": true
}
```

### 2. Endpoint GET "/stats":
Este endpoint responde um **HTTP GET**. A resposta deve ser um json com as estatísticas de verificações de sequências, onde deve informar a **quantidade de sequências válidas, quantidade de sequências inválidas, e a proporção de sequências válidas em relação ao total**.

Exemplo de resposta:

**HTTP  OK**

```json
{
    "count_valid": 40,
    "count_invalid": 60,
    "ratio": 0.4
}
```
<br>


## 🎯	Tecnologias Utilizadas
As seguintes ferramentas, tecnologias e frameworks foram utilizadas na construção desse case:<br>
<p>
  <img style='margin: 5px;' src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/.env-%2320232a.svg?&style=for-the-badge&logo=.ENV"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white'/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Linux-E34F26?style=for-the-badge&logo=linux&logoColor=black'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white'>
</p>

<br>

## ⚙️	Como rodar o projeto?

- Primeiramente, faça o clone desse repositório. - https://github.com/FilipeGarroteDev/DesafioTecnico-Capgemini

1. Instale o docker em sua máquina, seguindo a seguinte documentação: [Instalação Docker Ubunto](https://docs.docker.com/engine/install/ubuntu/);

2. Instale o docker-compose por meio do seguinte comando:
```bash
sudo apt-get install docker-compose
```

3. Crie um arquivo `.env` na raiz do projeto e o configure utilizando, como exemplo, o arquivo `.env.example`, seguindo as instruções constantes dele.

4. Por fim, rode, **na raiz do projeto (./)**, o comando a seguir para iniciar a aplicação:
```bash
npm run docker:start
```

5. Caso queira parar a aplicação, rode:
```bash
npm run docker:down
```

6. Caso queira deletar a aplicação, bem como seus volumes, containers e imagens, rode:
```bash
npm run docker:clear
```

<br>

## 🚀 Testando a API

Após seguir os passos acima, será possível fazer as requisições POST e GET, utilizando os endpoints abaixo: 

• "POST /sequence": http://localhost:4002/sequence 
• "GET /stats": http://localhost:4002/stats

### POST /sequence

Ao fazer a requisição, o servidor responderá com o **status code 200 - OK** e com um JSON - como o mostrado abaixo - informando ao usuário se aquele é uma sequência válida ou não. Caso seja válida, será respondido com **is_valid: true**, caso contrário, será respondido com **is_valid: false**. Sempre que houver uma tentativa, será armazenado no banco de dados a sequência dada - caso ela seja o único registro, em respeito à unicidade - bem como se ela é válida ou não.

```json
{
    "is_valid": boolean
}
```

**OBS:** Caso tente enviar uma lista com algum **caracter diferente** dos permitidos (B, D, U, H) ou cuja **quantidade de elementos seja diferente da quantidade de caracteres** de cada um dos elementos, o servidor responderá com **status code 422 (Unprocessable Entity)** e mostrará ao usuário a respectiva mensagem de erro.

### GET /stats

Ao fazer a requisição, a API fará uma consulta à database e, consequentemente, responderá com o **status code 200 (OK)** e enviará ao usuário o **JSON** (cuja estrutura segue abaixo) contendo a **quantidade de sequências válidas**, a **quantidade de sequências inválidas** e a **proporção de sequências válidas em relação ao total**

```json
{
    "count_valid": (número de sequências válidas),
    "count_invalid": (número de sequências inválidas),
    "ratio": (relação sequências válidas/total)
}
```

<br>

## 🔮 Como rodar os testes automatizados?

- Primeiramente, faça o clone desse repositório. - https://github.com/FilipeGarroteDev/DesafioTecnico-Capgemini
- Caso já tenha rodado a API via Docker, você deverá excluir a pasta "node_modules", antes de seguir os passos seguintes.
 
1. Na raiz do projeto, rode o seguinte comando, para instalar as dependências:
```bash
npm i
```

2. Crie um arquivo `.env` na raiz do projeto e o configure utilizando, como exemplo, o arquivo `.env.example`, seguindo as instruções constantes dele.

3. Certifique-se de que tenha o mongoDB instalado em sua máquina e inicialize-o com o comando:
```bash
mongod --dbpath ~/.mongo
```

4. Por fim, rode o comando a seguir para iniciar os testes:
```bash
npm run test
```

<br><br>

### 👨‍💻	Desenvolvido por Filipe Garrote

<div align="left"> 
  <a href = "mailto:filipe.garrote@gmail.com"><img src="https://img.shields.io/badge/-Gmail-db4a39?style=for-the-badge&logo=gmail&logoColor=white"></a>
  <a href="https://www.linkedin.com/in/weverton-gomes-7a3149222/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a> 
</div>


