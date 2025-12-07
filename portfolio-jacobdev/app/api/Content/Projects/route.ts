import { NextResponse } from "next/server";
import { getProjectsFromPayload } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getProjectsFromPayload();
    return NextResponse.json(projects, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "unknown error" },
      { status: 500 }
    );
  }
}