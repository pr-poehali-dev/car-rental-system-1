import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Order {
  orderId: string;
  brand: string;
  model: string;
  image: string;
  startDate: string;
  endDate: string;
  days: number;
  branch: string;
  totalPrice: number;
}

interface BookingHistory {
  bookingCode: string;
  pricePerDay: number;
  orders: Order[];
}

const History = () => {
  const bookings: BookingHistory[] = [
    {
      bookingCode: 'BK001',
      pricePerDay: 5000,
      orders: [
        {
          orderId: 'ORD001',
          brand: 'Mercedes-Benz',
          model: 'C-Class',
          image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
          startDate: '2024-09-01',
          endDate: '2024-09-05',
          days: 4,
          branch: 'Филиал Центральный',
          totalPrice: 19000,
        },
        {
          orderId: 'ORD002',
          brand: 'BMW',
          model: '3 Series',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          startDate: '2024-08-15',
          endDate: '2024-08-20',
          days: 5,
          branch: 'Филиал Северный',
          totalPrice: 23750,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">История бронирований</h1>
          <Button variant="outline" asChild>
            <Link to="/account">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Link>
          </Button>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {bookings.map((booking) => (
            <Card key={booking.bookingCode} className="animate-fade-in">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="FileText" size={24} />
                    Бронирование {booking.bookingCode}
                  </CardTitle>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {booking.pricePerDay.toLocaleString()} ₽/день
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {booking.orders.map((order) => (
                    <Card key={order.orderId} className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        <div className="md:col-span-1">
                          <img
                            src={order.image}
                            alt={`${order.brand} ${order.model}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold">
                                {order.brand} {order.model}
                              </h3>
                              <Badge variant="secondary" className="mt-1">
                                Заказ #{order.orderId}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Icon name="Calendar" size={14} />
                                Начало аренды
                              </p>
                              <p className="font-medium">{order.startDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Icon name="Calendar" size={14} />
                                Окончание
                              </p>
                              <p className="font-medium">{order.endDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Icon name="Clock" size={14} />
                                Дней
                              </p>
                              <p className="font-medium">{order.days}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Icon name="MapPin" size={14} />
                                Филиал
                              </p>
                              <p className="font-medium">{order.branch}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div>
                              <p className="text-sm text-muted-foreground">Итоговая стоимость</p>
                              <p className="text-2xl font-bold text-primary">
                                {order.totalPrice.toLocaleString()} ₽
                              </p>
                            </div>
                            <Button>
                              <Icon name="RotateCcw" size={18} className="mr-2" />
                              Повторить бронирование
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;