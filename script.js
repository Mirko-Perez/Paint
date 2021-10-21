"use strict";

const canvas = document.querySelector('.canvas');

const dif = canvas.getBoundingClientRect();

const ctx = canvas.getContext("2d");

const reset=document.querySelector('.btn-reset');

const descargar = document.querySelector(".btn-descarga");

let painting, color, linewidth, difX,difY,link;


canvas.addEventListener("mousedown",e=>{
  difX =e.clientX -dif.left;
  difY =e.clientY -dif.top; 
  painting =true; 
  color =document.querySelector("#color").value;

  linewidth =document.querySelector("#lw").value;
  ctx.beginPath();
})

canvas.addEventListener("mousemove",e=>{
    if (painting) {
        dibujar(difX,difY,e.clientX-dif.left,e.clientY-dif.top)
        difX =e.clientX -difX.left;
        difY =e.clientY -difY.top;
    }

})

canvas.addEventListener("mouseup",()=>{
    ctx.closePath();
    painting=false;
})

const dibujar = (x1,y1,x2,y2) =>{
    ctx.strokeStyle =color;
    ctx.lineWidth=linewidth;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

reset.addEventListener("click",e=>{
    canvas.width = canvas.width;

})





descargar.addEventListener("click",e=>{
    const filename = prompt("Guardar como...","Nombre del archivo");
    if (canvas.msToBlob){ //para internet explorer
        var blob = canvas.msToBlob();
        window.navigator.msSaveBlob(blob, filename + ".png" );// la extensión de preferencia pon jpg o png
    } else {
        link = document.getElementById("download");
        //Otros navegadores: Google chrome, Firefox etc...
        link.href = canvas.toDataURL("image/png");// Extensión .png ("image/png") --- Extension .jpg ("image/jpeg")
        link.download = filename;
    }
})

