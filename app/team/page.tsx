"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { Github, Linkedin, Twitter } from "lucide-react"

// Dummy Data
const teamMembers = [
  {
    id: 1,
    name: "Sarath",
    role: "President",
    image: "/tech-lead-portrait.png",
    bio: "AI Researcher with a passion for computer vision.",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    id: 2,
    name: "Varun",
    role: "Vice President",
    image: "/female-engineer-portrait.png",
    bio: "Robotics expert specialized in ROS and control systems.",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    id: 3,
    name: "Jason",
    role: "Secretary",
    image: "/male-student-portrait.png",
    bio: "Bridging the gap between tech and community engagement.",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
   {
    id: 4,
    name: "Amal Francis",
    role: "Technical Lead",
    image: "/team/team1.jpg",
    bio: "Data Scientist and Full Stack Developer",
    socials: { github: "https://github.com/AmalFrancisOlakengil", linkedin: "https://www.linkedin.com/in/amalfrancisolakengil/", twitter: "#" },
  },
   {
    id: 5,
    name: "Aasish Lebaka",
    role: "Design Lead",
    image: "/team/team2.jpg",
    bio: "Tech enthusiast and engineering student exploring cybersecurity, Web development, and emerging technologies.",
    socials: { github: "https://github.com/AASISH-06", linkedin: "https://www.linkedin.com/in/aasish-lebaka", twitter: "#" },
  },
   {
    id: 6,
    name: "Sarah Alana Robson ",
    role: "Design Lead",
    image: "/team/team3.jpg",
    bio: "Cybersecurity enthusiast decoding the aesthetics of tomorrow's machines",
    socials: { github: "https://github.com/sssxrxhhh07", linkedin: "https://www.linkedin.com/in/sarah-alana-robson-34005a335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", twitter: "https://x.com/sssxrxhhh07" },
  },
   {
    id: 7,
    name: "Nivetha Sri K",
    role: "Marketing & PR Lead",
    image: "/team/team4.jpg",
    bio: "I work on promotions, outreach, and managing communication to make our events and initiatives reach more people.",
    socials: { github: "https://github.com/nivetha2122", linkedin: "https://www.linkedin.com/in/nivetha-sri-k-379215296", twitter: "#" },
  },
  {
    id: 8,
    name: "Kowsalya G P",
    role: "Content lead",
    image: "/team/team5.jpg",
    bio: "Designing and experimenting with machine learning models to solve real-world problems.",
    socials: { github: "https://github.com/kowshalyagp", linkedin: "https://www.linkedin.com/in/kowsalya-g-p-1315832a2?utm_source=share_via&utm_content=profile&utm_medium=member_android", twitter: "#" },
  },
  {
    id: 9,
    name: "Sahasranshu Rout",
    role: "Technical Team Member",
    image: "/team/team6.jpg",
    bio: "I am passionate about learning new concepts, improving practical skills, and applying theoretical knowledge to real-world applications.",
    socials: { github: "https://github.com/Sahas18/Sahas18", linkedin: "https://www.linkedin.com/in/sahasranshu-rout-114aa4327/", twitter: "#" },
  },
  {
    id: 10,
    name: "Shaik Abdul Zaheer",
    role: "Senior Event Organizer",
    image: "/team/team7.jpg",
    bio: "Senior Event Organizer with proven experience in planning, managing, and executing impactful events. Skilled in coordination, leadership, and delivering seamless experiences from concept to completion.",
    socials: { github: "https://github.com/Zaheershaik4023", linkedin: "https://www.linkedin.com/in/zaheer-shaik-a613ab325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", twitter: "https://x.com/ZaheerShaik23" },
  },
  {
    id: 11,
    name: "A N Danio Stracy",
    role: "Project developer",
    image: "/team/team8.jpg",
    bio: "Project Developer who enjoys building cool projects, solving real problems, and learning something new with every line of code.",
    socials: { github: "https://github.com/Stracy-Alfred", linkedin: "https://www.linkedin.com/in/a-n-danio-stracy-099b24315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", twitter: "#" },
  },
  {
    id: 12,
    name: "Arjun Palekar",
    role: "Tech Team Member",
    image: "/team/team9.jpeg",
    bio: "Data Analyst | Web Developer",
    socials: { github: "https://github.com/ARJUN-PALEKAR", linkedin: "https://www.linkedin.com/in/arjunpalekar/", twitter: "https://x.com/PalekarArjun" },
  },
  {
    id: 13,
    name: "Sidharadha",
    role: "Technical",
    image: "/team/team10.png",
    bio: "Interested in how technology can solve real-world problems.",
    socials: { github: "https://github.com/sidv1406", linkedin: "https://www.linkedin.com/in/sidv1406", twitter: "#" },
  },
  {
    id: 14,
    name: "S.Sudarshan",
    role: "Technical Associate",
    image: "/team/team11.jpeg",
    bio: "I help build and support the club’s tech projects by brainstorming ideas and creating simple prototypes. I enjoy learning new tools, working with others, and turning small ideas into useful solutions.",
    socials: { github: "https://github.com/Sudarshan1307-official", linkedin: "www.linkedin.com/in/sudarshan-seshadri-a68788239", twitter: "#" },
  },
  {
    id: 15,
    name: "Paavesh Pradish",
    role: "Content domain member",
    image: "/team/team12.png",
    bio: "Learn.Build.Inovate",
    socials: { github: "https://github.com/paaveshpradish05-beep", linkedin: "https://www.linkedin.com/in/paavesh-pradish-001762342?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", twitter: "#" },
  },
  {
    id: 16,
    name: "C.R. Rohit",
    role: "Technical member",
    image: "/team/team13.jpg",
    bio: "Hi, I'm Rohit CR, a web developer who builds intuitive applications using React and modern web technologies, while steadily expanding his skill sets into machine learning and data-driven systems. I thrive on learning, collaborating, and turning ideas into impactful digital solutions.",
    socials: { github: "https://github.com/Rohitcr337", linkedin: "https://www.linkedin.com/in/c-r-rohit-4b05542bb", twitter: "#" },
  },
  {
    id: 17,
    name: "Harini S",
    role: "Event Organizer",
    image: "/team/team14.jpg",
    bio: "Cybersecurity student focused on network security and organizing technical events",
    socials: { github: "https://github.com/harinii0107", linkedin: "https://www.linkedin.com/in/harini-sankaranarayanan-a195ba344/", twitter: "#" },
  },
]

export default function TeamPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-card", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 italic">
          The <span className="text-primary uppercase">Elite</span> Team
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Meet the minds behind the machines. Our diverse team of developers, designers, and roboticists.
        </p>
      </div>

     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {teamMembers.map((member) => (
    <div
      key={member.id}
      // Changed: hover:border-primary/50 -> lg:hover:border-primary/50
      className="team-card group relative bg-zinc-900 border border-border rounded-3xl p-6 overflow-hidden lg:hover:border-primary/50 transition-all"
    >
      {/* Changed: group-hover:bg-primary/10 -> lg:group-hover:bg-primary/10 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10 lg:group-hover:bg-primary/10 transition-colors" />

      {/* Changed: grayscale group-hover:grayscale-0 -> lg:grayscale lg:group-hover:grayscale-0 */}
      {/* Note: Images will be full-color on mobile by default now, which is better for UX */}
      <div className="relative h-64 mb-6 rounded-2xl overflow-hidden lg:grayscale lg:group-hover:grayscale-0 transition-all duration-500">
        <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
      </div>

      <h3 className="text-2xl font-bold">{member.name}</h3>
      <p className="text-primary font-mono text-sm uppercase tracking-tighter mb-4">{member.role}</p>
      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{member.bio}</p>

      <div className="flex gap-4">
        {/* Changed: hover:text-white -> lg:hover:text-white */}
        <a href={member.socials.linkedin} className="text-muted-foreground lg:hover:text-white transition-colors">
          <Linkedin size={20} />
        </a>
        <a href={member.socials.github} className="text-muted-foreground lg:hover:text-white transition-colors">
          <Github size={20} />
        </a>
        <a href={member.socials.twitter} className="text-muted-foreground lg:hover:text-white transition-colors">
          <Twitter size={20} />
        </a>
      </div>
    </div>
  ))}
</div>
    </div>
  )
}
