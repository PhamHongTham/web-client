import React, { useEffect, useRef, useState } from 'react';

import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/default.css';

interface HandleEditorOptions {
  value: any;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: HandleEditorOptions) => {
  const refEditor: any = useRef(null);
  const [check, setCheck] = useState<boolean>(false)

  useEffect(() => {
    let editor = new MediumEditor('.editable', {
      spellcheck: false,
      toolbar: {
        allowMultiParagraphSelection: true,
        buttons: [
          'bold',
          'italic',
          'underline',
          'h2',
          'h3',
          'quote',
          'justifyLeft',
          'justifyCenter',
          'justifyRight',
          'justifyFull',
        ],
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
      // anchorPreview: {
      //   hideDelay: 0,
      //   previewValueSelector: '',
      // },
      placeholder: {
        text: 'Write your content',
        hideOnClick: false,
      },
      paste: {
        forcePlainText: true,
        cleanPastedHTML: false,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir'],
        cleanTags: ['meta'],
        unwrapTags: [],
      },
      autoLink: true,
      imageDragging: true,
    });
    refEditor.current = editor;
    refEditor.current.subscribe(
      'editableInput',
      function (event: any, editable: any) {
        if (onChange && typeof onChange === 'function') {
          console.log(editable.innerHTML)
          onChange(editable.innerHTML);
        }
      }
    );
  }, []);

  useEffect(() => {
    if(!check){
      if(value){
        console.log('set content')
        refEditor.current.setContent(value, value.length);
        setCheck(true)
      }
    }
  }, [value])

  return (
    <>
      <div className="editable"></div>
    </>
  );
};

export default Editor;
