import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService{

  constructor( private sanitaizer: DomSanitizer ) { }

  base64toBlob(base64: string, mime: string): Blob {
		const byteString: string = atob(base64);
		// Crea una vista a 8 bit del buffer di byte
		const int8Array = new Uint8Array(new ArrayBuffer(byteString.length));
		// Riempie l'array a 8 bit con i byte decodificati dalla stringa base64
		for (let i = 0; i < byteString.length; i++) {
			int8Array[i] = byteString.charCodeAt(i);
		}
	
		return new Blob([int8Array], { type: mime });
	}

  blobToUrl(blob: string): any {
    let objUrl = URL.createObjectURL(this.base64toBlob((blob), 'image/png'))
    return this.sanitaizer.bypassSecurityTrustUrl(objUrl)
  }

}
