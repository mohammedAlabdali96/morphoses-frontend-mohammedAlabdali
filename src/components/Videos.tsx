import React from "react";

interface Video {
  key: string;
  name: string;
}

interface VideosProps {
  videos: Video[];
}

const Videos: React.FC<VideosProps> = ({ videos }) => {
  if (!videos.length)
    return (
      <section className="mb-8 bg-gray-50 p-6 rounded-md shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 border-b-4 border-gray-200">
          No Trailer available right now.
        </h2>
      </section>
    );

  return (
    <section className="mb-8 bg-gray-50 p-6 rounded-md shadow-sm border border-gray-200">
      <div className="videos mt-4">
        <h2 className="text-2xl font-semibold mb-4 border-b-4 border-gray-200">
          Trailer
        </h2>
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videos[0].key}`}
          title={videos[0].name}
          allowFullScreen
          className="rounded-md border border-gray-300 shadow-sm"
        ></iframe>
      </div>
    </section>
  );
};

export default Videos;
