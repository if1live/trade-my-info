

> Comprehensive list of options available in Assemble

Most options are defined in the `assemble` task or target options in the Gruntfile, some options may only be defined inside the [YAML front matter][yaml-front-matter] of a file, and some may be defined in either location. 

Additionally, options may be defined in "external" [JSON][] or [YAML][] configuration files.

For the purposes of clarity, we will refer to options that are defined in the Gruntfile as "configuration" options, and options that are defined in the YFM as "page" options.


## Configuration options

These options are defined in the `assemble` task in your project's Gruntfile. Any option may be defined at the [task or target][tasks-and-targets] level.

| Option   | Description |
| -------- | ----------- |
| [assets][options-assets] | directory that contains commonly used "assets" for a project, such as images, fonts, javascripts and stylesheets. Assemble will generate a relative path  from dest files to the given `assets` directory. |
| [collections][options-collections] | |
| [data][options-data] | path to data files to supply the data that will be passed into templates. |
| [engine][options-engine] | engine to be used for processing templates. Handlebars is the default. |
| [ext][options-ext] | extension to be used for `dest` files. |
| [helpers][options-helpers] | path to custom helper(s) to be registered and used by the current template engine. Handlebars is the default. |
| [layout][options-layout]** * ** | [Layouts][] are optional and assemble will build [pages][] without one. However, when a layout is specified the file _must contain a `\{{> body }}`_ tag,  since this tag indicates where the content from each file in a target should be inserted. |
| [layoutdir][options-layoutdir]** * ** | [Layouts][] are optional and assemble will build [pages][] without one. However, when a layout is specified the file _must contain a `\{{> body }}`_ tag,  since this tag indicates where the content from each file in a target should be inserted. |
| [partials][options-partials] | the partials or "includes" to be used with [pages][]. |

***Note** that when a layout is used the [\{{> body }}][Layouts] tag must be included inside the layout in order for content from pages to be "pulled in". 


## Task Options

These options are defined in the `assemble` task in your Gruntfile.

### [options.data][options-data]
Type: `String|Array` (optional)
Default: `src/data`

Retrieves data from any specified `JSON` and/or `YAML` files to populate the templates when rendered. Data gets passed through the `data` object to the options on the assemble task, and then to the context in your templates. Also useful for specifying [configuration][] data.

``` js
options: { data: 'src/data/**/*.{json,yml}' }
```

Note that `assemble` merges the task and target-level data for `options.data`.

### [options.layout][options-layout]
Type: `String` (optional)
Default: `undefined`

Layouts are optional and may be defined at the task and/or [target][tasks-and-targets] level. _Unlike Jekyll_, Assemble requires a file extension since you are not limited to using a single file type.


``` js
options: { layout: 'src/layouts/default.hbs' }
```

### [options.assets][options-assets]
Type: `String` (optional)
Default: `undefined`

Path to the "assets" or "public" directory that will be used by dest files. Assemble uses path in the `assets` option to generate a relative path from dest files to the given "assets" directory. The "assets" folder commonly contains the CSS, JavaScripts, images and other similar files for a project. The `assets` option may be defined at the task or target-level.

``` js
options: { assets: 'docs/assets' }
```

### [options.partials][options-partials]
Type:  `String|Array` (optional)
Default: `undefined`

Specifies the Handlebars partials files, or paths to the directories of files to be used. 

``` js
options: { partials: 'src/partials/**/*.hbs' }
```
Note that `assemble` merges the task and target-level data for `options.partials`.


### [options.ext][options-ext]
Type: `String` (optional)
Default: `.html`

Specify the file extension to be used for destination files. For example:

``` js
assemble: {
  // Build sitemap from JSON and templates
  sitemap: {
    options: { ext: '.xml'},
    files: {
      '.': ['path/to/sitemap.tmpl']
    }
  },
  // Build README from YAML and templates
  readme: {
    options: { ext: '.md' },
    files: {
      '.': ['path/to/readme.tmpl']
    }
  }
}
```

Learn more about the [ext option][options-ext].


### [options.engine][options-engine]
Type: `String` (optional)
Default: `handlebars`

The engine to use for processing client-side templates. Assemble ships Handlebars as the default template engine, to learn more about adding other template engines please read the documentation on [assemble methods][methods].

Also, we welcome pull requests for additional template engines. If you have questions please create an [Issue][assemble-issues].


### [options.helpers][options-helpers]
Type: `String|Array` (optional)
Default: 100+ helpers from [helper-lib][] 

Assemble depends on [helper-lib][], an external library which includes more than **100 Handlebars helpers**. So any helpers from that project may be used in your templates. 

If you wish for Assemble to use custom helpers with Handlebars or any specified template engine, just provide the path to the helper or helpers in `options.helpers` :  

``` js
options: { helpers: 'your/custom/helpers' }
```

### options.removeHbsWhitespace
Type: `Boolean`
Default: `false`

Remove extraneous whitespace added by Handlebars in rendered files. _Use at your own risk, this is an experimental option and may be removed._



## [YAML Front-Matter Options][yaml-front-matter]
These options are defined in the [YAML front matter][yaml-front-matter] of a page.

### [options.layout][options-layout]
type: `string`
default: `undefined`

Specifies the [layout][Layouts] file to be used. Layouts defined in [YFM][yaml-front-matter] will override layouts defined in the Gruntfile.

### options.published
type: `boolean`
default: true

Defining `published: false` in the [YAML front matter][yaml-front-matter] of a page will:

* Prevent the page from rendering
* Omit the page from the `pages` collection. 


## Custom Options
Custom, user-defined variables may be specified in the [Options][options-overview] of the assemble task or target. Any variables defined in the options will be added to the _root of the data context_ and thus they will also be available in any templates. 

### Example usage
A common use case for defining custom variables in the options is for easily including or excluding content based on current "development status". 

For example, assuming we have defined a custom option, `production`:

``` js
assemble: {
  options: {
    production: false
  },
  files: {
    'site/': ['src/pages/*.hbs']
  }
}
```
And we add the `production` variable to our templates:

``` html
\{{#if production}}
  <script src="dist/assets/script.min.js"></script>
\{{else}}
  <script src="dist/assets/script.js"></script>
\{{/if}}
```
Since `production: false` is defined in the Assemble [task options][options], the following HTML will be rendered with the _non-minified_ version of the script:

``` html
<script src="dist/assets/script.js"></script>
```


## [Grunt.js][tasks-and-targets] Options
The following is just a handful of options that can be used in your Gruntfile. Please visit the [Grunt documentation](http://gruntjs.com/api/grunt.file) to learn more.

* `expand` Set to `true` to enable the following options:
* `cwd` All `src` matches are relative to (but don't include) this path.
* `src` Pattern(s) to match, relative to the `cwd`.
* `dest` Destination path prefix.
* `ext` Replace any existing extension with this value in generated `dest` paths.
* `flatten` Remove all path parts from generated `dest` paths.
* `rename` This function is called for each matched `src` file, (after extension renaming and flattening). The `dest` and matched `src` path are passed in, and this function must return a new `dest` value.  If the same `dest` is returned more than once, each `src` which used it will be added to an array of sources for it.





## Related info: 

* [Variables][built-in-variables]

* [YAML Options][YAML]

[tasks-and-targets]: http://gruntjs.com/configuring-tasks#task-configuration-and-targets
