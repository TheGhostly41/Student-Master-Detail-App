import { Frame, Dialogs } from '@nativescript/core';
import { FileService } from '../myLib/file-service';
let students;
export function onload(args) {
  let page = args.object;
  page.bindingContext = page.navigationContext.models;
}

export function update(args) {
  let page = args.object;
  let aStudent = page.bindingContext;

  Dialogs.alert({
    // basically just an alert button.
    // all dialogs return promise object
    //
    title: 'Attention',
    message: 'You are about to save data for ' + aStudent.fname,
    okButtonText: 'ok',
    cancelable: true,
  }).then(
    function () {
      //when user clicks ok button
      // this function is a result of the promise object, this is the good one
      let service = new FileService('student_file.json');
      service.saveRecord(aStudent);
      Frame.topmost().navigate({
        moduleName: ' ./main-page',
        clearHistory: true,
      });
    },
    function () {
      //this is a result of the promise object too, the negative as per the console.log message
      console.log('dialog dismissed');
    }
  );

  let confirmOption = {
    title: 'Are you sure?',
    message: 'Do you want to do this?',
    okButtonText: 'Yes',
    cancelButtonText: 'No',
  }; /*
  Dialogs.confirm(confirmOption).then(function (result) {
    if (result == true) {
      console.log('You said Yes');
    } else if (result == false) {
      console.log('Ypu choose no');
    }
  });*/

  let actionOptions = {
    title: 'Which fruit?',
    message: 'Choose your favourite fruit',
    actions: ['apple', 'banana', 'grape', 'orange', 'none'], // provide  list of possible options which is an array. this is also the promise object as it is used to specify possible consequences. theres always just gonna be one promise object
    cancelButtonText: 'Cancel',
    destructiveActionsIndexes: [2], // this is for ios. may not work on android.
  };
  /*
  Dialogs.action(actionOptions).then(function (
    result // whatever the user chooses from the array will be passed into result.
  ) {
    console.log(result);
  });*/

  let promptOptions = {
    defaultText: 'Jack',
    okButtonText: 'Done',
    neautralButtonText: 'Cancel',
    inputType: 'text', // other input types: password, email, number , phone
  };
  /*
  Dialogs.prompt(promptOptions).then(function(result){
    console.log('The user typed in '+ result.text); //  in this instance the promise object is an object that has two properties, the result and text. if nothing is typed in then jack will be displayed, then if they choose done or cancel, that will be passed into result. 
  });*/

  let loginOptions = {
    title: 'Sign in',
    message: 'Enter your credentials',
    okButtonText: ' log in ',
    cancelButtonText: ' cancel',
    userNameHint: 'Your user name here',
    passwordHint: 'Your password here',
  };

  Dialogs.login(loginOptions).then(function (result) {
    if (result.userName == 'root' && result.password == '123') {
      console.log('login successfully');
    } else {
      console.log('fail to log in ');
    }
  });
}
