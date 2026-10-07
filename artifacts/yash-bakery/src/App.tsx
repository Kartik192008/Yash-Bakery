import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowRight, Menu, X } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; caption: string } | null>(null);

  useEffect(() => {
    document.title = 'Yash Bakery — Cakes, Namkeen & the Neighbourhood';
    if (!selectedPhoto) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedPhoto]);

  const photo = (number: string) => `/images/${number}_1791360${number === '1' ? '214224' : number === '2' || number === '3' ? '214227' : number === '4' || number === '5' || number === '6' ? '214228' : number === '7' || number === '8' || number === '9' ? '214229' : number === '10' || number === '11' || number === '12' ? '214224' : number === '13' || number === '14' || number === '15' ? '214225' : number === '16' || number === '17' || number === '18' ? '214226' : '214227'}.jpeg`;
  const openPhoto = (number: string, caption: string) => setSelectedPhoto({ src: photo(number), caption });

  return (
    <div className="site-shell">
      <div className="topline"><span>Yash Bakery <span aria-hidden="true">·</span> Cake, mithai & namkeen</span><span>A little celebration, every day</span></div>
      <header className="nav">
        <a className="brand" href="#home" aria-label="Yash Bakery home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">य</span><span><span className="brand-name">Yash Bakery</span><span className="brand-sub">Neighbourhood bakery & namkeen</span></span>
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-navigation">
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <a href="#cakes" onClick={() => setMenuOpen(false)}>Cakes & bakes</a>
          <a href="#namkeen" onClick={() => setMenuOpen(false)}>Namkeen</a>
          <a href="#our-shop" onClick={() => setMenuOpen(false)}>Our shop</a>
          <a className="nav-cta" href="#visit" onClick={() => setMenuOpen(false)}>Find your way in <ArrowRight size={13} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">A familiar corner, full of good things</span>
            <h1>Make room<br />for <em>something</em><br />sweet.</h1>
            <p>Birthday cakes behind the glass. Warm bakery favourites on the counter. A little something crunchy for the ride home. Come in and take a look around.</p>
            <a className="primary-link" href="#cakes">Step inside <ArrowDown size={15} /></a>
            <div className="hero-stamp"><span>Made for<br /><b>your</b><br />moments</span></div>
          </div>
          <figure className="hero-photo">
            <img src={photo('2')} alt="Yash Bakery's chilled display lined with celebration cakes" fetchPriority="high" />
            <figcaption className="hero-caption">Behind the glass<strong>Every occasion has its cake.</strong></figcaption>
          </figure>
        </section>

        <div className="ticker" aria-label="Cakes, biscuits, namkeen, celebrations">
          <div className="ticker-inner">CAKES FOR THE BIG DAYS <span>·</span> BISCUITS FOR THE TEA BREAK <span>·</span> NAMKEEN FOR THE ROAD <span>·</span> A LITTLE TREAT, JUST BECAUSE <span>·</span> CAKES FOR THE BIG DAYS <span>·</span> BISCUITS FOR THE TEA BREAK <span>·</span> NAMKEEN FOR THE ROAD <span>·</span> A LITTLE TREAT, JUST BECAUSE <span>·</span></div>
        </div>

        <section className="section cake-section" id="cakes">
          <div className="section-head">
            <div><span className="eyebrow">A good reason to gather</span><h2>Something to<br />put a candle on.</h2></div>
            <p>Colourful layers, chocolate curls, cream swirls and all the anticipation of that first slice. Take a little tour of the cake counter.</p>
          </div>
          <div className="cake-layout">
            <figure className="cake-feature" onClick={() => openPhoto('13', 'A look inside the celebration cake counter')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openPhoto('13', 'A look inside the celebration cake counter')} data-testid="image-cakes-feature">
              <img src={photo('13')} alt="Rows of celebration cakes in the bakery display" loading="lazy" />
              <figcaption>For birthdays, and just because</figcaption>
            </figure>
            <div className="cake-side">
              <button className="tile image-button" type="button" onClick={() => openPhoto('3', 'Bakery biscuits and fresh counter favourites')} data-testid="image-bakes-biscuits">
                <img src={photo('3')} alt="Golden bakery snacks and biscuits stacked behind the counter" loading="lazy" />
                <span className="tile-caption"><b>Little bites, big smiles</b><span>Biscuits · bakery counter</span></span>
              </button>
              <button className="tile image-button" type="button" onClick={() => openPhoto('5', 'A tempting spread from the bakery case')} data-testid="image-bakes-assortment">
                <img src={photo('5')} alt="A generous assortment of bakery treats in clear trays" loading="lazy" />
                <span className="tile-caption"><b>Pick your favourite</b><span>Fresh from the display</span></span>
              </button>
            </div>
          </div>
        </section>

        <section className="snack-band" id="namkeen">
          <div className="section-head">
            <div><span className="eyebrow">For the savoury side of life</span><h2>Aisle after aisle<br />of crunch.</h2></div>
            <p>Bright packets, familiar flavours and the kind of snack you open before you even get home. Explore Yash's savoury side.</p>
          </div>
          <div className="snack-grid">
            <button className="snack-card image-button" type="button" onClick={() => openPhoto('12', 'The namkeen and snack shelves at Yash Bakery')} data-testid="image-snacks-shelves">
              <img src={photo('12')} alt="Shelves full of namkeen, savoury snacks, and jars" loading="lazy" />
              <span className="snack-label"><span>Something for every craving</span><b>The namkeen shelves</b></span>
            </button>
            <button className="snack-card image-button" type="button" onClick={() => openPhoto('11', 'Crisp savoury snacks and biscuits')} data-testid="image-snacks-crisps">
              <img src={photo('11')} alt="Stacks of crisp savoury snacks and biscuits" loading="lazy" />
              <span className="snack-label"><span>Golden, crisp, moreish</span><b>Crunch time</b></span>
            </button>
            <button className="snack-card image-button" type="button" onClick={() => openPhoto('20', 'Yash namkeen packages displayed outside the shop')} data-testid="image-snacks-counter">
              <img src={photo('20')} alt="Colourful Yash namkeen packages displayed outside the shop" loading="lazy" />
              <span className="snack-label"><span>Take a little home</span><b>Counter favourites</b></span>
            </button>
          </div>
        </section>

        <section className="story">
          <div className="story-copy">
            <span className="eyebrow">The lovely bustle of a local shop</span>
            <h2>Not just a bakery.<br />A proper little world.</h2>
            <p>Step in and there is always something to catch your eye: the cake case catching the light, shelves packed with familiar favourites, party ribbons waiting for the next birthday. This is the neighbourhood shop in all its generous, colourful detail.</p>
            <div className="story-note"><i>य</i><span>Take your time. There is plenty to discover.</span></div>
          </div>
          <figure className="story-img">
            <img src={photo('7')} alt="The busy Yash Bakery shop counter, shelves, and the people who make it feel alive" loading="lazy" />
            <figcaption>A little bustle, a lot to choose from</figcaption>
          </figure>
        </section>

        <section className="counter" aria-labelledby="counter-title">
          <div className="counter-title"><div><span className="eyebrow">A peek around the counter</span><h2 id="counter-title">The shop, as it is.</h2></div><p>Glass cases, stocked shelves, handwritten signs and all the everyday character. See a detail you love? Tap any photo for a closer look.</p></div>
          <div className="counter-grid">
            {[
              ['6', 'The lively shop counter'], ['8', 'Shelves stocked for a good browse'], ['9', 'Bakery treats and pantry favourites'],
              ['10', 'A tucked-away corner of the shop'], ['1', 'Birthday decorations and party colour'],
            ].map(([number, caption]) => (
              <button className="gallery-item image-button" key={number} type="button" onClick={() => openPhoto(number, caption)} data-testid={`image-shop-${number}`}>
                <img src={photo(number)} alt={caption} loading="lazy" /><span>{caption}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="shop-story" id="our-shop">
          <div className="shop-story-head">
            <div><span className="eyebrow">Find us by the familiar sign</span><h2>Right here in<br />the neighbourhood.</h2></div>
            <p>Pink signboard outside, bright shelves inside, and a counter with plenty to point at. These are real glimpses of Yash Bakery and the street-facing shop that welcomes you in.</p>
          </div>
          <div className="shop-strip">
            {[
              ['15', 'The Yash Cake & Bakery storefront'], ['16', 'Yash Namkeen and the shop entrance'], ['14', 'A view from the neighbourhood street'],
              ['17', 'The shopfront and its familiar signs'], ['18', 'A closer look at the outdoor counter'], ['4', 'Sweet and savoury treats at the glass counter'],
            ].map(([number, caption]) => (
              <button key={number} type="button" onClick={() => openPhoto(number, caption)} aria-label={`View: ${caption}`} data-testid={`image-storefront-${number}`}>
                <img src={photo(number)} alt={caption} loading="lazy" />
              </button>
            ))}
          </div>
        </section>

        <section className="menu-panel">
          <div className="menu-photo"><img src={photo('21')} alt="Yash Bakery's hand-painted burger menu board outside the shop" loading="lazy" /></div>
          <div className="menu-copy">
            <span className="eyebrow">A little more from the counter</span>
            <h2>There is always<br />one more thing.</h2>
            <p>Look up and you will spot the menu board: burgers, vada pav, sandwiches and other quick bites, alongside the cakes, bakes and savoury shelves. The kind of place that has you browsing for longer than you planned.</p>
            <div className="menu-note">A real menu board, photographed right outside Yash Bakery</div>
          </div>
        </section>

        <section className="visit" id="visit">
          <div className="visit-copy">
            <span className="eyebrow">The door is part of the story</span>
            <h2>Come by.<br />Have a look around.</h2>
            <p>Whether you are celebrating somebody, stocking up for tea, or simply following the smell of something good, Yash Bakery is ready to welcome you in.</p>
          </div>
          <div className="visit-sign" aria-label="Yash Bakery sign">
            <div className="sign-word"><span>यश बेकरी</span><b>YASH BAKERY</b><small>Cakes · Bakes · Namkeen</small></div>
          </div>
        </section>
      </main>
      <footer className="footer"><a href="#home">Yash Bakery</a><span>A neighbourhood bakery, full of good things.</span><a href="#home">Back to top ↑</a></footer>
      {selectedPhoto && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedPhoto.caption} onClick={() => setSelectedPhoto(null)}>
          <button type="button" aria-label="Close photo" onClick={() => setSelectedPhoto(null)} data-testid="button-close-photo"><X size={20} /></button>
          <img src={selectedPhoto.src} alt={selectedPhoto.caption} onClick={(event) => event.stopPropagation()} />
          <p>{selectedPhoto.caption}</p>
        </div>
      )}
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
