function CommentCard(props) {
  return (
    <div className="mb-3 py-0 px-5 rounded-lg border-opacity-50 border border-gray-600">
      {props.children}
    </div>
  );
}

export default CommentCard;
