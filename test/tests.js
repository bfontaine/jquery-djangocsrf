module('get value');

test('not enabled by default', function() {
    expect(1);
    strictEqual($.djangocsrf(), false);
})
