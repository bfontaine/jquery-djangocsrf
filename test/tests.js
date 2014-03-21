if (typeof window !== 'object' || !window._in_browser) {
	// asynchronous tests won't run with Grunt because we need our server
	asyncTest = function() {};
}

module('enable', {
	setup: function() {
		$.djangocsrf( false );
        $.removeCookie('csrftoken');
	}
});

test('should return jQuery', function() {
	expect(1);
	ok($.djangocsrf( true ) === $);
});

test('with boolean', function() {
	expect(1);
	$.djangocsrf( true );
	strictEqual($.djangocsrf(), true);
});

test('with "enable"', function() {
	expect(1);
	$.djangocsrf( 'enable' );
	strictEqual($.djangocsrf(), true);
});

test('with "enabled"', function() {
	expect(1);
	$.djangocsrf( 'enabled' );
	strictEqual($.djangocsrf(), true);
});

test('with trailing spaces', function() {
	expect(1);
	$.djangocsrf( ' enable   ' );
	strictEqual($.djangocsrf(), true);
});

test('with uppercased letters', function() {
	expect(1);
	$.djangocsrf( 'EnabLe' );
	strictEqual($.djangocsrf(), true);
});

asyncTest('should extract token from cookie', function() {
	var tk = 'xea9$%' + (Math.random()*100|0);
	expect(2);
	$.djangocsrf( true );
	$.cookie('csrftoken', tk);
	$.ajax({
		url: '/csrf',
		success: function( data ) {
			strictEqual(data.present, true);
			strictEqual(data.value, tk);
			start();
		}
	});
});

asyncTest('should not add an header if cookie is not set', function() {
	expect(1);
	$.djangocsrf( true );
	$.ajax({
		url: '/csrf',
		success: function( data ) {
			strictEqual(data.present, false);
			start();
		}
	});
});

module('disable', {
	setup: function() {
		$.djangocsrf( true );
        $.removeCookie('csrftoken');
	}
});

test('with boolean', function() {
	expect(1);
	$.djangocsrf( false );
	strictEqual($.djangocsrf(), false);
});

test('with "disable"', function() {
	expect(1);
	$.djangocsrf( 'disable' );
	strictEqual($.djangocsrf(), false);
});

test('with "disabled"', function() {
	expect(1);
	$.djangocsrf( 'disable' );
	strictEqual($.djangocsrf(), false);
});

test('with trailing spaces', function() {
	expect(1);
	$.djangocsrf( ' disable   ' );
	strictEqual($.djangocsrf(), false);
});

test('with uppercased letters', function() {
	expect(1);
	$.djangocsrf( 'DIsabLe' );
	strictEqual($.djangocsrf(), false);
});

asyncTest('should not add an header', function() {
	expect(1);
	$.djangocsrf( false );
	$.ajax({
		url: '/csrf',
		success: function( data ) {
			strictEqual(data.present, false);
			start();
		}
	});
});
