
import * as React from 'react';

export const Index: React.FC = () => {
  const [content, setContent] = React.useState(null);
  const [filename, setFilename] = React.useState('');

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          filename,
        }),
      });

      alert('Request sent');
    } catch (e) {
      alert('Something went wrong');
    }
  };

  const onAddFileAction = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const file = files[0];
      setFilename(file.name);

      const reader = new FileReader();
      reader.onload = (r) => {
        setContent(r.target.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: 200,
      }}
    >
      <input
        type="file"
        name="file"
        onChange={onAddFileAction}
        accept="application/pdf"
      />
      <input type="submit" value="Send Email" />
    </form>
  );
};

export default Index;

