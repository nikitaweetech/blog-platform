import Hero from "@/components/hero";
import Posts from "@/components/Posts";

export default function Home() {
  return (
    <main>
      <Hero />
     <Posts posts={[]}></Posts>
    </main>
  );
}
