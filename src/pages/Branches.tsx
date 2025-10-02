import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Car {
  id: string;
  brand: string;
  model: string;
  price: number;
  image: string;
}

interface Branch {
  id: string;
  name: string;
  address: string;
  coords: { x: number; y: number };
  cars: Car[];
}

const Branches = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const branches: Branch[] = [
    {
      id: '1',
      name: 'Центральный',
      address: 'ул. Ленина, 1',
      coords: { x: 50, y: 50 },
      cars: [
        {
          id: 'CAR1',
          brand: 'Mercedes-Benz',
          model: 'C-Class',
          price: 5000,
          image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=300',
        },
        {
          id: 'CAR2',
          brand: 'BMW',
          model: '3 Series',
          price: 4500,
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300',
        },
        {
          id: 'CAR3',
          brand: 'Audi',
          model: 'A4',
          price: 4800,
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300',
        },
      ],
    },
    {
      id: '2',
      name: 'Северный',
      address: 'пр. Победы, 25',
      coords: { x: 30, y: 20 },
      cars: [
        {
          id: 'CAR4',
          brand: 'Volkswagen',
          model: 'Passat',
          price: 3500,
          image: 'https://images.unsplash.com/photo-1622115458be-5c3ffa7c9ce1?w=300',
        },
        {
          id: 'CAR5',
          brand: 'Toyota',
          model: 'Camry',
          price: 3800,
          image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300',
        },
        {
          id: 'CAR6',
          brand: 'Honda',
          model: 'Accord',
          price: 3600,
          image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=300',
        },
      ],
    },
    {
      id: '3',
      name: 'Южный',
      address: 'ул. Мира, 50',
      coords: { x: 70, y: 75 },
      cars: [
        {
          id: 'CAR7',
          brand: 'Hyundai',
          model: 'Sonata',
          price: 3200,
          image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=300',
        },
        {
          id: 'CAR8',
          brand: 'Kia',
          model: 'K5',
          price: 3300,
          image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=300',
        },
        {
          id: 'CAR9',
          brand: 'Mazda',
          model: '6',
          price: 3700,
          image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300',
        },
      ],
    },
    {
      id: '4',
      name: 'Восточный',
      address: 'ул. Гагарина, 15',
      coords: { x: 85, y: 40 },
      cars: [
        {
          id: 'CAR10',
          brand: 'Nissan',
          model: 'Teana',
          price: 3400,
          image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300',
        },
        {
          id: 'CAR11',
          brand: 'Ford',
          model: 'Mondeo',
          price: 3500,
          image: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=300',
        },
        {
          id: 'CAR12',
          brand: 'Skoda',
          model: 'Octavia',
          price: 3100,
          image: 'https://images.unsplash.com/photo-1610668711050-d68a2a8cfb8f?w=300',
        },
      ],
    },
    {
      id: '5',
      name: 'Западный',
      address: 'бул. Строителей, 8',
      coords: { x: 15, y: 60 },
      cars: [
        {
          id: 'CAR13',
          brand: 'Peugeot',
          model: '508',
          price: 3600,
          image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=300',
        },
        {
          id: 'CAR14',
          brand: 'Renault',
          model: 'Talisman',
          price: 3400,
          image: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=300',
        },
        {
          id: 'CAR15',
          brand: 'Opel',
          model: 'Insignia',
          price: 3200,
          image: 'https://images.unsplash.com/photo-1607603750916-e4d8b3e16bcf?w=300',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Наши филиалы</h1>
          <Button variant="outline" asChild>
            <Link to="/">
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Map" size={24} />
                Карта филиалов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                  {branches.map((branch) => (
                    <button
                      key={branch.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                      style={{ left: `${branch.coords.x}%`, top: `${branch.coords.y}%` }}
                      onClick={() => setSelectedBranch(branch)}
                    >
                      <div className="relative">
                        <Icon
                          name="MapPin"
                          size={40}
                          className={`${
                            selectedBranch?.id === branch.id
                              ? 'text-primary'
                              : 'text-red-500'
                          } drop-shadow-lg`}
                        />
                        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs font-medium bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap">
                          {branch.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Building" size={24} />
                {selectedBranch ? selectedBranch.name : 'Выберите филиал'}
              </CardTitle>
              {selectedBranch && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  {selectedBranch.address}
                </p>
              )}
            </CardHeader>
            <CardContent>
              {selectedBranch ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Car" size={18} />
                      Доступные автомобили
                    </h3>
                    <div className="space-y-3">
                      {selectedBranch.cars.map((car) => (
                        <div
                          key={car.id}
                          className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <img
                            src={car.image}
                            alt={`${car.brand} ${car.model}`}
                            className="w-20 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium">
                              {car.brand} {car.model}
                            </p>
                            <Badge variant="secondary">{car.price} ₽/день</Badge>
                          </div>
                          <Button size="sm" asChild>
                            <Link to="/booking">Забронировать</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="MousePointer" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Нажмите на маркер филиала на карте</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Branches;