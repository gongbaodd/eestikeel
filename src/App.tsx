'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample flash card data with categories
const flashCardCategories = {
  commutation: [
    { "estonian": "istuma", "english": "to sit" },
    { "estonian": "Ma istun", "english": "I sit" },
    { "estonian": "Sa istud", "english": "You sit" },
    { "estonian": "Ta istub", "english": "He/She sits" },
    { "estonian": "Me istume", "english": "We sit" },
    { "estonian": "Te istute", "english": "You (plural) sit" },
    { "estonian": "Nad istuvad", "english": "They sit" },
    { "estonian": "Istu", "english": "Sit (imperative)" },

    { "estonian": "ujuma", "english": "to swim" },
    { "estonian": "Ma ujun", "english": "I swim" },
    { "estonian": "Sa ujud", "english": "You swim" },
    { "estonian": "Ta ujub", "english": "He/She swims" },
    { "estonian": "Me ujume", "english": "We swim" },
    { "estonian": "Te ujute", "english": "You (plural) swim" },
    { "estonian": "Nad ujuvad", "english": "They swim" },
    { "estonian": "Uju", "english": "Swim (imperative)" },

    { "estonian": "laulma", "english": "to sing" },
    { "estonian": "Ma laulan", "english": "I sing" },
    { "estonian": "Sa laulad", "english": "You sing" },
    { "estonian": "Ta laulab", "english": "He/She sings" },
    { "estonian": "Me laulame", "english": "We sing" },
    { "estonian": "Te laulate", "english": "You (plural) sing" },
    { "estonian": "Nad laulavad", "english": "They sing" },
    { "estonian": "Laula", "english": "Sing (imperative)" },

    { "estonian": "kirjutama", "english": "to write" },
    { "estonian": "Ma kirjutan", "english": "I write" },
    { "estonian": "Sa kirjutad", "english": "You write" },
    { "estonian": "Ta kirjutab", "english": "He/She writes" },
    { "estonian": "Me kirjutame", "english": "We write" },
    { "estonian": "Te kirjutate", "english": "You (plural) write" },
    { "estonian": "Nad kirjutavad", "english": "They write" },
    { "estonian": "Kirjuta", "english": "Write (imperative)" },

    { "estonian": "magama", "english": "to sleep" },
    { "estonian": "Ma magan", "english": "I sleep" },
    { "estonian": "Sa magad", "english": "You sleep" },
    { "estonian": "Ta magab", "english": "He/She sleeps" },
    { "estonian": "Me magame", "english": "We sleep" },
    { "estonian": "Te magasite", "english": "You (plural) sleep" },
    { "estonian": "Nad magavad", "english": "They sleep" },
    { "estonian": "Maga", "english": "Sleep (imperative)" },

    { "estonian": "mängima", "english": "to play" },
    { "estonian": "Ma mängin", "english": "I play" },
    { "estonian": "Sa mängid", "english": "You play" },
    { "estonian": "Ta mängib", "english": "He/She plays" },
    { "estonian": "Me mängime", "english": "We play" },
    { "estonian": "Te mängite", "english": "You (plural) play" },
    { "estonian": "Nad mängivad", "english": "They play" },
    { "estonian": "Mängi", "english": "Play (imperative)" },

    { "estonian": "pesema", "english": "to wash" },
    { "estonian": "Ma pesen", "english": "I wash" },
    { "estonian": "Sa pesed", "english": "You wash" },
    { "estonian": "Ta peseb", "english": "He/She washes" },
    { "estonian": "Me peseme", "english": "We wash" },
    { "estonian": "Te pesete", "english": "You (plural) wash" },
    { "estonian": "Nad pesevad", "english": "They wash" },
    { "estonian": "Pese", "english": "Wash (imperative)" },

    { "estonian": "tantsima", "english": "to dance" },
    { "estonian": "Ma tantsin", "english": "I dance" },
    { "estonian": "Sa tantsid", "english": "You dance" },
    { "estonian": "Ta tantsib", "english": "He/She dances" },
    { "estonian": "Me tantsime", "english": "We dance" },
    { "estonian": "Te tantsite", "english": "You (plural) dance" },
    { "estonian": "Nad tantsivad", "english": "They dance" },
    { "estonian": "Tantsi", "english": "Dance (imperative)" },

    { "estonian": "sööma", "english": "to eat" },
    { "estonian": "Ma söön", "english": "I eat" },
    { "estonian": "Sa sööd", "english": "You eat" },
    { "estonian": "Ta sööb", "english": "He/She eats" },
    { "estonian": "Me sööme", "english": "We eat" },
    { "estonian": "Te sööte", "english": "You (plural) eat" },
    { "estonian": "Nad söövad", "english": "They eat" },
    { "estonian": "Söö", "english": "Eat (imperative)" },

    { "estonian": "tegema", "english": "to do" },
    { "estonian": "Ma teen", "english": "I do" },
    { "estonian": "Sa teed", "english": "You do" },
    { "estonian": "Ta teeb", "english": "He/She does" },
    { "estonian": "Me teeme", "english": "We do" },
    { "estonian": "Te teete", "english": "You (plural) do" },
    { "estonian": "Nad teevad", "english": "They do" },
    { "estonian": "Tee", "english": "Do (imperative)" },

    { "estonian": "õppima", "english": "to learn" },
    { "estonian": "Ma õpin", "english": "I learn" },
    { "estonian": "Sa õpid", "english": "You learn" },
    { "estonian": "Ta õpib", "english": "He/She learns" },
    { "estonian": "Me õpime", "english": "We learn" },
    { "estonian": "Te õpite", "english": "You (plural) learn" },
    { "estonian": "Nad õpivad", "english": "They learn" },
    { "estonian": "Õpi", "english": "Learn (imperative)" },

    { "estonian": "vaatama", "english": "to look" },
    { "estonian": "Ma vaatan", "english": "I look" },
    { "estonian": "Sa vaatad", "english": "You look" },
    { "estonian": "Ta vaatab", "english": "He/She looks" },
    { "estonian": "Me vaatame", "english": "We look" },
    { "estonian": "Te vaatate", "english": "You (plural) look" },
    { "estonian": "Nad vaatavad", "english": "They look" },
    { "estonian": "Vaata", "english": "Look (imperative)" },

    { "estonian": "töötama", "english": "to work" },
    { "estonian": "Ma töötan", "english": "I work" },
    { "estonian": "Sa töötad", "english": "You work" },
    { "estonian": "Ta töötab", "english": "He/She works" },
    { "estonian": "Me töötame", "english": "We work" },
    { "estonian": "Te töötate", "english": "You (plural) work" },
    { "estonian": "Nad töötavad", "english": "They work" },
    { "estonian": "Tööta", "english": "Work (imperative)" },

    { "estonian": "puhkama", "english": "to rest" },
    { "estonian": "Ma puhan", "english": "I rest" },
    { "estonian": "Sa puhkad", "english": "You rest" },
    { "estonian": "Ta puhkab", "english": "He/She rests" },
    { "estonian": "Me puhkame", "english": "We rest" },
    { "estonian": "Te puhkate", "english": "You (plural) rest" },
    { "estonian": "Nad puhkavad", "english": "They rest" },
    { "estonian": "Puhka", "english": "Rest (imperative)" },

    { "estonian": "käima", "english": "to walk/go" },
    { "estonian": "Ma käin", "english": "I walk/go" },
    { "estonian": "Sa käid", "english": "You walk/go" },
    { "estonian": "Ta käib", "english": "He/She walks/goes" },
    { "estonian": "Me käime", "english": "We walk/go" },
    { "estonian": "Te käite", "english": "You (plural) walk/go" },
    { "estonian": "Nad käivad", "english": "They walk/go" },
    { "estonian": "Käi", "english": "Walk/go (imperative)" },

    { "estonian": "jalutama", "english": "to leisurely walk/stroll" },
    { "estonian": "Ma jalutan", "english": "I leisurely walk/stroll" },
    { "estonian": "Sa jalutad", "english": "You leisurely walk/stroll" },
    { "estonian": "Ta jalutab", "english": "He/She leisurely walks/strolls" },
    { "estonian": "Me jalutame", "english": "We leisurely walk/stroll" },
    { "estonian": "Te jalutate", "english": "You (plural) leisurely walk/stroll" },
    { "estonian": "Nad jalutavad", "english": "They leisurely walk/stroll" },
    { "estonian": "Jaluta", "english": "Leisurely walk/stroll (imperative)" },

    { "estonian": "kuulama", "english": "to listen" },
    { "estonian": "Ma kuulan", "english": "I listen" },
    { "estonian": "Sa kuulad", "english": "You listen" },
    { "estonian": "Ta kuulab", "english": "He/She listens" },
    { "estonian": "Me kuulame", "english": "We listen" },
    { "estonian": "Te kuulate", "english": "You (plural) listen" },
    { "estonian": "Nad kuulavad", "english": "They listen" },
    { "estonian": "Kuula", "english": "Listen (imperative)" },

    { "estonian": "koristama", "english": "to clean" },
    { "estonian": "Ma koristan", "english": "I clean" },
    { "estonian": "Sa koristad", "english": "You clean" },
    { "estonian": "Ta koristab", "english": "He/She cleans" },
    { "estonian": "Me koristame", "english": "We clean" },
    { "estonian": "Te koristate", "english": "You (plural) clean" },
    { "estonian": "Nad koristavad", "english": "They clean" },
    { "estonian": "Korista", "english": "Clean (imperative)" },

    { "estonian": "minema", "english": "to go" },
    { "estonian": "Ma lähen", "english": "I go" },
    { "estonian": "Sa lähed", "english": "You go" },
    { "estonian": "Ta läheb", "english": "He/She goes" },
    { "estonian": "Me lähme", "english": "We go" },
    { "estonian": "Te lähete", "english": "You (plural) go" },
    { "estonian": "Nad lähevad", "english": "They go" },
    { "estonian": "Lähe", "english": "Go (imperative)" }
  ],
  "Kus?Kuhu?": [
    { "estonian": "Kus? Bussijaamas", "english": "at the bus station" },
    { "estonian": "Kuhu? Bussijaama", "english": "to the bus station" },
    { "estonian": "Kus? Rongijaamas", "english": "at the train station" },
    { "estonian": "Kuhu? Rongijaama", "english": "to the train station" },
    { "estonian": "Kus? Lennujaamas", "english": "at the airport" },
    { "estonian": "Kuhu? Lennujaama", "english": "to the airport" },
    { "estonian": "Kus? Poe", "english": "at the store" },
    { "estonian": "Kuhu? Poodi", "english": "to the store" },
    { "estonian": "Kus? Pangas", "english": "at the bank" },
    { "estonian": "Kuhu? Panka", "english": "to the bank" },
    { "estonian": "Kus? Postkontoris", "english": "at the post office" },
    { "estonian": "Kuhu? Postkontorisse", "english": "to the post office" },
    { "estonian": "Kus? Haiglas", "english": "at the hospital" },
    { "estonian": "Kuhu? Haiglasse", "english": "to the hospital" },
    { "estonian": "Kus? Hotellis", "english": "at the hotel" },
    { "estonian": "Kuhu? Hotelli", "english": "to the hotel" },
    { "estonian": "Kus? Raamatukogus", "english": "at the library" },
    { "estonian": "Kuhu? Raamatukokku", "english": "to the library" },
    { "estonian": "Kus? Koolis", "english": "at the school" },
    { "estonian": "Kuhu? Kooli", "english": "to the school" },
    { "estonian": "Kus? Lasteaias", "english": "at the kindergarten" },
    { "estonian": "Kuhu? Lasteaeda", "english": "to the kindergarten" },
    { "estonian": "Kus? Muuseumis", "english": "at the museum" },
    { "estonian": "Kuhu? Muuseumisse", "english": "to the museum" },
    { "estonian": "Kus? Kohvikus", "english": "at the café" },
    { "estonian": "Kuhu? Kohvikusse", "english": "to the café" },
    { "estonian": "Kus? Turul", "english": "at the market" },
    { "estonian": "Kuhu? Turule", "english": "to the market" },
    { "estonian": "Kus? Parklas", "english": "in the parking lot" },
    { "estonian": "Kuhu? Parklasse", "english": "to the parking lot" },
    { "estonian": "Kus? Bensiinijaamas", "english": "at the gas station" },
    { "estonian": "Kuhu? Bensiinijaama", "english": "to the gas station" },
    { "estonian": "Kus? Kirikus", "english": "at the church" },
    { "estonian": "Kuhu? Kirikusse", "english": "to the church" },
    { "estonian": "Kus? Sadamas", "english": "at the harbor" },
    { "estonian": "Kuhu? Sadamasse", "english": "to the harbor" },
    { "estonian": "Kus? Tööl", "english": "at work" },
    { "estonian": "Kuhu? Tööle", "english": "to work" },
    { "estonian": "Kus? Diskol", "english": "at the disco" },
    { "estonian": "Kuhu? Diskole", "english": "to the disco" },
    { "estonian": "Kus? Tantsukursusel", "english": "at the dance course" },
    { "estonian": "Kuhu? Tantsukursusele", "english": "to the dance course" },
    { "estonian": "Kus? Spordivõistlusel", "english": "at the sports competition" },
    { "estonian": "Kuhu? Spordivõistlusele", "english": "to the sports competition" },
    { "estonian": "Kus? Koosolekul", "english": "at the meeting" },
    { "estonian": "Kuhu? Koosolekule", "english": "to the meeting" },
    { "estonian": "Kus? Kontserdil", "english": "at the concert" },
    { "estonian": "Kuhu? Kontserdile", "english": "to the concert" },
    { "estonian": "Kus? Turul", "english": "at the market" },
    { "estonian": "Kuhu? Turule", "english": "to the market" },
    { "estonian": "Kus? Peol", "english": "at the party" },
    { "estonian": "Kuhu? Peole", "english": "to the party" },
    { "estonian": "Kus? Ööklubis", "english": "at the nightclub" },
    { "estonian": "Kuhu? Ööklubisse", "english": "to the nightclub" },
    { "estonian": "Kus? Kontoris", "english": "at the office" },
    { "estonian": "Kuhu? Kontorisse", "english": "to the office" },
    { "estonian": "Kus? Teatris", "english": "at the theater" },
    { "estonian": "Kuhu? Teatrisse", "english": "to the theater" },
    { "estonian": "Kus? Kirikus", "english": "at the church" },
    { "estonian": "Kuhu? Kirikusse", "english": "to the church" },
    { "estonian": "Kus? Veekeskuses", "english": "at the water center" },
    { "estonian": "Kuhu? Veekeskusse", "english": "to the water center" },
    { "estonian": "Kus? Kaubanduskeskuses", "english": "at the shopping center" },
    { "estonian": "Kuhu? Kaubanduskeskusse", "english": "to the shopping center" },
    { "estonian": "Kus? Metsas", "english": "in the forest" },
    { "estonian": "Kuhu? Metsa", "english": "to the forest" },
    { "estonian": "Kus? Saunas", "english": "in the sauna" },
    { "estonian": "Kuhu? Saunasse", "english": "to the sauna" },
    { "estonian": "Kus? Koolis", "english": "at the school" },
    { "estonian": "Kuhu? Kooli", "english": "to the school" },
    { "estonian": "Kus? Jalgpallitrennis", "english": "at football practice" },
    { "estonian": "Kuhu? Jalgpallitrenni", "english": "to football practice" },
    { "estonian": "Kus? Restoranis", "english": "at the restaurant" },
    { "estonian": "Kuhu? Restorani", "english": "to the restaurant" },
    { "estonian": "Kus? Karaokebaaris", "english": "at the karaoke bar" },
    { "estonian": "Kuhu? Karaokebaari", "english": "to the karaoke bar" },
    { "estonian": "Kus? Loomaaias", "english": "at the zoo" },
    { "estonian": "Kuhu? Loomaaeda", "english": "to the zoo" },
    { "estonian": "Kus? Kodus", "english": "at home" },
    { "estonian": "Kuhu? Koju", "english": "to home" },
  ]
}

const categories = Object.keys(flashCardCategories)

flashCardCategories.commutation = shuffleArray(flashCardCategories.commutation)
flashCardCategories['Kus?Kuhu?'] = shuffleArray(flashCardCategories['Kus?Kuhu?'])

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];  // Swap elements
  }
  return array;
}


export default function FlashCardApp() {
  const [currentCategory, setCurrentCategory] = useState(categories[0])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)

  useEffect(() => {
    setSpeechSynthesis(window.speechSynthesis)
  }, [])

  const currentCards = flashCardCategories[currentCategory]
  const currentCard = currentCards[currentCardIndex]

  const flipCard = () => setIsFlipped(!isFlipped)

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % currentCards.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + currentCards.length) % currentCards.length)
    setIsFlipped(false)
  }

  const speakEstonian = () => {
    if (speechSynthesis) {
      const msg = new SpeechSynthesisUtterance()
      const voices = window.speechSynthesis.getVoices()
      const voice = voices.find(voice => /et/.test(voice.lang))

      if (voice) {
        msg.voice = voice
        msg.volume = 1
        msg.rate = 1
        msg.pitch = 1
        msg.text = currentCard.estonian
        msg.lang = 'et_EE'
        speechSynthesis.speak(msg)
        return
      } else {
        // TODO: find an Estonian TTS
        msg.text = currentCard.estonian
        msg.lang = 'fi_FI'
        speechSynthesis.speak(msg)
      }
    }
  }

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category)
    setCurrentCardIndex(0)
    setIsFlipped(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Tabs value={currentCategory} onValueChange={handleCategoryChange} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-3">
          {
            categories.map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))
          }
        </TabsList>
        {Object.keys(flashCardCategories).map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <Card className="w-full h-48 flex items-center justify-center bg-white shadow-lg rounded-lg cursor-pointer" onClick={flipCard}>
              <div className="text-2xl font-bold text-center">
                {isFlipped ? currentCard.english : currentCard.estonian}
              </div>
            </Card>
            <div className="mt-4 flex justify-between items-center">
              <Button onClick={prevCard}>Previous</Button>
              <Button onClick={speakEstonian}>Speak</Button>
              <Button onClick={nextCard}>Next</Button>
            </div>
            <div className="mt-2 text-sm text-center text-gray-600">
              Card {currentCardIndex + 1} of {currentCards.length}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}