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

        // door sides

        line6.style.height = `${4.5 + scroll * 0.01}%`;
        line7.style.height = `${4.5 + scroll * 0.01}%`;

        // room back sides
        line8.style.top = `${scroll * 0.0166}%`;
        line8.style.left = `${20.2 + scroll * 0.066}%`;
        line9.style.top = `${scroll * 0.0166}%`;
        line9.style.left = `${79.8 - scroll * 0.066}%`;

        // room back top
        line10.style.top = `${scroll * 0.0166}%`;
        line10.style.left = `${20.2 + scroll * 0.066}%`;
        line10.style.width = `${60 - scroll * 0.132 - 0.4}%`;

    } else if(scroll < 150) {
        // make the back lines dissapear
        line10.style.left = `1000%`;
        line9.style.left = `1000%`;
        line8.style.left = `1000%`;

        // make room larger
        line1.style.width = `${50 + scroll * 0.132}%`;
        line1.style.left = `${25 - scroll * 0.066}%`;
    }
  

    console.log(scroll);

    

}

window.addEventListener("scroll", animateRoom);