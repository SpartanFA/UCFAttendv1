'use client';

import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { Button } from "@tremor/react";
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleUploadCSV = () => {
    setUploading(true);

    const input = inputRef?.current;
    const reader = new FileReader();
    const [file] = input.files;

    reader.onloadend = ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
    };

    reader.readAsText(file);
  };


  return (
    <div>
      <h4 className="page-header mb-4">Upload a CSV</h4>
      <div className="mb-4">
        <Button
          icon={ArrowUpTrayIcon}
          size="xl"
          onClick={() => inputRef.current.click()}
          disabled={uploading}
          className="btn btn-primary"
          loading = {uploading}
        >
          {uploading ? "Uploading..." : "Import .CSV"}
        </Button>
        <input id="file-upload" ref={inputRef} type="file" className="sr-only" disabled={uploading} onChange={handleUploadCSV} />
      </div>

    </div>
  );
};

Upload.propTypes = {};

export default Upload;