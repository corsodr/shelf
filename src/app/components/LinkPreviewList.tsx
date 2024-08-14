import LinkPreview from '@/app/components/LinkPreview';

export default function LinkPreviewList({ linkPreviews }) {
  return (
    <div>
      {linkPreviews.map((linkPreview, index) => (
        <LinkPreview 
          key={linkPreview.id || `${linkPreview.url}-${index}`}
          linkPreview={linkPreview}
        />
      ))}
    </div>
  );
}