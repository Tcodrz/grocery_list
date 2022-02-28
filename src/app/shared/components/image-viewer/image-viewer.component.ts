import { ModalComponent } from './../../../core/models/modal-component';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalParams } from '../../services/modal-generic.service';

@Component({
  selector: 'gl-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit, AfterViewInit, ModalComponent {
  @ViewChild('imgElement', { static: false }) img: ElementRef;
  @Input() params: ModalParams;
  @Input() imageURL: string;
  @Input() isUploading: boolean;
  @Output() deleteImage: EventEmitter<any> = new EventEmitter();
  showDeleteImageMask: boolean;
  showUploadImage: boolean;
  isLoading: boolean;
  ngOnInit(): void {
    if (this.imageURL) this.isLoading = true;
  }
  ngAfterViewInit(): void {
    const img = this.img.nativeElement as HTMLImageElement;
    img.onload = (event) => {
      this.isLoading = false;
    }
  }
  toggleDeleteImageMask(): void { this.showDeleteImageMask = !this.showDeleteImageMask; }
  onDeleteImage() {
    this.toggleDeleteImageMask();
    this.deleteImage.emit();
  }
}
