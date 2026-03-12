import { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import { useCategories } from '../hooks/useCategories';
import { useSearch } from '../hooks/useSearch';
import EventCard from '../components/EventCard';
import Button from '../components/Button';
import { TheaterComedy, Event } from '@mui/icons-material';

const Events = () => {
  const { events, upcomingEvents, pastEvents, formatEventDate } = useEvents();
  const { categories, getCategoryName } = useCategories();
  const { searchQuery, filteredEvents, isSearching } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showPastEvents, setShowPastEvents] = useState(false);

  const eventsToShow = isSearching
    ? filteredEvents
    : selectedCategory
      ? events.filter(event => event.categoryId === selectedCategory)
      : showPastEvents
        ? pastEvents
        : upcomingEvents;

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-fjalla text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Event className="text-orange-500" style={{ fontSize: '3rem' }} />
            Todos os Eventos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            Descubra todos os eventos culturais disponíveis em nossa plataforma
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <Button
              onClick={() => {
                setSelectedCategory(null);
                setShowPastEvents(false);
              }}
              className={selectedCategory === null && !showPastEvents ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
            >
              Próximos Eventos
            </Button>
            <Button
              onClick={() => {
                setSelectedCategory(null);
                setShowPastEvents(true);
              }}
              className={showPastEvents ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
            >
              Eventos Passados
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(selectedCategory === category.id ? null : category.id);
                  setShowPastEvents(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="text-center mb-8">
          <p className="text-gray-600" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            {isSearching && `Resultados para "${searchQuery}": `}
            {selectedCategory && `Categoria ${getCategoryName(selectedCategory)}: `}
            <span className="font-semibold">{eventsToShow.length} evento(s) encontrado(s)</span>
          </p>
        </div>

        {/* Events Grid */}
        {eventsToShow.length === 0 ? (
          <div className="text-center py-16">
            <TheaterComedy className="text-gray-400 mb-4" style={{ fontSize: '4rem' }} />
            <h3 className="text-2xl font-fjalla text-gray-700 mb-4">
              Nenhum evento encontrado
            </h3>
            <p className="text-gray-600 mb-8" style={{ fontFamily: "'Work Sans', sans-serif" }}>
              Tente ajustar os filtros ou buscar por outros termos
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {eventsToShow.map((event) => (
              <div key={event.id} className="transform hover:scale-105 transition-transform duration-300">
                <EventCard
                  imageUrl={event.image}
                  title={event.name}
                  date={formatEventDate(event.date)}
                  location={event.location}
                  onViewClick={() => window.location.href = `/eventos/${event.id}`}
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Events;