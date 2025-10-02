import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface UserData {
  lastName: string;
  firstName: string;
  middleName: string;
  passportSeries: string;
  passportNumber: string;
  phone: string;
  birthDate: string;
}

interface Booking {
  id: string;
  carId: string;
  brand: string;
  bookingDate: string;
  branch: string;
}

const Account = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bookings] = useState<Booking[]>([
    {
      id: 'BK001',
      carId: 'CAR123',
      brand: 'Mercedes-Benz C-Class',
      bookingDate: '2024-10-15',
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

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    navigate('/');
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Личный кабинет</h1>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Icon name="Home" size={18} className="mr-2" />
            На главную
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={24} />
                  Личные данные
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ФИО</p>
                    <p className="font-medium">
                      {userData.lastName} {userData.firstName} {userData.middleName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Паспортные данные</p>
                    <p className="font-medium">
                      {userData.passportSeries} {userData.passportNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Дата рождения</p>
                    <p className="font-medium">{userData.birthDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={24} />
                  Мои бронирования
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{booking.id}</Badge>
                          <span className="font-medium">{booking.brand}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ID авто: {booking.carId}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Дата: {booking.bookingDate}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.branch}
                        </p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CreditCard" size={24} />
                  Действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link to="/cards">
                    <Icon name="CreditCard" size={18} className="mr-2" />
                    Банковские карты
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/history">
                    <Icon name="History" size={18} className="mr-2" />
                    История бронирований
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/booking">
                    <Icon name="Calendar" size={18} className="mr-2" />
                    Новое бронирование
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full"
                >
                  <Icon name="LogOut" size={18} className="mr-2" />
                  Выйти
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
