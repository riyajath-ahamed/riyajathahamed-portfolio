
import { getNowPlaying, getRecentTrack } from "@/lib/spotift";
import TiltedCard from "./magicui/TiltedCard/TiltedCard";
import { JSX } from "react";

async function getSpotifyPlayingNow() {
  let response = await getNowPlaying();

  let song = null;
  let isPlaying = false;
  let title = null;
  let artist = null;
  let album = null;
  let albumImageUrl = null;
  let songUrl = null;

  if (response.status === 204 || response.status > 400) {
    response = await getRecentTrack();
    const jsonResponse = await response.json();



    if (jsonResponse && jsonResponse.items && jsonResponse.items.length > 0) {
      song = jsonResponse.items[0].track;

      title = song.name || "Unknown title";
      artist = song.artists.map((artist: any) => artist.name).join(", ") || "Unknown artist";
      album = song.album.name || "Unknown album";

      // Ensure images array exists and has at least one image
      if (song.album.images && song.album.images.length > 0) {
        albumImageUrl = song.album.images[0].url;
      } else {
        albumImageUrl = "/default-album-image.png"; // Provide a fallback image
      }

      songUrl = song.external_urls.spotify || "#";
    }
  } else {
    song = await response.json();

    isPlaying = song.is_playing || false;
    title = song.item.name || "Unknown title";
    artist = song.item.artists.map((_artist: any) => _artist.name).join(", ") || "Unknown artist";
    album = song.item.album.name || "Unknown album";

    // Ensure images array exists and has at least one image
    if (song.item.album.images && song.item.album.images.length > 0) {
      albumImageUrl = song.item.album.images[0].url;
    } else {
      albumImageUrl = null ; // Provide a fallback image
    }

    songUrl = song.item.external_urls.spotify || "#";
  }


  return {
    isPlaying,
    title,
    artist,
    album,
    albumImageUrl,
    songUrl,
  }
}

export default async function SpotifyPlayingNow(): Promise<JSX.Element> {
  const data = await getSpotifyPlayingNow();

  return (
    <div className="mb-4">
      <TiltedCard
        imageSrc={
          data.albumImageUrl ??
          "https://i.pinimg.com/736x/aa/54/fb/aa54fb5e3d619aa08531df25e7e8668e.jpg"
        }
        altText={data.album ?? "Unknown album"}
        captionText={data.title ?? "Might be Sleeping"}
        containerHeight="200px"
        containerWidth="200px"
        imageHeight="150px"
        imageWidth="150px"
        rotateAmplitude={30}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <>
            {!data.albumImageUrl ? (
              <p className="text-sm content-center text-zinc-800 bg-black-blur rounded-md p-2">
                Paused ⏸️
              </p>
            ) : (
              <p className="text-sm content-center text-zinc-800 dark:text-zinc-100 bg-white-blur rounded-md p-2">
                {data.isPlaying ? "Playing ▶️" : "Paused ⏸️"}
              </p>
            )}
          </>
        }
      />
    </div>
  );
}
