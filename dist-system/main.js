System.register(['./components.js', './render.js'], function (_export, _context) {
  "use strict";

  var homepageComponent, render;
  return {
    setters: [function (_componentsJs) {
      homepageComponent = _componentsJs.homepageComponent;
    }, function (_renderJs) {
      render = _renderJs.render;
    }],
    execute: function () {

      render(homepageComponent({
        message: `This application is rendered using
      ${ self.__supportsScriptTypeModule ? 'ES modules' : ' System.register scripts' }.`
      }));
    }
  };
});