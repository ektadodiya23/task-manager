



  const getEmptyTags = (html:string)=>{
        var tempDivElement = document.createElement("div");
        tempDivElement.innerHTML=html ; 
        return tempDivElement.textContent || tempDivElement.innerText|| ""
  }

 export {
  getEmptyTags
}


  // function convertToPlain(html:string) {
  //    var tempDivElement = document.createElement("div");
  //    tempDivElement.innerHTML = html;
  //   return tempDivElement.textContent || tempDivElement.innerText || "";
  // }

