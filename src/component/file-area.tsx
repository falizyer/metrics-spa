import React, {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone"
import styled from "styled-components";

export interface IFileFieldProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  onChange?: ($event) => void;
  value?: any[];
}

const FileAreaComponent = styled.div`
  border: 1px dashed rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

function FileArea(props: IFileFieldProps) {
  const {
    label,
    className = "",
    onChange,
    value,
  } = props;
  const [files, setFiles] = useState(value);

  const onDrop = useCallback(acceptedFiles => {
    if (onChange) {
      setFiles(acceptedFiles);
      onChange({target: {value: acceptedFiles}});
    }
  }, [onChange]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  useEffect(() => {
    if (value !== files) {
      setFiles(value);
    }
  }, [value])

  return (
    <FileAreaComponent className={`alv__file-area ${className}`}>
      {label && <label>{label}</label>}
      <div className="file" {...getRootProps()}>
        <input {...getInputProps()}/>
        {
          isDragActive
            ? <p>Drag 'n' drop some files here, or click to select files</p>
            : files?.length
              ? <p>Selected dataset: {files[0].name}</p>
              : <p>Drag and Drop or <span style={{color: "red", cursor: "pointer"}}>Upload</span></p>
        }
      </div>
    </FileAreaComponent>
  );
}

export default FileArea;
