import { Link } from 'lucide-react';
import Image from 'next/image';
import RegisterForm from '@/components/ui/forms/RegisterForm';
import { getUser } from '@/lib/action/patient.action';


const Register = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-item-end text-dark-600 xl:text-left">© 2024 CarePulse</p>
            <p className="justify-item-end text-dark-600 xl:text-left">Zexin Zou Clone Project</p>
            <Link href="/?admin=" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        priority
        className="side-img max-w-[42%]"
      />
    </div>
  );
};

export default Register;


