import { User } from '@/prisma/generated/prisma';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/lib/safe-parse-date';
import { Loader2, UserIcon } from 'lucide-react';

type UserCardProps = {
  user: User | null;
  isLoading: boolean;
};

export const UserCard = ({ user, isLoading }: UserCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="size-5" />
          Profile
        </CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.image || undefined} />
            <AvatarFallback>
              {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Member since</span>
            <span className="text-muted-foreground">
              {formatDate(user?.createdAt)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Email verified</span>
            <span
              className={
                user?.emailVerified ? 'text-green-600' : 'text-red-600'
              }
            >
              {user?.emailVerified ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
