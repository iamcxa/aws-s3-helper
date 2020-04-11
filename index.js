const AWS = require('aws-sdk');
const debug = require('debug')('awsS3');
const S3Zipper = require('aws-s3-zipper');

class S3Helper {
  constructor(config) {
    console.log('[-]S3Helper config=>', config);
    this.ENV = config.ENV;
    this.BUCKET = config.S3_BUCKET;
    this.PUT_EXPIRES_TIME = config.PUT_EXPIRES_TIME || 60 * 60 * 24 * 7;
    this.GET_EXPIRES_TIME = config.GET_EXPIRES_TIME || 60 * 60 * 24 * 7;

    var config = {
      accessKeyId: config.S3_KEY,
      secretAccessKey: config.S3_SECRET,
      region: config.S3_REGION,
      bucket: this.BUCKET,
    };

    AWS.config.update(config);

    this.s3 = new AWS.S3({
      signatureVersion: 'v4',
    });

    this.s3Zipper = new S3Zipper(config);
  }

  async getPresignedUrlForPutObject(objectKey, acl) {
    var params = {
      Bucket: this.BUCKET,
      Key: objectKey,
      ACL: acl || 'public-read',
      Expires: this.PUT_EXPIRES_TIME,
    };

    var result = await new Promise((accept, reject) => {
      this.s3.getSignedUrl('putObject', params, (err, url) =>
        err ? reject(err) : accept(url),
      );
    });

    return result;
  }

  async getPresignedUrlForGetObject(objectKey) {
    var params = {
      Bucket: this.BUCKET,
      Key: objectKey,
      Expires: this.GET_EXPIRES_TIME,
    };
    var result = await new Promise((accept, reject) => {
      this.s3.getSignedUrl('getObject', params, (err, url) =>
        err ? reject(err) : accept(url),
      );
    });

    return result;
  }

  async deleteObject(objectKey) {
    var params = {
      Bucket: this.BUCKET,
      Key: objectKey,
    };
    var result = await new Promise((accept, reject) => {
      this.s3.deleteObject(params, (err, url) => (err ? reject(err) : accept(url)));
    });

    return result;
  }

  async zipToS3File(s3FolderName, s3ZipFileName) {
    var result = await new Promise((accept, reject) => {
      this.s3Zipper.zipToS3File(
        { s3FolderName, s3ZipFileName, recursive: true },
        function (err, result) {
          if (err) reject(err);
          else {
            accept(result);
          }
        },
      );
    });

    return result;
  }
}

module.exports = S3Helper;
