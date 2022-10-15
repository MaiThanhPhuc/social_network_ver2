const PolicyPost = () => {
  const policyList = [
    "Remember the human",
    "Behave like you would in real life",
    "Look for the original source of content",
    "Search for duplicates before posting",
    "Read the community’s rules",
  ];
  return (
    <>
      <div className="bg-white flex flex-col gap-2  py-3 px-6 rounded text-sm mb-4 ">
        <div className="text-base text-black font-medium ">
          Posting to qp network
        </div>
        <ol className="text-sm text-black font-medium">
          {policyList.map((item, i) => (
            <li key={i} className="py-2 border-b border-black/10">
              {i + 1 + "."} {item}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default PolicyPost;
