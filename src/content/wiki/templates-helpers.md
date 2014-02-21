


## Built-in Helpers

Assemble includes [helper-lib][] as a dependency, so all of the helpers from that library are available by default. 

[helper-lib][] includes more than **100 Handlebars helpers** from that library in your templates. 


### Helpers created for Assemble

Most helpers from [helper-lib][] can be used with any Handlebars project, but a handful of helpers were created specifically for Assemble, including:

* **dirname**: Returns the absolute path to the given file/directory. Would return: `path/to/variables.md`. Usage: `\{{dirname [path]}}`
* **pagename**: Returns the full-name of a given file. Would return: `variables.md`. Usage: `\{{filename "docs/toc.md"}}`
* **filename**: Can be used as an alternate for `pagename`. 
* **basename**: Returns the basename of a given file. Would return: `variables` Usage: `\{{base "docs/toc.md"}}`
* **extension**: Returns the extension of a given file. Would return: `.md` Usage: `\{{extension "docs/toc.md"}}`
* **ext**: Can be used as an alternate for`extension`. 
* **relative**: Returns the derived relative path from file A to file B. Usage: `\{{relative [from] [to]}}`. This can also be used with `page` and `pages`.
* **markdown**: Markdown block helper enables writing markdown inside HTML and then renders the markdown as HTML inline with the rest of the page. Usage: `\{{#markdown}}\{{/markdown}}`
* **md**: Markdown helper used to read in a file and inject the rendered markdown into the HTML. Usage: `\{{md [path]}}`
* **embed**: Embeds code from an external file as preformatted text. The first parameter requires a path to the file you want to embed. The second optional parameter allows forcing syntax highlighting for a specific language. Usage: `\{{embed 'path/to/file.js'}}` or `\{{embed 'path/to/file.hbs' 'html'}}`
* **jsFiddle**: Embed a jsFiddle, second parameter sets the desired tabs. Usage: `\{{jsfiddle [id] [tabs]}}`
* **gist**: Downloads and embeds public GitHub Gists by adding only the Id of the Gist. Usage: `\{{gist [id] [file]}}`
* **authors**: Reads in data from an "AUTHORS" file to generate markdown formatted author or list of authors for a README.md. Accepts a second optional parameter to a different file than the default. Usage: `\{{authors}}` or `\{{ authors [file] }}`
* **changelog**: Reads in data from an "CHANGELOG" file to generate markdown formatted changelog or list of changelog entries for a README.md. Accepts a second optional parameter to change to a different file than the default. Usage: `\{{changelog [src]}}`
* **roadmap**: Reads in data from an "ROADMAP" file to generate markdown formatted roadmap or list of roadmap entries for a README.md. Accepts a second optional parameter to change to a different file than the default. Usage: `\{{roadmap [src]}}`

Many additional helpers are available in the following categories:
* `assemble`
* `collections`
* `comparisons`
* `dates`
* `file`
* `html`
* `inflections`
* `logging`
* `markdown`
* `math`
* `miscellaneous`
* `numbers`
* `objects`
* `path`
* `special`
* `strings`
* `url`

Visit [helper-lib][] to learn more.


## Related info

* [Templates][templates]
* [helper-lib Github repo][]
* [handlebarsjs.com][handlebars]


[helper-lib]: http://github.com/assemble/helper-lib "Extensive collection of Handlebars helpers"

