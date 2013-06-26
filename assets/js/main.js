var socket = io.connect('http://localhost:8000');
//listen to display message event
 socket.on('insertText', function (data){
    editor = CodeMirror.fromTextArea(document.getElementById("html"));
    editor.setValue(data);
    console.log(data);
 });

$(document).ready(function()
{

  // Save a reference to key elements
  var html = document.getElementById("html"), 
      css = document.getElementById("css"),
      frame = document.getElementById("frame"), 
      head = frame.contentDocument.head, 
      body_win = frame.contentDocument.body;
  
  // Extend the height of the iFrame to the size of the window. Webkit browsers are able to stretch the height of the iFrame to 100% of window, but Firefox and IE have issues. This resolves it.
  frame.style.height = window.innerHeight+"px";

  // CodeMirror the HTML textarea. Set the line wrapping to true
  var hinput = CodeMirror.fromTextArea(html, {
      mode: "htmlmixed",
      value: this.value,
      lineWrapping: true,
      profile: 'xhtml',
      lineNumbers: true
    });

  // CodeMirror the CSS textarea. 
  var cssinput =  CodeMirror.fromTextArea(css, 
  {
    mode: "text/css",
    value: this.value, 
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentWithTabs: true,
    tabSize: 2,
    lineNumbers: true
  });

  // Save references to the CodeMirror instances of the two textareas
  var html_input = document.querySelectorAll(".CodeMirror")[0], 
      css_input = document.querySelectorAll(".CodeMirror")[1];

  html_input.setAttribute("name", "html");
  css_input.setAttribute("name", "css");

  var style = document.createElement("style"),
      iframe_text = document.createElement("div");

  iframe_text.setAttribute("name", "HTML-Content");

  html_input.onkeyup = function() 
  {
    iframe_text.innerHTML = hinput.getValue();
    var message = iframe_text.innerHTML;


    //console.log(message);
    socket.emit('textType', message);
  }

  css_input.onkeyup = function() 
  {
    // Replace multiple line breaks, at least three, with two line breaks. This should be enough to distinguish between lines. Same theory applies to other instances of this Regular Expression
    style.textContent = cssinput.getValue();
  }
  body_win.appendChild(iframe_text);
  head.appendChild(style);

}, false);



   