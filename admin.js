const firebaseConfig = {
  apiKey: "AIzaSyBZbkbWTlYtScXenDL9n-CgYSNluFtRf9E",
  authDomain: "dataadd-8cf4f.firebaseapp.com",
  databaseURL: "https://dataadd-8cf4f-default-rtdb.firebaseio.com",
  projectId: "dataadd-8cf4f",
  storageBucket: "dataadd-8cf4f.appspot.com",
  messagingSenderId: "163416489588",
  appId: "1:163416489588:web:d786217186f5e6ebe01b21",
  measurementId: "G-W8YZ1PKF5X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dataformDB = firebase.database().ref('dataform');

document.getElementById('dataForm').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault(); // Prevent the default form submission

  const name = getElementVal('name');
  const position = getElementVal('position');
  const site = getElementVal('site');
  const enrollId = getElementVal('enrollId');
  const pass = getElementVal('password');
  const status = getElementVal('Status');

  saveMsg(name, position, site, enrollId,pass,status);
  //enable alert
  document.querySelector('.alert').style.display="block";
  //remove the alert
  setTimeout(()=>{
    document.querySelector('.alert').style.display="none";
  },3000);

  //reset the form
  document.getElementById('dataForm').reset();
}

const saveMsg = (name, position, site, enrollId,pass,status) => {
  const newdataform = dataformDB.push();
  newdataform.set({
    name: name,
    position: position,
    site: site,
    enrollId: enrollId,
    pass:pass,
    status:status
  }).then(() => {
    console.log('Data saved successfully!');
  }).catch((error) => {
    console.error('Error saving data:', error);
  });
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
}
