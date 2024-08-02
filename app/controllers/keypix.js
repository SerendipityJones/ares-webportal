import Controller from '@ember/controller';

export default Controller.extend({

  addClass: function(element, classToAdd) {
    var currentClassValue = element.className;

    if (currentClassValue.indexOf(classToAdd) == -1) {
      if ((currentClassValue == null) || (currentClassValue === "")) {
        element.className = classToAdd;
      } else {
        element.className += " " + classToAdd;
      }
    }
  },

  removeClass: function(element, classToRemove) {
    var currentClassValue = element.className;

    if (currentClassValue == classToRemove) {
      element.className = "";
      return;
    }

    var classValues = currentClassValue.split(" ");
    var filteredList = [];

    for (var i = 0 ; i < classValues.length; i++) {
      if (classToRemove != classValues[i]) {
        filteredList.push(classValues[i]);
      }
    }

    element.className = filteredList.join(" ");
  },

  actions: {
    clickBox: function() {
      console.log("Clicked.");
      const dataTypes = ["colour","material","motif","style"];
      const chosenType = {};
      var gatherChosen = 0
      var thePics = document.querySelectorAll(".key-gallery .thumbnail-gallery-item");
      dataTypes.forEach((dataType, d) => {
        chosenType[dataType] = [];
        var checkBoxes = document.querySelectorAll(".key-categories input[name='"+dataType+"']");
        checkBoxes.forEach((item, i) => {
          if (item.checked) {
            chosenType[dataType].push(item.id);
          }
        });
        gatherChosen += chosenType[dataType].length;
        //console.log(chosenType[dataType]);
      });
      if (gatherChosen) {
        var currentPics = new Array();
        dataTypes.forEach((dataType, d) => {
          if (chosenType[dataType].length) {
            //grab just the pics with the current selections in their appropriate dataType
            var tempPics = new Array();
            for (var i = 0; i < chosenType[dataType].length; i++) {
              if (tempPics.length) {
                tempPics = tempPics.filter( x=> Array.from(document.querySelectorAll(".key-gallery .thumbnail-gallery-item[data-"+dataType+"~='"+chosenType[dataType][i]+"']")).includes(x));
              } else {
                tempPics = Array.from(document.querySelectorAll(".key-gallery .thumbnail-gallery-item[data-"+dataType+"~='"+chosenType[dataType][i]+"']"));
              }
            }
            if (currentPics.length) {
              currentPics = currentPics.filter(x => tempPics.includes(x));
            } else {
              currentPics = tempPics;
            }
          }
        });
        //set all pics hidden
        var self = this;
        console.log(thePics);
        thePics.forEach((item, i) => {
          self.addClass(item, "hidekey");
        });
        //then unhide the ones in the current array
        console.log(currentPics);
        currentPics.forEach((item, i) => {
          self.removeClass(item, "hidekey");
        });
      } else {
        // if nothing's checked then set all the images visible
        var self = this;
        thePics.forEach((item, i) => {
          self.removeClass(item, "hidekey");
        });
      }
    },

    clearBoxes: function() {
      var checkBoxes = document.querySelectorAll(".key-categories input");
      checkBoxes.forEach((item, i) => {
        if (item.checked){
          item.checked = false;
        }
      });
      document.querySelectorAll(".key-gallery .thumbnail-gallery-item").forEach((item, i) => {
        this.removeClass(item, "hidekey");
      });
    }
  }
});
