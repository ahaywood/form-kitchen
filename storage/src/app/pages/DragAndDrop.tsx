"use client";

import { useState, useRef } from "react";

/**
 * Might want to consider moving the `files` state into the parent component
 * This will allow you to reset the files when the form is submitted
 * In the parent:
 *  const [files, setFiles] = useState<File[]>([]);
 *  ...
 *  const handleImage = async (formData: FormData) => {
 *   const result = await createPost(formData);
 *   if (result.error) {
 *     setResult(result.error);
 *   } else {
 *     setResult("Post created successfully");
 *     setFiles([]); // Clear files state
 *   }
 * };
 * ...
 * <DragAndDrop name="cover" onFilesChange={setFiles} />
 *
 * Then, within this component, you can use the `onFilesChange` prop to update
 * the files state:
 * const DragAndDrop = ({ name, onFilesChange }:
 * { name: string, onFilesChange: (files: File[]) => void }) => {
 * ...
 * const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    onFilesChange(droppedFiles); // Notify parent
    // ... rest of the code ...
  };
 */

const DragAndDrop = ({ name }: { name: string }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);

    const dataTransfer = new DataTransfer();
    droppedFiles.forEach((file) => dataTransfer.items.add(file));
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={
        isDragging
          ? { border: "3px solid blue", padding: "10px" }
          : { border: "3px solid gray", padding: "10px" }
      }
    >
      <input
        type="file"
        name={name}
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files) {
            setFiles(Array.from(e.target.files));
          }
        }}
      />
      {files.map((file) => (
        <li key={file.name}>
          <strong>{file.name}</strong> - Size: {file.size} - Type: {file.type} -{" "}
          <button
            onClick={() => setFiles(files.filter((f) => f.name !== file.name))}
          >
            x
          </button>
        </li>
      ))}
    </div>
  );
};

export { DragAndDrop };
