import spriteScroller from 'novicell-sprite-scroller';

new spriteScroller({
  element: 'sprite',
  rows: 46,
  columns: 1,
  direction: 'vertical',
  scrollMagicOptions: {
    duration: 2000,
  },
});
