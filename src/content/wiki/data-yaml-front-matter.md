

> YFM is an **optional** section of valid YAML that is placed at the top of a page and is used for maintaining metadata for the page and its contents. 

**Actually**, YFM can be used with both [pages][pages] and [partials][partials], so _unless otherwise noted_ you can safely assume that when the documentation YFM of a page, the same applies for YFM of a partial. 


## Table of Contents

* YFM in "pages" (a "page" is any file specified in the `src` property of a task or target)
* YFM in partials
* Metadata
* Content
* Config data
* Lo-Dash templates in YFM


TOPICS TO COVER
* structured data for the file and/or its contents
* supply metadata
* define configuration settings, options 
* specify variables, built-in or custom
* use lo-dash templates to bring the power of JavaScript to your YFM

Use cases:
* collections
* permalinks
* lo-dash templates: time, date, metadata "pipeline"


## YFM "Variables"

### Built-in Variables

 * `layout` : Optionally define or override the layout to use. You must include file extension, since Assemble can process multiple file types. Layout files can exist in any directory, and may be.
 * `published` : set to `false` to exclude a file from being rendered by a task-target.
 * `category`/`categories`/`tags` : Define the categories and tags as [YAML lists](http://en.wikipedia.org/wiki/YAML#Lists or a space-separated string) or a space-separated string. for each category and tag, Assemble will generate a page in the `dest` directory.

If set, allows to specify tags attributed to given entry. Tag pages are generated automatically. Entry may belong to more than one tag, use YAML List to specify multiple tags.

### Custom Variables

Any variables in the front-matter that are not predefined are mixed into the data that is sent to the Liquid templating engine during the conversion. For instance, if you set a title, you can use that in your layout to set the page title:

``` html
<title>\{{ page.title }}</title>
```


## Using Lo-Dash templates in YFM

### Metadata "conduit"

This may not be obvious at first, is that YAML Front-Matter acts as a kind of "conduit" for passing information to pages via Lo-Dash templates. 

So you could do this:

``` js
grunt.initConfig({
  assemble: {
    component: {
      options: {
        data: 'page.json'
      },
      files: {
        'index.html': ['src/pages/*.hbs']
      }
    }
  }
});
```

With `page.json` containing:

``` json
{
  "index": {
    "title": "Home"
  },
  "about": {
    "title": "About Us"
  }
}
```

And the [YAML Front-Matter]() of the page, use underscore templates:

``` yaml
---
title: <%= page.index.title %>
---

YAML front matter
```

Alternatively, inside the Grunfile you can use `grunt.config.set` to define the data to be used for a given variable: 

``` js 
grunt.config.set('page.index.title', 'Home');
```

### Example usage

``` html
---
title: 
list: <% _.forEach(people, function(name) { %><li><%= name %></li><% }); %>
people:
- Jon Schlinkert
- Brian Woodward
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>YAML front matter</title>
  </head>
  <body>
    <section class="people">
      <ul>
        
      </ul>
    </section>
  </body>
</html>
```


``` yaml
---
layout: default.hbs
title: Early humans discovered...
description: Lots of things, because they were early humans. 
date: 2013-07-04
categories:
- anthropology
- unibrows
- various wooly animals
tags:
- rocks
- wheel
- 30 inch wooden rims
published: false 
---
```




``` html
--- 
title: My Blog
description: Like I said, my bloggg!
example:
  custom:
    variables:
    - one
    - two
    - three
---
<div class="page-header">
  <h1>YAML front matter</h1>
  <p class="lead"></p>
</div>

<ul>
  
</ul>
```


## YAML Front-Matter in Partials

``` html
---
title: <%= component.name ][ pkg.name %
require: [<%= title %>.css, <%= title %>.js]
---
<!-- \{{title}} -->
<div class="row">
  <div class="span3">
    <div class="dropdown">
      <div>User Settings</div>
      <ul class="dropdown-menu">
        <li><a href="#">My Profile</a></li>
        <li><a href="#">Friend Requests</a></li>
        <li><a href="#">Account Settings</a></li>
        <li><a href="#">Support</a></li>
        <li><a href="#">Log Out</a></li>
      </ul>
    </div>
  </div>
</div><!-- /\{{title}} -->
```


``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>\{{ titleize component }} Component</title>
    <link rel="stylesheet" href="\{{assets}}/css/\{{component}}.css">
  </head>
  <body>
    <div class="container">
      \{{> body }}
    </div>
    <script src="\{{assets}}/js/\{{component}}.js"></script>
  </body>
</html>
```

### Rendering Lists

Use [YAML Associative Arrays](http://en.wikipedia.org/wiki/YAML#Associative_arrays_of_lists) for rendering lists of information.

Indented Blocks, common in YAML data files, use indentation and new lines to separate the `key: value` pairs

``` yaml
---
title: Associative arrays
people:
  name: John Smith
  age: 33
```

Inline Blocks, common in YAML data streams, use comma+space to separate the `key: value` pairs between braces:

``` yaml
morePeople:  {name: Grace Jones, age: 21}
---
```
Used like this:

``` html
<div class="page-header">
  <h1>\{{{title}}}</h1> 
</div>

<div class="examples">
  <h4>Associative arrays</h4>
  <dl class="dl-horizontal">
    \{{#people}}
      <dt>Name:</dt> <dd>\{{name}}</dd>
      <dt>Age:</dt>  <dd>\{{age}}</dd>
    \{{/people}}
    \{{#morePeople}}
      <dt>Name:</dt> <dd>\{{name}}</dd>
      <dt>Age:</dt>  <dd>\{{age}}</dd>
    \{{/morePeople}}
  </dl>
</div>
```

### [More examples](https://assemble/assemble/test/actual/yaml)

See some great usage examples in assemble's [YAML test files](https://assemble/assemble/test/actual/yaml):

* YAML associative arrays
* YAML block literals
* YAML comments
* YAML data files
* YAML data types
* YAML documents
* YAML lists
* YAML relational-trees
* YAML variables





**Please note**: _YFM cannot be parsed if it is not the first thing on the page_.


[YAML Front-Matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) was made popular by Jekyll, the "blog-aware, static site generator" that powers GitHub Pages.


* YAML front-matter is **optionally** used at the beginning of a page to define metadata for the page's content. 
* In order for YAML front-matter to be processed, it _must be the first thing at the top of the page_, and 
* To be valid, it must be "wrapped" with three leading dashes (above) (`---`) and three dashes following (below) (`---`).

Example:

``` html
---
title: YAML front-matter
description: A very simple way to add structured data to a page.
---

"Front matter is essentially metadata about the document its attached to, formatted in such a way that it does not get in the way. In other words, if you don't know its “Front Matter”, you probably wouldn't wonder what it is, or what its doing there."



<h1> \{{ title }} </h1>
<p>Page content here... \{{ eieio }}</p>
```



## FAQ

* With [Assemble](https://github.com/assemble/assemble) you may do [just about anything](https://github.com/assemble/assemble/tree/master/test/YAML) with YAML front matter that you can do with [valid YAML](http://www.yaml.org/spec/1.2/spec.html)
* YFM must be [valid YAML](http://www.yaml.org/spec/1.2/spec.html) 
* YFM cannot be parsed if it is not the first thing on the page
* [Assemble](https://github.com/assemble/assemble) parses YAML front matter into an object literal.
* YFM allows you to define variables for a page, directly inside the page.

**Custom Variables**
* You may use any of the default variables provided by Assemble, or you may define your own custom variables inside the YFM of a file.
* You may add as many custom variables as you require

**Lo-Dash Templates**
* You may use underscore [Lo-Dash templates][lodash] in YFM
* Assemble exposes all variables defined in YAML front-matter to the page in which they were defined, thus...
* Using [Lo-Dash templates][lodash] in YFM enables programmatic access to those pages across your project.
* YFM may be used in any file that Assemble processes through any of the [src-dest or files mappings formats][files] available in Grunt.js. 


### Recommended usage
* YFM is best used for structured data, like configuration settings or metadata for a page, as opposed to long-form content.
* YFM offers an easy way to maintain metadata or rendered data for pages and partials, as an _optional_ alternative to using "external" `.json` or `.yaml` data files


### Not recommended
* YFM isn't the best option for long-form content or extensive amounts of metadata. In these cases you might want to consider externalizing your data to [JSON][] or [YAML][] files instead.



## Related info

* [YAML data][YAML]
* [JSON data][JSON]


## External links

* [js-yaml "online"](http://nodeca.github.io/js-yaml/) allows you to play with YAML in the browser.
* [YAML specification](http://www.yaml.org/spec/1.2/spec.html) 
* [http://www.yaml.org/](http://www.yaml.org/)
* [wikipedia page about YAML](http://en.wikipedia.org/wiki/YAML) 

