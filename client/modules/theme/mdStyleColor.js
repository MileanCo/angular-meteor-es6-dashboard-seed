/**
* Get md theme colors in other HTML elements! (non-md)
* Use styles/material-colors/colors.css for class colors
  ex) class="color-red-100"
* MD COLOR VARS in your CSS in styles/material-colors/colors.less
  ex) color: @color-red-100

USAGE:
<md-button md-style-color="{'background-color': 'hue-1'}">My Button</md-button>
<md-button md-style-color="{'background-color': '100'}">My Button</md-button>
<md-button md-style-color="{'background-color': 'warn.hue-3'}">My Button</md-button>
<md-button md-style-color="{'background-color': 'accent.400'}">My Button</md-button>
<md-button md-style-color="{'background-color': 'green.900'}">My Button</md-button>

<span md-style-color="{'color': 'primary'}">Text that is of color Primary!</span>
*/
  "use strict";
/**
  Chart.defaults.global.responsive = true;
  //Chart.defaults.global.multiTooltipTemplate = '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>';
*/




var _theme;
var _palettes;

export default angular
  .module('mdColors',[])
  .config(['$mdThemingProvider', function($mdThemingProvider) {
    // CUSTOMIZE THEME COLORS HERE
    $mdThemingProvider.theme('default')
      .primaryPalette('grey', {default:"900"})
      .accentPalette('cyan', {default: 'A400', "hue-2":"500", "hue-3":"600"})
      .warnPalette('red', {default: '500', "hue-2":"700", "hue-3":"800"})
      //.backgroundPalette("white")
      ;


    $mdThemingProvider
        .theme('dark')
        .primaryPalette('grey', {
          default:'500',
          //default:"A700",
          //    'hue-2': '500'
        })
        .accentPalette('cyan', {default:'A700'})
        .warnPalette('red', {default: '800'})
        .backgroundPalette('grey', {
            'default': '800'
        })
        .dark();

    // TOAST themes
    $mdThemingProvider.theme("success-toast");
    $mdThemingProvider.theme("error-toast");
    $mdThemingProvider.theme("info-toast");

    // what you really need
    _theme = $mdThemingProvider.theme();
    _palettes = $mdThemingProvider._PALETTES;
  }])

  .directive('mdStyleColor', ['$mdColorPalette',
    function ($mdColorPalette) {
      return {
        restrict: 'A',
        scope: { mdStyleColor: '=', colour:'@' },
        link: function (scope, element, attrs) {
          for (var p in scope.mdStyleColor) {
            if (scope.mdStyleColor.hasOwnProperty(p)) {

              var themeColors = _theme.colors;

              var split = (scope.mdStyleColor[p] || '').split('.');
              if (split.length < 2) split.unshift('primary');

              var hueR   = split[1] || 'hue-1';    // 'hue-1'
              var colorR = split[0] || 'primary';  // 'warn'

              // Absolute color: 'orange'
              var colorA = themeColors[colorR] ?
                themeColors[colorR].name : colorR;

              // Absolute Hue: '500'
              var hueA =
                themeColors[colorR] ?
                themeColors[colorR].hues[hueR] || hueR :
                hueR;

              var colorValue = _palettes[colorA][hueA] ?
                _palettes[colorA][hueA].value :
                _palettes[colorA]['500'].value;

              element.css(p, 'rgb('+colorValue.join(',')+')');

            }
          }
        }
      }
    }]);
