Coremob Tests
=============

Coremob tests are designed to be compatible with regular W3C tests that use [testharness.js][testharness], but they're also meant to be runnable in resource constrained environments where loading lots of iframes is time consuming.

While regular W3C tests are basically an HTML page with lots of boilerplate code, Coremob tests take a different approach. The test are written as a single JS file with additional meta-data in a config file, and support for optional HTML, CSS and JavaScript fixtures. This makes it simple to build the tests to different formats depending on the needs. For example, Coremob tests can be built to a regular W3C test format for distribution to other Working Groups or combined to form a single page test suite like is used by [Ringmark](http://rng.io).

Setting up your environment
--------------------------

To run the existing tests or create new ones, you'll need an HTTP server with PHP installed, node.js and npm, and grunt.

### Installing an HTTP Server with PHP

Tests must be run from an HTTP Server with PHP installed. You can use one of the following server/PHP bundles to setup a local testing environment.

- OSX [Mamp](http://www.mamp.info/en/index.html)
- Linux [Lamp](http://www.lamphowto.com/)
- Windows [Wamp](http://www.wampserver.com/en/)

### Installing node.js and npm

In order to build the tests, you'll also need [node.js](https://github.com/joyent/node) and [npm](https://github.com/isaacs/npm). Install instructions are available from the [node.js wiki](https://github.com/joyent/node/wiki/Installation).

npm now ships with node.js, so you shouldn't have to do anything special to install it. You can however check for it's presence by running:

```bash
npm -v
```

If command not found, install with:

```bash
curl http://npmjs.org/install.sh | sh
```

### Installing grunt

Lastly, you'll need to install [grunt](https://github.com/cowboy/grunt). That's easy:

```bash
npm install grunt -g
```

### Setup

Fork this repository and clone your fork:

```bash
git clone git@github.com:username/coremob-tests.git

# Replace "username" with your github username
```

Enter the repo and add the upstream as a remote:

```bash
cd coremob-tests && git remote add upstream git://github.com/coremob/coremob-tests.git
```

Install development dependencies:

```bash
npm install
```



Creating and Running a Test
--------------

1. Generate a new test directory (built from a boilerplate)

    ```bash
    ./new neato-api
    ```

    If `new` does not run, try adding execution permission:

    ```bash
    chmod +x new
    ```


2. Generate a new test "runner" file:

    ```bash
    ./build neato-api
    ```

    This will create `/tests/neato-api/index.html`, which is used for running tests in the browser at:

    `http://localhost/tests/neato-api/`


    *ATTENTION:* Do not edit `/tests/neato-api/index.html`, it will be over-written the next time the build tool is run.


3. Authoring:
  - Open `/tests/neato-api/test.js` in any text editor (you may also require the use of `fixture.css`, `fixture.html` or `iframe.html`)
  - Write tests


4. In the terminal, rebuild the test "runner" file:

    ```bash
    ./build neato-api
    ```

    This will re-build the `index.html` file, allowing you to preview your tests in the browser.

5. **Repeat step 4 to preview changes in the browser after every change to any of the following:**
  - `/tests/neato-api/test.js`
  - `/tests/neato-api/fixture.css`
  - `/tests/neato-api/fixture.html`
  - `/tests/neato-api/fixture.js`



Anatomy of a Test
--------------


When `./new neato-api` was run, the tool creates a new directory:

### /tests/neato-api/

```bash
.
├── config.yml      # required
├── fixture.html    # optional
├── fixture.css     # optional
├── fixture.js      # optional
└── test.js         # required

```

### config.yml

Configuration settings and meta data for the test.

```yml
---
  level: 0
  spec: "url"
  sources: ["url", "url"]
  title: ""
  contributor: ""
```

- **level**: The level of the coremob spec this feature pertains to.
- **spec**: The URL for the corresponding spec, when one exists.
- **sources**: An array of URLs for existing resources that this test derives from
- **title**: Displayed name of feature/spec
- **contributor**: The name of the copyright holder.


## Authoring

Coremob tests use the [testharness.js syntax](https://github.com/tobie/testharness.js/tree/readme).

Coremob tests also supports an extra assertion that simply tests for _truthyness_. In JavaScript, everything but `false`, `""` (the empty string), `0`, `null`, `undefined`, and `NaN` is considered _truthy_.

In JavaScript, everything but `false`, `""` (the empty string), `0`, `null`, `undefined`, and `NaN` is considered _truthy_.

```js
assert(value, description);
```

* `value` is any value; this value will be evaluated for "truthyness"
* `description` description of what is being asserted.


The following illustrates the complete API in use:

```js
test("postMessage", function() {
  assert( window.postMessage, "postMessage supported" );
});

test("onmessage", function() {
  assert( "onmessage" in window, "onmessage supported" );
});

asyncTest("postMessage/onmessage In Practice", function( async ) {
  window.onmessage = function( event ) {
    async.step(function() {
      assert( true, "onmessage event fired" );
      assert( event.data === "This is Ground Control", "message content matched expected" );
      async.done();
    });
  };

  window.postMessage( "This is Ground Control", "*" );
});
```

## Contributing Tests

Note it's best to synchronize on who's working on which tests [Coremob mailing list][list] first, as you don't want to be duplicating efforts.

Once you're satisfied with the tests you've written you may want to lint them by running:

```bash
grunt
```

You can then:

- commit new tests to your local branch,
- push the branch to your fork,
- complete the [W3C's license grant form][grant],
- make a pull request from your fork on github.

Your tests will then be reviewed and pulled in the main repository when approved.

Licensing
---------

All of the tests in the Coremob test suites are intended to be released under both the [W3C Test Suite license][w3c_license] and the [3-clause BSD license][bsd].

Contributors must grant permission to distribute their contribution under these two licenses, and this requires completing the [W3C's license grant form][grant].

[w3c_license]: http://www.w3.org/Consortium/Legal/2008/04-testsuite-license.html
[bsd]: http://www.w3.org/Consortium/Legal/2008/03-bsd-license.html
[grant]: http://www.w3.org/2002/09/wbs/1/testgrants2-200409/
[list]: http://lists.w3.org/Archives/Public/public-coremob/
[testharness]: https://github.com/jgraham/testharness.js
