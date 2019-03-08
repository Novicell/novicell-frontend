
import Parallax from 'parallax-js';
/**
 * @name Novicell pageheader-dots
 * @desc Paralax.js, parallax.js reacts to the orientation of your smart device
 *       http://matthew.wagerfield.com/parallax/
 * @author Mark Hansen MGH
 * @requires https://github.com/wagerfield/parallax
 */

function prlx() {
  const scene = document.getElementById('pageheader-scene');
  if (!scene) {
    return;
  }
  /* eslint-disable no-new */
  new Parallax(scene);
}

prlx();
