import { knownFolders } from '@nativescript/core';

export class FileService {
  // need to export it for other js files to be able to use it.
  constructor(filename) {
    this.file = knownFolders.documents().getFile(filename);
    // this function is basically the same thing as open in c++
    //known folder represetnts the file system used by native script. theres two known folders. documents and temp. getfile looks for "filename" in our system and if it doesn't find one it create a file named filename.
    //knownFolders.documents() accesses your file system that your app can access.
  }

  getRecords() {
    let records = [];
    if (this.file.size != 0) {
      // the size property accesses the size of the file. if theres something saved in there already. this checks to see if theres anything in there.

      records = JSON.parse(this.file.readTextSync());
      // json is basically just a text file which store objects one by one, property by property.
      //JSON.parse() converts JSON string to Javascript object.
     // reads the content of my file which is a string, then the json.parse takes teh string and converts it to a js object but in this case, an array
     //JSON.stringify() is the opposite of the above. converts js objet to JSON string.
    }

    return records;
  }

  saveRecord(record){
    let records  = this.getRecords(); // read into the array, update te array and then save back to the file.

    let index = records.findIndex((element) =>{
      return element.id === record.id;
    
  });

  if(index !== -1){
    records[index]  ={
      id: record.id,
      fname : record.fname,
      major : record.major
    };
  }
// if u find the record within the array, if u dont find it the index will be needed. any negative vlue return means its not in the array. 
  else{
    records.push({
      id:record.id,
      fname: record.fname,
      major: record.major
    });
  }

  this.file.writeTextSync(JSON.stringify(records)); //
}

}
