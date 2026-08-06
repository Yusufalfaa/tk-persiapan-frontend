import ContactSection from "@/components/sections/contact-section";
import HeroSection from "@/components/sections/hero-section";
import NewsSection from "@/components/sections/news-section";
import ProfileSection from "@/components/sections/profile-section";
import TeachersSection from "@/components/sections/teachers-section";
import VideoProfileSection from "@/components/sections/video-profile-section";
import VisionMissionSection from "@/components/sections/vision-mission-sections";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProfileSection />
      <VisionMissionSection />
      <VideoProfileSection />
      <TeachersSection />
      <NewsSection />
      <ContactSection />
    </>
  );
}