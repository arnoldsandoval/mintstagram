// This is an example of to protect an API route
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { access } from "fs";

const secret = process.env.SECRET;
let accessToken: string;

export const getInstagramMedia = async () => {
  const { data } = await axios.get(
    `https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp,caption&access_token=${accessToken}`
  );

  return data;
};

const InstagramMedia = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const token = await getToken({ req, secret });
  accessToken = token?.accessToken as string;

  if (!session) {
    return res
      .status(401)
      .json({ error: [{ statusCode: 401, message: "Unauthorized" }] });
  }

  const data = await getInstagramMedia();

  res.status(200).json(data);
};

export default InstagramMedia;
