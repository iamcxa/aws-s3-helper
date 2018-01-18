const AWS = require('aws-sdk');
const debug = require('debug')('awsS3');


class S3Helper {
    constructor(config) {
        console.log("config", config)
        this.ENV = config.ENV;
        this.BUCKET = config.S3_BUCKET;

        AWS.config.update({
            accessKeyId: config.S3_KEY,
            secretAccessKey: config.S3_SECRET,
            region: config.S3_REGION
        });

        this.s3 = new AWS.S3();



    }
    async getPresignedUrlForPutObject(objectKey) {
        var params = {
            Bucket: this.BUCKET,
            Key: objectKey,
            ACL: 'public-read',
            Expires: 60 * 60 * 24 * 7
        };

        var result = await new Promise((accept, reject) => {
            this.s3.getSignedUrl('putObject', params
            , (err, url) => err ? reject(err) : accept(url));
        });
          
        return result;
    }
    async getPresignedUrlForGetObject(objectKey) {
        var params = {
            Bucket: this.BUCKET,
            Key: objectKey,
            Expires: 60 * 60 * 24 * 7
        };

        var result = await new Promise((accept, reject) => {
            this.s3.getSignedUrl('getObject', params
            , (err, url) => err ? reject(err) : accept(url));
        });
          
        return result;
    }
}

module.exports = S3Helper;