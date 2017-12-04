document.addEventListener("DOMContentLoaded", load_services);

// A cross-browser "To String" helper for xml node objects.
// Using console.dirxml() is an alternative way to inspect XML.
// Uses strict mode: https://goo.gl/xmOUmj
  function xmlToString(node) {
    if (node.xml) { // Only IE supports this property.
      return node.xml;
    } else if (XMLSerializer) { // Firefox supports this.
      var my_serializer = new XMLSerializer();
      return my_serializer.serializeToString(node);
    } else {
      alert('Your browser does not support XML serialization.');
      return "";
    }
  }

  //synchronously loads the passed XML document as a DOM Document object, and returns it
  function loadXML(filename) {
    if (window.XMLHttpRequest)
      {
      xhttp=new XMLHttpRequest();
      }
    else //for IE5 and IE6 holdouts
      {
      xhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
  }




function load_services() {
  		var servicesXML   = loadXML("services.xml");

		//alert(xmlToString(servicesXML));

		var servicesRoot = servicesXML.documentElement;

		var services = document.getElementById("services");
		services.innerHTML = "";

		var count = servicesXML.getElementsByTagName('service').length;
		//alert(count);

		for(var i=0; i<count ; i++)
		{
			var service = servicesXML.getElementsByTagName('service')[i];

			var image_element = service.getElementsByTagName('image')[0];

     		var image_name = image_element.firstChild.nodeValue;

     		var title_element = service.getElementsByTagName('title')[0];

      		var title_name = title_element.firstChild.nodeValue;

      		var description_element = service.getElementsByTagName('description')[0];

      		var description_name = description_element.firstChild.nodeValue;

      		var newLi = document.createElement("li");	
      		var img = document.createElement("img");
            img.setAttribute("src","images/" + image_name);
            
            img.classList.add("servicesImage");
            newLi.classList.add("servicesList");

       		var h3 = document.createElement("h3");
       		h3.classList.add("servicesTitle")
        	var blockquote = document.createElement("blockquote");
        	blockquote.classList.add("servicesDescription");

        	h3.innerHTML = title_name;
            blockquote.innerHTML = description_name;

            newLi.appendChild(img)
            newLi.appendChild(h3);
            newLi.appendChild(blockquote);

            services.appendChild(newLi);
		}
}