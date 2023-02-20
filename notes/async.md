# Promises

- a promise is a function
- depending on whether the promise succeeds or not, other functions will be called
  - if it succeeds, the function you define in `promise.then()` will be called
  - if it fails, the function you define in `promise.catch()` will be called
  - can also have a `promise.finally()` function
- these functions can be defined at the same time that you create a promise, or outside of it

```ts
 const number = 1;

  new Promise((resolve, reject) => {
    if (number % 2 === 0) {
      resolve("Even");
    } else {
      reject("Odd");
    }
  })
    .then((resolvedValue) => {
      console.log("then");
      response = `The number is ${resolvedValue}`;
    })
    .catch((rejectedValue) => {
      console.log(rejectedValue);
      response = `The number is ${rejectedValue}`;
    })
    .finally(() => {
      console.log("finally");
      res.send(response);
    });
});
```

- the code will run in order; if there is code after you define your promise, it will probably run first
- the promise will run as a child process
- if you want to force your code to stop and wait for the promise to finish, you can use `await`

# Async Await

- if you don't include `async` for the method and `await` for the promise, then `res.send(response)` will run before the promise resolves and "You didn't wait for me" will be returned
- since we did include those, the subsequent code will not be executed until the promise is resolved

```ts
app.get("/", jsonParser, async (req, res) => {
  let response = "You didn't wait for me";

  const number = 1;

  // IS EVEN
  await new Promise((resolve, reject) => {
    // Even or odd
    if (number % 2 === 0) {
      resolve("Even");
    } else {
      reject("Odd");
    }
  })
    .then((resolvedValue) => {
      console.log("then");
      response = `The number is ${resolvedValue}`;
    })
    .catch((rejectedValue) => {
      console.log(rejectedValue);
      response = `The number is ${rejectedValue}`;
    });

  res.send(response);
});
```

The same function can be written without arrow functions:

```ts
async function asyncFunction(): Promise<string> {
  const number = 1;
  return new Promise((resolve, reject) => {
    // Even or odd
    if (number % 2 === 0) {
      resolve("Even");
    } else {
      reject("Odd");
    }
  });
}

app.get("/", jsonParser, async (req, res) => {
  let response = "You didn't wait for me";

  response = await asyncFunction();

  res.send(response);
});
```

You can use `Promise.all` to wait for several promises to successfully resolve, or `Promise.allSettled` to wait for them to either successfully or unsuccessfully resolve.

```ts
app.get("/lotsOfPromises", jsonParser, async (req, res) => {
  let response = "You didn't wait for me";

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const promises = numbers.map((number) => {
    return new Promise((resolve, reject) => {
      // Even or odd
      if (number % 2 === 0) {
        resolve("Even");
      } else {
        reject("Odd");
      }
    });
  });

  await Promise.all(promises)
    .then((results) => {
      console.log(results);
      response = "All numbers are even";
    })
    .catch((err) => {
      console.log(err);
      response = "At least one number is odd";
    });

  // Allsettled (then always)
  await Promise.allSettled(promises)
    .then((results) => {
      console.log(results);
      response = results.map((result) => result.status).join(", ");
    })
    .catch((err) => {
      console.log(err);
    });

  res.send(response);
});
```
