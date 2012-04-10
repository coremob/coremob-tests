test("XHR2", function() {
  var xhr = new XMLHttpRequest();

  // Property confirmation
  assert( "upload" in xhr, "xhr.upload is supported" );
});

test("XHR2 Prerequisite: ArrayBuffer", function() {
  var ArrayBuffer = H.API( window, "ArrayBuffer", true );

  assert( ArrayBuffer, "ArrayBuffer supported" );
});

test("XHR2 Prerequisite: BlobBuilder", function() {
  var BlobBuilder = H.API( window, "BlobBuilder", true );

  assert( BlobBuilder, "BlobBuilder supported" );
});

test("XHR2 Prerequisite: URL", function() {
  var URL = H.API( window, "URL", true );

  assert( !!URL, "URL supported" );
});
//
test("XHR2 Upload", function() {
  var xhr = new XMLHttpRequest();

  if ( !xhr.upload ) {
    assert( false, "xhr.upload not supported, skipping tests" );
  } else {
    [ "onabort", "onerror", "onload", "onloadstart", "onprogress" ].forEach(function( handler ) {

      // Property confirmation
      assert( handler in xhr.upload, "xhr.upload." + handler + " supported" );

      // Property value/type confirmation
      assert( xhr.upload[ handler ] == null, "xhr.upload." + handler + " is TreatNonCallableAsNull" );
    });
  }
});

// TEMPORARY BLOCK - Causing deadstop in Android 4, WebKit
// asyncTest("XHR2 Upload In Practice", function( async ) {
//   var BlobBuilder = H.API( window, "BlobBuilder", true ),
//       xhr = new XMLHttpRequest(),
//       builder, size;
//
//
//   if ( !BlobBuilder ) {
//     assert( false, "BlobBuilder not supported, skipping tests" );
//     async.done();
//   } else {
//     builder = new BlobBuilder();
//     builder.append("The Future is Cool");
//
//     size = builder.getBlob().size;
//
//     xhr.open( "POST", "/suite/_resources/echo.php", true );
//
//     // Firefox Mobile never returns on this?
//     xhr.upload.onprogress = function( event ) {
//       if ( event.lengthComputable ) {
//         async.step(function() {
//           assert( event.total === size, "event.total matches expected size" );
//           async.done();
//         });
//       }
//     };
//
//     // Firefox Mobile will return on this
//     xhr.onload = function( event ) {
//       if ( event.lengthComputable ) {
//         async.step(function() {
//           assert( event.total === size, "event.total matches expected size" );
//           async.done();
//         });
//       }
//     };
//
//     xhr.send( builder.getBlob("text/plain") );
//   }
// });


asyncTest("XHR2 ArrayBuffer Response Type", function( async ) {
  var BlobBuilder = H.API( window, "BlobBuilder", true ),
      Blob = H.API( window, "Blob", true ),
      xhr = new XMLHttpRequest();

  if ( !BlobBuilder ) {
    assert( false, "BlobBuilder not supported, skipping tests" );
    async.done();
  } else {

    xhr.open( "GET", "/tests/xhr2/png.png", true );
    xhr.responseType = "arraybuffer";

    xhr.onload = function( event ) {
      var builder, blob,
          data = this;

      if ( data.status === 200 ) {

        // WARNING: Without these "step" calls,
        // testharness.js will lose track of async assertions
        async.step(function() {
          // Instance confirmation
          assert( data.response instanceof ArrayBuffer, "ArrayBuffer data.response supported" );

          // Property confirmation
          assert( "byteLength" in data.response, "data.response.byteLength supported" );

          // Property value/type confirmation
          assert( typeof data.response.byteLength === "number", "data.response.byteLength is number" );


          if ( !BlobBuilder ) {
            assert( false, "BlobBuilder not supported, skipping tests" );
            async.done();
          } else {

            builder = new BlobBuilder();

            // Append array buffer to BlobBuilder instance
            builder.append( data.response );
            blob = builder.getBlob("image/png");

            // Instance confirmation
            assert( blob instanceof Blob, "blob is an instance of Blob" );

            // Property confirmation
            assert( "size" in blob, "blob.size supported" );
            assert( "type" in blob, "blob.type supported" );

            // Property value/type confirmation
            assert( typeof blob.size === "number", "typeof blob.size is number" );
            assert( blob.size === 23115, "blob.size of fixture png.png is 23115" );

            assert( typeof blob.type === "string", "typeof blob.type is string" );
            assert( blob.type === "image/png", "blob.type of fixture png.png is image/png" );

            // Miscellaneous Confirmation
            assert( {}.toString.call(blob) === "[object Blob]", "(new Blob()).getBlob()" );

            // Finalize async test
            async.done();
          }
        });
      }
    };
    xhr.send();
  }
});

asyncTest("XHR2 Text Send/Response Type", function( async ) {
  var xhr = new XMLHttpRequest();

  if ( !("responseType" in xhr) ) {
    assert( false, "xhr.responseType not supported, skipping tests" );
    async.done();
  } else {
    xhr.open( "POST", "/suite/_resources/data.php", true );
    xhr.responseType = "text";

    xhr.onload = function( event ) {
      var data = this;

      if ( data.status === 200 ) {
        async.step(function() {

          assert( typeof data.response === "string", "Text data.response supported" );
          assert( data.response === "Just a string", "data.response has a value of 'Just a string'" );

          async.done();
        });
      }
    };
    xhr.send("Just a string");
  }
});

asyncTest("XHR2 Blob Response Type", function( async ) {
  var BlobBuilder = H.API( window, "BlobBuilder", true ),
      Blob = H.API( window, "Blob", true ),
      URL = H.API( window, "URL", true ),
      xhr = new XMLHttpRequest();

  if ( !BlobBuilder ) {
    assert( false, "BlobBuilder not supported, skipping tests" );
    async.done();
  } else {

    xhr.open( "GET", "/tests/xhr2/png.png", true );
    xhr.responseType = "blob";

    xhr.onload = function( event ) {
      var data = this;

      if ( data.status === 200 ) {
        async.step(function() {

          // console.log( data.response );
          // CURRENTLY UNSUPPORTED IN WEBKIT/CHROME
          // console.log( URL.createObjectURL(data.response) );

          assert( data.response instanceof Blob, "data.response is an instance of Blob" );

          async.done();
        });
      }
    };
    xhr.send();
  }
});

asyncTest("XHR2 Document Response Type", function( async ) {
  var xhr = new XMLHttpRequest(),
      Document = window.Document;

  if ( !("responseType" in xhr) ) {
    assert( false, "xhr.responseType not supported, skipping tests" );
    async.done();
  } else {
    xhr.open( "GET", window.location.href, true );
    xhr.responseType = "document";

    xhr.onload = function( event ) {
      var data = this;

      if ( data.status === 200 ) {
        async.step(function() {
          // CURRENTLY UNSUPPORTED IN WEBKIT? CHROME?
          // console.log( data, data.response );
          assert( data.responseXML instanceof Document, "Document data.responseXML is supported" );

          async.done();
        });
      }
    };
    xhr.send();
  }
});
