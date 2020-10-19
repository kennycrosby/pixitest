import './styles.css';

import * as PIXI from 'pixi.js';
import bunny from '../bunny.png';
import guy from '../sprite.png';
import bg from '../sprite2.png';

const canvas = document.getElementById('mycanvas');

let _w = window.innerWidth;
let _h = window.innerHeight;

let isScrolling = false;
let timer;
let scrollDirection = 'down';
let scrollDelta = 0;
let delta = 0;

const app = new PIXI.Application({
  view: canvas,
  width: _w,
  height: _h
});

window.addEventListener('resize', () => {
  _w = window.innerWidth;
  _h = window.innerHeight;
  app.renderer.resize(_w, _h);
});

// holds an object of all the textures
// console.log(PIXI.utils.TextureCache);

const texture = PIXI.Texture.from(bg);
const texture2 = PIXI.Texture.from(guy);

let sprite1, sprite2, sprite3;

let img = new PIXI.Sprite(texture);

img.anchor.x = 0.5;
img.anchor.y = 0.5;
app.stage.addChild(img);

let container = new PIXI.Container();
app.stage.addChild(container);

sprite1 = new PIXI.Sprite(texture2);
sprite1.y = 100;
container.addChild(sprite1);

sprite2 = new PIXI.Sprite(texture2);
sprite2.y = 100;
sprite2.x = 0;
// this does the same as above
sprite2.position.set(100,100);
sprite2.tint = 0xff0000;


container.addChild(sprite2);

////// SCROLLING SPRITE
sprite3 = new PIXI.Sprite(texture2);
sprite3.y = 100;
sprite3.x = 200;
sprite3.position.set(app.renderer.screen.width / 2, app.renderer.screen.height / 2);
sprite3.anchor.set(0.5);
// sprite3.pivot.set(50, 50);
container.addChild(sprite3);

app.ticker.add(animate);
app.ticker.autoStart = false;
app.ticker.stop();

// BG
img.x = app.renderer.screen.width / 2;
img.y = app.renderer.screen.height / 2;


// many sprites
let sprites = [];
for (let i = 0; i < 10; i++) {
  let sprite = new PIXI.Sprite(texture2);
  sprite.x = Math.random() * app.renderer.screen.width;
  sprite.y = Math.random() * app.renderer.screen.height;
  sprite.anchor.set(0.5);
  sprite.tint = Math.random() * 0xffffff;
  container.addChild(sprite);
  sprites.push(sprite);

}

function animate() {





  img.x = app.renderer.screen.width / 2;
  img.y = app.renderer.screen.height / 2;

  delta += 0.1;



  sprite1.y = 100 + Math.sin(delta) * 10;
  sprite2.x = Math.sin(delta) * 10;
  sprite1.alpha = Math.sin(delta);

  // hide the sprite
  // sprite1.visible = false;

  // BUTTON INTERACTION
  // sprite1.interactive = true;
  // sprite1.buttonMode = true;

  // mask, sprites must overlap
  // sprite1.mask = sprite2;

  // Scale on scroll
  sprite3.x = app.renderer.screen.width / 2;
  sprite3.y = app.renderer.screen.height / 2;
  // sprite3.blendMode = PIXI.BLEND_MODES.MULTIPLY;
  const currentX = sprite3.scale.scope.scale._x;
  const currentY = sprite3.scale.scope.scale._y;
  sprite3.scale = new PIXI.Point(currentX + scrollDelta, currentY + scrollDelta);



  // container.x = Math.sin(delta) * 10;
  // container.scale = delta + 10;
  // img.rotation += 0.1;
}

canvas.addEventListener(
  'wheel',
  (e) => {
    clearTimeout(timer);
    // console.log("e", e)

    // scroll MULTIPLIER
    scrollDelta = e.deltaY * 0.0008;

    isScrolling = true;
    app.ticker.start();

    timer = setTimeout(() => {
      app.ticker.stop();
      isScrolling = false;
    }, 50);
  },
  { passive: true }
);

///// LOADER CODE
// let loader = PIXI.Loader.shared;

// loader.add('guy', guy).add('bg', bg);
// loader.onProgress.add(handleLoadProgress);
// loader.onLoad.add(handleLoadAsset);
// loader.onError.add(handleLoadError);
// loader.load(handleLoadComplete);

// let img;

// function handleLoadProgress(loader, resource) {
//   console.log(loader.progress + '% loaded');
// }

// function handleLoadAsset(loader, resource) {
//   console.log('asset loaded ' + resource.name);
// }

// function handleLoadError(loader, resource) {
//   console.error('load error', loader);
//   console.error('load error resource', resource);
// }

// function handleLoadComplete(loader, resources) {
//   console.log('handleLoadComplete -> resources', resources.guy);
//   let texture = resources.guy.texture;
//   img = new PIXI.Sprite(texture);

//   img.anchor.x = 0.5;
//   img.anchor.y = 0.5;
//   app.stage.addChild(img);

//   app.ticker.add(animate);

//   setTimeout(() => {
//     img.texture = loader.resources.bg.texture;
//   }, 2000);
// }

// function animate() {
//   img.x = app.renderer.screen.width / 2;
//   img.y = app.renderer.screen.height / 2;
//   img.rotation += 0.1;
// }

//////// END LOADER CODE
