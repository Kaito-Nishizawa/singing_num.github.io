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
    var choral_list = wav_dir + "choral.list";
    var lylic_list = wav_dir + "lylic.list";
    choral = loadText(choral_list);
    lylic = loadText(lylic_list);
    outfile = name + "_choral_evaluate.csv";
    file_list = makeFileList();
    console.log(file_list);
    scores1 = (new Array(file_list.length)).fill(0);
    eval1 = document.getElementsByName("eval1");
    init()
}

function setLylic() {
    document.getElementById("page").textContent = "" + (n + 1) + "/" + scores1.length;
}

function loadText(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, false);
    xhr.send(null);
    alert(filename)
    var list = xhr.responseText.split(/\r\n|\r|\n/);
    list.pop();
    return list;
}

// make file list
function makeFileList() {
    var ori_files = choral.zip(lylic);
    let files = [];
    files = ori_files
    files.shuffle();
    return files;
}

// convert display
function Display() {
    document.getElementById("Display1").style.display = "none";
    document.getElementById("Display2").style.display = "block";
}

function evaluation() {
    for (var i = 0; i < eval1.length; i++) {
        if (eval1[i].checked) {
            scores1[n] = i + 1;
        }
    }
    setButton();
}

function setAudio() {
    document.getElementById("Choral").innerHTML = 'Voice 1:<br>'
        + '<audio src="' + file_list[n][0]
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral").innerHTML = 'Voice 2:<br>'
        + '<audio src="' + file_list[n][1]
        + '" controls preload="auto">'
        + '</audio>';
        document.getElementById("Choral").innerHTML = 'Voice 3:<br>'
        + '<audio src="' + file_list[n][2]
        + '" controls preload="auto">'
        + '</audio>';
        document.getElementById("Choral").innerHTML = 'Voice 4:<br>'
        + '<audio src="' + file_list[n][3]
        + '" controls preload="auto">'
        + '</audio>';
        document.getElementById("Choral").innerHTML = 'Voice 5:<br>'
        + '<audio src="' + file_list[n][4]
        + '" controls preload="auto">'
        + '</audio>';
        document.getElementById("Choral").innerHTML = 'Voice 6:<br>'
        + '<audio src="' + file_list[n][5]
        + '" controls preload="auto">'
        + '</audio>';
        document.getElementById("Choral").innerHTML = 'Voice 7:<br>'
        + '<audio src="' + file_list[n][6]
        + '" controls preload="auto">'
        + '</audio>';
}

function init() {
    n = 0;
    setLylic();
    setAudio();
    evalCheck1();
    setButton();
}

function exportCSV() {
    var csvData = "";
    for (var i = 0; i < file_list.length; i++) {
        csvData += "" + file_list[i] + ","
            + scores1[i] + ","
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
    evalCheck1();
    setButton();
}

function prev() {
    n--;
    setLylic();
    setAudio();
    evalCheck1();
    setButton();
}

function finish() {
    exportCSV();
}


//------------設定---------------//
const wav_dir = "./wav/";

//var natural;
var choral;
var lylic;
var outfile;
var slides;
var file_list;
var scores1;

// ローカルで行う場合はloadText()は動作しないため
var n = 0;
var eval1 = document.getElementsByName("eval1");