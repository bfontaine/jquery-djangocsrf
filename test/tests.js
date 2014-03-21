if (typeof window !== 'object' || !window._in_browser) {
	// asynchronous tests won't run with Grunt
	asyncTest = function() {};
}

module('enable', {
	setup: function() {
		$.djangocsrf( false );
	}
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

module('disable', {
	setup: function() {
		$.djangocsrf( true );
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
