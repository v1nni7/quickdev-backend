# QuickDev - BackEnd


## 📌 Sobre 

Backend desenvolvido para uma aplicação de rede social. A API foi construida usando ExpressJS e Prisma como principais tecnologias.

## 🚀 Tecnologias

<details>
  O ExpressJs é um framework web rápido e minimalista para o Node.js. Ele é amplamente utilizado na construção de aplicativos web e fornece uma abordagem simplificada para lidar com rotas, middleware e solicitações HTTP. O ExpressJs foi escolhido para este projeto devido à sua simplicidade, desempenho e grande quantidade de recursos disponíveis.
  <summary>ExpressJs</summary>
</details>

<details>
  O Prisma é uma ferramenta de ORM (Object-Relational Mapping) moderna e poderosa que simplifica a interação com o banco de dados. Ele oferece suporte a vários bancos de dados populares e fornece uma API amigável para consultar e manipular dados. O Prisma foi escolhido como a tecnologia de persistência de dados para o QuickDev devido à sua facilidade de uso, desempenho e segurança.
  <summary>Prisma</summary>
</details>

<details>
  Joi é uma biblioteca de validação de dados para JavaScript. Ela permite definir esquemas de validação detalhados para validar e converter dados recebidos na API. O Joi facilita a validação dos dados de entrada e garante que os dados estejam no formato correto antes de serem processados pelo backend.
  <summary>Joi</summary>
</details>

<details>
  Json Web Token é um padrão aberto para a criação de tokens de acesso seguro e compactos. Ele é comumente usado para autenticação e autorização em aplicativos web e APIs. No QuickDev, o JWT é utilizado para gerar tokens de acesso e permitir que os usuários autenticados realizem ações específicas na plataforma.
  <summary>Json Web Token (JWT)</summary>
</details>

<details>
  O Jest é uma estrutura de teste de código aberto amplamente utilizada devido à sua simplicidade, cobertura abrangente e velocidade de execução. É especialmente popular em projetos JavaScript, como aplicações React e Node.js.

  <summary>Jest</summary>
</details>

<details>
O PostgreSQL é um sistema de gerenciamento de banco de dados relacional de código aberto conhecido por sua confiabilidade, estabilidade e recursos avançados. Ele oferece uma ampla gama de funcionalidades, além de uma comunidade ativa e suporte abrangente.

<summary>PostgreSQL</summary>
</details>

<details>
O TypeScript é uma linguagem de programação desenvolvida pela Microsoft que adiciona tipagem estática opcional ao JavaScript. Com a tipagem estática, o TypeScript traz benefícios como detecção de erros em tempo de compilação e melhor autocompletar, além de integração com ferramentas e IDEs que melhoram o desenvolvimento do projeto.

<summary>TypeScript</summary>
</details>

<br>

Essas tecnologias foram escolhidas para o backend do QuickDev por suas características e benefícios específicos. Elas ajudam a construir uma aplicação escalável, segura e de alto desempenho, permitindo que os desenvolvedores se concentrem na lógica de negócios principal da plataforma.


# ⚙ Executando o projeto

1. Clone o repositório para o seu ambiente de desenvolvimento.

```bash
git clone https://github.com/v1nni7/quickdev-backend.git
```

2. Navegue até o diretório clonado do projeto
```
cd quickdev-backend

# Caso tenha mudado o nome do diretório
cd nome-do-diretorio
```

3. Instale todas as depências

```bash
npm i 
```

4. Crie e configure o arquivo `.env.development`, utilizando as variáveis de ambiente definidas no arquivo `.env.example`.

5. Execute as migrations do banco

```bash
npm run migrate:dev
```

6. Execute o servidor

```
npm run dev
```

Após executar essas etapas, o projeto será iniciado e estará disponível localmente no endereço fornecido no **terminal** pelo servidor de desenvolvimento. Certifique-se de que todas as etapas foram concluídas com êxito antes de começar a usar a aplicação.

# ⚙ Executando os testes

1. Conclua os passos 1 ao 3 do tutorial `Executando o projeto`

2. Crie e configure o arquivo `.env.test`, utilizando as variáveis de ambiente definidas no arquivo `.env.example`

3. Execute as migrations do banco

```bash
npm run migrate:test
```

4. Execute os testes

```
npm t
```


Feito com ❤️ por **Vinicius Cezar** 👋🏽 [Entre em contato!](https://www.linkedin.com/in/vinicius-silveira-cezar/) 




