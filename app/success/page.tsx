'use client';

import { Confetti, ConfettiRef } from '@/components/confetti';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrentUserWithSubscription } from '@/hooks/tanstack-query/user.hooks';
import { CheckCircle, Loader2Icon, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const SuccessIcon = () => (
  <motion.div
    className="relative"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
  >
    <CheckCircle className="w-24 h-24 text-green-500" />
    <motion.div
      className="absolute -top-2 -right-2"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    >
      <Sparkles className="w-6 h-6 text-yellow-400" />
    </motion.div>
  </motion.div>
);

export default function SuccessPage() {
  const { data: userWithSubscription, isLoading } =
    useCurrentUserWithSubscription();
  // const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const confettiRef = useRef<ConfettiRef>(null);

  /**
   * we need to verify the checkout id with the subscription id
   */
  // const checkout_id = searchParams.get('checkout_id');

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/editor');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownTimer);
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2Icon className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
      </AnimatePresence>
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardContent className="p-8 text-center">
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <SuccessIcon />
            </motion.div>

            <motion.h1
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Payment Successful!
            </motion.h1>

            <motion.p
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Welcome to NiceShot Premium, {userWithSubscription?.user?.name}!
              🎉
            </motion.p>

            <motion.div
              className="rounded-lg p-4 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-green-700">
                Your subscription is now active. You have access to all premium
                features!
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.p
                className="text-sm text-muted-foreground"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Redirecting to editor in {countdown} seconds...
              </motion.p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
