document.addEventListener('DOMContentLoaded', function(){
    //document.getElementById("menuBtn").hidden = true;
    //document.getElementsByClassName("menu-link").hidden = true;
    $(".menu-link").hide();

    $("#menuBtn").click(function(e){
        e.preventDefault();

        //show the menu links (Account Settings, Widget Store, Logout)
        $(".menu-link").fadeToggle();

        if(this.innerHTML === "MENU"){
            this.innerHTML = "CLOSE";
        } else if (this.innerHTML === "CLOSE"){
            this.innerHTML = "MENU";
        }
    });
}, false);