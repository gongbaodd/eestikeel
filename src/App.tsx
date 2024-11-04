'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Sample flash card data
const flashCards = [
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
]

export default function FlashCardApp() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)

  useEffect(() => {
    setSpeechSynthesis(window.speechSynthesis)
  }, [])

  const currentCard = flashCards[currentCardIndex]

  const flipCard = () => setIsFlipped(!isFlipped)

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashCards.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashCards.length) % flashCards.length)
    setIsFlipped(false)
  }

  const speakEstonian = () => {
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(currentCard.estonian)
      utterance.lang = 'et_EE'
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-80 h-48 flex items-center justify-center bg-white shadow-lg rounded-lg cursor-pointer" onClick={flipCard}>
        <div className="text-2xl font-bold text-center">
          {isFlipped ? currentCard.english : currentCard.estonian}
        </div>
      </Card>
      <div className="mt-4 space-x-2">
        <Button onClick={prevCard}>Previous</Button>
        <Button onClick={nextCard}>Next</Button>
        <Button onClick={speakEstonian}>Speak</Button>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Card {currentCardIndex + 1} of {flashCards.length}
      </div>
    </div>
  )
}