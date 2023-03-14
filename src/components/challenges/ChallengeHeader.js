import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import { useAuthContext } from "../../hooks/useAuthContext"
import SignedOutLinks from "../layouts/SignedOutLinks"
import Badge from "../reusable/Badge"
import Button from "../reusable/Button"
import DownloadButton from "../reusable/DownloadButton"
import Modal from "../reusable/Modal"
import StartCodingButton from "../reusable/StartCodingButton"
import Icons from "../SvgIcons/Icons"

const ChallengeHeader = ({ doc, button }) => {
  const { user } = useAuthContext()
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const displayName = user
    ? !user?.displayName
      ? user?.reloadUserInfo.screenName
      : user?.displayName.split(" ")[0]
    : "Coder"

  return (
    <>
      <div className="mt-6 md:mt-0 mb-8">
        <h2 className="text-3xl font-extrabold text-white">
          Hello {displayName}
          <span
            className="animate-wave inline-block origin-[70%_70%]"
            role="img"
            aria-label="Hello"
          >
            👋
          </span>
          ,
        </h2>
        <p className="text-lg font-normal text-white">
          Today is a great day to start this challenge
          <span role="img" aria-label="welcome">
            😊
          </span>
        </p>
        <header className="mt-4 flex items-center xs:justify-center sm:justify-between bg-indigo-600 rounded-lg shadow-md xs:px-5 md:px-8 py-6 h-auto xs:flex-wrap-reverse sm:flex-nowrap">
          <div className="xs:w-full sm:w-1/2">
            <h2 className="leading-snug xs:text-3xl md:text-4xl lg:text-5xl text-white font-bold pb-2">
              {doc.title}
            </h2>
            <div className="py-2">
              {doc?.tags?.map((tag) => (
                <Badge key={tag} name={tag} badgeColor="text-gray-300 bg-gray-900" />
              ))}
            </div>
            <p className="text-base mb-4 xs:w-full sm:w-4/5 lg:w-4/5 text-gray-200">
              {doc.description}
            </p>
            {button ? (
              <Button
                variant="dark"
                size="large"
                className="font-medium"
                onClick={() => push("/solutions")}
              >
                Explore Solutions
                <Icons.ArrowRight className="ml-2" />
              </Button>
            ) : (
              <Button
                variant="dark"
                size="large"
                className="font-medium"
                onClick={() => setIsOpen(true)}
              >
                Start Challenge
                <Icons.Rocket size={18} className="ml-2 -mr-1 animate-move" />
              </Button>
            )}
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT}/${doc.images.cover}`}
              width={400}
              height={300}
              className="rounded-xl xs:mb-4 sm:mb-0"
              alt={`${doc.title} Frontend Challenge`}
            />
          </div>
        </header>
      </div>
      {!user && isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          body={
            <>
              <span role="img" aria-label="rocket" className="text-3xl">
                🚀
              </span>
              <h2 className="mt-4 mb-2 font-medium text-base text-white">
                Join FrontendPro to start this challenge!
              </h2>
              <p className="mb-4 text-xs text-gray-300">
                Sign up to access all of the challenges and
                <br />
                join our community of coders!
              </p>
            </>
          }
          footer={<SignedOutLinks variant="primary" size="medium" />}
        />
      )}
      {user && isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          body={
            <>
              <span role="img" aria-label="rocket" className="text-3xl">
                🚀
              </span>
              <h2 className="mt-4 mb-2 font-medium text-base text-white">
                How would you like to start this challenge?
              </h2>
              <p className="mb-4 text-xs text-gray-300">
                Start coding this challenge online with our code editor or
                <br />
                download the starter code to work on it locally.
              </p>
            </>
          }
          footer={
            <>
              <StartCodingButton document={doc} setIsOpen={setIsOpen} />
              <DownloadButton document={doc} setIsOpen={setIsOpen} />
            </>
          }
        />
      )}
    </>
  )
}

export default ChallengeHeader
