# Puppeteer - Sample

## 📖 Sobre o Projeto
Este projeto é um repositório base para execução de scraping de páginas web com o Puppeteer, utilizando Docker para facilitar a hospedagem e isolamento do ambiente.

## 🚀 Tecnologias e Ferramentas
O projeto foi criado em JavaScript (mas pode ser facilmente convertido para TypeScript) com o Puppeteer e utiliza um Dockerfile para simplificar o uso.

#### Bibliotecas e Tecnologias Utilizadas:
| Tecnologia           | Versão    |
|----------------------|-----------|
| **Runtime**           |           |
| Node                  | v18.x     |
| **Desenvolvimento**   |           |
| Docker Engine         | vXX.X.X   |
| Bundler               | v2.6.0    |

### Organização do Projeto

```
/
├─📁 .devcontainer     -> Configurações do ambiente de desenvolvimento (Devcontainer)
├─📁 docs              -> Artefatos de documentação
├─🇯 scraping.js       -> Ponto de entrada da aplicação
├─📄 .gitignore        -> Arquivos e pastas ignorados pelo Git
├─📄 Makefile          -> Automação de tarefas
├─📄 README.md         -> Este arquivo
```

## 🛠️ Configuração do Ambiente de Desenvolvimento

Este repositório está configurado para rodar em um **Devcontainer** no VSCode. Siga os passos abaixo para instanciar o ambiente.

### Extensões Recomendadas

- **Nome**: Remote Development
- **Id**: `ms-vscode-remote.vscode-remote-extensionpack`
- **Descrição**: Pacote de extensões que permite abrir pastas em containers, máquinas remotas ou WSL com todas as funcionalidades do VSCode.
- **Versão**: 0.25.0
- [VSCode Marketplace Link](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

### Docker Engine

É necessário ter o Docker Engine instalado. Veja o guia de instalação para seu sistema operacional [aqui](https://docs.docker.com/engine/install/).

### Procedimento para Instanciar o Projeto no VSCode

1. Instale o pacote de extensões recomendadas.
2. Clone ou faça fork deste repositório.
3. Abra o diretório do projeto no VSCode.
4. Execute o comando _Dev Containers: Reopen in Container_ na paleta de comandos do VSCode (_F1, Ctrl+Shift+P_).

Após a configuração do Devcontainer, o VSCode abrirá o projeto dentro de um ambiente isolado, conforme definido no diretório **/.devcontainer**.

## 🚀 Iniciando a Aplicação

1. Para iniciar o scraping (instalar as dependências e configurar o ambiente):
    ```sh
    make scraping
    ```

### Gerenciamento de Dependências

1. Instale uma nova biblioteca:
    ```sh
    npm install <nome_da_lib>
    ```

## 📖 Caso Prefira sem o Devcontainer

Se você preferir configurar e executar o projeto sem usar o devcontainer, siga as instruções abaixo:

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 6 ou superior)
- Docker (opcional, se desejar usar o Docker para executar o Puppeteer)


### Executando o scraping

1. **Execute o scraping:**

    ```sh
    make scraping
    ```

2. **(Opcional) Execute o scraping usando Docker:**

    Se preferir usar Docker para isolar o ambiente de execução, você pode construir e executar o contêiner Docker:

    ```sh
    docker build -t puppeteer-scraping .
    docker run --rm -it puppeteer-scraping
    ```

### Personalização

Você pode personalizar o script de scraping editando o arquivo `scraping.js`. Por exemplo, você pode alterar o alvo do scraping, ajustar opções de navegação ou definir os dados a serem extraídos. Se preferir, você também pode aplicar uma arquitetura mais limpa, organizando o código em pastas e criando múltiplos arquivos `scraping.js` para diferentes tarefas de scraping.
