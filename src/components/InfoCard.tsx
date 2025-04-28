
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  content: string | React.ReactNode;
}

const InfoCard = ({ icon: Icon, title, content }: InfoCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-electroestelar-orange/10 p-3">
            <Icon className="h-6 w-6 text-electroestelar-orange" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <div className="text-gray-600">{content}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
