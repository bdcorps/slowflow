import { useChat } from 'ai/react';

// Optional but recommended: use the Edge Runtime. This can only be done at the page level, not inside nested components.
export const runtime = 'experimental-edge';

export default function IndexPage() {
  const { messages, handleSubmit, input, handleInputChange } = useChat();

  return (
    <form onSubmit={handleSubmit}>
      <label>Prompt</label>
      <input
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      <button type="submit">Submit</button>
      {messages.map((message, i) => (
        <div key={i}>{message.content}</div>
      ))}
    </form>
  );
}
