"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function ProductImage(props: ImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#f8f8fa] text-xs text-gray-400">
        Image unavailable
      </div>
    );
  }

  // eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps and passed through
  return <Image {...props} onError={() => setErrored(true)} />;
}
