import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';


export class FileManager {
  name: string;
  extension: string;
  base64Data: string;
}


@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit, OnChanges {

  @ViewChild('fileinput') fileinput: ElementRef;
  @Input() image: string;
  @Input() label: string = 'Selecione o arquivo';

  @Output() select = new EventEmitter();

  fileCurrent: FileManager = new FileManager();
  file: any;
  localChange: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  selectFile(): void {
    this.fileinput.nativeElement.click();
  }

  handleFileSelect(evt): void {
    const files = evt.target.files;
    const file = files[0];

    if (file && files) {
      this.localChange = true;
      this.fileCurrent.name = file.name;
      const ext = file.name.split('.');
      this.fileCurrent.extension = ext[1];

      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    } else {
      this.fileCurrent = new FileManager();
    }
  }

  ngOnChanges(changes) {
    if (!this.localChange) {
      const image = changes.image.currentValue;
      this._populatePreLoadImage(image);
    }
  }

  private _populatePreLoadImage(image: string): void {
    if (image) {
      const ext = image.split('.');
      const isBase64 = image.indexOf('base64') > - 1; //encontrou
      if (isBase64) {
        this._setPictureFromCamera(image);
      } else {
        this.fileCurrent.extension = ext[1];
        this.fileCurrent.name = image;
        this.fileCurrent.base64Data = `${environment.url_api}/storage/${image}`;
      }
    }
  }

  private _setPictureFromCamera(picture): void {
    this.fileCurrent.name = new Date().getTime().toString();
    this.fileCurrent.extension = 'jpeg';
    this.fileCurrent.base64Data = picture;
  }

  private _handleReaderLoaded(readerEvt): void {
    const binaryString = readerEvt.target.result;
    const base64textString = btoa(binaryString);
    this.fileCurrent.base64Data = `data:image/${this.fileCurrent.extension};base64,${base64textString}`;
    this.select.emit(this.fileCurrent);
  }

}
