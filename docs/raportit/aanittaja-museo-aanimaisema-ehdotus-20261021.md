# Taidemuseoiden yhteinen äänimaisema: ehdotus ja näytteet (Äänittäjä 21.10.2026, PT:n tilaus)
Hakusuunta: Soundly Pro (NAS-originaalit) / Sonniss / CC0, ei generointia; taso −34 LUFS (askelten linja). Näytteet: `proto-3d/_tyo/museo-aanimaisema-20261021/ulos/` (mp3). Kuuntelematta omistajan korvalla; sokko-Gemini 3.1 Pro tarkisti luonteen.

## 1. Salin hiljainen hälinä per salikoko (5 luokkaa, Louvren sali.json:n laatikoista)
| luokka | salit (tilavuus) | silmukka | lähde (Soundly) | Gemini sokkona |
|---|---|---|---|---|
| kabinetti | Monet-sali (450 m³) | saliaani-kabinetti | Office Hall Room Tone, Very Distant Walla (SND123202) | väkijoukon sorina isossa tilassa (liian täyteläinen? tarkista) |
| keski | Salon Carré 2 100, Biron 1 900, Daru 3 400, Impressionistigalleria 3 800 | saliaani-keski | Museum Interior, Belgrade (SND84353) | matala ilmastointi + etäinen toiminta isossa tilassa |
| suuri | Grande Galerie 4 700, Salle des États 4 800, Mollien 5 400 | saliaani-suuri | Museum Hall, Distant Walla, Montreal, loop (SND166514) | etäinen puheensorina ja askeleet isossa tilassa |
| aula | Orsayn keskilaiva 10 800 | saliaani-aula | Museum, Quiet Crowd, Light Walla, Light Footsteps, Reverberant (SND76329, 5.1→stereo) | askeleet kaikuvassa tilassa, kevyt kurkunselvitys |
| ulko | Rodinin puutarha | saliaani-ulko | Exterior Courtyard, Pigeons (SND63552) | kyyhky kujertaa, taustakohinaa |
Jokainen 37 s saumaton silmukka (3 s tasatehoristeys), −34 LUFS, huippu −12…−21 dBFS. Suositus: soita salin tyypin mukaan, ristiinhäivytys 2 s siirryttäessä, taso −3 dB pienemmäksi kabinetissa; ei tekstiä päälle (kertojan alla kuten pohjaäänimaisema).
Huomiot: aulan silmukassa kuuluu yksittäisiä tapahtumia (askeleet, kurkunselvitys), jotka toistuvat 37 s välein → valmiina pidempi (80 s) versio, jos kuuluu; ulkosilmukassa kyyhky on yksi ääni.

## 2. Kaiku per salikoko (askelten `-sali`-versiot)
Nykyiset `-sali-NN` käyttävät yhtä huonevastetta (Aalto OK5 `corridor_second_floor_2`, 2,8 s). Ehdotus: kolme luokkaa samoista Aalto OK5 -vasteista (CC BY 4.0, nimeäminen ☰ › Lähteet kuten ennen): pieni–keski → `corridor_second_floor`, suuri → `corridor_second_floor_2` (nykyinen), aula → `stairway_second_floor`. Tuotan askelsarjoista (parketti, marmori, kivi_hiekka) vain aulaan ja pieneen kabinettiin lisäversiot, jos LS haluaa vaihtaa kaikua salin mukaan; muuten nykyinen riittää.

## 3. Louvren 4 kävijän askeleet (lattiamateriaalin mukaan)
Ei uutta äänilähdettä: sama lattiasarja kuin kameralle (`MuseoAskeleet`), mutta kävijä kuuluu kauempaa. Kaksi tapaa (LS valitsee): (a) pelin etäisyysvaimennus + alipäästö 3,5 kHz kävijän askeleelle, (b) esilaskettu `askel-<lattia>-kavija-NN` (−8 LU, alipäästö, aina salikaiulla), 6 per lattia × 4 lattiaa (parketti, marmori, kivi_hiekka, sora) = 24 mp3, uusi polku `taidemuseo-askeleet-v8`. Tarvitsen LS:ltä: kävijöiden reitit ja lattiat, askeltahti (Tripo-hahmon kävelysykli), montako kävijää kuuluu yhtä aikaa.

## 4. Hiljainen lentoääni LS:n lentävälle kameralle
Näyte `lento-hiljainen` (puun tuuli, alipäästö 1,2 kHz, −40 LUFS): Gemini kuulee sen **meren aaltoina**, ei lentona → **ei suositella**. Ehdotus: ei lentoääntä, ellei LS:n kameralle kuulu selvä tarve; muuten haen "high altitude air / slow wind" -ehdokkaita Sonnissista (silmukka −40 LUFS, mono-tasainen, ei rytmiä). Päätös PT/LS:ltä ennen työtä.

## 5. Kytkentä ja vienti
Vienti uudelle polulle `aanet/taidemuseo-saliaanet-v1/` + manifest (luokka → tiedosto, salin `tyyppi`/tilavuus → luokka; ks. taulukko), ensin PT:n hyväksyntä näytteille. Kytkijä: LS (MuseoAskeleet/Ääni), Lavastaja vahvistaa salin tyypin ja tilavuuden (`laatikko`) jokaiselle uudelle museolle samaan luokitukseen.
