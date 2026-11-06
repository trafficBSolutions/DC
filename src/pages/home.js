import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/headers/homeHeader';
import Footer from '../components/footers/homeFooter';
import {
  getCompanyNames,
  getCategorizedServiceTypes,
  getCategoryMeta,
  getCompaniesByService,
} from '../data/companyData';
import ServiceProvidersModal from '../components/ServiceProvidersModal';
import MapComponent from '../components/googlemaps';
import images from '../utils/images';
import '../css/header.css';
import '../css/home.css';
import '../css/footer.css';
import '../css/map.css';

const normalize = (value) => String(value ?? '').toLocaleLowerCase().trim();
const profilePath = (name) => `/company/${encodeURIComponent(name)}`;

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('services');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalService, setModalService] = useState(null);

  const categories = useMemo(() => getCategorizedServiceTypes(), []);
  const categoryMeta = useMemo(() => getCategoryMeta(), []);
  const companies = useMemo(() => getCompanyNames(), []);

  // Build a lightweight searchable index using the existing companyData helpers.
  // A company can appear under several services and categories.
  const directory = useMemo(() => {
    const byName = new Map(companies.map((name) => [normalize(name), {
      name, services: new Set(), categories: new Set(),
    }]));

    Object.entries(categories).forEach(([category, services]) => {
      services.forEach((service) => {
        (getCompaniesByService(service) || []).forEach((company) => {
          const name = typeof company === 'string' ? company : company?.name;
          if (!name) return;
          const key = normalize(name);
          if (!byName.has(key)) {
            byName.set(key, { name, services: new Set(), categories: new Set() });
          }
          byName.get(key).services.add(service);
          byName.get(key).categories.add(category);
        });
      });
    });

    return Array.from(byName.values()).map((company) => ({
      ...company,
      services: Array.from(company.services),
      categories: Array.from(company.categories),
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [categories, companies]);

  const categoryList = useMemo(() => Object.entries(categories).map(([name, services]) => ({
    name,
    services,
    count: directory.filter((company) => company.categories.includes(name)).length,
    icon: categoryMeta[name]?.icon || '🏢',
    description: categoryMeta[name]?.description || 'Explore local businesses and services',
  })), [categories, categoryMeta, directory]);

  const term = normalize(query);
  const matchingCompanies = useMemo(() => directory.filter((company) => {
    const matchesQuery = !term || [company.name, ...company.services, ...company.categories]
      .some((value) => normalize(value).includes(term));
    const matchesCategory = !selectedCategory || company.categories.includes(selectedCategory);
    return matchesQuery && matchesCategory;
  }), [directory, term, selectedCategory]);

  const visibleCategories = categoryList.filter((category) => !term || [
    category.name, category.description, ...category.services,
  ].some((value) => normalize(value).includes(term)));

  const visibleServices = selectedCategory ? (categories[selectedCategory] || []).filter((service) =>
    !term || normalize(service).includes(term) || (getCompaniesByService(service) || []).some((company) =>
      normalize(typeof company === 'string' ? company : company?.name).includes(term)
    )
  ) : [];

  const openService = (service) => setModalService(service);
  const serviceProviders = modalService ? (getCompaniesByService(modalService) || []).map((company) => {
    // Preserve actual data if the helper provides it; don't invent addresses or phone numbers.
    if (typeof company === 'string') return { name: company };
    return {
      ...company,
      location: company.location || [company.city, company.state].filter(Boolean).join(', ') || undefined,
      phone: company.phone || company.licenseContact?.phone || undefined,
      email: company.email || company.licenseContact?.email || undefined,
    };
  }) : [];

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSelectedCategory(null);
  };

  const jumpToDirectory = () => document.getElementById('dc-directory')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="dc-home">
      <Header />
      <main>
        <section className="dc-hero" aria-labelledby="dc-hero-title">
          <video className="dc-hero-video" autoPlay loop muted playsInline aria-hidden="true">
            <source src={images['connection.mp4']} type="video/mp4" />
          </video>
          <div className="dc-hero-content">
            <div className="dc-eyebrow"><span className="dc-status-dot" /> Your Gordon County business connection</div>
            <img className="dc-hero-logo" src={images['Direction Connection Favicon.svg']} alt="Direct Connection" />
            <h1 id="dc-hero-title">Find local. <span>Connect directly.</span></h1>
            <p>Find the people, businesses, and services your community has to offer — all in one place.</p>
            <form className="dc-hero-search" onSubmit={(event) => { event.preventDefault(); setActiveTab('companies'); setSelectedCategory(null); jumpToDirectory(); }} role="search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
              <input aria-label="Search businesses and services" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try landscaping, auto repair, fitness..." />
              <button type="submit">Find businesses <span aria-hidden="true">→</span></button>
            </form>
            <div className="dc-hero-actions">
              <button type="button" onClick={() => { switchTab('services'); jumpToDirectory(); }}>Explore categories ↓</button>
              <span>Serving Gordon County and surrounding communities</span>
            </div>
          </div>
        </section>

        <section className="dc-intro" aria-label="About Direct Connection">
          <div><span className="dc-section-kicker">DISCOVER WHAT'S LOCAL</span><h2>Your community, one connection away.</h2></div>
          <p>From home improvement and landscaping to fitness, restaurants, and specialty services, discover businesses and connect with them directly.</p>
        </section>

        <section className="dc-directory" id="dc-directory" aria-labelledby="dc-directory-heading">
          <div className="dc-section-heading">
            <div><span className="dc-section-kicker">LOCAL DIRECTORY</span><h2 id="dc-directory-heading">Find what you're looking for</h2><p>Browse by service or explore our local business directory.</p></div>
            <div className="dc-directory-total">{directory.length} businesses in the directory</div>
          </div>
          <div className="dc-directory-toolbar">
            <div className="dc-tabs" role="group" aria-label="Directory view">
              <button type="button" className={activeTab === 'services' ? 'is-active' : ''} aria-pressed={activeTab === 'services'} onClick={() => switchTab('services')}>Browse services</button>
              <button type="button" className={activeTab === 'companies' ? 'is-active' : ''} aria-pressed={activeTab === 'companies'} onClick={() => switchTab('companies')}>All businesses</button>
            </div>
            <div className="dc-filter-search">
              <span aria-hidden="true">⌕</span>
              <input aria-label="Filter directory" placeholder="Search names or services" value={query} onChange={(event) => setQuery(event.target.value)} />
              {query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>×</button>}
            </div>
          </div>

          {activeTab === 'services' && !selectedCategory && (
            <div className="dc-category-grid">
              {visibleCategories.map((category) => (
                <button type="button" className="dc-category-card" key={category.name} onClick={() => { setSelectedCategory(category.name); setQuery(''); }}>
                  <span className="dc-category-icon" aria-hidden="true">{category.icon}</span>
                  <strong>{category.name}</strong>
                  <span className="dc-category-description">{category.description}</span>
                  <span className="dc-category-bottom">{category.services.length} services · {category.count} businesses <b aria-hidden="true">↗</b></span>
                </button>
              ))}
              {visibleCategories.length === 0 && <div className="dc-empty">No categories match your search. Try the All businesses tab.</div>}
            </div>
          )}

          {activeTab === 'services' && selectedCategory && (
            <div className="dc-service-panel">
              <button className="dc-back" type="button" onClick={() => { setSelectedCategory(null); setQuery(''); }}>← All categories</button>
              <div className="dc-service-heading"><span aria-hidden="true">{categoryMeta[selectedCategory]?.icon || '🏢'}</span><div><h3>{selectedCategory}</h3><p>Choose a service to see matching providers.</p></div></div>
              <div className="dc-service-grid">
                {visibleServices.map((service) => {
                  const count = (getCompaniesByService(service) || []).length;
                  return <button type="button" key={service} className="dc-service-item" onClick={() => openService(service)}><span>{service}</span><small>{count} {count === 1 ? 'provider' : 'providers'}</small><b aria-hidden="true">→</b></button>;
                })}
              </div>
              {visibleServices.length === 0 && <div className="dc-empty">No services match that search.</div>}
            </div>
          )}

          {activeTab === 'companies' && (
            <div className="dc-companies-panel">
              <div className="dc-results-count">Showing {matchingCompanies.length} {matchingCompanies.length === 1 ? 'business' : 'businesses'}</div>
              <div className="dc-business-grid">
                {matchingCompanies.map((company) => (
                  <Link to={profilePath(company.name)} key={company.name} className="dc-business-card">
                    <div className="dc-business-avatar" aria-hidden="true">{company.name.charAt(0).toUpperCase()}</div>
                    <div className="dc-business-details"><h3>{company.name}</h3><p>{company.categories.join(' · ') || 'Local business'}</p><div className="dc-business-tags">{company.services.slice(0, 3).map((service) => <span key={service}>{service}</span>)}</div></div>
                    <span className="dc-business-arrow" aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
              {matchingCompanies.length === 0 && <div className="dc-empty">No businesses found. Try a different name or service.</div>}
            </div>
          )}
        </section>

        <section className="dc-how" aria-labelledby="dc-how-title">
          <div className="dc-section-heading"><div><span className="dc-section-kicker">SIMPLE BY DESIGN</span><h2 id="dc-how-title">Local connections made easy</h2></div></div>
          <div className="dc-how-grid">
            <div><span className="dc-step">01</span><h3>Search for a service</h3><p>Browse categories or search for exactly what you need.</p></div>
            <div><span className="dc-step">02</span><h3>Explore local businesses</h3><p>Find businesses offering those services and view their profiles.</p></div>
            <div><span className="dc-step">03</span><h3>Connect directly</h3><p>Use each business's listed contact details to reach out.</p></div>
          </div>
        </section>

        <section className="dc-map-section" aria-labelledby="dc-map-heading"><div className="dc-section-heading"><div><span className="dc-section-kicker">EXPLORE THE AREA</span><h2 id="dc-map-heading">Our reach</h2><p>Discover businesses and connections around our community.</p></div></div><div className="dc-map-shell"><MapComponent onPlanMarkerAdd={(lat, lng) => console.log('Marker added at:', lat, lng)} /></div></section>

        <section className="dc-bottom-cta"><div><span className="dc-section-kicker">SUPPORT LOCAL</span><h2>Great communities start with local connections.</h2><p>Explore businesses serving Gordon County and nearby communities.</p></div><button type="button" onClick={() => { switchTab('companies'); setQuery(''); jumpToDirectory(); }}>Explore the directory →</button></section>
      </main>
      {modalService && <ServiceProvidersModal service={modalService} companies={serviceProviders} onClose={() => setModalService(null)} />}
      <Footer />
    </div>
  );
}
