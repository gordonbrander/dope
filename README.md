# Dope

![Node.js CI status](https://github.com/gordonbrander/dope/actions/workflows/node.js.yml/badge.svg?branch=main)

Utilities for data-oriented programming (DOP).

- Immutable data helpers (`freeze.js`)
- Deep getters/setters (`kv.js`)
- Data schema validation (`contract.js`)
- "Optionals" using nullish values (`maybe.js`)
- Functional polymorphism (`singledispatch.js`)
- Function composition (`compose.js`)

## What is Data-Oriented Programming?

DOP? It's kind of like minimum viable functional programming:

- Separate code from data.
- Use ordinary functions. Prefer pure functions. Avoid methods.
- Use generic data structures (arrays, plain objects). Avoid classes.
- Prefer immutability. Avoid state mutation.

It's simpler than you think. These guidelines work in any kind of language, OOP or functional languages, and they result in code that is easy to understand, easy to parallelize, easy to serialize.

DOP resources:

- [Talk: Data-Oriented Programming at GOTO 2023](https://www.youtube.com/watch?v=zSHvEAKLFJw) (Yehonathan Sharvit, GOTO 2023)
- [Data-oriented Programming](https://www.manning.com/books/data-oriented-programming) (Yehonathan Sharvit, Manning, 2022)