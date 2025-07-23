// noprotect

// https://github.com/ZRNOF/Shox
import * as Shox from "https://cdn.jsdelivr.net/npm/shox@1.0.0/src/Shox.js"

export const frag = `#version 300 es
  precision mediump float;

  uniform vec2 canvasSize;
  uniform vec2 mouse;
  uniform float time;

  ${Shox.displace}
  ${Shox.noiseMath}
  ${Shox.snoise3D}
  ${Shox.snoise3DImage}
  ${Shox.gradient}
  ${Shox.zcPalette(5)}
  ${Shox.extend}
  ${Shox.smooth}

  in vec2 vTexCoord;
  out vec4 fragColor;
  void main() {
    vec2 uv = vTexCoord;
    vec2 mo = mouse;
    mo = min(max(vec2(0.), mouse), vec2(1.));

    uv-=0.5;
    uv.x *= canvasSize.x/canvasSize.y;

    vec2 muv = smoo3(mirror(uv, 1.));

    float scal = 2.;
    float gain = mo.y*100.;
    float ofst = .5;
    float expo = mo.x*2.5;
    vec3  move = vec3(0., 0., time*0.0025);
    vec4 dimg = snoise3DImage(1.*uv, scal, gain, ofst, expo, move);

    float wei = 0.1;
    vec2 duv = smoo3(displace(muv, dimg.rg, ofst, wei));

    vec2 puv = smoo3(conical(duv, vec2(.5), 5., time*0.001));

    vec4 colors[] = vec4[](
       vec4(0.5, 0.5, 0.5, 0.6),  // RGB: (13, 80, 251)
  vec4(0.859, 0.992, 0.996, 1.0),  // RGB: (219, 253, 254)
  vec4(0.898, 0.996, 0.984, 1.0),  // RGB: (229, 254, 251)
  vec4(0.933, 0.996, 0.984, 1.0),  // RGB: (238, 254, 251)
  vec4(0.843, 1.0, 0.980, 1.0)     // RGB: (215, 255, 250)
			
 
    );
    float positions[] = float[](
      0.0,
      0.25,
      0.5,
      0.75,
      1.0
    );
    vec4 color = smoo3(palette(puv.x, colors, positions));

    fragColor = smoo3(color);
  }
`

export const vert = `#version 300 es

  in vec4 aPosition;
  in vec2 aTexCoord;

  out vec2 vTexCoord;

  void main() {
    vTexCoord = aTexCoord;
    gl_Position = aPosition;
  }
`
