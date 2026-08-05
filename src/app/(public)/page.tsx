import Hero from "@/components/sections/hero";
import News from "@/components/sections/news";
import Profile from "@/components/sections/profile";
import Teachers from "@/components/sections/teachers";
import VisionMission from "@/components/sections/vision-mission";


export default function Home() {
  return (
    <>
      <Hero />
      <Profile />
      <VisionMission />
      <Teachers />
      <News />
    </>
  );
}