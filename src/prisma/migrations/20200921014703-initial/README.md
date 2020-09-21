# Migration `20200921014703-initial`

This migration has been generated by Programmer Incorporated <programmer.incorporated@gmail.com> at 9/20/2020, 8:47:03 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."FeedType" AS ENUM ('ATOM', 'RSS', 'NONE')

CREATE TABLE "public"."Article" (
"id" SERIAL,
"guid" text   ,
"title" text   NOT NULL ,
"description" text   ,
"content" text   ,
"author" text   ,
"image" text   ,
"logo" text   ,
"language" text   ,
"link" text   NOT NULL ,
"publisher" text   ,
"published" boolean   NOT NULL DEFAULT true,
"feedId" integer   ,
"publishedAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Category" (
"id" SERIAL,
"alias" text   ,
"name" text   NOT NULL ,
"description" text   ,
"image" text   ,
"published" boolean   NOT NULL DEFAULT true,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Feed" (
"id" SERIAL,
"alias" text   ,
"title" text   ,
"description" text   ,
"author" text   ,
"image" text   ,
"logo" text   ,
"language" text   ,
"link" text   NOT NULL ,
"feedUrl" text   ,
"feedType" "FeedType"  NOT NULL DEFAULT E'NONE',
"publisher" text   ,
"published" boolean   NOT NULL DEFAULT true,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."_ArticleToCategory" (
"A" integer   NOT NULL ,
"B" integer   NOT NULL 
)

CREATE UNIQUE INDEX "Article.guid_unique" ON "public"."Article"("guid")

CREATE UNIQUE INDEX "Category.alias_unique" ON "public"."Category"("alias")

CREATE UNIQUE INDEX "Feed.alias_unique" ON "public"."Feed"("alias")

CREATE UNIQUE INDEX "_ArticleToCategory_AB_unique" ON "public"."_ArticleToCategory"("A", "B")

CREATE INDEX "_ArticleToCategory_B_index" ON "public"."_ArticleToCategory"("B")

ALTER TABLE "public"."Article" ADD FOREIGN KEY ("feedId")REFERENCES "public"."Feed"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."_ArticleToCategory" ADD FOREIGN KEY ("A")REFERENCES "public"."Article"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_ArticleToCategory" ADD FOREIGN KEY ("B")REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200921014703-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,69 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Article {
+  id            Int       @default(autoincrement()) @id
+  guid          String?   @unique
+  title         String
+  description   String?
+  content       String?
+  author        String?
+  image         String?
+  logo          String?
+  language      String?
+  link          String
+  publisher     String?
+  published     Boolean   @default(true)
+  feed          Feed?     @relation(fields: [feedId], references: [id])
+  feedId        Int?
+  categories    Category[]
+  publishedAt   DateTime  @default(now())
+  createdAt     DateTime  @default(now())
+  updatedAt     DateTime  @updatedAt
+}
+
+model Category {
+  id            Int       @default(autoincrement()) @id
+  alias         String?   @unique
+  name          String
+  description   String?
+  image         String?
+  published     Boolean   @default(true)
+  articles      Article[]
+  createdAt     DateTime  @default(now())
+  updatedAt     DateTime  @updatedAt
+}
+
+model Feed {
+  id            Int       @default(autoincrement()) @id
+  alias         String?   @unique
+  title         String?
+  description   String?
+  author        String?
+  image         String?
+  logo          String?
+  language      String?
+  link          String
+  feedUrl       String?
+  feedType      FeedType  @default(NONE)
+  publisher     String?
+  published     Boolean   @default(true)
+  articles      Article[]
+  createdAt     DateTime  @default(now())
+  updatedAt     DateTime  @updatedAt
+}
+
+enum FeedType {
+  ATOM
+  RSS
+  NONE
+}
```

