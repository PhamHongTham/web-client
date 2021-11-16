import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/default.css';

const HandlePost = (props: any) => {
  const { id }: { id: any } = useParams();
  const [text, setText] = useState('')
  console.log(text)
  useEffect(() => {
    const editor = new MediumEditor('.editable', {
      toolbar: {
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'h2', 'h3', 'quote', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'html'],
        diffLeft: 0,
        diffTop: -10,
        firstButtonClass: 'medium-editor-button-first',
        lastButtonClass: 'medium-editor-button-last',
        standardizeSelectionStart: false,
        static: false,
        align: 'center',
        sticky: false,
        updateOnEmptySelection: false,
      },
      anchorPreview: {
        hideDelay: 0,
        previewValueSelector: 'a'
      },
      placeholder: {
        text: 'Write your content',
        hideOnClick: true
      },
      paste: {
        forcePlainText: true,
        cleanPastedHTML: false,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir'],
        cleanTags: ['meta'],
        unwrapTags: []
      },
      autoLink: true,
      imageDragging: true,
    });
  }, []);
  return (
    <section className="section-editor">
      <div className="container">
        <h2 className="editor-title">Boogle Editor</h2>
        <div className="editable"></div>
      </div>
    </section>
  );
};

export default HandlePost;
