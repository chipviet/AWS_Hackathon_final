import React, { Fragment } from 'react';
import { MaterialDropZone } from 'dan-components';

class UploadInputImg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  render() {
    const { files } = this.state;
    return (
      <Fragment>
        <div>
          <MaterialDropZone
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            files={files}
            showPreviews
            maxSize={5000000}
            filesLimit={5}
            text="Drag and drop image(s) here or click"
          />
        </div>
      </Fragment>
    );
  }
}

export default UploadInputImg;
