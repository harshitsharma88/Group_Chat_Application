const AWS = require('aws-sdk');

exports.uploadtoAWS=(filename,data)=>{
    
    const s3= new AWS.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY
    })

    const dataToUpload={
        Bucket:process.env.AWS_BUCKET,
        Key:filename,
        Body:data,
        ACL:'public-read'
    }

    return new Promise((resolve,reject)=>{
        s3.upload(dataToUpload,(error,response)=>{
            if(error){
                console.log('/////////////////////////////////////////////////////////////////\nupload error',error);
                reject(error)
            }
            else{
                
                resolve(response);
                
            }
        })

    }) 

}

