import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    carId: 'CAR123',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    plateNumber: 'А001АА777',
    startDate: '',
    endDate: '',
    pricePerDay: 5000,
    branch: 'Центральный',
  });

  const [clientData, setClientData] = useState({
    lastName: 'Иванов',
    firstName: 'Иван',
    middleName: 'Иванович',
    phone: '+7 (900) 123-45-67',
    passport: '1234 567890',
    card: '4444',
    birthDate: '1990-01-01',
  });

  const calculateDiscount = (days: number) => {
    const discountPeriods = Math.floor(days / 3);
    return Math.min(discountPeriods * 5, 25);
  };

  const calculateTotal = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0;
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;
    
    const subtotal = days * bookingData.pricePerDay;
    const discount = calculateDiscount(days);
    return subtotal * (1 - discount / 100);
  };

  const getDays = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0;
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Бронирование автомобиля</h1>
          <Button variant="outline" asChild>
            <Link to="/">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Link>
          </Button>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Car" size={24} />
                  Данные об автомобиле
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ID автомобиля</p>
                    <p className="font-medium">{bookingData.carId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Номер</p>
                    <p className="font-medium">{bookingData.plateNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Марка</p>
                    <p className="font-medium">{bookingData.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Модель</p>
                    <p className="font-medium">{bookingData.model}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Дата бронирования</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={bookingData.startDate}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Дата возврата</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={bookingData.endDate}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Стоимость за день</p>
                    <p className="text-xl font-bold text-primary">
                      {bookingData.pricePerDay.toLocaleString()} ₽
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Филиал</p>
                    <Select defaultValue={bookingData.branch}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Центральный">Центральный</SelectItem>
                        <SelectItem value="Северный">Северный</SelectItem>
                        <SelectItem value="Южный">Южный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={24} />
                  Данные о клиенте
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Фамилия</p>
                    <p className="font-medium">{clientData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Имя</p>
                    <p className="font-medium">{clientData.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Отчество</p>
                    <p className="font-medium">{clientData.middleName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-medium">{clientData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Паспорт</p>
                    <p className="font-medium">{clientData.passport}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Дата рождения</p>
                    <p className="font-medium">{clientData.birthDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Карта</p>
                    <p className="font-medium">**** {clientData.card}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="animate-fade-in sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" size={24} />
                  Итого
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {getDays() > 0 && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Количество дней</span>
                        <span className="font-medium">{getDays()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Цена за день</span>
                        <span className="font-medium">{bookingData.pricePerDay} ₽</span>
                      </div>
                      {calculateDiscount(getDays()) > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Скидка</span>
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            {calculateDiscount(getDays())}%
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Итоговая стоимость</span>
                        <span className="text-2xl font-bold text-primary">
                          {calculateTotal().toLocaleString()} ₽
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2 pt-4">
                  <Button className="w-full" size="lg">
                    <Icon name="Check" size={18} className="mr-2" />
                    Оформить бронирование
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/cars">
                      <Icon name="Car" size={18} className="mr-2" />
                      Изменить автомобиль
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/cards">
                      <Icon name="CreditCard" size={18} className="mr-2" />
                      Выбрать карту
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
