import Banner from '@/components/main/Banneer';
import MainView from '@/components/main/MainView';

export default function Home() {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <MainView />
        </div>
      </div>
    </div>
  );
}
