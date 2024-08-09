import MentorForm from "@/components/forms/MentorForm";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className='flex h-screen max-h-screen'>
      {/* TODO: OTP Verification | PassKeyModal*/}

      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[496px]'>
          <Image
            src='/assets/icons/logo-full.png'
            width={1000}
            height={1000}
            alt='mentor'
            className='mb-12 h-10 w-fit'
          />

          <MentorForm />

          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-end text-dark-600 xl:text-left'>
              © 2024 MentorMe
            </p>


            <Link href='/?admin=true' className='text-green-500'>Admin</Link>
          </div>

            <p className='text-center text-dark-600 mt-5 text-xs'>
              Developed by Encarta Networks & Multimedia - +233 24 211 9972, anyarsencarta@gmail.com
            </p>
        </div>
      </section>

      <Image
        src='/assets/images/onboarding-img-1.png'
        width={1000}
        height={1000}
        alt='mentor'
        className='side-img max-w-[50%]'
      />
    </div>
  )
}

export default Home;
