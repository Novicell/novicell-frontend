import { SpriteScroller } from 'novicell-sprite-scroller/dist/spriteScroller.esm';

new SpriteScroller({
  element: 'sprite',
  rows: 46,
  columns: 1,
  direction: 'vertical',
  scrollMagicOptions: {
    duration: 2000,
  },
});
