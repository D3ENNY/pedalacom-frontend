export class Product {
    productID: number = 0;
    name: string = '';
    productNumber: string = '';
    color: string = '';
    standardCost: number = 0;
    listPrice: number = 0;
    size: string = '';
    weight: number = 0;
    productCategory: ProductCategory[] = []; // Relation ONE-TO-MANY
    productModel: ProductModel[] = []; // Relation ONE-TO-MANY
    sellStartDate: Date = new Date();
    sellEndDate: Date = new Date();
    discontinuedDate: Date = new Date();
    thumbNailPhoto: string = '';
    thumbnailPhotoFileName: string = '';
    rowguid: string = '';
    modifiedDate: Date = new Date();
}

export class ProductCategory {
    productCategoryID: number = 0;
    parentProductCategoryID: number = 0;
    name: string = '';
    rowguid: string = '';
    modifiedDate: Date = new Date();
}


export class ProductModel {
    productModelID: number = 0;
    name: string = '';
    catalogDescription: string = '';
    rowguid: string = '';
    modifiedDate: Date = new Date();
}

export class infoProduct {

    productName: string = ""
    productId: number = 0
    productPrice: number = 0.0
    photo: any = ""
}
  