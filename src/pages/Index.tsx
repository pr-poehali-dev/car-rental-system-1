import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchClass, setSearchClass] = useState('');
  const [searchBrand, setSearchBrand] = useState('');

  const news = [
    {
      id: 1,
      title: 'В России вынесли первый приговор за продажу аккаунтов каршеринга',
      description: 'В конце 2020 года в России вынесли первый приговор за продажу аккаунтов каршеринга. Приморский районный суд Петербурга оштрафовал гражданина РФ Романа Амелина на 50 тыс. рублей.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
    },
    {
      id: 2,
      title: 'Программа поддержки каршеринга не заработала из-за российского телематического оборудования',
      description: '25 августа 2020 года стало известно о том, что программа поддержки каршеринга, которая была анонсирована ещё в апреле на совещании у президента РФ Владимира Путина, так и не заработала.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    },
    {
      id: 3,
      title: 'Мошенничество с данными клиентов',
      description: 'По сообщениям на июль 2020 г каршеринг становится отличным помощником для мошенников. С помощью селфи клиентов с паспортом на людей берут кредиты в микрофинансовых компаниях.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
    },
    {
      id: 4,
      title: 'Столичный каршеринг обвинил Роспотребнадзор в блокировке деятельности',
      description: 'Каршеринг не может возобновить работу по докоронавирусному сценарию из-за отсутствия предписаний Роспотребнадзора. Представители сервисов обвинили ведомство в блокировке их деятельности и 9 июня направили коллективное обращение.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.poehali.dev/files/8e185479-5717-4245-be83-11e746c8a03b.png"
                alt="Индекс Драйв"
                className="h-16 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>Индекс Драйв</h1>
                <p className="text-xs text-muted-foreground">Ваш надежный выбор</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/branches" className="text-sm font-medium hover:text-primary transition-colors">
                Филиалы
              </Link>
              <Link to="/cars" className="text-sm font-medium hover:text-primary transition-colors">
                Бронирование
              </Link>
              <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
                <Icon name="User" size={18} className="inline mr-1" />
                Личный кабинет
              </Link>
            </nav>
            <Button asChild className="md:hidden">
              <Link to="/login">Войти</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">Доверьтесь профессионалам</h2>
            <p className="text-xl opacity-90">
              Более 500 довольных клиентов выбрали нас. Широкий выбор автомобилей и прозрачные условия аренды.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Icon name="Shield" size={20} />
                <span>Полное страхование</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Icon name="Clock" size={20} />
                <span>24/7 поддержка</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Icon name="Award" size={20} />
                <span>Лучшие цены</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto animate-slide-up shadow-lg border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="Search" size={28} />
                Поиск автомобиля
              </CardTitle>
              <CardDescription>Найдите идеальный автомобиль для вашей поездки</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Класс автомобиля</label>
                  <Select value={searchClass} onValueChange={setSearchClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите класс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Эконом</SelectItem>
                      <SelectItem value="premium">Премиум</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Марка</label>
                  <Select value={searchBrand} onValueChange={setSearchBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите марку" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                      <SelectItem value="bmw">BMW</SelectItem>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="hyundai">Hyundai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Модель</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите модель" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="model1">C-Class</SelectItem>
                      <SelectItem value="model2">3 Series</SelectItem>
                      <SelectItem value="model3">Camry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button asChild className="w-full mt-6" size="lg">
                <Link to="/cars">
                  <Icon name="Search" size={20} className="mr-2" />
                  Найти автомобили
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Новости и акции</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {news.map((item) => (
              <Card key={item.id} className="animate-fade-in hover-scale overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-base line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-3 text-sm">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>Индекс Драйв</h3>
              <p className="opacity-90">Надежный сервис аренды автомобилей</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <p className="flex items-center gap-2 opacity-90">
                <Icon name="Phone" size={18} />
                8 (800) 555-35-35
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Полезные ссылки</h4>
              <nav className="space-y-2">
                <a href="http://audi.ru/" target="_blank" rel="noopener noreferrer" className="block opacity-90 hover:opacity-100 transition-opacity">
                  Audi - официальный сайт
                </a>
                <a href="http://bmw.ru/" target="_blank" rel="noopener noreferrer" className="block opacity-90 hover:opacity-100 transition-opacity">
                  BMW - официальный сайт
                </a>
                <a href="http://mazda.ru/" target="_blank" rel="noopener noreferrer" className="block opacity-90 hover:opacity-100 transition-opacity">
                  Mazda - официальный сайт
                </a>
                <a href="http://honda.ru/" target="_blank" rel="noopener noreferrer" className="block opacity-90 hover:opacity-100 transition-opacity">
                  Honda - официальный сайт
                </a>
              </nav>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center opacity-90">
            <p>&copy; 2024 Индекс Драйв. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;