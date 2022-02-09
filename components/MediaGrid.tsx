import { Grid } from "@chakra-ui/react";
import type { MediaObject } from "./MediaCard";
import { MediaCard } from "./MediaCard";
import { useState } from "react";

interface Props {
  media: Array<MediaObject>;
}

export const MediaGrid = ({ media }: Props) => {
  const [selectedMediaObject, setSelectedMediaObject] =
    useState<MediaObject | null>(null);

  const handleSelection = (media: MediaObject) => {
    setSelectedMediaObject(media);
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {media.map(
        ({
          id,
          media_type,
          media_url,
          username,
          timestamp,
          caption,
        }: MediaObject) => (
          <MediaCard
            key={id}
            id={id}
            media_type={media_type}
            media_url={media_url}
            username={username}
            timestamp={timestamp}
            caption={caption}
            isSelected={
              selectedMediaObject ? selectedMediaObject.id === id : false
            }
            onSelection={() =>
              handleSelection({
                id,
                media_type,
                media_url,
                username,
                timestamp,
                caption,
              })
            }
          />
        )
      )}
    </Grid>
  );
};
