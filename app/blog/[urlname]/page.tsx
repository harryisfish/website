import { notFound } from "next/navigation";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import ContentRender from "@/components/Markdown/ContentRender";
import { PrismaClient } from "@prisma/client";
import { MotionDiv, MotionH1 } from "@/components/ui/motion";
import { Suspense } from "react";
import Loading from "@/components/Loading";

interface BlogPageProps {
  params: { urlname: string };
}

export default function BlogPage({ params }: BlogPageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <BlogContent urlname={params.urlname} />
    </Suspense>
  );
}

async function BlogContent({ urlname }: { urlname: string }) {
  const prisma = new PrismaClient();
  const blog = await prisma.blogs.findUnique({
    where: {
      urlname: urlname,
    },
  });

  if (!blog) {
    return notFound();
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-4xl"
    >
      <MotionH1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-center mb-4"
      >
        {blog.title}
      </MotionH1>
      <div className="text-center text-gray-600 mb-8">
        <time dateTime={new Date(blog.created_at).toISOString()}>
          {format(new Date(blog.created_at), "yyyy年MM月dd日", {
            locale: zhCN,
          })}
        </time>
      </div>
      <ContentRender content={blog.content} />
    </MotionDiv>
  );
}
