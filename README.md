# Notes

-   Ранее не работал с: graphql, type-graphql, typedi.
-   Работы заняли 12 часов (много "детских" ошибок из-за изучения нового).
-   TDD не использовался, т.к. слишком много материала было "в новинку".
-   Тесты писал интеграционные (проверка всей цепочки от входа API до DB).
-   DB разворачивается docker-ом, и пробрасывается на стандартный порт 5432.
-   Получение автора реализовал двумя методами, через relations в DB entity (поле author) и через fieldResolver (поле authorByResolver).
-   Разделение сущностей на трио: GraphQL, Domain, Repository (typeorm) - для уменшения связанности и возможности "мокать" любую часть.
-   Не сделал, если важно для оценки - дополню:
    -   валидацию;
    -   "красивую" обработку ошибок;
    -   Dockerfile;
    -   мелкие улучшения;
-   Не нравится:
    -   текущая реализация тестов, ее надо "переварить" и упростить (сейчас тесты "сложно-читаемы");

# Init

```bash
# create .env.dev with config's data
cp .env-template .env.dev

# run tests
npm run test

# tun server (in dev mode)
npm run start:dev
```

```
mutation {
  createAuthor(
    data:{
      name: "test author"
    }
  ) {
    authorId
    name
  }
}

mutation {
  createBook(
    data:{
      name: "test book",
      pageCount: 20,
      authorId: 1
    }
  ) {
    bookId
    name
    pageCount
    author {
      authorId
      name
    }
  }
}

{
  findBooks {
    bookId
    name
    authorId
    author {
      authorId
      name
    }
    authorByResolver {
      authorId
      name
    }
  }
}

mutation {
  updateAuthor(
    id: 1
    data:{
      name: "test author updated"
    }
  ) {
    authorId
    name
  }
}

mutation {
  updateBook(
    id: 1
    data:{
      name: "test book updated"
    }
  ) {
    bookId
    name
    pageCount
    author {
      authorId
      name
    }
  }
}

```

# TODO

-   ADD: import '@...'
-   ADD: correct error processing
-   ADD: validation (class-validator)
-   ADD: Dockerfile
-   TBD: naming of domain's files
-   TBD: naming Token<...>
-   TBD: typeorm: separate schema
