import NewAppointment from '@/components/forms/NewAppointment'
import { getUser } from '@/lib/actions/mentee.actions'
import Image from 'next/image'

const Register = async ({ params: { userId } }: SearchParamProps) => {
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

          <NewAppointment user={user} />

          <p className='copyright py-12'>
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

export default Register