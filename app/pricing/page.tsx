import { PricingCard } from '@/components/subscription/pricing-card';

const plans = [
  {
    id: process.env.NEXT_PUBLIC_POLAR_PRODUCT_PRO_ID || '',
    name: 'Pro',
    price: 299,
    currency: 'USD',
    interval: 'Lifetime',
    description: '',
    features: [
      'All Niceshot pro features',
      'High Quality Images',
      '10+ Gradient Backgrounds',
      'Multiple Aspect Ratios',
      '+ more features coming soon',
    ],
    popular: true,
  },
];

export default async function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-20 font-mono">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
      </div>

      <div className="flex items-center justify-center">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto space-y-4 text-left">
          <div>
            <h3 className="font-medium">Is this a one-time payment?</h3>
            <p className="text-muted-foreground">
              Yes, Pro is a one-time payment that gives you lifetime access to
              all Pro features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
