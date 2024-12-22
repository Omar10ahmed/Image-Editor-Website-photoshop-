let saturate = document.getElementById('saturate')
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById('sepia')
let grayscale = document.getElementById('grayscale')
let blurr = document.getElementById('blur')
let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById('upload')
let download = document.getElementById("download");

let img = document.querySelector('img')

let reset = document.querySelector('span')
let imgBox = document.querySelector('.box-img')

// Add these new filter variables
let invert = document.getElementById('invert');
let opacity = document.getElementById('opacity');
let dropShadow = document.getElementById('drop-shadow');

function resetValue()
{
    img.style.filter='none'
    saturate.value='100'
    contrast.value='100'
    brightness.value='100'
    sepia.value='0'
    grayscale.value='0'
    blurr.value='0'
    hueRotate.value='0'
    invert.value='0'
    opacity.value='100'
    dropShadow.value='0'
}


window.onload = function(){
    download.style.display='none'
    reset.style.display='none'
    imgBox.style.display='none'
}
upload.onchange = function()
{
    resetValue()
    download.style.display='block'
    reset.style.display='block'
    imgBox.style.display='block'
    let file = new FileReader()
    file.readAsDataURL(upload.files[0])
    file.onload = function(){
        img.src=file.result;
    }
}

let filters = document.querySelectorAll("ul li input")

filters.forEach(filter => {
    filter.addEventListener('input', function() {   
        img.style.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blurr.value}px)
        hue-rotate(${hueRotate.value}deg)
        invert(${invert.value}%)
        opacity(${opacity.value}%)
        drop-shadow(0 0 ${dropShadow.value}px)
        `
    })
})

function downloadImage() {
    // Create a temporary canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the image
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;

    // Apply the current filters to the canvas
    ctx.filter = img.style.filter;

    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a data URL
    canvas.toBlob(function(blob) {
        if (blob) {
            // Create a temporary link element and trigger the download
            const link = document.createElement('a');
            link.download = 'filtered_image.jpg';
            link.href = URL.createObjectURL(blob);
            link.click();
            
            // Clean up
            URL.revokeObjectURL(link.href);
        } else {
            console.error('Canvas to Blob conversion failed');
        }
    }, 'image/jpeg', 0.8);
}

// Add click event listener to the download button
download.addEventListener('click', function() {
    console.log('Download button clicked');
    downloadImage();
});
