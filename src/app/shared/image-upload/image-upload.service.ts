import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';


@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor() {
  }

  fileUploadToAws(file: any) {
    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: 'AKIARC5EZU4H74AWRB76',
        secretAccessKey: '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',
        region: 'us-east-2'
      }
    );
    const params = {
      Bucket: 'gl-social-network-aws-bucket',
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('File uploaded successfully.', data);
      return true;
    });
  }
}
