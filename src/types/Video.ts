interface Video {
    slug?: string;
    artist: string;
    song: string;
    date: string;
    youtubeId: string;
    styles?: string[];
    role?: string;
    description?: string;
    directorNote?: string;
    vfx?: boolean;
    vfxDetails?: string;
    behindTheScenesYoutubeId?: string;
    credits?: { role: string; name: string }[];
}

export default Video;
