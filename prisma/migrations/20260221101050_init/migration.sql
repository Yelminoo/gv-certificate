-- CreateTable
CREATE TABLE "certificates" (
    "id" SERIAL NOT NULL,
    "certificate_no" TEXT NOT NULL,
    "issue_date" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "dimensions" TEXT,
    "cut" TEXT,
    "shape" TEXT,
    "color" TEXT,
    "comment1" TEXT,
    "comment2" TEXT,
    "origin" TEXT,
    "verified_by" TEXT,
    "certified_by" TEXT,
    "image_url" TEXT,
    "signature_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploads" (
    "id" SERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "file_size" INTEGER,
    "mime_type" TEXT,
    "url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "uploads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "certificates_certificate_no_key" ON "certificates"("certificate_no");

-- CreateIndex
CREATE INDEX "idx_certificate_no" ON "certificates"("certificate_no");

-- CreateIndex
CREATE INDEX "idx_created_at" ON "certificates"("created_at");

-- CreateIndex
CREATE INDEX "idx_file_name" ON "uploads"("file_name");
