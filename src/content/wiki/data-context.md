

> In Assemble, context is the current JSON data object that templates can use.

If you are unfamiliar with how Handlebar templates work, please visit the [Handlebar documentation](http://handlebarsjs.com/) for more information. Also see Assemble's wiki page for [Templates][] and [Data][].


## Context in Handlebars
In Handlebars, every template has a context. Blocks such as \{{#if}} create "inline" templates, and the "if" helper then determines in which context to render the template.

Some helpers, like \{{#if}}, preserve the current context, while others such as \{{#each}} and \{{#with}} _change the context_ in different ways. _Helpers can even change the context to something totally new if they want_:

```
options.fn({ 
  published: true 
})
```

Handlebars also supports nested contexts, making it possible to look up properties nested below the current context. Nested handlebars paths can also include `../` segments, which evaluate their paths against a parent context. 

The `..` feature means "look this up on the context of the parent template". In some cases, that will amount to the parent in the current object (with). In other cases, it will not. In cases like if, which preserve the context, .. will happen to point to the same object, but this is just a coincidence. In all cases, `..` is lexically bound to the parent template.


## The "context" object
The context object is just a [JSON data][JSON] object that when passed to the compiled template function becomes the value of this inside your template. You must use the name of the associated [data file][Data] to access properties and call helper methods on the context object. 

### Example

Given we have a data file `alert.json` that contains the following properties:

``` json
{
  "title": "Heads up!"
}
```

In our template `alert.hbs`, we will now look up the properites of `alert.json` by using the name of the file, `alert`, as the current context. So to retrieve the `title` property, we would do this:

``` handlebars
<h1>\{{alert.title}}</h1>
```
Which renders to:

``` html
<h1>Heads up!</h1>
```


## Root context
In Assemble, the root of the context is where the data object starts. Everything under the root is a child property. Also, when a variable is at "the root of the context" the variable may be used as-is, or "raw", enabling you to look up properties _for the "current" object_ without nesting the context _within_ the current object. In other words, the "path" of the current object does not need to be appended to the variable, so instead of `about_us.title`, you may simply use `title`. 

### Example

In `layout.hbs` we will use `\{{title}}` to lookup the `title` property on each page that is passed into the layout.  

``` handlebars
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>\{{title}}</title>
  </head>
  <body>
    \{{> body }}
  </body>
</html>
```




## The "data" object
When data is added directly to a file named `data.json` (or `data.yml`) it will be loaded _directly into the root of the context_ by Assemble. Note that your templates will need to be namespaced differently than if you put data into a file called `myData.json`. 

For example, given we have a file named `data.json` with:

```json
{
  "title": "My Title"
}
```
Inside `myTemplate.hbs`, we would use:

```handlebars
\{{title}}
```

However, using the same example but with a file named `myData.json`, the data must now be accessed using the name of the file. 

So, given we have `myData.json` with:

```json
{
  "title": "My Title"
}
```
Out template, `myTemplate.hbs`, would have:

```handlebars
\{{myData.title}}
```



## "this" expression

You can use the `this` expression in any context to refer to the current context. 

For example (from http://handlebarsjs.com/), inside the `\{{#each}}` block, you can use `this` to reference the element being iterated over.

``` handlebars
<ul class="people-list">
  
</ul>
```
when used with this context, `people.json`:

``` json
[
  "Jon Schlinkert",
  "Brian Woodward"
]
```
will result in:

``` html
<ul class="people-list">
  <li>Jon Schlinkert</li>
  <li>Brian Woodward</li>
</ul>
```

[templates]: https://github.com/assemble/assemble/wiki/Templates