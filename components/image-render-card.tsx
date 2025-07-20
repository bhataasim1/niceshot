interface ImageRenderCardProps {
  imageUrl: string;
}

export const ImageRenderCard = ({ imageUrl }: ImageRenderCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <div
          id="image-render-card"
          className="relative w-full h-[80vh] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-8"
          style={{
            background:
              'linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)',
          }}
        >
          <div className="p-6 w-full h-full flex items-center justify-center">
            <img
              src={imageUrl}
              alt="Uploaded image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
