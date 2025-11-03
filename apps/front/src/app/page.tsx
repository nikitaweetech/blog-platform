import Hero from "@/components/hero";
import Posts from "@/components/Posts";
import { fetchPosts } from "@/lib/actions/postActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { getSession } from "@/lib/session";
type Props={
  searchParams:Promise<{[key:string]:string | string[] |undefined}>
}
export default  async function Home({searchParams}:Props) {
  const {page,pageSize}=await searchParams;

  const {posts,totalPosts}=await fetchPosts({page:page?+page:undefined,pageSize:pageSize?+pageSize:undefined})
  const session=await getSession();
  console.log("🚀 ~ Home ~ session:", session)
  
  return (
    <main>
      <Hero />
     <Posts posts={posts} currentPage={page? +page: 1} totalPages={Math.ceil(totalPosts/DEFAULT_PAGE_SIZE)}/>
    </main>
  );
}
