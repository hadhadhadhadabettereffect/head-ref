declare var THREE;
declare var Detector;

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var W_HEIGHT = window.innerHeight,
    W_WIDTH = window.innerWidth;

var camera, controls, scene, renderer,
    container, selected, offset, intersection,
    raycaster, mouse, plane, lamp, orb;
var selected = null, hovered = null;
var dragTargets = [];