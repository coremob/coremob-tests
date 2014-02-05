// TODO: Rewrite to work correctly in opera
// @Mike, @Divya: I promise this is only temporary
if ( !window.opera ) {

  asyncTest("CSS 2.1 Selectors", function( async ) {
    var iframe = document.getElementById("css2-1selectors").contentWindow;

    window.onmessage = function( event ) {
      async.step(function() {
        assert( event.data === "truetruetruetrue",
          "CSS 2.1 Selectors are supported"
        );
        window.onmessage = null;
        async.done();
      });
    };
  });

  asyncTest("CSS Generated Content", function( async ) {
    var iframe = document.getElementById("css2-1selectors");

    iframe.contentWindow.onload = function(e) {
      var elem;

      async.step(function() {
        elem = iframe.contentDocument.getElementById("generated");
        assert( elem.offsetHeight >= 1, "CSS generated content modifies the offsetHeight as expected" );
        async.done();
      });
    };
  });

}
