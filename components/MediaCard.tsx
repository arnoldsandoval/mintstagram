import { Box, Image, Text, Badge, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { format } from "date-fns";

export interface MediaObject {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  timestamp: string;
  username: string;
}

export interface Props extends MediaObject {
  onSelection: () => void;
  isSelected?: boolean;
}

export const MediaCard = ({
  id,
  media_type,
  media_url,
  timestamp,
  username,
  caption,
  onSelection,
  isSelected,
}: Props) => {
  return (
    <Box
      key={id}
      as="button"
      maxW="sm"
      background="#111"
      overflow="hidden"
      transition="all 0.2s"
      borderRadius="0"
      boxShadow={
        isSelected
          ? "0 0 0px 5px black, 0 0 0px 8px #f9c74f"
          : "10px 10px 10px rgba(0,0,0,0)"
      }
      onClick={onSelection}
    >
      <Flex justifyContent="center" alignItems="center" bg="gray.900">
        <Image src={media_url} alt="Media" maxHeight={380} />
      </Flex>
      <Box p="6">
        <Box fontWeight="semibold" isTruncated textAlign="left">
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
            {format(new Date(timestamp), "MM/dd/yyyy")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
