import { Component, OnInit } from '@angular/core';
import { Documents } from 'src/app/models/documents';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents : Documents = new Documents('','','');
 
  constructor() { }

  ngOnInit() {
  }

  onSave(event){
    console.log(document);
  }

}
