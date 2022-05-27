This folder contains all third party config


Note that :

A. config all files can not be passed, import.meta.env to get the environment variables, will report an error, to use the environment variables in the config file, can only be passed in through vite-config-ts, passed to the config file through configEnv, then the config file, it must be written in the form of a function

B. The  Lambda function only can edit images by tag in DynamoDB. Use DynamoDB Streams when working with records (images) in Amazon DynamoDB Streams with the Lambda function in AWS, and after each update of the DynamoDB table, the user can trigger the Lambda function to perform more operations(Erdoğan & Niyazi, 2019). Lambda can read records from a stream and synchronise calls to your used functions with an event containing the stream records. In addition Lambda reads records in batches and calls your function to process all records in the batch.

Amazon S3 by logging into AWS with an account that you have already registered with your school email. You must create a bucket before you can store data in Amazon S3. Log in to the AWS Management Console, and open the Amazon S3 console.

Select Create bucket. This opens the Create bucket wizard. In Bucket name, enter a DNS-compliant bucket name.
The bucket name must meet the following requirements: It must be unique across all Amazon S3. It must be between 3 and 63 characters in length. Contains no uppercase characters.
Begin with a lowercase letter or number. Once you create a bucket, you cannot change its name.

In the testing phase, I created two buckets in AWS and two layers in lambda for testing.
