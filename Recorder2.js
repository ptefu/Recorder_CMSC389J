"use strict";
window.onload = main;

function Utility(name, year, description) {
    this.name = name;
    this.year = year;
    this.description = description;
}

Utility.prototype = {
    constructor: Utility,
    getName: function() { return this.name; },
    getYear: function() { return this.year; },
    getDescription: function() { return this.description; },
    setDescription: function(descriptionIn) { this.description = descriptionIn },

};

function Recorder(name, year, description) {
    Utility.call(this, name, year, description);
    //this.color = "red";
}
Recorder.prototype = Object.create(Utility.prototype);
Recorder.prototype.startRecording = function() {
    isRecording = true;
    //var scopeColor = this.color //set color for scope of this function
    document.getElementById("canvas").onmousedown = function() {
        var isDrag = true;
        document.getElementById("canvas").onmouseup = function() {
            isDrag = false;
        }
        document.onmousemove = function(evt) {
            if (isDrag && isRecording) {
                context.fillStyle = color;
                context.fillRect(evt.pageX, evt.pageY, 5, 5);
                movementArray.push([evt.pageX, evt.pageY, color]);
            } 
        }
    }
};
Recorder.prototype.stopRecording = function() {
    isRecording = false;
};
Recorder.prototype.playRecording = function() {
    if (movementArray.length == 0) {
        alert("No Recording");
    } else if (isRecording) {
        alert("Still Recording");
    } else {
        context.clearRect(0, 0, document.getElementById("canvas").width, document.getElementById("canvas").height);
        for (var i = 0; i < movementArray.length; i++) {
            (function(i){
                setTimeout(function(){
                    context.fillStyle = movementArray[i][2];
                    context.fillRect(movementArray[i][0], movementArray[i][1], 5, 5);
                }, 4 * i);
            }(i));
        }
    }
};
Recorder.prototype.clear = function() {
    if (isRecording) {
        alert("Still Recording");
    } else {
        context.clearRect(0, 0, document.getElementById("canvas").width, document.getElementById("canvas").height);
        movementArray = [];
        isRecording = false;
    }
};
Recorder.prototype.changeColor = function(colorIn) {
    color = colorIn;
}

window.movementArray = [];
window.isRecording = false;
window.color = "red";
var context;
function main() {
    var recordtester = new Recorder("Recorder", 2016, "this is a Recorder object that extends the Utility object. Used to record drawings");
    context = document.getElementById("canvas").getContext("2d");
    document.getElementById("startRecordButton").onclick = function() {
        recordtester.startRecording();
    };
    document.getElementById("stopRecordButton").onclick = function() {
        recordtester.stopRecording();
    };
    document.getElementById("playRecordButton").onclick = function() {
        recordtester.playRecording();
    };
    document.getElementById("clearScreenButton").onclick = function() {
        recordtester.clear();
    };
    document.getElementById("blue").onclick = function() {
        recordtester.changeColor("blue");
    };
    document.getElementById("red").onclick = function() {
        recordtester.changeColor("red");
    };
    document.getElementById("green").onclick = function() {
        recordtester.changeColor("green");
    };
    document.getElementById("yellow").onclick = function() {
        recordtester.changeColor("yellow");
    };
    document.getElementById("save").onclick = function() {
        localStorage['movementArray'] = JSON.stringify(movementArray);
    };
    document.getElementById("load").onclick = function() {
        movementArray = JSON.parse(localStorage['movementArray']);
        alert("Last Saved Loaded, Press Play To View");
    };
}


