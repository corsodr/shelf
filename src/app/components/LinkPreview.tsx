export default function LinkPreview({ preview }) {
  const { url, domain, title, image } = preview;
  console.log('preview', preview);

  return (
    <div className="flex mb-8">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <div className="flex w-[1000px] gap-5 hover:bg-slate-100 rounded-lg p-4">
          {image && (
            <img 
              src={image} 
              alt={`Thumbnail for ${title}`} 
              className="object-cover w-[246px] h-[138px] rounded-lg" 
            />
          )}
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-slate-600">{domain}</p>
          </div>
        </div>
      </a>
    </div>
  );
}