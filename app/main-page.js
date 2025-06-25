import { Observable, ObservableArray, Frame } from '@nativescript/core';

import { FileService } from './myLib/file-service'; // the two dots represent the ap folder. for import you use two dots, for navigation you use one dot. however i use one dot because  i dont have a main main folder that's holding main-page
import { fromObject } from '@nativescript/core/data/observable';

function StudentModel(id) {
  let model = new Observable();
  model.id = id;
  model.majors = ['CS', 'CIS', 'IT', 'CNT', 'MIS'];
  model.fname = '';
  return model;
}

export function onLoaded(args) {
  let page = args.object; // args.object is used to access the page

  let studentList = new fromObject({
    list: new ObservableArray(),
  });

  //create object of our file service using the file service class
  let fileservice = new FileService('student_file.json');
  //create another variable that will hold the return result from get records of the file service.
  let allStudent = fileservice.getRecords();
  console.log('file size ' + allStudent);

  if (allStudent.length !== 0) {
    //  if some records

    allStudent.forEach(function (element) {
      let profile = new StudentModel(element.id);
      profile.fname = element.fname;
      profile.major = element.major;
      studentList.list.push(profile);
    });
  }

  console.log(studentList.list.length);
  page.bindingContext = studentList;
}

export function onItemTap(args) {
  let page = args.object;
  let students = page.bindingContext;

  console.log(students.list.length);

  Frame.topmost().navigate({
    moduleName: './detail/details',
    context: {
      models: students.list.getItem(args.index),
    },
    clearHistory: true,
  });
}

export function addNew(args) {
  let page = args.object;
  let students = page.bindingContext;
  let newStudent = new StudentModel(students.list.length + 1);
  students.list.push(newStudent);
  Frame.topmost().navigate({
    moduleName: './detail/details',
    context: {
      models: newStudent,
    },
    clearHistory: true,
  });
}
