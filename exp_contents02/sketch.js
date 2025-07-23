// Unified Rupture © 2023-04-15 by Zaron Chen is licensed under CC BY-NC-SA 3.0. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/3.0/

import { mountFlex } from "https://cdn.jsdelivr.net/npm/p5.flex@0.1.1/src/p5.flex.min.mjs"
import { vert, frag } from "./shader.js"

mountFlex(p5)

new p5((p) => {
	const [WIDTH, HEIGHT] = [920, 690]
	const PIXEL_DENSITY = 1;
	const CANVAS_SIZE = [WIDTH, HEIGHT]
	let theShader

    let img;

    p.preload = () => {
    img = p.loadImage('test.png');
    }

	p.setup = () => {
		p.createCanvas(WIDTH, HEIGHT, p.WEBGL)
		p.flex({ container: { padding: "20px" }, canvas: { fit: p.SCALE_DOWN } })

		p.pixelDensity(PIXEL_DENSITY)

		theShader = p.createShader(vert, frag)
        img.loadPixels();

		p.noStroke()
		p.imageMode(p.CENTER)
        p.image(img, 0, 0, WIDTH, HEIGHT);

	}

	p.draw = () => {
        // 블렌드 모드 설정 (예: ADDITIVE)
        //p.blendMode(p.SCREEN);
        //p.image(img, 0, 0, WIDTH, HEIGHT); // 이미지를 최상단에 그리기
        // 블렌드 모드 원래대로 복구
        //p.blendMode(p.BLEND);
		if (p.frameCount%200==0)
		p.background(255)
		p.shader(theShader)
		theShader.setUniform("canvasSize", CANVAS_SIZE)
		theShader.setUniform("mouse", [p.mouseX / WIDTH, p.mouseY / HEIGHT])
		theShader.setUniform("time", p.frameCount)
        
		p.quad(-1, 1, 1, 1, 1, -1, -1, -1)
        
      

	}
	
})

