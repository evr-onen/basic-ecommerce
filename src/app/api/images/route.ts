import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const files = formData.getAll("files") as Blob[];

	if (files.length === 0) {
		return NextResponse.json({ error: "No files were uploaded." }, { status: 400 });
	}

	const relativeUploadDir = `/upload/images`;
	// ${dateFn.format(Date.now(), "dd-MM-Y")}`;
	const uploadDir = join(process.cwd(), "public", relativeUploadDir);

	try {
		await stat(uploadDir);
	} catch (e: any) {
		if (e.code === "ENOENT") {
			await mkdir(uploadDir, { recursive: true });
		} else {
			console.error("Error while trying to create directory when uploading a file\n", e);
			return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
		}
	}

	const uploadedFileUrls: string[] = [];

	for (const file of files) {
		try {
			const buffer = Buffer.from(await file.arrayBuffer());
			const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
			// @ts-ignore
			const filename = `${file.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
			await writeFile(`${uploadDir}/${filename}`, buffer);
			uploadedFileUrls.push(`${relativeUploadDir}/${filename}`);
		} catch (e) {
			console.error("Error while trying to upload a file\n", e);
			return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
		}
	}

	return NextResponse.json({ fileUrls: uploadedFileUrls });
}
