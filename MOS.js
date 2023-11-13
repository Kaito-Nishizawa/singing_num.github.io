Array.prototype.shuffle = function () {
    var i = this.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

Array.prototype.zip = function (...args) {
    const new_array = [];
    for (let i = 0; i < this.length; i++) {
        new_array.push([this[i], ...args.map(arg => arg[i])]);
    }
    return new_array;
}

// start experiment
function start_experiment() {
    // get user name
    var name = document.getElementById("name").value.replace(" ", "_");
    if (name == "") {
        alert("名前を入力してください");
        return false;
    }
    // convert display
    Display();

    // read filepath
    var list = wav_dir + "file.list";
    file_list = loadText(list);
    file_list.shuffle();
    outfile = name + "_choral_evaluate.csv";
    console.log(file_list);
    scores = (new Array(file_list.length)).fill(0);
    song = (new Array(file_list.length)).fill(0);
    eval = document.getElementsByName("eval");
    init();
}

function setLylic() {
    document.getElementById("page").textContent = (n + 1) + "/" + scores.length;
    document.getElementById("lylic").innerHTML = '歌詞:<br>'
    + '<object data="'
    + file_list[n]
    + 'lylic.txt'
    + '"type="text/plain"'
    + 'width="50%"'
    + 'height="8%">'
    + '</object>';
}

function loadText(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, false);
    xhr.send(null);
    var list = xhr.responseText.split(/\r\n|\r|\n/);
    return list;
}

// convert display
function Display() {
    document.getElementById("Display1").style.display = "none";
    document.getElementById("Display2").style.display = "block";
}

function evalCheck() {
    const c = scores[n];
    if ((c <= 0) || (c > eval.length)) {
        for (var i = 0; i < eval.length; i++) {
            eval[i].checked = false;
        }
    }
    else {
        eval[c - 1].checked = true;
    }
}

function setButton() {
    var finish_flag = 0;
    var next_flag = 0;
    if (n == (scores.length - 1)) {
        document.getElementById("prev").disabled = false;
        document.getElementById("next2").disabled = true;
        document.getElementById("finish").disabled = true;
        for (var i = 0; i < eval.length; i++) {
            if (eval[i].checked) {
                finish_flag += 1;
            }
            if (finish_flag >= 1) {
                document.getElementById("finish").disabled = false;
                break;
            }
        }
    }
    else {
        if (n == 0) {
            document.getElementById("prev").disabled = true;
        }
        else {
            document.getElementById("prev").disabled = false;
        }
        document.getElementById("next2").disabled = true;
        document.getElementById("finish").disabled = true;
        for (var i = 0; i < eval.length; i++) {
            console.log(next_flag);
            if (eval[i].checked) {
                next_flag += 1;
            }
            if (next_flag >= 1) {
                document.getElementById("next2").disabled = false;
                break;
            }
            console.log(next_flag);
        }
    }
}

function evaluation() {
    for (var i = 0; i < eval.length; i++) {
        if (eval[i].checked) {
            scores[n] = i + 1;
        }
    }
    setButton();
}

function setAudio() {
    var song_list = file_list[n] + 'song.list';
    song[n] = loadText(song_list);
    song[n].shuffle();
    document.getElementById("Choral1").innerHTML = 'Voice 1:<br>'
        + '<audio src="' + file_list[n] + song_list[0]
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral2").innerHTML = 'Voice 2:<br>'
        + '<audio src="' + file_list[n] + song_list[1]
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral3").innerHTML = 'Voice 3:<br>'
        + '<audio src="' + file_list[n] + song_list[2]
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral4").innerHTML = 'Voice 4:<br>'
        + '<audio src="' + file_list[n] + song_list[3]
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral5").innerHTML = 'Voice 5:<br>'
        + '<audio src="' + file_list[n] + song_list[4]
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral6").innerHTML = 'Voice 6:<br>'
        + '<audio src="' + file_list[n] + song_list[5]
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral7").innerHTML = 'Voice 7:<br>'
        + '<audio src="' + file_list[n] + song_list[6]
        + '" controls preload="auto">'
        + '</audio>';
}

function init() {
    n = 0;
    setLylic();
    setAudio();
    evalCheck();
    setButton();
}

function exportCSV() {
    var csvData = "";
    for (var i = 0; i < file_list.length; i++) {
        csvData += "" + file_list[i] + ","
            + song[i] + ","
            + scores[i] + "\r\n";
    }

    const link = document.createElement("a");
    document.body.appendChild(link);
    link.style = "display:none";
    const blob = new Blob([csvData], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = outfile;
    link.click();
    window.URL.revokeObjectURL(url);
    link.parentNode.removeChild(link);
}

function next() {
    n++;
    setLylic();
    setAudio();
    evalCheck();
    setButton();
}

function prev() {
    n--;
    setLylic();
    setAudio();
    evalCheck();
    setButton();
}

function finish() {
    exportCSV();
}


//------------設定---------------//
const wav_dir = "wav/";

//var natural;
var choral;
var lylic;
var outfile;
var song;
var file_list;
var scores;

// ローカルで行う場合はloadText()は動作しないため
var n = 0;
var eval = document.getElementsByName("eval");
