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
      title: 'Новая программа лояльности',
      description: 'Получайте бонусы за каждую поездку и обменивайте их на скидки!',
      image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400',
    },
    {
      id: 2,
      title: 'Расширение автопарка',
      description: 'В наш парк добавлены новые премиум-модели Mercedes и BMW.',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
    },
    {
      id: 3,
      title: 'Открытие нового филиала',
      description: 'Теперь мы работаем в Западном районе города!',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/img/622b9b5e-1445-406f-9173-c8176b9d781e.jpg"
                alt="Car Sharing Logo"
                className="h-12 w-12 rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-primary">CAR SHARING</h1>
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

      <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto animate-slide-up shadow-lg">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {news.map((item) => (
              <Card key={item.id} className="animate-fade-in hover-scale overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
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

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CAR SHARING</h3>
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
              <h4 className="font-semibold mb-4">Навигация</h4>
              <nav className="space-y-2">
                <Link to="/branches" className="block opacity-90 hover:opacity-100 transition-opacity">
                  Филиалы
                </Link>
                <Link to="/cars" className="block opacity-90 hover:opacity-100 transition-opacity">
                  Автомобили
                </Link>
                <Link to="/login" className="block opacity-90 hover:opacity-100 transition-opacity">
                  Личный кабинет
                </Link>
                <Link to="/register" className="block opacity-90 hover:opacity-100 transition-opacity">
                  Регистрация
                </Link>
              </nav>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center opacity-90">
            <p>&copy; 2024 Car Sharing. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;