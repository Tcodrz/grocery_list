import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gl-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Output() upload: EventEmitter<File> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onUpload(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.className = 'd-none';
    input.click();
    input.oninput = (event: Event) => {
      this.upload.emit((event.target as HTMLInputElement).files[0]);
    }
  }

}
