const dropZone = document.querySelector(".drop-zone");

const browseBtn=document.querySelector(".browseBtn");

const fileInput = document.querySelector("#fileInput");

const progressContainer = document.querySelector(".progress-container");

const bgProgress = document.querySelector(".bg-progress");

const ProgressBar = document.querySelector(".progress-bar");

const percentDiv = document.querySelector("#percent");

const fileURLInput = document.querySelector("#fileURL");

const sharingContainer = document.querySelector(".sharing-container");

const CopyBtn = document.querySelector("#coptBtn");

const host = "https://innshare.herokuapp.com/";
const uploadURL= `${host}api/files`;
// const uploadURL= `${host}api/files`;

dropZone.addEventListener("dragover",(e)=>{
  e.preventDefault();
if(!dropZone.classList.contains("dragged")){
    dropZone.classList.add("dragged");
}

}  );

dropZone.addEventListener("dragleave",()=>{
   dropZone.classList.remove("dragged"); 
});

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged"); 
    const files=e.dataTransfer.files;
   //console.table(files);
    if(files.length){
        fileInput.files=files;
        uploadFile();
    }
 });

fileInput.addEventListener("change", ()=>{
    uploadFile();
})
browseBtn.addEventListener("click",()=>{
  fileInput.click();

});

CopyBtn.addEventListener("click",()=> {
  fileURLInput.select();
  document.execCommand("copy");
});

const uploadFile = ()=>{
    progressContainer.style.Display = "block";
    const file=fileInput.files[0];
    const formData = new FormData()
    formData.append("myfile",file);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
      //  console.log(xhr.readyState);
        if(xhr.readyState=== XMLHttpRequest.DONE){
            console.log(xhr.response);
            showLink(JSON.parse(xhr.response));
        }
    };
 
    xhr.upload.onprogress = updateProgress;

    xhr.open("POST",uploadURL);
    xhr.send(formData)
}
const updateProgress = (e)=>{
  const percent = Math.round((e.loaded / e.total) * 100);
  // console.log(percent);
  bgProgress.style.width = `${percent}%`;
  percentDiv.innerText = percent;
  ProgressBar.style.transform = `sacleX(${percent/100})`;
}

const showLink = ({file:url})=>{
      console.log(url);
      progressContainer.style.Display = "none";
      sharingContainer.style.Display = "block";
      fileURLInput.value = url;
}