"use client";

import { useEffect, useState } from "react";

export default function QRCard({
  url
}: {
  url: string;
}) {
  const [qrData, setQrData] = useState<{ png: string; svg: string } | null>(null);

  useEffect(() => {
    fetch(`/api/qr?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => setQrData(data));
  }, [url]);

  if (!qrData) return <div className="text-sm text-neutral-400">Loading QR...</div>;

  const downloadPNG = () => {
    const link = document.createElement("a");
    link.href = qrData.png;
    link.download = "qrcode.png";
    link.click();
  };

  const downloadSVG = () => {
    const blob = new Blob([qrData.svg], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "qrcode.svg";
    link.click();
  };

  return (
    <div className="rounded-xl border p-6 bg-white flex flex-col items-center gap-4">
      <img src={qrData.png} alt="QR Code" className="w-40 h-40 object-contain" />
      <div className="flex gap-2 w-full">
        <button
          onClick={downloadPNG}
          className="flex-1 text-xs font-semibold py-2 px-3 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700 transition"
        >
          Download PNG
        </button>
        <button
          onClick={downloadSVG}
          className="flex-1 text-xs font-semibold py-2 px-3 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-700 transition"
        >
          Download SVG
        </button>
      </div>
    </div>
  );
}
