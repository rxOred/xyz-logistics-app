import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getCognitoCredentials, getCognitoCredentialsWithId } from "./cognito";
import { REGION, S3_BUCKET } from "./aws-config";

export async function uploadFileToS3(
  file: File,
  idToken: string,
  userSub: string,
) {
  const { credentials, identityId } =
    await getCognitoCredentialsWithId(idToken);
  const s3Client = new S3Client({
    region: REGION,
    credentials,
  });

  const uploader = new Upload({
    client: s3Client,
    params: {
      Bucket: S3_BUCKET,
      Key: `uploads/${identityId}/${file.name}`,
      Body: file,
      ContentType: file.type,
    },
    leavePartsOnError: false,
  });

  await uploader.done();

  return `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/uploads/${userSub}/${file.name}`;
}
