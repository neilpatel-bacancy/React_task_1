import { useState } from "react";

const Home = () => {

    const [input, setInput] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string>("");


    const handleKeyDown = (e : KeyboardEventInit<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();

      const value = input.trim();

      if(!value) return;

      if(tags.includes(value)) {
        setError("Duplicate tag not allowed");
        return;
      }

      if (tags.length >= 10) 
      {
        return;
      }

      setTags([...tags, value]);
      setInput("");
      setError("");
    }
  };

  const removeTag = (index : number) => {
    const updatedTags = tags.filter(tag => tag.indexOf(tag) !== index)

    setTags(updatedTags);
  }

  return (
    <div className="tag">
      <div className="tag-box">
        {tags.map((tag, index) => (
          <div key={index}>
            <span>{tag}</span>
            <button onClick={() => removeTag(index)}>*</button>
          </div>
        ))}

        <input
          type="text"
          value={input}
          disabled={tags.length >= 10}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type data"
        />
      </div>

      {error && <p className="error">{error}</p>}
      {tags.length >= 10 && <p className="limit">Max 10 tags</p>}
    </div>
  )
}

export default Home;