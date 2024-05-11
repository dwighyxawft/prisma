-- CreateTable
CREATE TABLE "GroupPost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "GroupPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnGroupPost" (
    "userId" INTEGER NOT NULL,
    "groupPostId" INTEGER NOT NULL,

    CONSTRAINT "UserOnGroupPost_pkey" PRIMARY KEY ("userId","groupPostId")
);

-- AddForeignKey
ALTER TABLE "UserOnGroupPost" ADD CONSTRAINT "UserOnGroupPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnGroupPost" ADD CONSTRAINT "UserOnGroupPost_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "GroupPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
