import * as json from "../../classes.json" assert {type: 'json'};

import { 
getClassesImages,
getRandomFrom,
initImg,
removeRandomFrom,
selectRandomElement,
wait
} from "./utils.js"

window.onload = async function(){

  const { classes } = json.default;
  const body = document.querySelector('body');
  let classesElements;

  const imgClassesUrls = Promise.all(getClassesImages({ classes }))
  .then(blobImgClasses => blobImgClasses
    .map(blobImg => URL.createObjectURL(blobImg)))

  initImg({bodyElement: body, srcUrls: imgClassesUrls}, 
    (classesElementsNodeList, length) => {
      classesElements = Array.from(classesElementsNodeList);
      selectRandomElement({ nodeListElements: classesElements }, 
        (selectionEvent) => {
        clearInterval(selectionEvent);
        const selected = getRandomFrom('#classes');
        selected.setAttribute('id', 'selected')
        wait({ ms: 10000, exec: removeRandomFrom }, () => {
            selected.removeAttribute('id')   
        })
        console.log("canceled...")
      })
  })
  
  
  
}