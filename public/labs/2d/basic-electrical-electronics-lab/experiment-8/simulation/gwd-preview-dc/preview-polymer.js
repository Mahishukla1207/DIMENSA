(function () {
  "use strict";

  function getPreviewPath() {
    var config = window.gwdPreview && window.gwdPreview.config;
    return config && config.previewPath ? config.previewPath : "index.html";
  }

  function renderPreview() {
    var iframe = document.createElement("iframe");
    iframe.title = "Google Web Designer preview";
    iframe.src = getPreviewPath();
    iframe.style.border = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.display = "block";

    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.textContent = "";
    document.body.appendChild(iframe);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderPreview);
  } else {
    renderPreview();
  }
})();
