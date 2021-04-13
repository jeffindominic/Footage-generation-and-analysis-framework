
const videos = document.getElementById('videoInput')
const homeid= document.getElementById('home')


Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models') //heavier/accurate version of tiny face detector
]).then(start)

  function start() {
    document.body.append('Loading models please wait... '+ '\n' )
    
    
//getting video src from localStorage
    let vid = localStorage.getItem('video')
    vid = JSON.parse(vid)
    console.log(vid)
    let id = localStorage.getItem('uid')
    console.log(id)
    homeid.href = `/calendar/${id}`
    videos.src = vid
    
    console.log('video added')
    recognizeFaces()
}

async function recognizeFaces() {

    const labeledDescriptors = await loadLabeledImages()
    console.log(labeledDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6)


    videos.addEventListener('play', async () => {
        console.log('Playing')
        const canvas = faceapi.createCanvasFromMedia(videos)
        document.body.append(canvas)

        const displaySize = { width: videos.height, height: videos.height }
        faceapi.matchDimensions(canvas, displaySize)

        

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(videos).withFaceLandmarks().withFaceDescriptors()

            const resizedDetections = faceapi.resizeResults(detections, displaySize)

            canvas.getContext('2d').clearRect(0, 0, videos.width, videos.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            results.forEach( (result, i) => {
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
            })
        }, 100)


        
    })
}

//Labels for traning
function loadLabeledImages() {
    const labels = ['Alen', 'Geo', 'Jimmy', 'John', 'Junaid', 'Paul', 'Vishak']
   
    return Promise.all(
        labels.map(async (label)=>{
            const descriptions = []
            for(let i=1; i<=5; i++) {
                const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                console.log(label + i + JSON.stringify(detections))
                descriptions.push(detections.descriptor)
            }
             document.body.append(label+' Faces Loaded | ')
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}