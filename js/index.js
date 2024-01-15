var siteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("bookmarkURL");
var siteList=[];
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");

if (localStorage.getItem("sites")!=null){
  siteList = JSON.parse(localStorage.getItem("sites"))
  displayDate();
}

function addSite (){
  if (validationName()  && validationUrl()){
    var site = {
    websiteName:siteName.value,
    websiteUrl:siteUrl.value
  }
  siteList.push(site)
  localStorage.setItem("sites",JSON.stringify(siteList))
  clearForm();
  displayDate();
  }
  else{
    boxModal.classList.remove('d-none')
  }
}


function clearForm(){
  siteName.value="";
  siteUrl.value="";
}


function displayDate(){
  var cartona = "";
  for( var i=0  ; i < siteList.length ; i++  ){
    cartona += `
    <tr>
                        <td>${i+1}</td>
                        <td>${siteList[i].websiteName}</td>
                        <td><button class="btn visitBtn"  onclick="Visit(${i});"><i class="fa-solid fa-eye"></i>Visit</button></td>
                        <td><button class="btn closeBtn" onclick = "deleteDate(${i});" ><i class="fa-solid fa-trash"></i>Delete</button></td>
                    </tr>
                    `
  }
  document.getElementById("tableContent").innerHTML= cartona;
}

function deleteDate(index){
  siteList.splice(index,1);
  localStorage.setItem("sites",JSON.stringify(siteList));
  displayDate();
} 

function Visit(index){
  var url = `${siteList[index].websiteUrl}`
  window.open(url)
}

function validationName(){
  var regexName = /^\w{3,}(\s+\w+)*$/;
  var textName = siteName.value;
  if (regexName.test(textName)){
    siteName.classList.add('is-valid');
    siteName.classList.remove('is-invalid');
    return true;
  }
  else{
    siteName.classList.add('is-invalid'); 
    siteName.classList.remove('is-valid'); 
    return false;
  }
}
function validationUrl(){
  var regexUrl = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  var textUrl = siteUrl.value;
  if (regexUrl.test(textUrl)){
    siteUrl.classList.add('is-valid');
    siteUrl.classList.remove('is-invalid');
    return true ;
  }
  else{
    siteUrl.classList.add('is-invalid'); 
    siteUrl.classList.remove('is-valid'); 
    return false ;
  }
}

function closeModal() {
  boxModal.classList.add("d-none");
}


