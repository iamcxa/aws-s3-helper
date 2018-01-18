const S3Helper = require('./../index')
const config = require('config');

let {
  S3_KEY,
  S3_SECRET,
  S3_BUCKET,
  S3_REGION,
  PUT_EXPIRES_TIME,
  GET_EXPIRES_TIME,
} = config.aws

let {ENV} = config;

let constructorParams = {
  S3_KEY,
  S3_SECRET,
  S3_BUCKET,
  S3_REGION,
  ENV,
  PUT_EXPIRES_TIME,
  GET_EXPIRES_TIME,
}

let s3Helper = new S3Helper(constructorParams);

test('getPresignedUrlForPutObject url', async () => {
  
  let result = await s3Helper.getPresignedUrlForPutObject("test.png");  
  console.log("result", JSON.stringify(result, null, 2));

})
  
test('getPresignedUrlForGetObject url', async () => {
  
  let result = await s3Helper.getPresignedUrlForGetObject("test.png");  
  console.log("result", JSON.stringify(result, null, 2));

})

