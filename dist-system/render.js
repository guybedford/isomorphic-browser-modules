System.register([], function (_export, _context) {
  "use strict";

  /*
   * Eat your heart out React.
   */
  function render(html) {
    document.body.innerHTML = html;
  }

  _export("render", render);

  return {
    setters: [],
    execute: function () {}
  };
});