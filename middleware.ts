import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // Exclude the audio-upload route so middleware doesn't buffer/truncate the
  // large video body (Next caps middleware request bodies at 10MB).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/upload/audio).*)",
  ],
};
