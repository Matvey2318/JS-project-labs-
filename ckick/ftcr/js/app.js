let scor=0;
function Click () {
    scor ++;
    console.log(this.scor);
}
let c=document.getElementById("arkanoid");
let x =c.getContext("2d");