'use client';

import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { Card, Title, Text, Flex, Button, Grid, Col } from "@tremor/react";
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import Popup from 'reactjs-popup'

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleUploadCSV = (files) => {
    setUploading(true);

    const [file] = files;

    const reader = new FileReader();
    reader.onloadend = ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      // do something with the csv data here
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleUploadCSV(e.dataTransfer.files);
  };

  return (
      <div className="mb-4">
        <Popup trigger={
          <Button
            icon={ArrowUpTrayIcon}
            size="xl"
            className="btn btn-primary"
          >
            {uploading ? "Uploading..." : "Import .CSV"}
          </Button>
          } 
          modal
          nested

        >
          <Card className="max-w-sm">
            <Button className = "ImportantButton"
              size="xl"
              variant="secondary"
              color = {uploading ? "neutral" : "blue"}
              onClick={() => inputRef.current.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              loading = {uploading}
          >
              {uploading ? "Uploading..." : "Drag and drop .CSV file here"}
            </Button>
          <input
          ref={inputRef}
          type="file"
          className="sr-only"
          disabled={uploading}
          onChange={(e) => handleUploadCSV(e.target.files)}
          />
          </Card>
        </Popup>

      </div>
  );
};

const styles = `
  .ImportantButton {
    font-size: 24px;
    padding: 16px;
  }
`;

Upload.propTypes = {};

export default Upload;