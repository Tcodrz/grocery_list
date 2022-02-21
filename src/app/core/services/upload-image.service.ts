import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Image } from '../models/item.interface';

export type cbFileRead = (buff: string | ArrayBuffer) => void;
export type UploadTask = firebase.storage.UploadTaskSnapshot;

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  private readonly reader: FileReader = new FileReader();
  storage = firebase.storage();
  constructor(
    private db: AngularFirestore
  ) { }
  readFile(file: File, callback: cbFileRead): void {
    this.reader.readAsDataURL(file);
    this.reader.onloadend = (event) => {
      const buffer = event.target.result;
      callback(buffer);
    }
  }
  upload(file: File, callback: (img: Image) => void) {
    const filename = this.buildFileName(file.name);
    this.storage.ref(filename).put(file)
      .then(res => {
        if (res.state === 'success') {
          const image: Partial<Image> = {
            bucket: res.metadata.bucket,
            type: res.metadata.contentType,
            path: res.metadata.fullPath,
            name: res.metadata.name,
            timeCreated: new Date(res.metadata.timeCreated),
            updated: new Date(res.metadata.updated),
          }
          this.storage.ref(image.path).getDownloadURL().then(url => {
            image.url = url;
            callback(image as Image);
          });
        };
      });
  }
  deleteImage(image: Image, callback: () => void) {
    this.storage.ref(image.name).delete().then(() => {
      callback();
    }).catch(err => {
      console.error(err);
      callback();
    });
  }
  private buildFileName(name: string): string {
    const id = this.db.createId();
    return `${id}_${name}`;
  }
}
