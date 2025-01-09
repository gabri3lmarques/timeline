# Linha do Tempo

A proposta do projeto é desenvolver um objeto de linha do tempo onde um usuário poderá inserir entradas com informações de eventos ocorridos e suas respectivas datas.

## Como rodar o projeto?

Basta acessar o arquivo **index.html**  a partir de qualquer navegador.

## Como rodar o ambiente de desenvolvimnto?

Tendo o **Node.js** instalado no seu computador abra a pasta raiz do projeto em um terminal do sistema operacional ou terminal integrado do vscode e digite o comando abaixo:

```bash
npm i
```

Esse comando vai instalar as dependências necessárias para rodar o ambiente de desenvolvimento localmente. Depois disso digite o comando:

```bash
gulp
```

Esse comando vai rodar a tarefa padrão do arquivo *gulpfile* e começar a *observar as alterações realizadas* tanto nos arquivos *JavaScript quanto SCSS* dentro da pasta */dev.*

Assim que notar alguma alteração o gulp vai transpilar e minificar os arquivos .scss e .js para o destino definido que é a pasta /assets.

## A pasta /dev

Dentro da pasta */dev *você vai encontrar 2 pastas a /js* e */sass*. Essas pastas concentram os arquivos que foram utilizados para solucionar o teste. Dentro da pasta */assets* você vai encontrar apenas arquivos minificados já otimizados para produção.

## Orientação a objetos

Eu escolhi o paradigma de orientação a objetos para solucionar o desafio pois na minha opinião ele mantém o código mais organizado, facilitando a sua reutilização e possíveis ajustes e manutenção, além de também possibilitar que mais de um objeto de linha do tempo possam ser utilizados no mesmo projeto.
