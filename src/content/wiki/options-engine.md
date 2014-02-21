

## `init` method

Describes `init` method to `assemble.engine`, and exposes engine on `assemble.engine`.


### Custom Engines

If you don't wish to use Handlebars as your templates engine, you may add your own engine by providing an `init` function that takes in options from the assemble task/target. You may also override the `init` function in the task/target options by providing an `initializeEngine` function that takes the engine and the options:

```js
assemble: {
  options: {
    engine: 'consolidate',
    initializeEngine: function(engine, options) {
      engine.engine.swig.init(options);
    }
  },
  docs: {
    files: {
      'docs/': ['src/templates/**/*.tmpl']
    }
  }
}
```

Assemble will attempt to load an engine and automatically add it's own wrapper methods around it while holding an instance of the engine. This is a way for engine plugin authors to write adapters between other engines and assemble's wrapper. To make these functions on the options useful, we've exposed the underlying engine through the `assemble.engine` object so **developers can use the raw engine**. 

This is particularly useful when **a)** a library such as [consolidate][] is used, where the engine is `consolidate`, and **b)** the developer wants to use another engine such as [handlebars](https://github.com/wycats/handlebars.js), [swig](https://github.com/paularmstrong/swig), [mustache](https://github.com/janl/mustache.js) etc.

* The `init` function allows assemble to pass in options to be used in initializing this engine plugin.
* `init` function is exposed, and [helper-lib](https://github.com/assemble/helper-lib) is registered inside the init so that options can be passed in.

Admittedly, the `engine.engine` syntax is strange. This is "alpha", so feedback and pull requests are especially welcome if you have ideas for improving this.
