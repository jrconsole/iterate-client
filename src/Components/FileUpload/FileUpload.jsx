import React, { useState } from 'react';
import './FileUpload.css';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';

export const FileUpload = () => {

    // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'http://localhost:4000/upload' } }
  
  // called every time a file's `status` changes
  //const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    //files.map(f => console.log(f.file))
    
    allFiles.forEach(f => f.remove())
  }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            /*onChangeStatus={handleChangeStatus}*/
            onSubmit={handleSubmit}
            accept="image/*"/>
    );
};