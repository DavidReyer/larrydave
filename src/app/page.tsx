import Image from "next/image";
import {ReactNode} from "react";


export default function Home() {
  return (
      <main className="font-mono md:px-40">
          <div className="fixed inset-0 -z-10">
              <Image src="/PXL_20230627_111947484.jpg" alt="hintergrund" fill className="opacity-20"/>
          </div>
          <Header/>
          <div className="grid grid-cols-1 justify-around md:grid-cols-2">
              <Text {...datum} />
              <Text {...location} />
          </div>
          <div className="grid grid-cols-1 justify-around md:grid-cols-2">
              <Text {...anreise} />
              <Text {...karte} />
          </div>
          <div className="grid grid-cols-1 justify-around md:grid-cols-2">
              <Text {...anreisevonarlanda} />

          </div>
      </main>
  );
}

function Header() {
    return (
        <div className="p-12 md:p-24 mx-auto flex">
            <h1 className="text-4xl text-center mx-auto">
                Willkommen auf unserer Webseite mit Infos zu unserer Hochzeitsfeier
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
    iframeUrl: <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2048.762138872572!2d18.243986877178823!3d59.1029146291235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f62aec1411f81%3A0x623b92de45af235a!2sEkuddens%20hostel!5e0!3m2!1sen!2sse!4v1706984725765!5m2!1sen!2sse" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
}

const anreisevonarlanda: TextProps = {
    uberschrift: "Anreise vom Flughafen Arlanda",
    text: "Wenn ihr direkt vom Flughafen zu uns kommt wuerden wir empfehlen ein Taxi ( wir empfehlen Sverige Taxi alternativ aber etwas teurer Taxi Stockholm) oder Uber zu nehmen (Alles ueber Apps buchbar), falls ihr jedoch Bus uns Bahn bevorzugt kommt folgend eine kurze Erklärung",
    stichpunkte: [
        "Bus 583 von Arlanda nach Märsta Station",
        "Von Märsta Station könnt ihr den Pendeltåg/Zug 42X nach Västerhaningen Station nehmen der Zug hat die Endstation Nynäshamn ",
        "Von Västerhaninge Station nehmt ihr den Bus 845 in Richtung Gålö und steigt an der Station Hasslinge aus von dort sind es 500m Fussweg",

        "Alternativ fährt auch der Arlanda Express nach Stockholm Hbf, der ist etwas teurer: Preis pro Person 320 SEK ab 25 Jahren, 160 SEK bis 25 Jahre und 210 Sek ab 65 Jahren Kinder unter 8 Jahren fahren gratis von dort aus kÖnnt ihr dann mit dem Taxi oder eben auch mit dem Zug 42X nach Västerhaninge fahren"
    ]
}