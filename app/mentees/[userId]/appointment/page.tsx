import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/mentee.actions'
import Image from 'next/image'

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
          <Image
            src='/assets/icons/logo-full.png'
            width={1000}
            height={1000}
            alt='mentor'
            className='mb-12 h-10 w-fit'
          />

          <RegisterForm user={user} />

          <p className='copyright mt-10 py-12'>
            © 2024 MentorMe
          </p>
        </div>
      </section>

      <Image
        src='/assets/images/register-img.png'
        width={1000}
        height={1000}
        alt='mentor'
        className='side-img max-w-[390px]'
      />
    </div>
  )
}

export default Appointment