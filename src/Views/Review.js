export default function Review({ rev }) {
  return (
    <>
      {rev.length > 0 ? (
        <ul>
          {rev.map(({ author, content }, index) => (
            <li key={index}>
              <p>Author: {author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sorry, no review available..</p>
      )}
    </>
  );
}
