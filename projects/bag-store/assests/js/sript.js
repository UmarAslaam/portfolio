// modal script start
function img1() {
    document.getElementById("img").src = "./images/modal-1.jpg"
    
}
function img2() {
    document.getElementById("img").src = "./images/modal-2.jpg"
    
}
function img3() {
    document.getElementById("img").src = "./images/modal-3.jpg"
    
}
function img4() {
    document.getElementById("img1").src = "./images/modal-4.jpg"
    
}
function img5() {
    document.getElementById("img1").src = "./images/modal-5.webp"
    
}
function img6() {
    document.getElementById("img1").src = "./images/modal-6.jpg"
    
}
function img7() {
    document.getElementById("img2").src = "./images/modal-7.jpg"
    
}
function img8() {
    document.getElementById("img2").src="./images/modal-8.jpg" 
    
}
function img9() {
    document.getElementById("img2").src = "./images/modal-9.jpg"
    
}
function img10() {
    document.getElementById("img3").src = "./images/modal-10.jpg"
    
}
function img11() {
    document.getElementById("img3").src="./images/modal-11.jpg"
    
}
function img12() {
    document.getElementById("img3").src="./images/modal-12.jpg"
    
}
function img13() {
    document.getElementById("img4").src="./images/modal-13.png" 
    
}
function img14() {
    document.getElementById("img4").src="./images/modal-14.jpg"
    
}
function img15() {
    document.getElementById("img4").src="./images/modal-15.jpeg" 
    
}
function img16() {
    document.getElementById("img5").src="./images/modal-16.jpg"
    
}
function img17() {
    document.getElementById("img5").src="./images/modal-17.jpg"
    
}
function img18() {
    document.getElementById("img5").src="./images/modal-18.jpg" 
    
}
function img19() {
    document.getElementById("img6").src="./images/modal-19.jpg"
    
}
function img20() {
    document.getElementById("img6").src="./images/modal-20.jpg"
    
}
function img21() {
    document.getElementById("img6").src="./images/modal-21.webp"
    
}
function img22() {
    document.getElementById("img7").src="./images/modal-22.jpg"
    
}
function img23() {
    document.getElementById("img7").src="./images/modal-23.jpg"
    
}
function img24() {
    document.getElementById("img7").src="./images/modal-24.jpg"
    
}
// modal script End


// login form script start
               
   //   /  sign work/          
   document.getElementById('sbtn').addEventListener('click',()=>{
    let signName = document.getElementById('sname').value
    let signemail = document.getElementById('semail').value
    let signpass = document.getElementById('spassword').value

    localStorage.setItem('Username',signName)
    localStorage.setItem('Useremail',signemail)
    localStorage.setItem('Userpass',signpass)
})

//  /   login work/                 
document.getElementById('lbtn').addEventListener('click',()=>{
    let logName = document.getElementById('lname').value
    let logpass = document.getElementById('lpassword').value

    let getName = localStorage.getItem("Username") 
    let getpass = localStorage.getItem("Userpass") 

    let msg1 = document.getElementById('correct')
    let msg2 = document.getElementById('incorrect')

    if(logName == getName && logpass == getpass) {
        msg1.style.display ="block"  
        msg2.style.display ="none"  

        
    }  
     else {
        msg2.style.display ="block" 
        msg1.style.display ="none" 
      

    }
})

function custom(){
    let showpass = document.getElementById("lpassword") 
    let pass1 = document.getElementById('showpassword')
    let pass2 = document.getElementById('eye')
   
       if (showpass.type == 'password' ) {
           showpass.type = "text" 
           pass1.style.display= "none"   
           pass2.style.display= "block"   
       }
       else{
           showpass.type =  "password"
           pass1.style.display= "block"   
           pass2.style.display= "none"  
           
       }
}


// login form script End





