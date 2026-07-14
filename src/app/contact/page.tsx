import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us - SkillForge",
  description:
    "Get in touch with SkillForge. Submit a support ticket, ask about our courses, or find our office location.",
};

export default function ContactPage() {
  return <ContactClient />;
}
