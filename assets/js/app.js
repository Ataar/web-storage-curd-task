let stdForm = document.getElementById('stdForm')
let fnameControl = document.getElementById('fname')
let lnameControl = document.getElementById('lname')
let emailControl = document.getElementById('email')
let contactControl = document.getElementById('contact')
let stdContainer = document.getElementById('stdContainer')
let submitid = document.getElementById('submitid')
let updateid = document.getElementById('updateid')



const generateUUID = () => {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     const r = Math.random() * 16 | 0;
     const v = c === 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
   });
 };
 



let stdArray = [
   // {
   //    fname:'Mohan',
   //    lname:'rathod',
   //    email:'mohan@r.com',
   //    contact:7654289008

   // }
]

stdArray =JSON.parse(localStorage.getItem('stdData')) || [];


const onEdit=(ele)=>{
let editId = ele.closest('tr').getAttribute('id')
  localStorage.setItem('editId',editId)
  let editObj = stdArray.find(std=>std.id===editId)
  console.log(editObj) 
  fnameControl.value=editObj.fname,
  lnameControl.value=editObj.lname;
  emailControl.value=editObj.email;
  contactControl.value=editObj.contact;


  submitid.classList.add('d-none');
  updateid.classList.remove('d-none');
}



const onDelete=(ele)=>{  
   // console.log(eve)
   let deleteid = ele.closest('tr').id;
   // console.log(deleteid)
   let deleteindex = stdArray.findIndex(std=>std.id===deleteid)
   console.log(deleteindex)
   stdArray.splice(deleteindex,1)
 localStorage.setItem('stdData',JSON.stringify(stdArray))
 templating(stdArray)
 
    

 
 Swal.fire({
   title: 'Are you sure?',
   text: "You won't be able to revert this!",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, delete it!'
 }).then((result) => {
   if (result.isConfirmed) {
     Swal.fire(
       'Deleted!',
       'Your file has been deleted.',
       'success'
     )
   }
 })
}


const templating =(arr)=>{
   let result ='';
   arr.forEach((std,i) => {
      result+=`
      <tr id='${std.id}'>
      <td>${i+1}</td>
      <td>${std.fname}</td>
      <td>${std.lname}</td>
      <td>${std.email}</td>
      <td>${std.contact}</td>
      <td>
      <button class="btn btn-primary pro" onclick='onEdit(this)'>Edit</button>
      </td>
      <td>
      <button class="btn btn-danger pro" onclick='onDelete(this)'>Delete</button>
      </td> 
    </tr>
      
      `

   });
   stdContainer.innerHTML = result;
}

templating(stdArray)

let onSubmit =(eve)=>{
   eve.preventDefault();
//   console.log(`Submitted`)






let stdObj = {
   fname:fnameControl.value,
   lname:lnameControl.value,
   email:emailControl.value,
   contact:contactControl.value,
   id: generateUUID()
}
eve.target.reset()
 stdArray.push(stdObj)
 localStorage.setItem('stdData',JSON.stringify(stdArray))
 templating(stdArray)
 console.log(stdArray)
 Swal.fire({
       
   icon: 'success',
   title: 'New Object is Added Successfully !!!',
   showConfirmButton: false,
   timer: 1500
 })
}

let onUpdate = ()=>{
   let updatei = localStorage.getItem('editId')
   // console.log(`Update${updatei}`)
   stdArray.forEach(obj=>{
       if(obj.id===updatei){
         obj.fname=fnameControl.value;
         obj.lname=lnameControl.value;
         obj.email=emailControl.value;
         obj.contact=contactControl.value;
       }
   })
   localStorage.setItem('stdData',JSON.stringify(stdArray));
   templating(stdArray)
   stdForm.reset()
   Swal.fire('This Data is already Taken Try New one')
}



stdForm.addEventListener('submit',onSubmit)
updateid.addEventListener('click',onUpdate)

