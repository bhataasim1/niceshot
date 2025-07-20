interface ImageRenderCardProps {
  imageUrl: string;
}

export const ImageRenderCard = ({ imageUrl }: ImageRenderCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-7xl">
        <div
          id="image-render-card"
          className="relative w-full rounded-lg overflow-hidden shadow-2xl"
          style={{
            background:
              'linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)',
          }}
        >
          <div className="flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-xl">
              <img
                src={imageUrl}
                alt="Uploaded image"
                className="max-w-full h-auto object-contain rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
