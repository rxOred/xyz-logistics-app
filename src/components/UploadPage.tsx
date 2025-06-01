import React, { useState } from "react";
import { uploadFileToS3 } from "../uploader";

type UploadPageProps = {
  idToken: string;
  userSub: string;
};

export default function UploadPage({ idToken, userSub }: UploadPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (idToken && userSub && file) {
      const url = await uploadFileToS3(file, idToken, userSub);
      setUploadUrl(url);
      alert("Upload successful!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-gray-900 flex items-center justify-center px-4 text-white font-sans">
      <div className="max-w-md w-full bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-center text-indigo-300 mb-2">
          Upload File
        </h2>
        <p className="text-sm text-center text-indigo-100 mb-6">
          Choose a file to upload into your secure bucket
        </p>

        <div className="space-y-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
          />

          <button
            onClick={handleUpload}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md font-medium shadow disabled:opacity-50"
            disabled={!idToken || !file}
          >
            Upload
          </button>

          {uploadUrl && (
            <p className="mt-4 text-green-400 text-sm text-center">
              ✅ Uploaded to:&nbsp;
              <a
                href={uploadUrl}
                target="_blank"
                rel="noreferrer"
                className="underline text-green-300"
              >
                View File
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
