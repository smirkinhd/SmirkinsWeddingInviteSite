import React, { useState } from 'react';
import { Heart, MapPin, Clock, Calendar, Phone, User, Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface FormData {
  surname: string;
  first_name: string;
  patronymic: string;
  phone_number: string;
  confirmed: boolean;
}

export default function WeddingInvitation() {
  const [formData, setFormData] = useState<FormData>({
    surname: '',
    first_name: '',
    patronymic: '',
    phone_number: '',
    confirmed: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    {
      url: "/assets/photo1.jpg",
    },
    {
      url: "/assets/photo2.jpg",
    },
    {
      url: "/assets/photo3.jpg",
    },
    {
      url: "/assets/photo4.jpg",
    },
    {
      url: "/assets/photo5.jpg",
    },
    {
      url: "/assets/photo6.jpg",
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        console.error('Ошибка при отправке формы');
      }
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4">

        {/* Десктопная версия */}
        <div className="hidden md:flex justify-center space-x-8">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors duration-300"
          >
            Главная
          </button>
          <button
            onClick={() => scrollToSection("story")}
            className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors duration-300"
          >
            Наша история
          </button>
          <button
            onClick={() => scrollToSection("colorPitching")}
            className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors duration-300"
          >
            Цветовая гамма торжества
          </button>
          <button
            onClick={() => scrollToSection("details")}
            className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors duration-300"
          >
            Детали
          </button>
          <button
            onClick={() => scrollToSection("registration")}
            className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors duration-300"
          >
            Регистрация
          </button>
        </div>

        {/* Мобильная версия */}
        <div className="relative flex justify-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors duration-300 border px-4 py-2 rounded-md bg-white"
          >
            Меню
          </button>

          {isOpen && (
            <div className="absolute top-full mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden">
              {[
                { id: "hero", label: "Главная" },
                { id: "story", label: "Наша история" },
                { id: "colorPitching", label: "Цветовая гамма торжества" },
                { id: "details", label: "Детали" },
                { id: "registration", label: "Регистрация" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <Heart className="w-16 h-16 mx-auto text-gray-800 mb-6 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-tight">
            Герман <span className="text-gray-600">&</span> Аделина
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
            приглашают вас разделить радость нашего особенного дня
          </p>
          <div className="text-lg md:text-xl text-gray-800 font-medium">
            20 сентября 2025
          </div>
          <div className="mt-12">
            <button
              onClick={() => scrollToSection('story')}
              className="inline-flex items-center px-8 py-4 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase tracking-wider text-sm font-medium"
            >
              Узнать больше
            </button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Наша история</h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="prose prose-lg text-gray-700 leading-relaxed">
                <p className="text-xl font-light mb-6">
                  Наша история началась пять лет назад в Башкирском Государственном Университете, 
                  где обычная шутка превратилась в самое важное событие наших жизней.
                </p>

                <p className="mb-6">
                  Аделина была хореографом, а Герман — музыкантом. Их пути пересеклись 
                  во время репетиции к их первому мероприятию в университете, и с первого взгляда они поняли, 
                  что нашли друг друга.
                </p>
                <p className="mb-6">
                  За эти годы мы прошли множество трудностей, создавали совместные проекты и делились радостью успехов. 
                  Каждый день рядом с любимым человеком — это подарок.
                </p>
                <p className="text-lg font-medium text-gray-900">
                  Теперь мы готовы сделать следующий шаг и хотим разделить этот 
                  особенный момент с самыми близкими нам людьми.
                </p>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                {/* Main Image */}
                <div className="relative h-96 md:h-[500px]">
                  <img
                    src={carouselImages[currentImageIndex].url}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                </div>
                
                {/* Dots Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-white scale-110'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="colorPitching" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-12">
            Цветовая гамма торжества
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 text-center">
            <div>
              <div className="w-20 h-20 rounded-full mx-auto" style={{ backgroundColor: '#dac1df' }}></div>
            </div>
            <div>
              <div className="w-20 h-20 rounded-full mx-auto" style={{ backgroundColor: '#a77eaa' }}></div>
            </div>
            <div>
              <div className="w-20 h-20 rounded-full mx-auto" style={{ backgroundColor: '#916795' }}></div>
            </div>
            <div>
              <div className="w-20 h-20 rounded-full mx-auto" style={{ backgroundColor: '#6e4160' }}></div>
            </div>
            <div>
              <div className="w-20 h-20 rounded-full mx-auto" style={{ backgroundColor: '#55304f' }}></div>
            </div>
          </div>
        </div>
      </section>


      {/* Details Section */}
      <section id="details" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Детали события</h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-800" />
              <h3 className="text-xl font-medium mb-2">Дата</h3>
              <p className="text-gray-600">Суббота, 20 сентября 2025</p>
            </div>
            
            <div className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-800" />
              <h3 className="text-xl font-medium mb-2">Время</h3>
              <p className="text-gray-600">Регистрация в 16:00<br />Начало торжества в 16:30</p>
            </div>
            
            <div className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-800" />
              <h3 className="text-xl font-medium mb-2">Место</h3>
              <p className="text-gray-600">Sherwood House, Усадьба "БаринЪ"<br />г.Уфа, Образцовая улица, 1 к1</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-light mb-8 text-center">Расписание дня</h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="font-medium">16:00</span>
                <span className="text-gray-700">Сбор гостей</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="font-medium">16:30</span>
                <span className="text-gray-700">Торжественная регистрация брака</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="font-medium">17:00</span>
                <span className="text-gray-700">Начало банкета</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-medium">22:00</span>
                <span className="text-gray-700">Выступление кавер-группы "Отражение"</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Регистрация гостей</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg text-gray-300">
              Пожалуйста, подтвердите ваше участие до 1 сентября 2025
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="surname" className="block text-sm font-medium mb-2">
                  Фамилия *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Введите фамилию"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="first_name" className="block text-sm font-medium mb-2">
                  Имя *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Введите имя"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="patronymic" className="block text-sm font-medium mb-2">
                Отчество
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="patronymic"
                  name="patronymic"
                  value={formData.patronymic}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="Введите отчество"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium mb-2">
                Номер телефона *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="checkbox"
                  id="confirmed"
                  name="confirmed"
                  checked={formData.confirmed}
                  onChange={handleInputChange}
                  required
                  className="w-5 h-5 text-white bg-white/10 border-gray-600 rounded focus:ring-white focus:ring-2"
                />
                <Check className={`absolute top-0 left-0 w-5 h-5 text-gray-900 pointer-events-none transition-opacity duration-200 ${formData.confirmed ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <label htmlFor="confirmed" className="text-sm text-gray-300">
                Подтверждаю участие в свадебном торжестве 20 сентября 2025 года
              </label>
            </div>

            <button
              type="submit"
              disabled={!formData.surname || !formData.first_name || !formData.phone_number || !formData.confirmed || isSubmitting}
              className="w-full py-4 px-8 bg-white text-gray-900 rounded-lg font-medium uppercase tracking-wider text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              {isSubmitting ? 'Отправка...' : isSubmitted ? 'Отправлено!' : 'Подтвердить участие'}
            </button>
          </form>

          {isSubmitted && (
            <div className="mt-8 p-4 bg-green-600 rounded-lg text-center">
              <p className="text-white font-medium">
                Спасибо! Ваша регистрация получена. Мы свяжемся с вами в ближайшее время.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-8 h-8 mx-auto mb-4 text-gray-800" />
          <p className="text-gray-600 mb-2">
            С любовью, Герман и Аделина
          </p>
          <p className="text-sm text-gray-500">
          По всем вопросам:{" "}
          <a
            href="https://t.me/smirkinhd"
            className="text-blue-600 hover:underline"
          >
            Telegram
          </a>{" "}
          — Герман (жених)
        </p>

        </div>
      </footer>
    </div>
  );
}