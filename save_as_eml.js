/**
  Save as EML for Gmail
  Copyright 2016 330k
  This software is released under the MIT License.
  http://opensource.org/licenses/mit-license.php
 **/
(function(){
  var xhr,
    formatDate;
  
  formatDate = function(d){
    var result = [];
    result.push("" + d.getFullYear());
    result.push(("00" + (d.getMonth() + 1)).slice(-2));
    result.push(("00" + d.getDate()).slice(-2));
    result.push("_");
    result.push(("00" + d.getHours()).slice(-2));
    result.push(("00" + d.getMinutes()).slice(-2));
    result.push(("00" + d.getSeconds()).slice(-2));
    
    return result.join("");
  };
  if(location.href.match(/&ik=[0-9a-f]+&view=om&th=[0-9a-f]+/)){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      var source,
        url,
        blob,
        a,
        maildate;
      
      if(xhr.readyState == 4 && xhr.status == 200){
        source = xhr.responseText;
        maildate = new Date((source.match(/^Date: (.+)/m) || [null, null])[1]);
        url = window.URL || window.webkitURL;
        blob = new Blob([source.trimLeft()], { type : "message/rfc822" });
        a = document.createElement("a");
        a.download = formatDate(maildate) + ".eml";
        a.href = url.createObjectURL(blob);
        a.click();
      }
    }
    //console.log(document.getElementsByClassName('download-buttons')[0].href);
    xhr.open('GET', document.getElementsByClassName('download-buttons')[0].href, true);
    xhr.send();
  }
})();
