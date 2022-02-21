import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Image, Item } from 'src/app/core/models/item.interface';
import { VLPair } from './../../../core/models/types';
import { Units } from './../../../core/pipes/unit-types.pipe';
import { UploadImageService } from './../../../core/services/upload-image.service';
import { ModalParams } from './../../services/modal-generic.service';


@Component({
  selector: 'gl-modal-item-edit',
  templateUrl: './modal-item-edit.component.html',
  styleUrls: ['./modal-item-edit.component.scss']
})
export class ModalItemEditComponent implements OnInit {
  @Input() params: ModalParams;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  item: Item;
  form: FormGroup;
  links: string[] = [];
  aUnits: VLPair[] = [
    { value: '', label: '' },
    { value: Units.Gram, label: 'גרם' },
    { value: Units.KiloGram, label: 'קילו' },
    { value: Units.Unit, label: 'יחידה' }
  ];
  selectedUnit: VLPair;
  itemImage: Image;
  isLoading: boolean;
  constructor(
    private fb: FormBuilder,
    private uploadImageService: UploadImageService,
  ) { }
  get showUploadImage() { return !this.itemImage?.url; }
  ngOnInit(): void {
    this.form = this.fb.group({
      sName: ['', null],
      iAmount: [null, null],
      sUnit: ['', null],
      sComment: ['', null],
      link: ['', null],
    })
    this.item = this.params.inputs.item;
    this.form.patchValue(this.item);
    this.links = this.item?.links ? [...this.item.links] : [];
    const sUnit = this.aUnits.find(u => u.value === this.item.sUnit)?.value;
    if (sUnit) this.form.patchValue({ sUnit: sUnit });
    this.itemImage = this.item.image ?? undefined;
  }
  addLink() {
    const link = this.form.get('link').value;
    this.links.push(link);
    this.form.controls['link'].reset();
  }
  onSubmit(): void {
    const item = { ...this.item, ...this.form.value, links: this.links, image: this.itemImage ?? undefined };
    this.params.cb(item);
    this.close.emit();
  }
  gotoLink(link: string) {
    const parts = link.split(':');
    const hasPrefix = parts.includes('http') || parts.includes('https');
    if (!hasPrefix) link = 'https://' + link;
    window.open(link, '/');
  }
  removeLink(link: string): void { this.links = this.links.filter(l => l !== link); }
  onUpload(file: File): void {
    if (!!this.item.image && !!this.item.image.url) this.onDeleteImage();
    this.isLoading = true;
    this.uploadImageService.readFile(file, (buffer: string | ArrayBuffer) => {
      this.itemImage = { url: buffer.toString() } as Image;
      this.uploadImageService.upload(file, ((image: Image) => {
        this.itemImage = image;
        const item = { ...this.item, image: image };
        this.params.cb(item);
        this.isLoading = false;
      }))
    });
  }
  onDeleteImage() {
    this.isLoading = true;
    this.itemImage = {} as Image;
    this.uploadImageService.deleteImage(this.item.image, () => {
      const item = { ...this.item, image: {} };
      this.params.cb(item);
      this.isLoading = false;
    });
  }
  async copyToClipboard(link: string): Promise<void> { await navigator.clipboard.writeText(link); }
}
