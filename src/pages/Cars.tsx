import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Car {
  id: string;
  brand: string;
  model: string;
  color: string;
  engineType: string;
  transmission: string;
  price: number;
  image: string;
  carClass: string;
}

const Cars = () => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const cars: Car[] = [
    {
      id: 'CAR1',
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      color: 'Черный',
      engineType: 'Бензиновый',
      transmission: 'АКП',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
      carClass: 'премиум',
    },
    {
      id: 'CAR2',
      brand: 'BMW',
      model: '3 Series',
      color: 'Синий',
      engineType: 'Дизельный',
      transmission: 'АКП',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      carClass: 'премиум',
    },
    {
      id: 'CAR3',
      brand: 'Toyota',
      model: 'Camry',
      color: 'Белый',
      engineType: 'Бензиновый',
      transmission: 'АКП',
      price: 3800,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      carClass: 'эконом',
    },
    {
      id: 'CAR4',
      brand: 'Hyundai',
      model: 'Solaris',
      color: 'Красный',
      engineType: 'Бензиновый',
      transmission: 'МКП',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=400',
      carClass: 'эконом',
    },
    {
      id: 'CAR5',
      brand: 'Volkswagen',
      model: 'Passat',
      color: 'Серый',
      engineType: 'Дизельный',
      transmission: 'АКП',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1622115458be-5c3ffa7c9ce1?w=400',
      carClass: 'эконом',
    },
    {
      id: 'CAR6',
      brand: 'Audi',
      model: 'A4',
      color: 'Черный',
      engineType: 'Бензиновый',
      transmission: 'АКП',
      price: 4800,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
      carClass: 'премиум',
    },
  ];

  const filteredCars = cars.filter((car) => {
    const classMatch = selectedClass === 'all' || car.carClass === selectedClass;
    const brandMatch = selectedBrand === 'all' || car.brand === selectedBrand;
    return classMatch && brandMatch;
  });

  const brands = Array.from(new Set(cars.map((car) => car.brand)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Выбор автомобиля</h1>
          <Button variant="outline" asChild>
            <Link to="/">
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Link>
          </Button>
        </div>

        <Card className="mb-6 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Filter" size={24} />
              Фильтры
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Класс автомобиля</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все классы</SelectItem>
                    <SelectItem value="эконом">Эконом</SelectItem>
                    <SelectItem value="премиум">Премиум</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Марка</label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все марки</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedClass('all');
                    setSelectedBrand('all');
                  }}
                >
                  <Icon name="X" size={18} className="mr-2" />
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="animate-fade-in hover-scale overflow-hidden">
              <div className="relative h-48">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                  {car.carClass}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {car.brand} {car.model}
                  </span>
                  <Icon name="Car" size={20} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Palette" size={14} />
                    <span>{car.color}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Fuel" size={14} />
                    <span>{car.engineType}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground col-span-2">
                    <Icon name="Settings" size={14} />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Цена за день</p>
                    <p className="text-xl font-bold text-primary">
                      {car.price.toLocaleString()} ₽
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button asChild>
                    <Link to="/booking">
                      <Icon name="Check" size={16} className="mr-2" />
                      Выбрать
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/">Отмена</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Автомобили не найдены. Попробуйте изменить фильтры.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;