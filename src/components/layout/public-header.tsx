import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';

export function PublicHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link
        href="/"
        className="flex items-center justify-center gap-2"
        prefetch={false}
      >
        <Logo className="h-6 w-6 text-primary" />
        <span className="font-headline text-lg font-semibold">
          AcademiaVault
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button asChild variant="ghost">
          <Link href="/login" prefetch={false}>
            Login
          </Link>
        </Button>
        <Button asChild>
          <Link href="/signup" prefetch={false}>
            Sign Up
          </Link>
        </Button>
      </nav>
    </header>
  );
}
