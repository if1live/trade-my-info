
## options.helpers

> Helpers manipulate the output of variables

For the most part helper expressions follow this pattern: `\{{ helper_name variable_name }}`. For example:

```
<title>\{{ uppercase title }}</title>
```
Renders to:

```
<title>PAGE TITLE</title>
```

## Custom helpers
Custom helpers may be loaded with the current engine via `options: { helpers: []}` in the assemble task or target. But _any helpers registered at the target level will override task-level helpers_.

Globbing patterns may be used to specify paths to the helpers to be loaded:

```js
assemble: {
  options: {
    helpers: ['./lib/helpers/**/*.js']
  }
}
```

### Registering custom helpers

Helpers can either be an object or a single `register` function. If `register` is on the object, then it calls the `register` function passing in the engine, otherwise each method is registered as a helper. For example, the following will result in 2 helpers being registered:

```js
module.exports.foo = function(msg) { return msg; };
module.exports.bar = function(msg) { return msg; };
```

And this will result in the `foo` helper getting register directly through Handlebars:

```js
module.exports.register = function(Handlebars, options) {
  Handlebars.registerHelper('foo', function(msg) {
    return msg;
  });
};
```

The `Handlebars.registerHelper` method takes the name of the helper and the helper function as arguments. Handlebars.js then takes whatever is returned from the helper function and writes it out to the template, _so be sure to always return a string from your custom helpers_.


## Passing `assemble.options` into helpers
Any `assemble.options` may be passed to custom helpers when the helper defines the `register` method. For example:

Given our `Gruntfile.js` has the following `assemble` task configuration:

```js
assemble: {
  options: {
    version: '0.1.0', // or we could use '<%= pkg.version %>'
    helpers: ['lib/helpers/**/*.js']
  },
  blog: {
    files: {
      'articles/': ['src/posts/*.md']
    }
  }
}
```

And given we have defined a custom helper, `opt`, which gets properties from the `assemble.options` object and returns them:

```js
module.exports.register = register = function(Handlebars, options) {

  Handlebars.registerHelper('opt', function(key) {
    return options[key] || '';
  });

};
```

We can now user our helper in a Handlebars template like this:

``` html
<div>Version: v\{{opt 'version'}}</div>
```

And the output would be:

``` html
<div>Version: v0.1.0</div>
```

## Related Info

* [Helpers][]
* [Options][]