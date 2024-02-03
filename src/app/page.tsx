import Image from "next/image";
import {ReactNode} from "react";


export default function Home() {
  return (
    <main className="font-mono md:px-40">
        <div className="fixed inset-0 -z-10">
            <Image src="/PXL_20230627_111947484.jpg" alt="hintergrund" fill className="opacity-20"/>
        </div>
        <Header />
        <div className="grid grid-cols-1 justify-around md:grid-cols-2">
            <Text {...datum} />
            <Text {...location} />
        </div>
        <div className="grid grid-cols-1 justify-around md:grid-cols-2">
            <Text {...anreise} />
            <Text {...karte} />
        </div>
    </main>
  );
}

function Header() {
    return(
        <div className="p-12 md:p-24 mx-auto flex">
            <h1 className="text-4xl text-center mx-auto">
                Willkommen auf unserer webseite mit infos zu unserer Hochzeit
            </h1>
        </div>
    )
}

interface TextProps {
    uberschrift: string
    text?: string
    stichpunkte?: string[]
    iframeUrl?: ReactNode
}

function Text({uberschrift, text, stichpunkte, iframeUrl}: TextProps) {
    return (
        <div className="p-24">
            <h1 className="text-4xl">{uberschrift}</h1>
            {text && <p>{text}</p>}
            {stichpunkte &&
            <ul className="list-disc list-inside">
                {stichpunkte.map(punkt => (
                    <li key={punkt}>
                        {punkt}
                    </li>
                ))}
            </ul>}
            {iframeUrl}
        </div>
    )
}

const datum: TextProps = {
    uberschrift: "Datum",
    text: "5-7 Juli"
}

const location: TextProps = {
    uberschrift: "Location",
    text: "Musch halt gucken"
}

const anreise: TextProps = {
    uberschrift: "Anreise",
    stichpunkte: [
        "mitm zug",
        "mitm boot",
        "mitm flugzeug",
        "teleportieren"
    ]
}

const karte: TextProps = {
    uberschrift: "Karte",
    iframeUrl: <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2048.762138872572!2d18.243986877178823!3d59.1029146291235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f62aec1411f81%3A0x623b92de45af235a!2sEkuddens%20hostel!5e0!3m2!1sen!2sse!4v1706984725765!5m2!1sen!2sse" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
}