

## options.layout

> Layouts are commonly used with client-side templates as a quick way to "wrap" a number of [pages][] with commonly used page "sections", such as the head, footer or navigation.

## Defining Layouts
Oftentimes you will need more than one layout for your project, so layouts can be defined using the `options.layout` variable at the task or target-level, or they can be specified at the page-level by adding a `layout` property to the [YFM][YAML front matter].


## The `\{{> body }}` tag
Although layouts are optional, the `\{{> body }}` tag is required for content to be pulled into a layout.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>\{{title}}</title>
  </head>
  <body>
    <!-- the body tag is used to "pull in" content from pages -->
    \{{> body }}
  </body>
</html>
```

## Related Info

* Learn about [Layouts][]
* Learn about [layoutdir][]
