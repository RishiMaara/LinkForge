import QRCode from "qrcode";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) return Response.json({ error: "Missing URL" }, { status: 400 });
  const png = await QRCode.toDataURL(url);
  const svg = await QRCode.toString(url, { type: "svg" });
  return Response.json({ png, svg });
}
