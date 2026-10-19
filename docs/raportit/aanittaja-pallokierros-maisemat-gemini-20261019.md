# Pallokierrosten kuusi taustasilmukkaa: sokko Gemini-tarkistus (Äänittäjä 19.10.2026, PT 15.36)

Menetelmä: Gemini 3.1 Pro kuuli 60 s silmukkaa tietämättä, mitä sen pitäisi esittää; sitten vertailu tavoitteeseen (`aanet/kaupunkimaisema-v3/`, tehty 17.10. Freesoundin esikuuntelu-mp3:ista). **Hyväksytty 1 / hylätty 5.**

| silmukka | tavoite (manifest) | Geminin kuvaus (sokkona) | tulos | syy |
|---|---|---|---|---|
| lontoo/katu | Oxford Streetin sivukatu: liikenne ja kaukainen puhe | A busy city street with traffic and pedestrians · dominoivat: Traffic noise, Engine rumble, Tire noise · ongelmat: none | HYLÄTTY | The candidate features close traffic and a busy street, contradicting the requested distant traffic and quiet side street ambience. |
| lontoo/thames | Thames Path: vesi ja veneet | Underwater environment with continuous bubbling and water movement · dominoivat: Bubbling, Water sloshing · ongelmat: none | HYLÄTTY | The requirement is for an above-water river path with city background and boats, but the audio is an underwater environment with bubbling. |
| praha/vanhakaupunki | Katu, askeleet ja raitiovaunu | A train arrives at a station, passengers disembark and walk past, and then the train departs. · dominoivat: Train arriving and departing, High-pitched braking squeal, Electric motor whine, · ongelmat: none | HYLÄTTY | The environment is a train station rather than an old-town street, and the train sounds are close up instead of in the distance. |
| praha/moldava | Veneet ja Mánesin silta Karlinsillan lähellä | An outdoor environment near a road with a prominent, continuous bubbling or gurgling water source, such as a fountain or aeration tank. · dominoivat: bubbling water, gurgling · ongelmat: none | HYLÄTTY | The sound is described as a bubbling fountain or aeration tank near a road, lacking the requested riverside and boat sounds. |
| ateena/taverna | Tavernojen ja pienen kaupungin keskustelusorina | A bustling indoor public space, likely a cafe, market, or waiting area, with many people talking and moving around. · dominoivat: Crowd chatter, Laughter, Voices speaking in various languages · ongelmat: none | HYLÄTTY | Intelligible speech is present ('six euros') when unintelligible chatter was specifically requested. |
| ateena/kaskaat | Kaskaiden orkesteri, kesä | A loud, continuous chorus of cicadas buzzing in a natural, outdoor setting. · dominoivat: Cicadas buzzing, Insect chorus · ongelmat: none | HYVÄKSYTTY | The description perfectly matches the requested continuous cicada chorus in a natural outdoor setting with no audible problems. |

Hylätyt 5 tehdään uudelleen valmiista yksittäisistä Soundly/Sonniss-tiedostoista (ei koneleikkauksia, ei esikuuntelu-mp3:ia); jokaiselle ensin mallinäyte + lyhyt kuvaus (PT 15.32).
