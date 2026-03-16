import Link from 'next/link';
import { SignupForm } from '@/components/auth/signup-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Logo } from '@/components/icons';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block">
            <Logo className="mx-auto h-10 w-10 text-primary" />
          </Link>
          <CardTitle className="font-headline text-2xl">
            Create Your Profile
          </CardTitle>
          <CardDescription>
            Join AcademiaVault and start building your digital portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
