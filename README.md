# Desafio (Projeto)
Portfólio de Transportadoras (Front-end)

## Sobre
Projeto de desenvolvimento de um sistema para que as transportadoras possam se
cadastrar para que a mesma possa ser consultada, aparecendo na listagem principal do sistema.

## Tecnologias
- Angular: 8
- TtypeScript: 3.4.3
- bootstrap: 4
- jquery: 3

## Ferramentas de Desenvolvimento e Versionamento
- IDE: Visual Studio Code
- Versionamento: GIT (GitHub)

## Estrutura das pastas
O projeto é baseado em componentes

- `pasta enuns`: Organizar os enuns da aplicação
- `pasta exceptions`:  Organizar as classes utilizadas para trabalhar regras para mensagens de exceções
- `pasta pipes`: Organizar os pipes da aplicação

## Dependências
O projeto utiliza bibliotecas/APIs externas para algumas funcionalidades da aplicação

Utilizadas:
- `@brunoc/ngx-viacep: 2.1.2`: Para consulta de cep via api externa
- `ngx-pagination: 4.1.0`: Para paginação dos resultados na tela de listagem do sistema
- `ng-multiselect-dropdown-angular7: 0.1.5` : Para aplicar a funcionalidade do campo multiselect

## Instalação
Clonar o projeto do repositório `https://github.com/fabioaguir/transportadora-front-end.git` no GitHub,
estando com o ambiente configurado para Angular, executar na pasta do projeto o comando `npm install` para instalar as dependências
