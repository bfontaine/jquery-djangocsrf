/**
 * jQuery Django CSRF Plugin v0.1.1
 * https://github.com/bfontaine/jquery-djangocsrf
 **/
(function (factory) {
	if (typeof exports === "object") {
		// CommonJS
		factory(require("jquery"), require("js-cookie"));
	} else {
		factory(jQuery, Cookies);
	}
})(function ( $, Cookies ) {

	var enabled    = false,
		http_re    = /^https?:/,
		enable_re  = /^enabled?$/i,
		disable_re = /^disabled?$/i;

    $( document ).ajaxSend(function( ev, xhr, settings ) {
		if ( !enabled ) {
			return;
		}
		var csrf = Cookies.get( "csrftoken" ),
		    url  = settings.url;

		if ( csrf && !http_re.test(url) ) {
			xhr.setRequestHeader( "X-CSRFToken", csrf );
		}
	});

	/**
	 * $.djangocsrf()            - return the current state
	 * $.djangocsrf( "enable" )  - enable the plugin
	 * $.djangocsrf( "disable" ) - disable the plugin
	 **/
	$.djangocsrf = function $djangocsrf( action ) {
		if ( arguments.length === 0 ) {
			return enabled;
		}
		if ( action === true || enable_re.test( $.trim( action ) ) ) {
			enabled = true;
		} else if ( action === false || disable_re.test( $.trim( action ) ) ) {
			enabled = false;
		}
		return this;
	};
});
