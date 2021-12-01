import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/default.css';

import { RootState } from 'app/stores/app-reducer';

interface HandleEditorOptions {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: HandleEditorOptions) => {
  const refEditor: any = useRef();
  const [changeContent, setChangeContent] = useState<boolean>(true);
  const { urlImage }: { urlImage: string } = useSelector(
    (state: RootState) => state.post
  );

  useEffect(() => {
    let editor = new MediumEditor('.editable', {
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
      anchorPreview: {
        hideDelay: 0,
        previewValueSelector: 'a',
      },
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
          onChange(editable.innerHTML);
        }
      }
    );
  }, []);

  useEffect(() => {
    let editableElement: any = document.querySelector('.editable');
    if (urlImage) {
      let imgElement = document.createElement('img');
      imgElement.src = urlImage;
      editableElement.append(imgElement);
      editableElement.dataset.placeholder = '';
      onChange(editableElement.innerHTML);
    }
  }, [urlImage]);

  useEffect(() => {
    if (value && changeContent && typeof value === 'string') {
      refEditor.current.setContent(value);
      setChangeContent(false);
    }
  }, [value, changeContent]);

  return (
    <>
      <div className="editable"></div>
    </>
  );
};

export default Editor;
