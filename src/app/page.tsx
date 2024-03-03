import Image from "next/image";
import {ReactNode} from "react";
import {client} from "../../contentful.config";
import {IAbschnitt, IAbschnittFields, ICardFields, IPage, IPageFields} from "@/generated/contentfulTypes";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {options} from "@/modules/richTextFormattingOptions";

export default async function Home() {
    const data = await getData()
    const fields: IPageFields = data.fields
    return (
        <main className="font-mono md:px-40">
            <div className="fixed inset-0 -z-10">
                <Image src="/PXL_20230627_111947484.jpg" alt="hintergrund" fill className="opacity-20"/>
            </div>
            <Header text={fields.title}/>
            {fields.abschnitte?.map(abschnitt => <Section key={abschnitt.sys.id} {...abschnitt.fields} />)}

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

function Header({text}: { text: string | undefined }) {
    return (
        <div className="p-12 md:p-24 mx-auto flex">
            <h1 className="text-4xl text-center mx-auto">
                {text}
            </h1>
        </div>
    )
}

function Section({titel, cards}: IAbschnittFields) {
    return (<div className="grid grid-cols-1 justify-around md:grid-cols-2">
        {cards?.map(card => <Card key={card.sys.id} {...card.fields} />)}
    </div>)
}

function Card({title, text}: ICardFields) {
    return (
        <div className="p-24">
            <h1 className="text-4xl mb-2">{title}</h1>
            <div className="space-y-4">
                {text && documentToReactComponents(text, options)}
            </div>
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
    text: "Freitag 5. Juli bis Sonntag 7. Juli, Wir können Freitag ab 14 Uhr auf das Gelände und muessen Sonntag um 11 Uhr wieder abreisen",
}

const location: TextProps = {
    uberschrift: "Location",
    text: "Ekuddens Vandrarhem \n Oxnövägen 6-8, 137 96 Haninge"
}

const anreise: TextProps = {
    uberschrift: "Anreise mit öffentlichen Verkehrsmitteln",
    text: "Die App fuer den öffentlichen Nahverkehr heisst SL, damit könnt ihr Euch eine Verbindung raussuchen. Die Preise fuer ein Einzelticket liegen bei im Moment 42 kr und ein Ticket ist fuer 75 Minuten gueltig auch wenn ihr umsteigt, ihr könnt lediglich mit Kreditkarte bezahlen, EC-Karten oder Bargeld werden nicht angenommen",
}

const karte: TextProps = {
    uberschrift: "Karte",
    iframeUrl: <iframe className="w-full h-full"
                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2048.762138872572!2d18.243986877178823!3d59.1029146291235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f62aec1411f81%3A0x623b92de45af235a!2sEkuddens%20hostel!5e0!3m2!1sen!2sse!4v1706984725765!5m2!1sen!2sse"
                       loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
}

async function getData() {
    const data = await client.getEntries({
        content_type: 'page',
        include: 10,
    });
    return data.items[0];
};