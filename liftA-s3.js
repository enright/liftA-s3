/*
MIT License

Copyright (c) 2017 Bill Enright

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function () {

	'use strict';

	function awsS3(s3Config) {
		let S3 = require('aws-sdk/clients/s3');
		return new S3(s3Config);
	}

  module.exports = function (s3Config) {
  	return ((s3) => {
  		function cb(x, cont, p, advance, err, data) {
  			if (err) {
  				x = arw.Error(err, x);
  			} else {
  				x = [data, x.second()];
  			}
  			advance();
  			cont(x, p);
  		}

      function s3ErrorBack(method) {
        return (reqParams) => function (x, cont, p) {
    			let cancelId;
    			let advance = () => p.advance(cancelId);
    			let req = s3[method](reqParams(x), cb.bind(undefined, x, cont, p, advance));
    			cancelId = p.add(() => req.abort());
    			return cancelId;
    		};
      }

      function waitForA(state, params) {
        return function (x, cont, p) {
    			let cancelId;
    			let advance = () => p.advance(cancelId);
    			let req = s3.waitFor(state(x), params(x), cb.bind(undefined, x, cont, p, advance));
    			cancelId = p.add(() => req.abort());
    			return cancelId;
        };
      }

      function getSignedURLA(operation, params) {
        return function (x, cont, p) {
    			let cancelId;
    			let advance = () => p.advance(cancelId);
    			let req = s3.waitFor(operation(x), params(x), cb.bind(undefined, x, cont, p, advance));
    			cancelId = p.add(() => req.abort());
    			return cancelId;
        };
      }

      function uploadA(params, options) {
        return function (x, cont, p) {
    			let cancelId;
          let req;
    			let advance = () => p.advance(cancelId);
          if (options) {
            req = s3.upload(params(x), options(x), cb.bind(undefined, x, cont, p, advance));
          } else {
            req = s3.upload(params(x), cb.bind(undefined, x, cont, p, advance));
          }
    			cancelId = p.add(() => req.abort());
    			return cancelId;
        };
      }

  		return {
        abortMultipartUploadA: s3ErrorBack('abortMultipartUpload'),
        completeMultipartUploadA: s3ErrorBack('completeMultipartUpload'),
        copyObjectA: s3ErrorBack('copyObject'),
        createBucketA: s3ErrorBack('createBucket'),
        createMultipartUploadA: s3ErrorBack('createMultipartUpload'),
        createPresignedPostA: s3ErrorBack('createPresignedPost'),
        deleteBucketA: s3ErrorBack('deleteBucket'),
        deleteBucketAnalyticsConfigurationA: s3ErrorBack('deleteBucketAnalyticsConfiguration'),
        deleteBucketCorsA: s3ErrorBack('deleteBucketCors'),
        deleteBucketEncryptionA: s3ErrorBack('deleteBucketEncryption'),
        deleteBucketInventoryConfigurationA: s3ErrorBack('deleteBucketInventoryConfiguration'),
        deleteBucketLifecycleA: s3ErrorBack('deleteBucketLifecycle'),
        deleteBucketMetricsConfigurationA: s3ErrorBack('deleteBucketMetricsConfiguration'),
        deleteBucketPolicyA: s3ErrorBack('deleteBucketPolicy'),
        deleteBucketReplicationA: s3ErrorBack('deleteBucketReplication'),
        deleteBucketTaggingA: s3ErrorBack('deleteBucketTagging'),
        deleteBucketWebsiteA: s3ErrorBack('deleteBucketWebsite'),
        deleteObjectA: s3ErrorBack('deleteObject'),
        deleteObjectsA: s3ErrorBack('deleteObjects'),
        deleteObjectTaggingA: s3ErrorBack('deleteObjectTagging'),
        getBucketAccelerateConfigurationA: s3ErrorBack('getBucketAccelerateConfiguration'),
        getBucketAclA: s3ErrorBack('getBucketAcl'),
        getBucketAnalyticsConfigurationA: s3ErrorBack('getBucketAnalyticsConfiguration'),
        getBucketCorsA: s3ErrorBack('getBucketCors'),
        getBucketEncryptionA: s3ErrorBack('getBucketEncryption'),
        getBucketInventoryConfigurationA: s3ErrorBack('getBucketInventoryConfiguration'),
        getBucketLifecycleConfigurationA: s3ErrorBack('getBucketLifecycleConfiguration'),
        getBucketLocationA: s3ErrorBack('getBucketLocation'),
        getBucketLoggingA: s3ErrorBack('getBucketLogging'),
        getBucketMetricsConfigurationA: s3ErrorBack('getBucketMetricsConfiguration'),
        getBucketNotificationConfigurationA: s3ErrorBack('getBucketNotificationConfiguration'),
        getBucketPolicyA: s3ErrorBack('getBucketPolicy'),
        getBucketReplicationA: s3ErrorBack('getBucketReplication'),
        getBucketRequestPaymentA: s3ErrorBack('getBucketRequestPayment'),
        getBucketTaggingA: s3ErrorBack('getBucketTagging'),
        getBucketVersioningA: s3ErrorBack('getBucketVersioning'),
        getBucketWebsiteA: s3ErrorBack('getBucketWebsite'),
        getObjectA: s3ErrorBack('getObject'),
        getObjectAclA: s3ErrorBack('getObjectAcl'),
        getObjectTaggingA: s3ErrorBack('getObjectTagging'),
        getObjectTorrentA: s3ErrorBack('getObjectTorrent'),
        getSignedURLA: getSignedURLA,
        headBucketA: s3ErrorBack('headBucket'),
        headObjectA: s3ErrorBack('headObject'),
        listBucketAnalyticsConfigurationsA: s3ErrorBack('listBucketAnalyticsConfigurations'),
        listBucketInventoryConfigurationsA: s3ErrorBack('listBucketInventoryConfigurations'),
        listBucketMetricsConfigurationsA: s3ErrorBack('listBucketMetricsConfigurations'),
        listBucketsA: s3ErrorBack('listBuckets'),
        listMultipartUploadsA: s3ErrorBack('listMultipartUploads'),
        listObjectsA: s3ErrorBack('listObjects'),
        listObjectsV2A: s3ErrorBack('listObjectsV2'),
        listObjectVersionsA: s3ErrorBack('listObjectVersions'),
        listPartsA: s3ErrorBack('listParts'),
        putBucketAccelerateConfigurationA: s3ErrorBack('putBucketAccelerateConfiguration'),
        putBucketAclA: s3ErrorBack('putBucketAcl'),
        putBucketAnalyticsConfigurationA: s3ErrorBack('putBucketAnalyticsConfiguration'),
        putBucketCorsA: s3ErrorBack('putBucketCors'),
        putBucketEncryptionA: s3ErrorBack('putBucketEncryption'),
        putBucketInventoryConfigurationA: s3ErrorBack('putBucketInventoryConfiguration'),
        putBucketLifecycleConfigurationA: s3ErrorBack('putBucketLifecycleConfiguration'),
        putBucketLoggingA: s3ErrorBack('putBucketLogging'),
        putBucketMetricsConfigurationA: s3ErrorBack('putBucketMetricsConfiguration'),
        putBucketNotificationConfigurationA: s3ErrorBack('putBucketNotificationConfiguration'),
        putBucketPolicyA: s3ErrorBack('putBucketPolicy'),
        putBucketReplicationA: s3ErrorBack('putBucketReplication'),
        putBucketRequestPaymentA: s3ErrorBack('putBucketRequestPayment'),
        putBucketTaggingA: s3ErrorBack('putBucketTagging'),
        putBucketVersioningA: s3ErrorBack('putBucketVersioning'),
        putBucketWebsiteA: s3ErrorBack('putBucketWebsite'),
        putObjectA: s3ErrorBack('putObject'),
        putObjectAclA: s3ErrorBack('putObjectAcl'),
        putObjectTaggingA: s3ErrorBack('putObjectTagging'),
        restoreObjectA: s3ErrorBack('restoreObject'),
        uploadA: uploadA,
        uploadPartA: s3ErrorBack('uploadPart'),
        uploadPartCopyA: s3ErrorBack('uploadPartCopy'),
        waitForA: waitForA
  		};
  	})(awsS3(s3Config));
  };

})();
