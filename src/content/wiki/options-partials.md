



## Registering Partials

Assemble automatically registers any partials supplied via the `partials` option at the task or target levels. 

``` javascript
assemble {
  docs: {
    options: {
      partials: ['src/templates/partials/**/*.md']
    },
    files: {
      'docs/': ['src/templates/pages/*.md']
    }
  }
}
```

### Task-target behavior

Any partials registered at the _task_ level are are also available at the _target_ level. 

**Important!** It is standard in Grunt.js for target-level options to overwrite task-level options. However, assemble merges the list of partials defined at the task-level with the partials defined for each target. 


## Usage examples

### Ways to apply context to partials

#### "Inline"

You can establish context inside the partials:

``` handlebars
\{{> module module.panel-primary}}
\{{> module module.panel-info}}
\{{> module module.panel-success}}
\{{> module module.panel-warning}}
\{{> module module.panel-danger}}
\{{> module module.panel-query}}
```

#### Block expressions

Wrap partials in block expressions and either set the context on the partial:

``` handlebars
\{{#module}}
  \{{> module panel-inverse}}
  \{{> module panel-success}}
  \{{> module panel-info}}
\{{/module}}
```

Or on the section tags:

``` handlebars
\{{#module.panel-base}}
  \{{> module }}
\{{/module.panel-base}}
```
