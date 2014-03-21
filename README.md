# jQuery Django CSRF Plugin

The **djangocsrf** jQuery plugin makes it easy to use AJAX calls with Django’s
CSRF token.

This is currently under development, there’s no stable release right now.

## Usage

The plugin depends on `jquery.cookie`, so include it *after* that one:

```html
<script src="http://code.jquery.com/jquery-1.9.0.min.js"></script>
<script src="http://cdn.jsdelivr.net/jquery.cookie/1.4.0/jquery.cookie.min.js"></script>
<script src="path/to/jquery.djangocsrf.js"></script>
```

Then enable it:

```js
$.djangocsrf( "enable" );
```

That’s all! After that, all AJAX calls made through jQuery to the current
domain will include an `X-CSRFToken` header set to the client’s token.

## Install

TODO

## Tests

Requires Node. Start the server:

	$ node test/server.js

Then open `http://0.0.0.0:8124/test/index.html` in your browser.

Basic tests can also be run with `grunt`.
