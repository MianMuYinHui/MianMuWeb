(() => {
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
const canvas =
document.getElementById("particle");

const ctx =
canvas.getContext("2d");


let width;
let height;



function resize(){

width =
canvas.width =
window.innerWidth;


height =
canvas.height =
window.innerHeight;

}


resize();

window.onresize=resize;



let particles=[];



// 蝴蝶图片

const butterfly = "🦋";



class Particle{


constructor(type){


this.type=type;



this.x=
Math.random()*width;



this.y=
Math.random()*height;



this.size=
type==="butterfly"
?
Math.random()*15+15
:
Math.random()*3+1;



this.speed=
type==="butterfly"
?
Math.random()*0.4+0.2
:
Math.random()*0.5+0.2;



this.alpha=
Math.random()*0.5+0.3;



this.angle=
Math.random()*Math.PI*2;


}



update(){



this.y-=this.speed;



// 蝴蝶左右摆动

this.x +=
Math.sin(this.angle)*0.5;



this.angle+=0.02;




if(this.y<-50)

{

this.y=height+50;

this.x=Math.random()*width;

}


}



draw(){



if(this.type==="butterfly"){


ctx.globalAlpha=
this.alpha;


ctx.font=
`${this.size}px serif`;


ctx.fillText(

butterfly,

this.x,

this.y

);



}

else{


ctx.beginPath();



ctx.fillStyle=
`
rgba(
150,
190,
120,
${this.alpha}
)
`;



ctx.arc(

this.x,
this.y,
this.size,
0,
Math.PI*2

);



ctx.fill();


}



ctx.globalAlpha=1;



}



}




// 光点

for(let i=0;i<80;i++){

particles.push(
new Particle("dot")
);

}



// 蝴蝶

for(let i=0;i<8;i++){

particles.push(
new Particle("butterfly")
);

}





function animate(){


ctx.clearRect(
0,
0,
width,
height
);



particles.forEach(p=>{

p.update();

p.draw();

});



requestAnimationFrame(
animate
);


}



animate();
})();
