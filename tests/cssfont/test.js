// test("CSS Font Face - DUMMY TEST", function() {
//   assert( true, "CSS Font Face tests cause FOUC" );
// });


// test("CSS Font Face", function() {
//
//   var head, styles, style, rules,
//       CSSFontFaceRule = window.CSSFontFaceRule,
//       rule = "@font-face { font-family: font; src: url(https:); }";
//
//   head = H.inject( "<style id='cssfont'>" + rule + "</style>", document.head );
//
//   styles = document.styleSheets;
//   style = styles[ styles.length -1 ];
//   rules = style && (style.cssRules[ 0 ] || style.rules[ 0 ]) || { cssText: "" };
//
//   assert( rule === rules.cssText, "cssText rulle" );
//   assert( /^@font-face /i.test( rules.cssText ), "cssText font-face" );
//
//   //
//   // document.head.removeChild( document.querySelector("#cssfont") );
// });

// TODO: Move this into iframe fixture
// TODO: Rewrite to work correctly in opera
// @Mike, @Divya: I promise this is only temporary
if ( !window.opera ) {


  asyncTest("CSS Font Face", function( async ) {
    var iframe = document.getElementById("cssfont");

    iframe.contentWindow.addEventListener("load", function(e) {
      async.step(function() {
        var styles, style, rules,
            doc = iframe.contentDocument,
            rule = "@font-face { font-family: font; src: url(https:); }",
            elem = doc.getElementById("inference"),
            styleNode = doc.createElement("style");

        styleNode.id = "cssfont";
        styleNode.innerText = rule;
        doc.head.appendChild( styleNode );

        styles = doc.styleSheets;


        style = styles[ styles.length -1 ];
        rules = style && (style.cssRules[ 0 ] || (style.rules && style.rules[ 0 ])) || { cssText: "" };

        assert( rule === rules.cssText, "cssText rule" );
        assert( /^@font-face /i.test( rules.cssText ), "cssText font-face supported" );

        async.done();
      });
    });
  });


  asyncTest("CSS EOT/OTF/SVG", function( async ) {
    var iframe = document.getElementById("cssfont");

    iframe.contentWindow.addEventListener("load", function(e) {

      var head, fixture, clone, fake, styles, style,
          doc = iframe.contentDocument,
          path = "/tests/cssfont/",
          rule = [
            "@font-face { ",
            "font-family: 'GothicCustom'; ",
            "src: url(" + path + "LeagueGothic.eot); ",
            "src: url(" + path + "LeagueGothic.woff) format('woff'), ",
            "     url(" + path + "LeagueGothic.otf) format('opentype'), ",
            "     url(" + path + "LeagueGothic.svg) format('svg'); }"
          ].join(""),
          width = null,
          styleNode = doc.createElement("style");

      styleNode.id = "csseototf";
      styleNode.innerText = rule;
      doc.head.appendChild( styleNode );

      fixture = doc.getElementById("inference");


      clone = fixture.cloneNode(true);
      fake = fixture.cloneNode(true);

      doc.body.appendChild( clone );
      doc.body.appendChild( fake );

      clone.style.cssText += "font-family: GothicCustom;";
      fake.style.cssText += "font-family: OHHAI!!!;";

      setTimeout(function() {
        async.step(function() {

          var orig = parseInt( doc.defaultView.getComputedStyle( fixture ).getPropertyValue("width"), 10 ),
              font = parseInt( doc.defaultView.getComputedStyle( clone ).getPropertyValue("width"), 10 ),
              control = parseInt( doc.defaultView.getComputedStyle( fake ).getPropertyValue("width"), 10 );


          // The font we have chosen to use should be narrower then the default font
          // of any given UA. This is presumptuous, but pretty close for now.
          // TODO: Refined control over the default/starting font
          assert( font !== orig, "Custom font supported" );
          // assert( control === orig, "Original matches control" );
          assert( font !== control, "Custom font distinguished from non-custom" );

          doc.body.removeChild( clone );
          doc.body.removeChild( fake );
          doc.head.removeChild( doc.getElementById("csseototf") );

          async.done();
        });
      }, 100);
    }, false );
  });
}
