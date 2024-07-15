import React, {
  useState,
  useEffect,
  DragEvent,
  ChangeEvent,
  useRef,
} from 'react';
import DeleteIconBlack from '../assets/icons/delete-icon-black.svg';
import DeleteIconRed from '../assets/icons/delete-icon-red.svg';
import { useActionData } from 'react-router-dom';

interface DropZoneProps {
  onChange: (name: string) => void;
  hasError?: boolean;
}

const Dropzone: React.FC<DropZoneProps> = ({ onChange, hasError }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const actionData = useActionData();

  useEffect(() => {
    if (actionData && actionData === 'Success') {
      setSelectedFile(null);
    }
  }, [actionData]);

  const handleFiles = (files: FileList) => {
    const file = files[0];
    setSelectedFile(file);
    onChange('fileInput');
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDelete = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the input file value
    }
  };

  const borderColor = hasError
    ? 'border-error border-2'
    : 'border-border-color';
  const backgroundColor = hasError ? 'bg-error-light' : 'bg-background-white';

  return (
    <div className="mb-4">
      <label className="mb-2 block">Photo</label>
      <div
        className={`border ${borderColor} ${backgroundColor} rounded-lg p-5 cursor-pointer transition-colors duration-300 h-24 flex justify-center items-center`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          id="file-input"
          name="fileInput"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          multiple={false}
        />
        {!selectedFile && (
          <label htmlFor="file-input" className="text-center cursor-pointer">
            <a className=" text-primary underline">Upload a file</a> or drag and
            drop here
          </label>
        )}
        {selectedFile && (
          <div className="flex items-center">
            {selectedFile.name}{' '}
            <button
              type="button"
              onClick={handleDelete}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={isHovered ? DeleteIconRed : DeleteIconBlack}
                className="pl-2"
                alt="delete"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
