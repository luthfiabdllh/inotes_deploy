import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

document.addEventListener('DOMContentLoaded', () => {
  const editor = new EditorJS({
    holder: 'editorjs',
    tools: {
      header: Header,
      list: List,
    },
    placeholder: 'Let\'s write an awesome story!',
  });
});