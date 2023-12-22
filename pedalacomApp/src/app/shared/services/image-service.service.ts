import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root'
})
export class ImageService {

	constructor(private sanitaizer: DomSanitizer) { }

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

	imgToBlob(img: File): Promise<Blob> {
		return new Promise((resolve, rejected) => {
			const reader = new FileReader()

			reader.onload = () => {
				const arrayBuff = reader.result as ArrayBuffer
				const blob = new Blob([arrayBuff], {type: img.type})
				resolve(blob)
			}

			reader.onerror = () => {
				rejected(new Error('errore nella conversione dell\'immagine'))
			}

			reader.readAsArrayBuffer(img)
		})
	}

	blobToBase64(blob: Blob): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			
			reader.onloadend = () => {
				const base64string = reader.result as string
				resolve(base64string)
			}

			reader.onerror = () => {
				reject(new Error('errore nella conversione del blob'))
			}

			reader.readAsDataURL(blob)
		})
	}

	getBlobPromise(): Promise<Blob> {
		return new Promise((resolve) => {
		  // Simuliamo un'operazione asincrona che restituisce un blob dopo un certo tempo
		  setTimeout(() => {
			const blob = new Blob(['Contenuto del blob'], { type: 'text/plain' });
			resolve(blob);
		  }, 1000);
		});
	  }

}
