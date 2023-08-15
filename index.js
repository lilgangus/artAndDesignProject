const line1 = document.getElementById("line1")
const line2 = document.getElementById("line2")
const line3 = document.getElementById("line3")
const line4 = document.getElementById("line4")
const line5 = document.getElementById("line5")
const line6 = document.getElementById("line6")
const line7 = document.getElementById("line7")

const line8 = document.getElementById("line8")
const line9 = document.getElementById("line9")

function animateRoom() {
    // when scrolled, the line will move downwards
    let scroll = window.scrollY + 1;
    if(scroll < 75) {
        line1.style.top = `${0.5 + scroll * 0.01}%`;
        line2.style.top = `${7.5 + scroll * 0.01}%`;
        line3.style.top = `${0.5 + scroll * 0.01}%`;
        line4.style.top = `${0.5 + scroll * 0.01}%`;

        line6.style.height = `${4.5 + scroll * 0.01}%`;
        line7.style.height = `${4.5 + scroll * 0.01}%`;

        line8.style.top = `${scroll * 0.0166}%`;
        line8.style.left = `${20 + scroll * 0.066}%`;

        line9.style.top = `${scroll * 0.0166}%`;
        line9.style.left = `${80 - scroll * 0.066}%`;

        line10.style.top = `${scroll * 0.0166}%`;
        line10.style.left = `${20 + scroll * 0.066}%`;
        line10.style.width = `${60 - scroll * 0.132}%`;
        

        // line5.style.transform = `translateY(${scroll * 0.3}px)`;
        // line6.style.transform = `translateY(${scroll * 0.3}px)`;
        // line6.style.height = `${40 + scroll * 0.025}%`;
        // line7.style.transform = `translateY(${scroll * 0.3}px)`;
        // line7.style.height = `${40 + scroll * 0.025}%`;

    } else {
        // line1.style.transform = `translateY(0px)`;
        // line2.style.transform = `translateY(0px)`;
        // line3.style.transform = `translateY(0px)`;
        // line4.style.transform = `translateY(0px)`;
    
        // line5.style.transform = `translateY(0px)`;
        // line6.style.transform = `translateY(0px)`;
        // line6.style.height = `40%`;
        // line7.style.transform = `translateY(0px)`;
        // line7.style.height = `40%`;
    }
  

    console.log(scroll);

    

}

window.addEventListener("scroll", animateRoom);