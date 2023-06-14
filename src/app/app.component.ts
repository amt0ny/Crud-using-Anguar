import { Component } from '@angular/core';
import { collection,Firestore, addDoc, doc, collectionData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-firebase';
  userData!: Observable<any>; // Declaring 'userData' to store data coming from 'getData()' function

  constructor(private firestore: Firestore) { } // Creating an instance of firestore

  // ADD DATA
  addData(formData: any){
    const collectionInstance = collection(this.firestore,  'users');
    
    // 'addDoc' is used to add Insert-Data
    addDoc(collectionInstance, formData.value).then(() =>{// 'formData.value' is our data and 'collectionInstance' will help to process any operation on it
     // 'then' mean if data added succesfully then print below satatment. Its like 'try' in java and catch is give below
      console.log("Data Saved");
      
      // if it cause 'error' well catch that in below line and print errors
    }).catch((err)=>{
      console.log(err);
      
    });
  }

  // GET DATA
  getData(){  
    const collectionInstance = collection(this.firestore,  'users');// 'user' name of collection

    collectionData(collectionInstance, {idField: 'id'}).subscribe(value =>{
    //By specifying idField: 'id', you are indicating that the Firestore documents have a field named 'id' that contains the document ID
    // now above function 'collectionData' will return an observable so we need to subscribe it to use its value.
      console.log(value);
    })

    this.userData = collectionData(collectionInstance, {idField: 'id'});
    // here we are intializing 'userData' which is an observable so we can show this on 'html' page to do that we need to use 'async' pipe cause we
    // cannot use it normaly, if we tried it will throw an error
    

  }

  // UPDATE DATA
  updateData(id : string){
    // id we are getting from 'data' coming from 'getdata()' function
    const docInstance = doc(this.firestore,'users', id);// here we are giving info that from where we need to update data.
    // 'firestore' is database, 'users' is collection name, and 'id' is idetifier of our user-data(one object)
    const updateData = {        // its the info what we want to update -> 'email' will get updated and 'newEmail@gmail.com' will be new data.
      email : 'newEmail@gmail.com'
    }

    updateDoc(docInstance, updateData).then(() =>{  // Here we are passing both the parameter, where to update and what to update
      console.log('Data Updated');// if everything fine print this statment
      
    }).catch((error) =>{
      console.log(error);
      
    })
  }

  // DELETE DATA
  deleteData(id: string){
    const docInstance = doc(this.firestore, 'users', id);// Telling where to delete and we got 'id' in it we also know what to delete
    
    deleteDoc(docInstance).then(() =>{// here we are deleting one data
      console.log('data deleted');
      
    }) 
  }
}
