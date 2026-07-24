"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { getInitials, isAllowedImageSource, placeholderImagePath, resolveSafeImageSource } from "@/lib/images";

type SafeImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackLabel?: string;
};

export function SafeImage({ src, alt, className = "", fallbackLabel }: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const resolvedSource = failed ? placeholderImagePath : resolveSafeImageSource(src);

  return (
    <Image
      src={resolvedSource}
      alt={alt}
      width={1200}
      height={800}
      unoptimized
      className={className}
      onError={() => setFailed(true)}
      data-fallback={resolvedSource === placeholderImagePath ? "true" : "false"}
      title={resolvedSource === placeholderImagePath ? fallbackLabel : undefined}
    />
  );
}

export function UserAvatar({ src, name, className = "" }: { src?: string | null; name?: string | null; className?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = getInitials(name);
  const canUseImage = Boolean(src && isAllowedImageSource(src) && !failed);

  if (canUseImage) {
    return (
      <Image
        src={String(src)}
        alt={name ? `Foto de ${name}` : "Foto do aluno"}
        width={80}
        height={80}
        unoptimized
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  if (initials) {
    return (
      <span aria-label={name ? `Avatar de ${name}` : "Avatar do aluno"} className={className}>
        {initials}
      </span>
    );
  }

  return (
    <span aria-label="Avatar padrão" className={className}>
      <ImageIcon className="h-4 w-4" />
    </span>
  );
}
