import AuthCard from '@/components/auth/auth-card';

export default async function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <AuthCard
        title="Sign in"
        description="Sign in to your account using your preferred provider"
        mode="sign-in"
      />
    </div>
  );
}
