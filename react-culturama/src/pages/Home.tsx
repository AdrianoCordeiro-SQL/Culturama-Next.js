import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useEvents } from '../hooks/useEvents';
import { useCategories } from '../hooks/useCategories';
import { useSearch } from '../hooks/useSearch';
import EventCard from '../components/EventCard';
import CategoryCard from '../components/CategoryCard';
import Button from '../components/Button';
import { Warning, Star, TheaterComedy, Search, Event, Rocket } from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();
  const { loading, error } = useData();
  const { upcomingEvents, formatEventDate } = useEvents();
  const { categoriesWithEventCount, getCategoryName } = useCategories();
  const { searchQuery, setSearchQuery, filteredEvents, isSearching } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-xl font-fjalla text-gray-600">Carregando eventos incríveis...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <Warning className="text-red-500" style={{ fontSize: '4rem' }} />
          <h2 className="text-2xl font-fjalla text-gray-800 mb-4">Ops! Algo deu errado</h2>
          <p className="text-gray-600 mb-6" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            {error}
          </p>
          <Button onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  const featuredEvents = upcomingEvents.slice(0, 3);
  const categoryColors = ['#EAB308', '#F97316', '#A855F7', '#22C55E', '#EF4444', '#3B82F6', '#8B5CF6', '#10B981'];

  const eventsToShow = isSearching
    ? filteredEvents
    : selectedCategory
      ? upcomingEvents.filter(event => event.categoryId === selectedCategory)
      : upcomingEvents;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-fjalla mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Descubra a Cultura
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ fontFamily: "'Work Sans', sans-serif" }}>
              Os melhores eventos culturais do Brasil estão aqui. Arte, música, teatro e muito mais te esperam!
            </p>
          </div>

          {/* Featured Events */}
          {featuredEvents.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-fjalla mb-8 text-center flex items-center justify-center gap-3">
              <Star className="text-yellow-400" style={{ fontSize: '2rem' }} />
              Eventos em Destaque
            </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredEvents.map((event) => (
                  <div key={event.id} className="transform hover:scale-105 transition-transform duration-300">
                    <EventCard
                      imageUrl={event.image}
                      title={event.name}
                      date={formatEventDate(event.date)}
                      location={event.location}
                      onViewClick={() => navigate(`/eventos/${event.id}`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-fjalla text-gray-800 mb-4 flex items-center justify-center gap-3">
              <TheaterComedy className="text-purple-500" style={{ fontSize: '2.5rem' }} />
              Explore por Categoria
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'Work Sans', sans-serif" }}>
              Encontre exatamente o que você procura navegando pelas nossas categorias
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {categoriesWithEventCount.map((category, index) => (
              <div
                key={category.id}
                className={`transform transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
                }`}
                onClick={() => navigate(`/categorias/${category.id}`)}
              >
                <CategoryCard
                  title={`${category.name.toUpperCase()} (${category.eventCount})`}
                  backgroundColor={categoryColors[index % categoryColors.length]}
                />
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div className="text-center mb-8">
              <Button onClick={() => setSelectedCategory(null)}>
                Ver Todos os Eventos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Search Results or Events Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-fjalla text-gray-800 mb-4">
              <span className="flex items-center justify-center gap-3">
                {isSearching ? (
                  <>
                    <Search className="text-blue-500" style={{ fontSize: '2.5rem' }} />
                    Resultados da Busca "{searchQuery}"
                  </>
                ) : selectedCategory ? (
                  <>
                    <Event className="text-green-500" style={{ fontSize: '2.5rem' }} />
                    Eventos de {getCategoryName(selectedCategory)}
                  </>
                ) : (
                  <>
                    <TheaterComedy className="text-orange-500" style={{ fontSize: '2.5rem' }} />
                    Próximos Eventos
                  </>
                )}
              </span>
            </h2>
            <p className="text-lg text-gray-600" style={{ fontFamily: "'Work Sans', sans-serif" }}>
              {isSearching
                ? `${filteredEvents.length} evento(s) encontrado(s)`
                : selectedCategory
                  ? `Todos os eventos da categoria ${getCategoryName(selectedCategory)}`
                  : `${upcomingEvents.length} eventos incríveis te esperando`
              }
            </p>
          </div>

          {eventsToShow.length === 0 ? (
            <div className="text-center py-16">
              <TheaterComedy className="text-gray-400 mb-4" style={{ fontSize: '4rem' }} />
              <h3 className="text-2xl font-fjalla text-gray-700 mb-4">
                {isSearching ? 'Nenhum evento encontrado' : 'Nenhum evento disponível'}
              </h3>
              <p className="text-gray-600 mb-8" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                {isSearching
                  ? 'Tente buscar por outro termo ou explore nossas categorias'
                  : 'Novos eventos serão adicionados em breve!'
                }
              </p>
              {isSearching && (
                <Button onClick={() => setSearchQuery('')}>
                  Limpar Busca
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {eventsToShow.slice(0, 12).map((event) => (
                <div key={event.id} className="transform hover:scale-105 transition-transform duration-300">
                  <EventCard
                    imageUrl={event.image}
                    title={event.name}
                    date={formatEventDate(event.date)}
                    location={event.location}
                    onViewClick={() => navigate(`/eventos/${event.id}`)}
                  />
                </div>
              ))}
            </div>
          )}

          {eventsToShow.length > 12 && (
            <div className="text-center mt-12">
              <Button onClick={() => navigate('/eventos')}>
                Ver Mais Eventos
              </Button>
            </div>
          )}
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-fjalla mb-6">
            <span className="flex items-center justify-center gap-3">
              Não Perca Nenhum Evento!
              <Rocket className="text-yellow-400" style={{ fontSize: '2.5rem' }} />
            </span>
          </h2>
          <p className="text-xl mb-8" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            Inscreva-se para receber as novidades e ser o primeiro a saber dos melhores eventos culturais
          </p>
          <Button onClick={() => alert('Newsletter em breve!')}>
            Quero me Inscrever
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;