document.addEventListener('turbolinks:load', function(){
    $("#installed-widgets").hide();
    $("#widget-list").css("display", "none");
    $(".menu-link").hide(); //hide the Account Settings, Logout & Widget Store links

    $("#menuBtn").click(function(e){
        e.preventDefault();
        if(this.innerHTML === "MENU"){
            //change text to "close", then show links & widget list
            this.innerHTML = "CLOSE";
            $(".menu-link").fadeIn();
            $("#widget-list").css("visibility", "visible").fadeIn();
            $("main").css("display", "inline-block");
        } else if (this.innerHTML === "CLOSE"){
            //change link back to "MENU", hide links and widget list
            this.innerHTML = "MENU";
            $(".menu-link").fadeOut();
            $("#widget-list").css("display", "none");
            $("main").css("display", "block");
        }
    });

    //when "My Widgets" link is clicked, show My Widgets & hide Installed Widgets
    $("#my-widgets-tab").click(function(e){
        e.preventDefault();
        $("#installed-widgets-tab").toggleClass("active-tab");
        $("#my-widgets-tab").toggleClass("active-tab");
        $("#installed-widgets").hide();
        $("#my-widgets").fadeIn();
    });

    //when "Installed" link is clicked, show Installed widgets & hide My Widgets
    $("#installed-widgets-tab").click(function(e){
        e.preventDefault();
        $("#my-widgets-tab").toggleClass("active-tab");
        $("#installed-widgets-tab").toggleClass("active-tab");
        $("#my-widgets").hide();
        $("#installed-widgets").fadeIn();
    });
}, false);