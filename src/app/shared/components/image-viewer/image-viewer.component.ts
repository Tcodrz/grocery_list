import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gl-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent {
  @Input() imageURL: string;
  @Input() isUploading: boolean;
  @Output() deleteImage: EventEmitter<any> = new EventEmitter();
  showDeleteImageMask: boolean;
  showUploadImage: boolean;
  toggleDeleteImageMask(): void { this.showDeleteImageMask = !this.showDeleteImageMask; }
  onDeleteImage() {
    this.toggleDeleteImageMask();
    this.deleteImage.emit();
  }
}
