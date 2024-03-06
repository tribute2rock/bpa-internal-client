import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

import File from './File';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const Dropzone = (props) => {
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone();

  props.selectFiles(acceptedFiles);

  const files = acceptedFiles.map((file, index) => (
    <File
      fileKey={`key-accepted-file-${index}`}
      toolTipId={`accepted-file-${index}`}
      fileName={file.path}
      fileFullName={file.path}
      fileType={file.type}
      fileSize={file.size}
    />
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <>
      <aside>
        <div>{files}</div>
      </aside>
      <section className="dropzone dropzone-default dropzone-primary">
        <div {...getRootProps({ className: 'dropzone', style })}>
          <input {...getInputProps({ name: 'files' })} />
          <p className="dropzone-msg-title">Drag 'n' drop some files here, or click to select files</p>
        </div>
      </section>
    </>
  );
};

export default Dropzone;
