import React from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./RichTextEditor.css"

const RichTextEditor = ({ TemplateBody,setTemplateBody }) => {

    const modules = {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }],
                [{ font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                ['link'],
                ['clean']
            ]
        };


    const formats = [
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "list",
            "bullet",
            "align",
            "color",
            "background",
            'header',
            'strike',
            'blockquote',
            'indent',
            'link',
        ];

    function handleChange(content, delta, source, editor) {
        setTemplateBody(editor.getHTML())
    }

    return (
        <div className='main_divv'>
            <ReactQuill
                modules={modules}
                formats={formats}
                autofocus
                onChange={handleChange}
                theme="snow"
                value={TemplateBody}
                bounds={'.app'}
            />
            </div>
        );
}

export default RichTextEditor;
