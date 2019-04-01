import 'novicell-lazyload';
import '../03-organisms/pageheaders/pageheader-slider/pageheader-slider';
import '../03-organisms/pageheaders/pageheader-dots/pageheader-dots';
import '../02-molecules/navigation/nav-main-list-priority/nav-main-list-priority';
import '../03-organisms/topbar/topbar-related/topbar-related';
import '../02-molecules/navigation/nav-trigger/nav-trigger';
import '../03-organisms/pageheaders/pageheader-video/pageheader-video--youtube';

import NovicellLazyLoad from 'novicell-lazyload';
import debounce from 'lodash/debounce';

document.addEventListener('lazybeforeunveil', NovicellLazyLoad.lazyLoad, true);
window.addEventListener('resize', debounce(NovicellLazyLoad.checkImages), 100, false);
