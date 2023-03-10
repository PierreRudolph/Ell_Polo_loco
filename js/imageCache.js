let totalImageCache = {};

let allImagesPaths = [
    characterImagePaths,
    chickenImagePaths,
    smallChickenImagePaths,
    endbossImagePaths,
    bottleImagePath,
    cloudImagePaths,
    coinImagePaths,
    statusbarBossImagePaths,
    statusbarBottleImagePaths,
    statusbarCoinImagePaths,
    statusbarHealthImagePaths,
    throwableObjectImagePaths,
    AIR,
    THIRD_LAYERV2,
    SECOND_LAYERV2,
    FIRST_LAYERV2,
    THIRD_LAYERV1,
    SECOND_LAYERV1,
    FIRST_LAYERV1
];


async function loadAllImagesToCache() {
    for (let i = 0; i < allImagesPaths.length; i++) {
        await loadImagesListToCache(allImagesPaths[i]);
    }
}


async function loadImagesListToCache(listList) {
    for (let i = 0; i < listList.length; i++) {
        const singleList = listList[i];
        for (let j = 0; j < singleList.length; j++) {
            const path = singleList[j];
            try {
                const img = await loadSingleImage(path);
                totalImageCache[path] = img;
            } catch (e) {
                console.log(path)
                console.log(e)
            }
        }
    }
}


const loadSingleImage = path => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous' // to avoid CORS if used with Canvas
        img.src = path
        img.onload = () => {
            resolve(img)
        }
        img.onerror = e => {
            reject(e)
        }
    })
}