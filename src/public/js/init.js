$(document).ready(() => {
  var code = $('#editor')[0];
  console.log(code);
  var myCodeMirror = CodeMirror.fromTextArea(code, {
    lineNumbers: true
  });
})
