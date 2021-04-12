import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import './EditableField.css';

function EditableField({
  type,
  id,
  name,
  className,
  value,
  placeHolder,
  onChange,
}) {
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function renderText() {
    return (
      <div
        id={id}
        className={`${className} ${type === 'textarea' ? 'textarea-value' : 'input-value'}`}
        role="textbox"
        tabIndex={0}
        onClick={() => setEditing(true)}
        onKeyPress={() => setEditing(true)}
      >
        {value || placeHolder}
      </div>
    );
  }

  function renderEditor() {
    const editorId = id ? `${id}-editor` : '';
    return type === 'textarea' ? (
      <TextareaAutosize
        name={name}
        id={editorId}
        className={className}
        value={value}
        ref={inputRef}
        onBlur={() => { setEditing(false); }}
        onChange={onChange}
      />
    ) : (
      <input
        type={type}
        name={name}
        id={editorId}
        className={className}
        value={value}
        ref={inputRef}
        onBlur={() => { setEditing(false); }}
        onChange={onChange}
        autoComplete="off"
      />
    );
  }

  return (
    <section className="editable-field">
      {isEditing ? renderEditor() : renderText()}
    </section>
  );
}

EditableField.defaultProps = {
  id: '',
  className: '',
  value: '',
};

EditableField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  placeHolder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditableField;
