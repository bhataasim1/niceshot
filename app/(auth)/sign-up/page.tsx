import AuthCard from '@/components/auth/auth-card';

export default async function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <AuthCard
        title="Sign up"
        description="Sign up to your account using your preferred provider"
        mode="sign-up"
      />
    </div>
  );
}
