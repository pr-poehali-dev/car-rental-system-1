import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface BankCard {
  id: string;
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
}

const Cards = () => {
  const [cards, setCards] = useState<BankCard[]>([
    {
      id: '1',
      number: '1111222233334444',
      holder: 'IVAN PETROV',
      expiry: '12/25',
      cvv: '123',
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: '',
  });

  const getCardType = (number: string) => {
    const firstFour = number.substring(0, 4);
    if (firstFour === '1111') return 'Visa';
    if (firstFour === '2222') return 'MasterCard';
    if (firstFour === '3333') return 'Мир';
    return 'Unknown';
  };

  const isCardActive = (expiry: string) => {
    const [month, year] = expiry.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    return expiryDate > new Date();
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\s/g, '');
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(' ') : '';
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    setCards([
      ...cards,
      {
        id: Date.now().toString(),
        ...newCard,
      },
    ]);
    setNewCard({ number: '', holder: '', expiry: '', cvv: '' });
    setIsDialogOpen(false);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Банковские карты</h1>
          <Button variant="outline" asChild>
            <Link to="/account">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить карту
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавление банковской карты</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddCard} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Номер карты</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1111 2222 3333 4444"
                      maxLength={19}
                      value={formatCardNumber(newCard.number)}
                      onChange={(e) =>
                        setNewCard({ ...newCard, number: e.target.value.replace(/\s/g, '') })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="holder">Имя и фамилия держателя</Label>
                    <Input
                      id="holder"
                      placeholder="IVAN PETROV"
                      value={newCard.holder}
                      onChange={(e) =>
                        setNewCard({ ...newCard, holder: e.target.value.toUpperCase() })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Срок действия</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={newCard.expiry}
                        onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV/CVC</Label>
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="123"
                        maxLength={3}
                        value={newCard.cvv}
                        onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Добавить
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => (
              <Card key={card.id} className="animate-fade-in hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="CreditCard" size={24} />
                      <span className="text-lg">{getCardType(card.number)}</span>
                    </div>
                    <Badge variant={isCardActive(card.expiry) ? 'default' : 'destructive'}>
                      {isCardActive(card.expiry) ? 'Активна' : 'Истек срок'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-2xl font-mono tracking-wider">
                      **** **** **** {card.number.slice(-4)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Держатель</p>
                      <p className="font-medium">{card.holder}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Срок</p>
                      <p className="font-medium">{card.expiry}</p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить карту
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;