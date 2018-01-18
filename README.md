# aws-s3-helper

sample

```
let s3Helper = new S3Helper({
  S3_KEY: '',
  S3_SECRET: '',
  S3_BUCKET: '',
  S3_REGION: '',
  ENV: '',
  PUT_EXPIRES_TIME: '',  // 選填，預設 7 天
  GET_EXPIRES_TIME: ''   // 選填，預設 7 天,
});

// presigned url for getObject
await s3Helper.getPresignedUrlForGetObject("test.png");

// presigned url for putObject
await s3Helper.getPresignedUrlForPutObject("test.png");  
```

npm install


```
npm install trunk-studio/aws-s3-helper
```

## License

MIT
