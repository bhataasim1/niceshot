// 'use client';

// import { ReactNode } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Crown, Lock } from 'lucide-react';
// import Link from 'next/link';

// interface SubscriptionGuardProps {
//   children: ReactNode;
//   fallback?: ReactNode;
//   showUpgradePrompt?: boolean;
// }

// export const SubscriptionGuard = ({
//   children,
//   fallback,
//   showUpgradePrompt = true
// }: SubscriptionGuardProps) => {
//   const { isPro, isLoading } = useSubscription();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center p-8">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (isPro) {
//     return <>{children}</>;
//   }

//   if (fallback) {
//     return <>{fallback}</>;
//   }

//   if (!showUpgradePrompt) {
//     return null;
//   }

//   return (
//     <Card className="max-w-md mx-auto">
//       <CardHeader className="text-center">
//         <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//           <Lock className="h-8 w-8 text-primary" />
//         </div>
//         <CardTitle className="flex items-center justify-center gap-2">
//           <Crown className="h-5 w-5" />
//           Pro Feature
//         </CardTitle>
//         <CardDescription>
//           This feature is only available for Pro subscribers
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <p className="text-sm text-muted-foreground text-center">
//           Upgrade to Pro to unlock this feature and many more advanced capabilities.
//         </p>

//         <div className="flex gap-2">
//           <Button asChild className="flex-1">
//             <Link href="/pricing">
//               Upgrade to Pro
//             </Link>
//           </Button>
//           <Button variant="outline" asChild>
//             <Link href="/account">
//               View Account
//             </Link>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
