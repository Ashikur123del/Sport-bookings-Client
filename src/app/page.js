import Banner from "@/components/Banner";
import PopularSports from "@/components/PropularShorts";
import SportUserList from "@/components/SportUserList";
import WhyChooseSports from "@/components/WhyChooseSports";

export default function Home() {
  return (
    <div>
      <Banner />
      <PopularSports />
      <SportUserList />
      <WhyChooseSports />
    </div>
  );
}
