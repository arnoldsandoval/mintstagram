import { Box, Image, Text, Badge } from "@chakra-ui/react";
import { useState } from "react";
import { format } from "date-fns";

interface Props {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  timestamp: string;
  username: string;
}
export const MediaCard = ({
  id,
  media_type,
  media_url,
  timestamp,
  username,
  caption,
}: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Box
      key={id}
      maxW="sm"
      background="gray.900"
      overflow="hidden"
      transition="all 0.2s"
      tabIndex={-1}
      boxShadow={
        isSelected
          ? "0 0 0px 5px black, 0 0 0px 8px #f9c74f"
          : "10px 10px 10px rgba(0,0,0,0)"
      }
      onClick={() => setIsSelected(!isSelected)}
    >
      <Image src={media_url} alt="Media" />
      <Box p="6">
        <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          @{username}{" "}
          <Text fontWeight="normal" display="inline">
            {caption}
          </Text>
        </Box>{" "}
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {media_type}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
            mt="2"
          >
            {format(new Date(timestamp), "MM/dd/yy")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
