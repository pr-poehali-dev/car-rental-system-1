import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  lastName: string;
  firstName: string;
  middleName: string;
  passportSeries: string;
  passportNumber: string;
  phone: string;
  birthDate: string;
}

interface CarBooking {
  id: string;
  carId: string;
  brand: string;
  model: string;
  plateNumber: string;
  startDate: string;
  endDate: string;
  pricePerDay: number;
  branch: string;
}

const Booking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedCard, setSelectedCard] = useState('');
  const [bookings, setBookings] = useState<CarBooking[]>([
    {
      id: '1',
      carId: 'CAR001',
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      plateNumber: 'А123АА777',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      pricePerDay: 5000,
      branch: 'Филиал Центральный',
    },
  ]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, [navigate]);

  const calculateDays = (start: string, end: string) => {
    const diffTime = Math.abs(new Date(end).getTime() - new Date(start).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateDiscount = (days: number) => {
    const discountTiers = Math.floor(days / 3);
    const discount = Math.min(discountTiers * 5, 25);
    return discount;
  };

  const calculateTotal = () => {
    let total = 0;
    bookings.forEach((booking) => {
      const days = calculateDays(booking.startDate, booking.endDate);
      const discount = calculateDiscount(days);
      const subtotal = booking.pricePerDay * days;
      const discountAmount = (subtotal * discount) / 100;
      total += subtotal - discountAmount;
    });
    return total;
  };

  const handleBookingChange = (id: string, field: string, value: string | number) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, [field]: value } : booking
      )
    );
  };

  const addCar = () => {
    navigate('/cars');
  };

  const removeCar = (id: string) => {
    if (bookings.length === 1) {
      toast({
        title: 'Ошибка',
        description: 'Должна быть хотя бы одна машина в бронировании',
        variant: 'destructive',
      });
      return;
    }
    setBookings(bookings.filter((b) => b.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) {
      toast({
        title: 'Ошибка',
        description: 'Выберите банковскую карту',
        variant: 'destructive',
      });
      return;
    }
    
    const bookingData = {
      bookings,
      total: calculateTotal(),
      card: selectedCard,
      date: new Date().toISOString(),
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
    localStorage.setItem('bookingHistory', JSON.stringify([...existingBookings, bookingData]));
    
    toast({
      title: 'Успешно!',
      description: 'Бронирование оформлено',
    });
    navigate('/history');
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Оформление бронирования</h1>
          <Button variant="outline" asChild>
            <Link to="/account">
              <Icon name="User" size={18} className="mr-2" />
              Личный кабинет
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Car" size={24} />
                      Данные об автомобилях
                    </CardTitle>
                    <Button type="button" onClick={addCar} size="sm">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить авто
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {bookings.map((booking, index) => {
                    const days = calculateDays(booking.startDate, booking.endDate);
                    const discount = calculateDiscount(days);
                    const subtotal = booking.pricePerDay * days;
                    const discountAmount = (subtotal * discount) / 100;
                    const total = subtotal - discountAmount;

                    return (
                      <div key={booking.id}>
                        {index > 0 && <Separator className="my-6" />}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Автомобиль #{index + 1}</h3>
                            {bookings.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCar(booking.id)}
                              >
                                <Icon name="Trash2" size={16} className="mr-2" />
                                Удалить
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm text-muted-foreground">ID машины</Label>
                              <p className="font-medium">{booking.carId}</p>
                            </div>
                            <div>
                              <Label className="text-sm text-muted-foreground">Номер машины</Label>
                              <p className="font-medium">{booking.plateNumber}</p>
                            </div>
                            <div>
                              <Label className="text-sm text-muted-foreground">Марка</Label>
                              <p className="font-medium">{booking.brand}</p>
                            </div>
                            <div>
                              <Label className="text-sm text-muted-foreground">Модель</Label>
                              <p className="font-medium">{booking.model}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Дата начала аренды</Label>
                              <Input
                                type="date"
                                value={booking.startDate}
                                onChange={(e) =>
                                  handleBookingChange(booking.id, 'startDate', e.target.value)
                                }
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Дата возврата</Label>
                              <Input
                                type="date"
                                value={booking.endDate}
                                onChange={(e) =>
                                  handleBookingChange(booking.id, 'endDate', e.target.value)
                                }
                                min={booking.startDate}
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Филиал</Label>
                              <Select
                                value={booking.branch}
                                onValueChange={(value) =>
                                  handleBookingChange(booking.id, 'branch', value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Филиал Центральный">Филиал Центральный</SelectItem>
                                  <SelectItem value="Филиал Северный">Филиал Северный</SelectItem>
                                  <SelectItem value="Филиал Южный">Филиал Южный</SelectItem>
                                  <SelectItem value="Филиал Восточный">Филиал Восточный</SelectItem>
                                  <SelectItem value="Филиал Западный">Филиал Западный</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-sm text-muted-foreground">Стоимость за день</Label>
                              <p className="font-medium text-xl">{booking.pricePerDay.toLocaleString()} ₽</p>
                            </div>
                          </div>

                          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Количество дней:</span>
                              <span className="font-medium">{days}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Стоимость:</span>
                              <span>{subtotal.toLocaleString()} ₽</span>
                            </div>
                            {discount > 0 && (
                              <>
                                <div className="flex justify-between text-sm text-green-600">
                                  <span>Скидка ({discount}%):</span>
                                  <span>-{discountAmount.toLocaleString()} ₽</span>
                                </div>
                                <Separator />
                              </>
                            )}
                            <div className="flex justify-between font-semibold">
                              <span>Итого:</span>
                              <span>{total.toLocaleString()} ₽</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" size={24} />
                    Данные клиента
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">ФИО</Label>
                      <p className="font-medium">
                        {userData.lastName} {userData.firstName} {userData.middleName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Телефон</Label>
                      <p className="font-medium">{userData.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Паспортные данные</Label>
                      <p className="font-medium">
                        {userData.passportSeries} {userData.passportNumber}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Дата рождения</Label>
                      <p className="font-medium">{userData.birthDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" size={24} />
                    Оплата
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Банковская карта *</Label>
                    <Select value={selectedCard} onValueChange={setSelectedCard}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите карту" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1111">Visa •••• 1111</SelectItem>
                        <SelectItem value="2222">MasterCard •••• 2222</SelectItem>
                        <SelectItem value="3333">Мир •••• 3333</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-sm"
                      onClick={() => navigate('/cards')}
                    >
                      Управление картами
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Автомобилей:</span>
                      <span className="font-medium">{bookings.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Всего дней:</span>
                      <span className="font-medium">
                        {bookings.reduce(
                          (sum, b) => sum + calculateDays(b.startDate, b.endDate),
                          0
                        )}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Итого к оплате:</span>
                      <span>{calculateTotal().toLocaleString()} ₽</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-900">
                    <Icon name="Info" size={16} className="inline mr-2" />
                    Скидка 5% за каждые 3 дня (макс. 25%)
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Оформить бронирование
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
