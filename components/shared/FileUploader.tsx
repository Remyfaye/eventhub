import React, { Dispatch, SetStateAction } from "react";

type fileUploaderProps = {
  imageUrl: string;
  onFieldChange: (value: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

("use client");

// import { UploadButton } from "@/uploadthing";

const FileUploader = ({
  imageUrl,
  onFieldChange,
  setFiles,
}: fileUploaderProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}
    </main>
  );
};

export default FileUploader;
