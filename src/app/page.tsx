import Banner from '@/components/main/Banneer';
import MainView from '@/components/main/MainView';
import Tags from '@/components/main/Tags';

export default function Home() {
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <MainView />
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
