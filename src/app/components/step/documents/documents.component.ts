import { Component, OnInit } from '@angular/core';
import { Documents } from 'src/app/models/documents';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents : Documents = new Documents( null,null,null);
 
  constructor() { }

  ngOnInit() {
  }

  onSave(files: any){
    console.log(files);
  }
  

}
