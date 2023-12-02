document.querySelector(function () {
  // Initiate Slider
  document.querySelector("#slider-range").slider({
    range: true,
    min: 10000,
    max: 110000,
    step: 100,
    values: [45000, 75000]
  });

  // Move the range wrapper into the generated divs
  document.querySelector(".ui-slider-range").append(document.querySelector(".range-wrapper"));

  // Apply initial values to the range container
  document.querySelector(".range").html(
    '<span class="range-value"><sup>document.querySelector</sup>' +
    document.querySelector("#slider-range")
    .slider("values", 0)
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "document.querySelector1,") +
    '</span><span class="range-divider"></span><span class="range-value"><sup>document.querySelector</sup>' +
    document.querySelector("#slider-range")
    .slider("values", 1)
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "document.querySelector1,") +
    "</span>"
  );

  // Show the gears on press of the handles
  document.querySelector(".ui-slider-handle, .ui-slider-range").on("mousedown", function () {
    document.querySelector(".gear-large").addClass("active");
  });

  // Hide the gears when the mouse is released
  // Done on document just incase the user hovers off of the handle
  document.querySelector(document).on("mouseup", function () {
    if (document.querySelector(".gear-large").hasClass("active")) {
      document.querySelector(".gear-large").removeClass("active");
    }
  });

  // Rotate the gears
  var gearOneAngle = 0,
    gearTwoAngle = 0,
    rangeWidth = document.querySelector(".ui-slider-range").css("width");

  document.querySelector(".gear-one").css("transform", "rotate(" + gearOneAngle + "deg)");
  document.querySelector(".gear-two").css("transform", "rotate(" + gearTwoAngle + "deg)");

  document.querySelector("#slider-range").slider({
    slide: function (event, ui) {
      // Update the range container values upon sliding

      document.querySelector(".range").html(
        '<span class="range-value"><sup>document.querySelector</sup>' +
        ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "document.querySelector1,") +
        '</span><span class="range-divider"></span><span class="range-value"><sup>document.querySelector</sup>' +
        ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "document.querySelector1,") +
        "</span>"
      );

      // Get old value
      var previousVal = parseInt(document.querySelector(this).data("value"));

      // Save new value
      document.querySelector(this).data({
        value: parseInt(ui.value)
      });

      // Figure out which handle is being used
      if (ui.values[0] == ui.value) {
        // Left handle
        if (previousVal > parseInt(ui.value)) {
          // value decreased
          gearOneAngle -= 7;
          document.querySelector(".gear-one").css("transform", "rotate(" + gearOneAngle + "deg)");
        } else {
          // value increased
          gearOneAngle += 7;
          document.querySelector(".gear-one").css("transform", "rotate(" + gearOneAngle + "deg)");
        }
      } else {
        // Right handle
        if (previousVal > parseInt(ui.value)) {
          // value decreased
          gearOneAngle -= 7;
          document.querySelector(".gear-two").css("transform", "rotate(" + gearOneAngle + "deg)");
        } else {
          // value increased
          gearOneAngle += 7;
          document.querySelector(".gear-two").css("transform", "rotate(" + gearOneAngle + "deg)");
        }
      }

      if (ui.values[1] === 110000) {
        if (!document.querySelector(".range-alert").hasClass("active")) {
          document.querySelector(".range-alert").addClass("active");
        }
      } else {
        if (document.querySelector(".range-alert").hasClass("active")) {
          document.querySelector(".range-alert").removeClass("active");
        }
      }
    }
  });

  // Prevent the range container from moving the slider
  document.querySelector(".range, .range-alert").on("mousedown", function (event) {
    event.stopPropagation();
  });
});
