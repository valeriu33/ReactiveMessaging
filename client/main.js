import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Notes } from '../lib/collection';
import { Accounts } from 'meteor/accounts-base';

import './main.html';

Accounts.ui.config({
    passwordSignupFields:"USERNAME_ONLY"
});

$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

Template.body.helpers({
    notes() {
        return Notes.find({});
    }
});

Template.add.events({
    'submit .add-form': function () {
        event.preventDefault();

        //get input value
        const target = event.target;
        const text = target.text.value;

        //insert note into collection
        Meteor.call('notes.insert',text);

        //clear form
        target.text.value = '';

        //clear modal
        $('#addModal').modal('close');
    }
});

Template.note.events({
    'click .delete-note' : function () {
        // Notes.remove(this._id);
        Meteor.call('notes.remove',this);
    }
});