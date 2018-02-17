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

    /*==========================*\
    ||   Widget Action Buttons  ||
    \*==========================*/

    // Map functions to "data-widget-action" values
    var widgetActions = {
      add: onAddClick,
      edit: onEditClick,
      create: onCreateClick,
      delete: onDeleteClick,
      uninstall: onUninstallClick,
    };

    function createListItem(data) {
      var widget = data.widget;

      return $(`
        <div class="widget-list-item" data-widget-id="${widget.id}">
          <div class="widget-logo">

          </div>
          <div id="widget-info">
            <h4>${widget.widget_name}</h4>
            <p>${widget.description}</p>
            <a href="#">Add +</a>
            <a href="#" data-widget-action="edit">Edit</a>
            <a href="#" data-widget-action="delete" class="widget-delete-button">Delete</a>
            <a href="#" data-widget-action="storePage">Store Page</a>
          </div>
        </div>
      `);
    }

    function onAddClick(e) {
      e.preventDefault();

      var id = $(this).closest(".widget-list-item").data("widget-id");

      if (Overlord) {
        Overlord.loadWidget(id);
      }
    }

    // Open widget editor when 'Edit' buttons are clicked
    function onEditClick(e) {
      e.preventDefault();

      var id = $(this).closest(".widget-list-item").data("widget-id");

      if (WidgetEditor) {
        $.get("/widgets/" + id + ".json", function(data) {
          WidgetEditor.open(data);
        });
      } else {
        console.warn('Widget Editor is not loaded yet');
      }
    }

    // Also open widget editor when 'Create' button is clicked
    function onCreateClick(e) {
      e.preventDefault();

      var widgetName = prompt("What do you want to call your widget?", "My Awesome Widget");
      var widgetDescription = prompt("Enter a short description of what your widget will do");

      $.ajax({
        url: "/widgets.json",
        method: "POST",
        data: {
          widget: {
            widget_name: widgetName,
            description: widgetDescription,
          },
          // authenticity_token: $('[name="csrf-token"]')[0].content
        },
        complete: function(response) {
          const widget = response.responseJSON;

          console.log("widget create complete", widget);

          // Add a new widget list item to page.
          $('#my-widgets').append(createListItem(widget));
        },
        error: function(err) {
          console.log("widget create failed", err);
        }
      })

      console.log(this);
    }

    // Delete a widget when the 'Delete' button is clicked
    function onDeleteClick(e) {
      e.preventDefault();
      var $container = $(this).closest(".widget-list-item");
      var id = $container.data("widget-id");

      var really = confirm("Are you absolutely sure you want to delete this widget?");
      var reallyReally = confirm("Really really?");

      if (really && reallyReally) {
        $.ajax({
          url: "/widgets/" + id + ".json",
          method: "DELETE",
          complete: function(response) {
            console.log("widget delete succeeded", response);
            $container.remove(); // Remove the widget-list-item from the page.
          },
          error: function(err) {
            console.log("widget delete failed", err);
          }
        });
      }
    }

    // Uninstall a widget when the 'Uninstall' button is clicked
    function onUninstallClick(e) {
      e.preventDefault();
      var id = $(this).parent().data("widget-id");

      console.log("uninstalling widget with ID of", id);

      alert("Widget uninstalling isn't implemented yet.");
    }


    // Dispatch widget actions.
    $("#widget-list").click(function(e) {
      var action = $(e.target).data("widget-action");

      // Run the function if there is one, otherwise do nothing.
      if (widgetActions[action]) {
        // Call with e.target as 'this', like a standard event listener
        widgetActions[action].call(e.target, e);
      }
    })
}, false);
