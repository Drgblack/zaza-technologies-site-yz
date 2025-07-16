import Header from "../../components/header"
import PrivacyPolicyNew from "../../privacy-policy-new"
import Footer from "../../components/footer"

export default function Page() {
  return (
    <>
      <Header />
      <PrivacyPolicyNew />
      <Footer currentPage="promptly" />
    </>
  )
}
