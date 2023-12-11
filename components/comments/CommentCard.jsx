function CommentCard(props) {
  // console.log(props.cardSize);
  let size = `${props.cardSize - 3}%`;

  return (
    <li id="commentRenderedContainer">
      {/* comments*/}
      <div
        style={{ width: size }}
        className={`${props.cardStyle} mb-3 rounded-lg border border-gray-600 py-0 px-5`}
      >
        {props.children}
      </div>
    </li>
  );
}

export default CommentCard;
