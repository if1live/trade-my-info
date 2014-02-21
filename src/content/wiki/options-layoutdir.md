

## options.layoutdir

> Path to the directory to be used as the "cwd" for layouts

`layoutdir` makes maintaining [layouts][options-layout] a little easier on projects that require more than one layout. The primary advantage of using the feature is that you can change or rename the directory where your layouts are stored without having to update the path to each layout used throughout your project. It could also reduce some clutter in the [Gruntfile](http://gruntjs.com) and [YAML Front Matter][yaml-front-matter].

Additionally, a `layoutdir` can be defined for each [targets][targets], allowing for even greater control over how [layouts][] are used in your projects.


## Usage Examples

### Without `layoutdir`
When `layoutdir` _is not defined_, each layout must be defined using the _full path from the project root to the layout_:

```
assemble: {
  options: {
    layout: 'src/templates/layouts/default-layout.hbs'
  },
  docs: {
    options: {
      layout: 'src/templates/layouts/docs-layout.hbs'
    },
    ...
  },
  blog: {
    options: {
      layout: 'src/templates/layouts/blog-layout.hbs'
    },
    ...
  }
  // etc.
}
```

This also applies to [YAML front matter][yaml-front-matter] when it is necessary to "override" layouts at the page-level:

``` html
---
title: Blog
layout: src/templates/layouts/blog-layout.hbs
---
```


### With `layoutdir`

When `layoutdir` is defined only require the name of the layout to be used (_must include the file extension_):

```
assemble: {
  options: {
    layoutdir: 'src/templates/layouts',
    layout: 'default-layout.hbs'
  },
  docs: {
    options: {
      layout: 'docs-layout.hbs'
    },
    ...
  },
  blog: {
    options: {
      layout: 'blog-layout.hbs'
    },
    ...
  }
  // etc.
}
```

And in [YAML front matter][yaml-front-matter]:

``` html
---
title: Blog
layout: blog-layout.hbs
---
```


## A Word of Caution
While `layoutdir` can make your project a little easier to manage, it is strongly recommended that you **establish clear and consistent conventions for your layouts, and follow them**. Otherwise, this feature might end up causing more problems than it solves. 

Here are some recommendations.

* Use names such as `default-layout.hbs` versus simply `default.hbs`, and
* Use a unique name for each layout used throughout a project. 

### Why clear naming conventions are important

To understand why this is important, imagine that you're project has three "sub-projects", or [targets][]: `components`, `docs` and `blog`, and that each target has a different layout. This is a fairly basic, common scenario. But remember that each may also have its own `layoutdir` as well, which creates potential for conventions that lead to using the wrong layout accidentally, such as this:

#### Dont' do this

```
assemble: {
  components: {
    options: {
      layoutdir: 'src/components/layouts',
      layout: 'default.hbs'
    }
    ...
  },
  docs: {
    options: {
      layoutdir: 'src/docs/layouts',
      layout: 'default.hbs'
    }
    ...
  },
  blog: {
    options: {
      layoutdir: 'src/blog/layouts',
      layout: 'default.hbs'
    }
    ...
  }
  // etc.
}
```
Note that the layout name is the same for each target, but the `layoutdir` is a different directory, indicating that there are three different "default" layouts. 

While it might make sense for each target to have its own `layoutdir`, since layouts can be overridden in the [YAML front matter][yaml-front-matter] of individual pages, it is not a good idea to use the same name for multiple layouts, _unless you are intentionally using this naming convention as a strategy_. The reason is that it gets very difficult to track which page is building from which layout when working inside the pages themselves.
 
### Difficult to follow

Without `layoutdir`, you have the entire path to follow, but without it you must rely on the name of the layout itself to guide you. 

``` html
---
title: Any Page
layout: default.hbs
---
```

### Much better

Using a more descriptive name for the layout helps avoid confusion _now_:

``` html
---
title: Any Page
layout: blog-default.hbs
---
```

Of course, these are only recommendations and you will need to find a strategy that works for you and your team. 


## Related Info

* [options.layout][options-layout]
* [Layouts][]
