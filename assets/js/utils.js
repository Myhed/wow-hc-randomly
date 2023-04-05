export const getClassesImages = ({ classes }) => {
  const blobImgClasse = classes.map(classeJson => {
    const request = new Request(classeJson.path);
    return fetch(request).then(dataImgUrl => dataImgUrl.blob()); 
  })
  return blobImgClasse;
}

export const initImg = ({ bodyElement, srcUrls }, cb) => { 
  const classesElement = document.querySelector('#classes')
  srcUrls.then(imgUrls => {
    const index = imgUrls.length - 1
    if(imgUrls.length === 0){
     const classesElements = document.querySelectorAll('#classes>img');
     cb(classesElements, classesElements.length) 
    }else{
      const imgUrl = imgUrls.splice(index, 1)
      const img = document.createElement('img')
      img.src = imgUrl
      classesElement.appendChild(img)
      initImg({bodyElement, srcUrls}, cb) 
    }

  })
}

export const removeRandomFrom = (tagElement = '#classes') => {
  if(tagElement){
    tagElement = tagElement.concat('>','.rand')
  }
  const selectedImg = document.querySelector(tagElement);
  if(selectedImg){
    selectedImg.classList.remove('rand')
  }
}

export const getRandomFrom = (tagElement = '#classes') => {
  if(tagElement){
    tagElement = tagElement.concat('>','.rand')
  }
  return document.querySelector(tagElement);
}

export const addRandomFrom = (selected) => {
  selected.classList.add("rand")
}

export const wait = ({ ms, exec }, cb) => {
  setTimeout(() => {
    cb(exec())
  }, ms)
}

export const selectRandomElement = ({ nodeListElements, incr = 125 }, cb) => {
  let timer = incr;
  let selected;
  let randomSelectImage;
  
    const selection = setInterval(() => {
    if(timer >= 850){
      return cb(selection)
    }
    removeRandomFrom('#classes');
    randomSelectImage = Math.floor(Math.random() * (nodeListElements.length - 1) + 1)
    selected = nodeListElements[randomSelectImage]
    addRandomFrom(selected)
    timer += 150
    clearInterval(selection)
    selectRandomElement({ nodeListElements, incr: timer }, cb)
  }, timer) 
}





