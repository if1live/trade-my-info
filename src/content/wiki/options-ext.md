
## options.ext

> Specify the file extension to use on dest files. Extensions can be specified at the task and target-levels.

Type: `String` (optional)
Default: `.html`


## Overview
When planning out the strategy for your build targets, [templates][templates] and [data][data], don't forget to take the `ext` variable into consideration. `ext` opens up a few doors by "bending the rules" around how your source files will be compiled or rendered.  

In 90% of cases, the `ext` option will not be needed, and simply using the `.hbs` file extension on your [templates][templates] will suffice. However, in scenarios where you are using mixed content, say HTML and markdown with Handelbars templates embedded in one or both formats, you may need to use the `ext` option to esure that you get the output you need. 

### Mixed content: Markdown and HTML together

Consider the following scenario:

* Your page content and/or blog posts will be written in [markdown][markdown] format
* You want to embed Handlebars templates in your markdown content for certain types of metadata, such as links, date/time, etc.
* Your page [layouts][layouts] are made from HTML, but they also with embedded with Handlebars templates
* Your end goal is for all of your markdown content to be rendered to HTML in the output.

 and you want your need to compile some markdown files to HTML, and you want to use other markdown files as "includes" or "partials" inside other markdown files, in which case you want the markdown files to be rendered _as markdown_ in the output. You may even want to embed Handlebars templates inside your markdown files to be parsed and compiled. 



## Extensions map

### Whitelisted extensions
As of NaN/NaN/NaN NaN:NaNAM, Assemble's extensions map "whitelists" the following extensions:

**Handlebars extensions**

* `handlebar : handlebars`
* `handlebars: handlebars`
* `hb        : handlebars`
* `hbars     : handlebars`
* `hbrs      : handlebars`
* `hbs       : handlebars`
* `hbt       : handlebars`
* `htm       : handlebars`
* `html      : handlebars`
* `mustache  : handlebars`
* `template  : handlebars`
* `tmpl      : handlebars`
* `tpl       : handlebars`

**Markdown extensions**

* `markd   : markdown`
* `markdown: markdown`
* `md      : markdown`


### Forcing non-whitelisted extensions

If you need Assemble to process templates in files with an extension that isn't in [extensions.yml](https://github.com/assemble/assemble/blob/master/lib/engine/extensions.yml), you must _explicitly define the template engine in the task/target options to force Assemble to process your templates._

So given this example:

``` js
assemble: {
  options: {
    engine: "Handlebars" // case insensitive
  },
  files: {
    'dist/': ['src/pages/*.snickerdoodle']
  }
}
```
So now that we have defined an engine, Handlebars, Assemble knows to use that engine to process templates with the `.snickerdoodle` extension. Even better, your templates will also be compiled into delicious Christmas cookies with cinnamon and sugar sprinkled on top. 



## Example usage
Here are some examples that cover common use cases.


### Markdown-to-markdown
If your repo is on GitHub, it's a safe bet you're using markdown format on your READMEs and wikis. Here we're going to show you how to use templates to generate markdown files, so if you work on big projects, or a lot of projects, you can potentially reduce the amount of time you spend updating documentation, changelogs, links, common metadata and so on. 

Now, of course there are many ways to accomplish the same goal, this is an example so we're going for simplicity. Here's what we want to accomplish:

* `src` content _written_ in markdown
* `src` content contains templates, 
* Metadata for templates must come from a single source, say `package.json` (this is arbitrary, you can use more than one  file if you want, `.yml` format is fine too)
* generated `dest` files must remain in markdown format. In other words, we want Assemble to process the templates, but not to convert the markdown to HTML. 

Here is what we need to do:

Example configuration:

``` js
assemble: {
  options: {
    data: 'src/data/readme.yml',
    partials: 'src/content/*.hbs',
    ext: '' // add the "empty" ext property
  },
  readme: {
    files: {
      './': ['src/templates/README.md.hbs']
    }
  }
}
```

Our goal here is to tell the `assemble` task to treat the `src` markdown files as regular content. In other words we don't want the task to convert the markdown files to HTML, so we use a sort of trick that allows us to write our README content in markdown along with embedded Handlebars templates. 

Our goal here is to tell the `assemble` task.

Here, we tell the `assemble` task not to use an extension on `dest` files by leaving `ext: ''` blank. We do this because our templates have the extenions `.md.hbs` and assemble only slices off the last extension at build time. So by 1) telling assemble not to add another extension to the rendered templates, and 2) by naming our template files with the `.md.hbs` extension, we 


### markdown-to-HTML

Common use cases:

* Blog posts written in markdown, converted to HTML for a live site.
* gh-pages documentation

``` js
assemble: {
  options: {
    engine: "Handlebars" // case insensitive
  },
  files: {
    'dist/': ['src/pages/*.md.hbs']
  }
}
```
Rendered pages will have the `.html` extension by default.



[extensions.yml]: https://github.com/assemble/assemble/blob/master/lib/engine/extensions.yml "Valid extensions in Assemble"