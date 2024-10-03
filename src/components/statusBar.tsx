import Link from "next/link";
import { getNowPlaying, getRecentTrack } from "@/lib/spotift";
import { SpotifyIcon } from "./icons/icon";

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
      albumImageUrl = "/default-album-image.png"; // Provide a fallback image
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
  //   const { data, error } = useSWR("/api/spotify-playing-now", fetcher);
  const data = await getSpotifyPlayingNow();

  return (
    <div className="mb-8 ">
      <div className="max-w-3xl inline-flex">
        <div>
          <SpotifyIcon className="h-4 w-4 mt-1 mr-2" />
        </div>
        <div>
          {!data && <div> Loading...</div>}
          {data && data.isPlaying && (
            <p className="text-sm text-zinc-800 dark:text-zinc-100">
              <Link
                href={data.songUrl}
                className="text-zinc-800 dark:text-zinc-100 hover:text-teal-500 dark:hover:text-teal-500 font-semibold"
              >
                {data.title}
              </Link>{" "}
              <span className="text-zinc-600 dark:text-zinc-400">by</span>{" "}
              <span className="font-semibold">{data?.artist ?? "Spotify"}</span>{" "}
              ▶️
            </p>
          )}
          {data && !data.isPlaying && (
            <p className="text-sm text-zinc-800 dark:text-zinc-100">
              <Link
                href={data.songUrl}
                target="_blank"
                className="text-zinc-800 dark:text-zinc-100 hover:text-teal-500 dark:hover:text-teal-500 font-semibold"
              >
                {data.title}
              </Link>{" "}
              <span className="text-zinc-600 dark:text-zinc-400">by</span>{" "}
              <span className="font-semibold">{data?.artist ?? "Spotify"}</span>{" "}
              ⏸️
            </p>
          )}
        </div>
      </div>
    </div>
  );
}