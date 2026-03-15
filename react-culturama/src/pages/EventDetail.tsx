import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { useCategories } from '../hooks/useCategories';
import Button from '../components/Button';
import EventCard from '../components/EventCard';
import { Close, CalendarToday, LocationOn, ConfirmationNumber, Share, Description, TheaterComedy, Celebration, Link, ArrowBack, Favorite, FavoriteBorder, AccessTime, Person, Language, Phone, Email } from '@mui/icons-material';
import { useState } from 'react';
import logo from '../assets/logo.png';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { getEventById, formatEventDateTime, formatEventDate, upcomingEvents } = useEvents();
  const { getCategoryName, getEventsByCategory } = useCategories();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const event = eventId ? getEventById(parseInt(eventId)) : null;

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
        <div className="max-w-md mx-auto text-center">
          <Close className="text-red-500 mb-6 mx-auto" style={{ fontSize: '5rem' }} />
          <h1 className="text-3xl font-fjalla text-gray-800 mb-4">Evento não encontrado</h1>
          <p className="text-gray-600 mb-8 text-lg" style={{ fontFamily: "'Work Sans', sans-serif" }}>
            O evento que você está procurando não existe ou pode ter sido removido.
          </p>
          <div className="space-y-4">
            <Button onClick={() => navigate('/eventos')} className="w-full">
              Ver Todos os Eventos
            </Button>
            <Button onClick={() => navigate('/')} className="w-full bg-gray-600 hover:bg-gray-700">
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isUpcoming = eventDate >= new Date();
  const categoryEvents = getEventsByCategory(event.categoryId).filter(e => e.id !== event.id).slice(0, 3);
  const relatedEvents = upcomingEvents.filter(e => e.id !== event.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: `Confira este evento: ${event.name}`,
        url: window.location.href,
      });
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 lg:h-[500px] overflow-hidden relative">
          {imageError ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
              <img
                src={logo}
                alt="Culturama"
                className="h-20 w-auto opacity-80"
              />
            </div>
          ) : (
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <button
            onClick={() => navigate(-1)}
            className="bg-black/80 backdrop-blur p-3 rounded-full shadow-lg hover:bg-black transition-colors"
          >
            <ArrowBack className="text-white" style={{ fontSize: '1.8rem' }} />
          </button>
        </div>

        {/* Event Status Badge */}
        <div className="absolute top-6 right-6">
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
            isUpcoming ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
          }`}>
            {isUpcoming ? 'Próximo Evento' : 'Evento Realizado'}
          </span>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute bottom-6 right-6 flex gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            {isFavorite ? (
              <Favorite className="text-red-500" style={{ fontSize: '1.5rem' }} />
            ) : (
              <FavoriteBorder className="text-gray-600" style={{ fontSize: '1.5rem' }} />
            )}
          </button>
          <button
            onClick={handleShare}
            className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Share className="text-gray-600" style={{ fontSize: '1.5rem' }} />
          </button>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-medium">
                {getCategoryName(event.categoryId)}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-fjalla mb-4">
              {event.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <CalendarToday className="text-blue-500 mr-3" style={{ fontSize: '1.8rem' }} />
                  <h3 className="text-lg font-fjalla text-gray-800">Data e Hora</h3>
                </div>
                <p className="text-gray-600 text-lg" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  {formatEventDateTime(event.date)}
                </p>
                <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  <AccessTime className="inline mr-1" style={{ fontSize: '1rem' }} />
                  {isUpcoming ? 'Evento próximo' : 'Evento já realizado'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <LocationOn className="text-red-500 mr-3" style={{ fontSize: '1.8rem' }} />
                  <h3 className="text-lg font-fjalla text-gray-800">Localização</h3>
                </div>
                <p className="text-gray-600 text-lg" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  {event.location}
                </p>
                <button className="text-blue-500 hover:text-blue-600 text-sm mt-2 underline">
                  Ver no mapa
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <Description className="text-green-500 mr-3" style={{ fontSize: '2rem' }} />
                <h2 className="text-2xl font-fjalla text-gray-800">Sobre o Evento</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                {event.description}
              </p>
            </div>

            {/* Event Details */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-fjalla text-gray-800 mb-6">Informações Adicionais</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <TheaterComedy className="text-purple-500 mr-3" style={{ fontSize: '1.5rem' }} />
                  <span className="text-gray-600" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                    Categoria: <strong>{getCategoryName(event.categoryId)}</strong>
                  </span>
                </div>
                <div className="flex items-center">
                  <Person className="text-orange-500 mr-3" style={{ fontSize: '1.5rem' }} />
                  <span className="text-gray-600" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                    Organizado por: <strong>Culturama</strong>
                  </span>
                </div>
                <div className="flex items-center">
                  <Language className="text-blue-500 mr-3" style={{ fontSize: '1.5rem' }} />
                  <span className="text-gray-600" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                    Idioma: <strong>Português</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket/Action Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
              <h3 className="text-xl font-fjalla text-gray-800 mb-4 text-center">
                {isUpcoming ? 'Garanta seu ingresso' : 'Evento realizado'}
              </h3>

              {isUpcoming ? (
                <div className="space-y-4">
                  <div className="text-center py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                    <p className="text-white font-bold text-lg">Ingressos disponíveis</p>
                    <p className="text-white/90 text-sm">A partir de R$ 50,00</p>
                  </div>
                  <Button
                    onClick={() => alert('Sistema de ingressos em desenvolvimento!')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 flex items-center justify-center"
                  >
                    <ConfirmationNumber className="mr-2" style={{ fontSize: '1.2rem' }} />
                    Comprar Ingresso
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Celebration className="text-gray-400 mb-4 mx-auto" style={{ fontSize: '3rem' }} />
                  <p className="text-gray-600" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                    Este evento já foi realizado. Fique atento aos próximos eventos!
                  </p>
                  <Button
                    onClick={() => navigate('/eventos')}
                    className="w-full mt-4"
                  >
                    Ver Próximos Eventos
                  </Button>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-fjalla text-gray-800 mb-4">Contato do Organizador</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Email className="text-gray-500 mr-3" style={{ fontSize: '1.3rem' }} />
                  <span className="text-gray-600 text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                    contato@culturama.com
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-gray-500 mr-3" style={{ fontSize: '1.3rem' }} />
                  <span className="text-gray-600 text-sm" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                    (11) 99999-9999
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {(categoryEvents.length > 0 || relatedEvents.length > 0) && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-fjalla text-gray-800 mb-4 flex items-center justify-center gap-3">
                <Link className="text-blue-500" style={{ fontSize: '2rem' }} />
                Eventos Relacionados
              </h2>
              <p className="text-gray-600" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                Outros eventos que podem te interessar
              </p>
            </div>

            {categoryEvents.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-fjalla text-gray-700 mb-6">
                  Mais eventos de {getCategoryName(event.categoryId)}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryEvents.map((relatedEvent) => (
                    <EventCard
                      key={relatedEvent.id}
                      imageUrl={relatedEvent.image}
                      title={relatedEvent.name}
                      date={formatEventDate(relatedEvent.date)}
                      location={relatedEvent.location}
                      onViewClick={() => navigate(`/eventos/${relatedEvent.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {relatedEvents.length > 0 && (
              <div>
                <h3 className="text-xl font-fjalla text-gray-700 mb-6">
                  Próximos eventos em destaque
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedEvents.map((relatedEvent) => (
                    <EventCard
                      key={relatedEvent.id}
                      imageUrl={relatedEvent.image}
                      title={relatedEvent.name}
                      date={formatEventDate(relatedEvent.date)}
                      location={relatedEvent.location}
                      onViewClick={() => navigate(`/eventos/${relatedEvent.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-fjalla text-gray-800 mb-4">Compartilhar Evento</h3>
            <div className="space-y-3">
              <button
                onClick={() => copyToClipboard(window.location.href)}
                className="w-full p-3 text-left hover:bg-gray-50 rounded-lg border"
              >
                Copiar link do evento
              </button>
              <button
                onClick={() => copyToClipboard(`Confira este evento: ${event.name} - ${window.location.href}`)}
                className="w-full p-3 text-left hover:bg-gray-50 rounded-lg border"
              >
                Copiar texto para compartilhar
              </button>
            </div>
            <Button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 bg-gray-600 hover:bg-gray-700"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;