# Sonniss-varaston luettelo (Pelikoodari 9.10.2026)

PT:n tilaus: poiminnan tiedostot kategorioittain, yhden rivin kuvaus, käyttöehdotus sekä merkintä "heti hyödyllinen" tai
"myöhemmin". PT valitsee kytkennät, eikä mitään viedä ilman PT:n valintaa.

**Mistä luettelo koostuu:**

- **Arkisto:** T7:llä /Volumes/T7 4TB/sonniss/poiminta/. Sonniss GDC 2017 (osat 1–3), 2020 (Part 1–14) ja 2021–23 (Safarin
  purkamat kansiot ja zipit). Vuoden 2017 osat 4–9 jäivät lataamatta, koska lataus pysäytettiin klo 00.36.
- **Poiminta:** vain aihesanoilla poimittu osa. Aiheet ovat tuuli, ovi, avain, ketju, tuli, askel, vene, vesi, kello, yö,
  lintu, kangas, kivi ja puu. Moottorit, junat, aseet, sci-fi ja kaupunkiliikenne on suljettu pois. Siksi käyttöliittymä-,
  musiikki- ja väkijoukkoääniä on poiminnassa vähän, ja niitä haetaan tarvittaessa koko arkistosta (`tyokalut/hae.py`).
- **Laatu:** AST-tunnistin (`laatu.py`) sekä tuulille ja kelloille spektri- ja tasoanalyysi (`spektri.py`). Ääniä ei ole kuunneltu.
- **"Heti hyödyllinen":** laatu OK tai spektri hyväksyi, ääni täyttää tämänhetkisen aukon tai korvaa heikon äänen, eikä se ole
  nykyaikainen (autot, moottorit, sähkölaitteet, muovi, sisätilat). Kaikki muut ovat "myöhemmin".
- **Lisenssi:** Sonniss GDC, rojaltivapaa, ei nimeämistä.

## Tärkeimmät heti hyödylliset

| aukko | ehdokkaat (poiminta) | huomio |
|---|---|---|
| **Olavinlinna, vanhat ovet ja lukot** | Lock01, Lock02 ja Lock04 (ulkoportin lukko avautuu), Old Lock Fiddling, Latchlocker-salvat ×3, Knocking On Heavy Door, Door Thick Open Close Squeaky, Old Wooden Door Squeaky (koulu), Exterior Metal Door Gate Bolt Latch, Big Metal Gate Pushbar Squeak | korvaa Kenneyn lyhyen ovi-narahduksen ja lukot; aito puu ja rauta |
| **Olavinlinna, arkku** | CST Chest Ancient Close | arkun kansi (kolikot ja hopea arkussa) |
| **Olavinlinna, puuaskeleet** | RYK wooden floor loop | laiturin askel on 8.10. QA:ssa heikko |
| **Olavinlinna, kesäyö** | Summer in the Fields Evening-Night 002 ja 004 (sirkat, kaukaiset koirat) | Ranskan maaseudun ilta; Suomen elokuun yö on hiljaisempi, joten käytä hiljaa |
| **Elävä kaupunki, satama** | Sea Seashore Water Lapping On Rocks | satamien ja rantojen vesi (Tukholma) |
| **Mylly ja Tavli** | medium wooden pieces on cardboard | puunappulat pahvilla |

## Generointilistan korvaajat koko arkistosta (aamun ~495 kr)

Koko arkiston haku (`hae.py`, ei purettu, ei tarkistettu) löysi ehdokkaita kolmelle kuudesta generoitavaksi suunnitellusta tehosteesta:

| generointilistan ääni | Sonniss-ehdokas | vaikutus |
|---|---|---|
| kolikot (80 kr) | CB Sound Design – Essential Sounds Vol.01 Coins (handling_coins, falling_coins, many_coins); Soundholder – Sack Of Coins | **korvaa generoinnin** |
| sytytys (40 kr) | InspectorJ – Party Pack Match_Ignite (tulitikku); Bluezone fire_whoosh 1,3 s | todennäköisesti korvaa |
| tarjotin ja kauha (160 kr) | Nikko Barrera-Amaya – Cooking night: Plates_2, Cooking_6, Cup_10, Silverware_2 | mahdollinen; tarkistus tunnistimella |
| hanska, nauris (80 kr) | ei osumia | generointi tarpeen |

**Tarkistus 9.10. klo 05 (purettu, AST):**

- **kolikot:** CB `many_coins_12` (Coin 0,64) ja `coins_9` (Coin 0,35) tunnistuvat kolikoiksi, joten **generointia ei tarvita**
  (−80 kr). Soundholderin säkkiäänet ovat liian pitkiä ja epäselviä (0,00–0,08).
- **sytytys:** tulitikku (Static 0,10) ja fire whoosh (Burst 0,08) eivät varmistu. Tunnistin on lyhyissä äänissä epäluotettava,
  joten generointi pysyy listalla.
- **tarjotin ja kauha:** Cooking night on paistamista (Frying 0,85) ja ottimia (Coin 0,28 / Dishes 0,07), ei kauhaa eikä
  tarjotinta. Generointi pysyy.

Tehosteiden generointi putoaa siis 360:stä 280 krediittiin, ja aamun kokonaissumma on noin 415 krediittiä.

## Päivitys 9.10. klo 10 (PT): GDC 2024, 2020 osa 13 ja 2023 osa 9

- Mukaan tulivat GDC 2024 -osat (Sonniss-14…21, 148 tiedostoa), GDC 2020 osa 13/14 ja GDC 2021–23 osa 7 (Sonniss-22).
  - GDC 2024:n lisenssi on luettu, ja ehdot ovat samat kuin aiemmin: rojaltivapaa, ei nimeämistä, ei äänten myyntiä sellaisenaan
    eikä tekoälykoulutusta.
  - Kahdessa GDC 2023 -zipissä (5of14 ja 13of14) on rikkinäisiä jäseniä, jotka ohitettiin (9 tiedostoa). Rikkinäiset 30 kt:n
    HTML-zipit ohitetaan.
- Poiminnassa on nyt 620 tiedostoa (30,7 Gt) ja laatutaulukossa 616:
  - 2020: 260
  - 2024: 148
  - 2021–23: 140
  - 2017: 66
  - 2023: 6
- Alla oleva taulukko on päivitetty. "Heti hyödylliset" -kohdat koskevat yhä samoja aukkoja; v3:ssa jo käytetyt ovat mukana.

## Kaikki tiedostot kategorioittain

Poiminnassa on 620 tiedostoa: 2017 66, 2020 260 ja 2021–23 140.

| kategoria | tiedostoja | heti hyödyllisiä |
|---|---|---|
| mekaniikka ja esineet | 232 | 18 |
| ympäristöt | 196 | 3 |
| eläimet | 90 | 2 |
| sää | 53 | 0 |
| musiikilliset | 30 | 0 |
| käyttöliittymä | 14 | 2 |
| ihmiset ja väkijoukot | 5 | 0 |

### mekaniikka ja esineet (232)

| merkintä | kuvaus | kirjasto | vuosi | kesto s | laatu | käyttöehdotus |
|---|---|---|---|---|---|---|
| **heti** | 0002 Door Thick Open Close Squeaky | Wav Junction Sound Effects - Doors | 2020 | 24.3 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | CST Chest Ancient Close2 | SoundFxwizard - Closets Small Doors | 2020 | 3.1 | OK | **Olavinlinna: kolikot ja arkku (generointilistalla)** · Olavinlinna |
| **heti** | Closing Latches 4 | 344 Audio - Ultimate Chess SFX | 2021-23 | 0.6 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | DOORHdwr Big Metal Gate Pushbar Squeak 02 | Justsoundeffects - Metal Movements | 2021-23 | 5.7 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | DOORMetl Woodstove Door Iron Close UberDuo WOOD | UberDuo - The Wood Stove Audio Prop Set | 2024 | 5.2 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | Door heavy classroom open | UberDuo - The School Audio Playset | 2024 | 3.5 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | Exterior Metal Door Gate Bolt Latch 7 | 344 Audio - Practical Doors | 2020 | 1.5 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | HHDoors Armored Door - Metal and wood Fron door - Unlock and Lock by the Key | SculpTunes - HHDoors - Household Doors a | 2020 | 74.3 | OK | **Olavinlinna: avainnippu (heikko)** · Olavinlinna |
| **heti** | Knocking On Heavy Door 1 | 344 Audio - Practical Doors | 2020 | 2.3 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | LOCK Metal shake rattle short medium | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 26.3 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | Latchlocker cable steel wood room channel slide catch alt2 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 1.6 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | Latchlocker design FutureLoot score plunder | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 2.0 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | Latchlocker steel lever small close release squeak snap ring | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 1.4 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | Lock01 outdoor opening lite03 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 13.6 | OK | **Olavinlinna: avainnippu (heikko)** · Olavinlinna |
| **heti** | Lock02 scratch02 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 19.6 | OK | **Olavinlinna: avainnippu (heikko)** · Olavinlinna |
| **heti** | Lock04 outdoor opening lite04 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 14.2 | OK | **Olavinlinna: avainnippu (heikko)** · Olavinlinna |
| **heti** | Old Lock Fiddling | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 1.0 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | wooden floor 1 loop | RYK-Sounds - Footstep | 2021-23 | 2.1 | OK | **Olavinlinna: puuaskeleet (laituri heikko)** · Olavinlinna |
| myöhemmin | Bell 206 t17 Var SFX Panel Movement Wide AB Passenger Seat | Pole Position - Bell 206L-3 Longranger I | 2020 | 7.2 | TARKISTA (ei tunnistu (Jingle bell 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Bell 206 t4 Onbrd Fly Steady Wide AB Passenger Seat | Pole Position - Bell 206L-3 Longranger I | 2020 | 381.5 | TARKISTA (ei tunnistu (Chime 0.00); liikenne 0.34) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Bell 206 t5 Ext Idle Take Off Away Left | Pole Position - Bell 206L-3 Longranger I | 2020 | 507.1 | TARKISTA (ei tunnistu (Jingle bell 0.00); liikenne 0.73) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Drag Boat t2 Ext Start Medium Away By Up Stop Off x2 Middle CSS5 | Pole Position - Drag Boat 1970s | 2020 | 345.5 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.13); musiikki 0.54; liike) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | F2 Boat t5 Ext Away Bys Up Stop ORTF CMC6 | Pole Position - Molgaard F2 2006 | 2020 | 406.1 | TARKISTA (liikenne 0.65; leikkautuu (19)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | boat plastic foley using paddles swimming interior 2 stereo AB | Soundholder - Abstract Aqua | 2020 | 42.2 | TARKISTA (liikenne 0.33) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | 0002 Footsteps Walking Crusty Snow Male Shoes Normal Pace | Wav Junction Sound Effects - Footsteps | 2020 | 25.3 | OK | Olavinlinna |
| myöhemmin | 0002 Water Splashes 2 | Wav Junction Sound Effects - Water | 2020 | 24.2 | OK | Olavinlinna |
| myöhemmin | 0003 Shotgun Fire 3 | Wav Junction Sound Effects - Shotguns | 2020 | 2.8 | TARKISTA (ei tunnistu (Fire 0.00)) | Olavinlinna |
| myöhemmin | 0005 Hammer on Wood | Wav Junction Sound Effects - Tools | 2020 | 3.7 | OK | Olavinlinna |
| myöhemmin | 0014 Footsteps water puddle single splashes | Wav Junction Sound Effects - Footsteps | 2020 | 25.9 | OK | Olavinlinna |
| myöhemmin | 0081 Glass large slide on wood surface 2 | Wav Junction Sound Effects - Glassware | 2020 | 5.9 | OK | Olavinlinna |
| myöhemmin | 0093 Rock Quick Drag On Rock 003 | Wav Junction Sound Effects - Rocks | 2020 | 1.9 | OK | Olavinlinna |
| myöhemmin | 0119 Rock Quick Drag On Rock 029 | Wav Junction Sound Effects - Rocks | 2020 | 1.5 | OK | Olavinlinna |
| myöhemmin | 0228 Single Small Rocks Tumble Cliff 004 | Wav Junction Sound Effects - Rocks | 2020 | 2.8 | OK | Olavinlinna |
| myöhemmin | 0242 Single Small Rocks Tumble Cliff 018 | Wav Junction Sound Effects - Rocks | 2020 | 2.4 | OK | Olavinlinna |
| myöhemmin | 044315 - Lay Brick 15 | The Sound Pack Tree - Construction & Too | 2020 | 1.0 | OK | Olavinlinna |
| myöhemmin | ARMOR Body Drop Chain Leather Short 02 | SmartSoundFX – Medieval | 2020 | 2.0 | OK | Olavinlinna |
| myöhemmin | CERMBrk Ceramic Roof Tile Cracking | Justsoundeffects - Stones and Debris | 2021-23 | 38.7 | OK | Olavinlinna |
| myöhemmin | CERMCrsh Debris Falling On Ceramic Roof Tile With Metal Trash | Justsoundeffects - Stones and Debris | 2021-23 | 27.1 | OK | Olavinlinna |
| myöhemmin | CHAINImpt Chains Metal Dropping Close 01-03 | InspectorJ - Essentials 04 Chains | 2021-23 | 2.1 | OK | Olavinlinna |
| myöhemmin | CHAINMvmt Chains Metal Movement Distant Moderate 02-01 | InspectorJ - Essentials 04 Chains | 2021-23 | 2.6 | OK | Olavinlinna |
| myöhemmin | CHAINMvmt Chains Metal Movement Distant Short 01-02 | InspectorJ - Essentials 04 Chains | 2021-23 | 1.9 | OK | Olavinlinna |
| myöhemmin | CHAINMvmt Chains Metal Movement Distant Very-Short 03-01 | InspectorJ - Essentials 04 Chains | 2021-23 | 1.6 | OK | Olavinlinna |
| myöhemmin | CST Cutlery Drawer Open Medium | SoundFxwizard - Closets Small Doors | 2020 | 0.9 | OK | Olavinlinna |
| myöhemmin | CST Wardrobe Door Closure Action Multiple | SoundFxwizard - Closets Small Doors | 2020 | 9.5 | OK | Olavinlinna |
| myöhemmin | Crushed Rock - DROP - Thick - Mono | Pole Position Production - The Stone & S | 2021-23 | 71.8 | OK | Olavinlinna |
| myöhemmin | DESTRClpse Massive Wall Collapsing | Justsoundeffects - Stones and Debris | 2021-23 | 63.1 | OK | Olavinlinna |
| myöhemmin | DESTRCrsh rummaging through compact wood dry branches Eneas Mentzel Debris & Rubble 14 | Eneas Mentzel - Debris & Rubble | 2021-23 | 3.4 | OK | Olavinlinna |
| myöhemmin | DESTRCrsh sand falling on scrapwood exterior perspective Eneas Mentzel Debris & Rubble 06 | Eneas Mentzel - Debris & Rubble | 2021-23 | 2.7 | OK | Olavinlinna |
| myöhemmin | DIRTCrsh Stone Sand Trickle Reverberant 01 | Justsoundeffects - Stones and Debris | 2021-23 | 29.9 | OK | Olavinlinna |
| myöhemmin | DOOR Closet rattle squeak open close | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 75.6 | TARKISTA (musiikki 0.43) | Olavinlinna |
| myöhemmin | DOORKnck-INT Glass Frontdoor Knock Mono | Justsoundeffects - Doors | 2021-23 | 20.0 | OK | Olavinlinna |
| myöhemmin | DOORMetl Big Metal Gate Open Close 03 | Justsoundeffects - Metal Movements | 2021-23 | 7.6 | OK | Olavinlinna |
| myöhemmin | Drip Watermelon Sloppy MKH8040 | Pole Position - The Gut-Wrenching Gore L | 2020 | 5.3 | TARKISTA (ei tunnistu (Drip 0.01)) | Olavinlinna |
| myöhemmin | Dungeon Door Open Close Locked | 344 Audio - Practical Doors | 2020 | 6.6 | OK | Olavinlinna |
| myöhemmin | Exterior Metal Door Gate Close Rattle 2 | 344 Audio - Practical Doors | 2020 | 1.8 | OK | Olavinlinna |
| myöhemmin | FIREMisc Fire Crackling In A Woodstove UberDuo WOOD | UberDuo - The Wood Stove Audio Prop Set | 2024 | 15.0 | TARKISTA (ei tunnistu (Crackle 0.03)) | Olavinlinna |
| myöhemmin | FLWA 07 - Creek water flowing splashing | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 17.6 | OK | Olavinlinna |
| myöhemmin | FLWA 110 - Dam water flowing close small steady flow | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 21.3 | TARKISTA (leikkautuu (2)) | Olavinlinna |
| myöhemmin | FLWA 92 - Dam water flowing steady flow close rumble | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 24.7 | OK | Olavinlinna |
| myöhemmin | FOLYMisc FabricMask Movement06 InMotionAudio MaskFoley | InMotionAudio - Mask Foley | 2024 | 4.9 | OK | Olavinlinna |
| myöhemmin | FOUNTAIN Large Splasher Spray at Playground 3m Far | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 30.9 | OK | Olavinlinna |
| myöhemmin | FOUNTAIN Small Splashes of Multiple Squirts on the Ground Close | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 52.5 | OK | Olavinlinna |
| myöhemmin | FOUNTAIN Underwater Generous Gushing Flow | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 83.6 | OK | Olavinlinna |
| myöhemmin | GS projectile splash 004 | Gladestock Studios - Naval Warfare | 2021-23 | 2.5 | TARKISTA (ei tunnistu (Water 0.01)) | Olavinlinna |
| myöhemmin | Heavy Chain-Foley On Wood | Conor Bradley - Metal Chains | 2020 | 13.0 | OK | Olavinlinna |
| myöhemmin | ICE HOCKEY skate turn open hip 3 step 180 degree medium x 4 right to left 540s ORTF medium | Sun-Smile-Island - Ice Hockey | 2020 | 25.8 | OK | Olavinlinna |
| myöhemmin | ICE Skater cloth move 10 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 1.3 | OK | Olavinlinna |
| myöhemmin | JW4-WS Water-Swirled M 012 | SoundBits - Just Whoosh 4 - Whoosh Sweet | 2020 | 2.9 | TARKISTA (ei tunnistu (Water 0.24)) | Olavinlinna |
| myöhemmin | Jingle Chain-Sustained Foley | Conor Bradley - Metal Chains | 2020 | 10.4 | OK | Olavinlinna |
| myöhemmin | LIQUID BUBBLE Continuous with Low Resonance Cavity LOOP | Articulated Sounds - Bubbles Water & Aqu | 2020 | 22.0 | TARKISTA (ei tunnistu (Gurgling 0.15); leikkautuu (85)) | Olavinlinna |
| myöhemmin | LIQUID BUBBLE Sequence Medium Force 04 | Articulated Sounds - Bubbles Water & Aqu | 2020 | 6.0 | TARKISTA (ei tunnistu (Water 0.12); leikkautuu (5)) | Olavinlinna |
| myöhemmin | Lock03 outdoor opening solid03 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 11.5 | TARKISTA (leikkautuu (1)) | Olavinlinna |
| myöhemmin | M1911A1 Handling Dry Fire MKH416 | Pole Position - Colt M1911A1 semi-automa | 2020 | 2.8 | TARKISTA (ei tunnistu (Crackle 0.00)) | Olavinlinna |
| myöhemmin | MKH3040 chain rattle close 1 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 163.1 | TARKISTA (liikenne 0.34) | Olavinlinna |
| myöhemmin | Magic Spells CastLong Combo WaterCombo02 | David Dumais Audio - Water Magic 1 | 2020 | 5.4 | TARKISTA (ei tunnistu (Water 0.04)) | Olavinlinna |
| myöhemmin | Magic Spells CastLong Water General05 | David Dumais Audio - Water Magic 1 | 2020 | 4.8 | TARKISTA (ei tunnistu (Gurgling 0.09)) | Olavinlinna |
| myöhemmin | Magic Spells CastShort Water General07 | David Dumais Audio - Water Magic 1 | 2020 | 3.5 | TARKISTA (ei tunnistu (Water 0.03)) | Olavinlinna |
| myöhemmin | Magic Spells Impact Water Low23 | David Dumais Audio - Water Magic 1 | 2020 | 3.1 | TARKISTA (ei tunnistu (Water 0.00)) | Olavinlinna |
| myöhemmin | Meridian ASMR loop scratching matches wood flint flicks scrapes snap ignite burn brief sud | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 120.8 | OK | Olavinlinna |
| myöhemmin | Metal Creak Van Door Back and Forth Various CO100k | Pole Position - The Junkyard Metal Libra | 2020 | 77.6 | OK | Olavinlinna |
| myöhemmin | OBJCont Flask wood canteen medium clothstrap metalbanding woodcork liquid shaking sloshing | Eiravaein Works - Flask | 2024 | 3.1 | OK | Olavinlinna |
| myöhemmin | OBJHsehld Woodstove Tools Whisk Broom And Dust Pan UberDuo WOOD | UberDuo - The Wood Stove Audio Prop Set | 2024 | 12.3 | OK | Olavinlinna |
| myöhemmin | PLOP Mouth Drip Dry | SmartSoundFX - Cartoon & Infotainment | 2021-23 | 0.2 | OK | Olavinlinna |
| myöhemmin | PM RI Source 53 Rocks Impact Hit Single Stone | PMSFX - Rocky Impacts | 2020 | 1.3 | OK | Olavinlinna |
| myöhemmin | PM RI Source 92 Rocks Impact Hit Single Stone | PMSFX - Rocky Impacts | 2020 | 1.2 | OK | Olavinlinna |
| myöhemmin | PM SB SOURCE 16 Impact brick rock dirt gravel single hit | PMSFX - Shattering Bricks | 2020 | 1.4 | OK | Olavinlinna |
| myöhemmin | PM SB SOURCE 61 Impact brick rock dirt gravel single hit | PMSFX - Shattering Bricks | 2020 | 2.6 | OK | Olavinlinna |
| myöhemmin | PM SDGS 113 Footstep Step Dry Grass Shrubs Pine Needles Meadow | PMSFX - STEPS Dry Grass & Shrubs | 2020 | 0.8 | OK | Olavinlinna |
| myöhemmin | PM SDGS 14 Footstep Step Dry Grass Shrubs Pine Needles Meadow | PMSFX - STEPS Dry Grass & Shrubs | 2020 | 1.4 | OK | Olavinlinna |
| myöhemmin | PM SDGS 186 Footstep Step Dry Grass Shrubs Pine Needles Meadow | PMSFX - STEPS Dry Grass & Shrubs | 2020 | 0.4 | OK | Olavinlinna |
| myöhemmin | PM SDGS 213 Footstep Step Dry Grass Skid Drag | PMSFX - STEPS Dry Grass & Shrubs | 2020 | 1.5 | OK | Olavinlinna |
| myöhemmin | Picking Up Metal Tackle Box Onto Wood Table 01 | Badlands Sound - Fishing Tackle Box | 2020 | 1.4 | OK | Olavinlinna |
| myöhemmin | ResonantRustyDoor impact hard 11 | Alex Lane - Resonant Rusty Door | 2020 | 3.7 | TARKISTA (musiikki 0.63) | Olavinlinna |
| myöhemmin | ResonantRustyDoor impact soft 01 | Alex Lane - Resonant Rusty Door | 2020 | 2.1 | TARKISTA (musiikki 0.52) | Olavinlinna |
| myöhemmin | ResonantRustyDoor ronk medium 08 | Alex Lane - Resonant Rusty Door | 2020 | 3.9 | TARKISTA (musiikki 0.58) | Olavinlinna |
| myöhemmin | ResonantRustyDoor scrape short 05 | Alex Lane - Resonant Rusty Door | 2020 | 4.2 | OK | Olavinlinna |
| myöhemmin | Roof Tile - DROP - Several - Mono - 100k | Pole Position Production - The Stone & S | 2021-23 | 12.1 | OK | Olavinlinna |
| myöhemmin | SFX CLOTH Foley Backpack Velcro Straps Ripping Apart Stress | Systematic-Sound - Sound Themes - Modern | 2020 | 9.4 | TARKISTA (leikkautuu (64)) | Olavinlinna |
| myöhemmin | SFX CLOTH Foley Jacket Leather Rough Movement Slow Rustle | Systematic-Sound - Sound Themes - Modern | 2020 | 22.8 | OK | Olavinlinna |
| myöhemmin | SFX CLOTH Foley Jacket Synthetic Polyester Zip Ties Zip Unzip | Systematic-Sound - Sound Themes - Modern | 2020 | 9.6 | TARKISTA (leikkautuu (16)) | Olavinlinna |
| myöhemmin | SFX CLOTH Foley Jacket Synthetic Soft Shell Whoosh Flutter | Systematic-Sound - Sound Themes - Modern | 2020 | 15.3 | TARKISTA (leikkautuu (45)) | Olavinlinna |
| myöhemmin | SPLASH03 | TheWorkRoom Audio Post - Slow Motion - C | 2020 | 9.5 | TARKISTA (ei tunnistu (Ocean 0.06)) | Olavinlinna |
| myöhemmin | Small Crushed Rock - DROP - Thick - Stereo | Pole Position Production - The Stone & S | 2021-23 | 62.9 | OK | Olavinlinna |
| myöhemmin | Small Wood Pile Smash | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 1.3 | TARKISTA (leikkautuu (6)) | Olavinlinna |
| myöhemmin | Tatak ROCKS Falling Heavy Dusty Debris | Tatak Audio - Rocks and Debris | 2020 | 14.2 | OK | Olavinlinna |
| myöhemmin | Tatak ROCKS Rock Roll Movement | Tatak Audio - Rocks and Debris | 2020 | 9.6 | OK | Olavinlinna |
| myöhemmin | Tatak ROCKS Single Rock Impact on Stones | Tatak Audio - Rocks and Debris | 2020 | 6.5 | OK | Olavinlinna |
| myöhemmin | WATRDrip Dripping Water On Metal Pot Lid | Justsoundeffects - Water in Motion | 2024 | 26.9 | TARKISTA (ei tunnistu (Drip 0.00)) | Olavinlinna |
| myöhemmin | WATRFizz Fizzing Effervescent Tablets 03 | Justsoundeffects - Water in Motion | 2024 | 35.8 | TARKISTA (ei tunnistu (Water 0.08)) | Olavinlinna |
| myöhemmin | WATRFlow Brook Full Large Olympic Alpine Loop Cascadia FW | Nick McMahan - Cascadia Flowing Water | 2024 | 198.9 | OK | Olavinlinna |
| myöhemmin | WATRFlow Creek Rocky Distant Falls Loop Cascadia FW | Nick McMahan - Cascadia Flowing Water | 2024 | 253.6 | OK | Olavinlinna |
| myöhemmin | WATRFlow Stream Small Alpine Loop Cascadia FW | Nick McMahan - Cascadia Flowing Water | 2024 | 269.6 | OK | Olavinlinna |
| myöhemmin | WATRMvmt Soft Movement 01 | Justsoundeffects - Water in Motion | 2024 | 35.6 | TARKISTA (ei tunnistu (Water 0.23)) | Olavinlinna |
| myöhemmin | WATRPlmb Sink Bathroom Water Run Rinse Toothbrush UberDuo BATH | UberDuo - The Bathroom Audio Playset | 2024 | 6.1 | OK | Olavinlinna |
| myöhemmin | WATRUndwtr Evolving Underwater Bubbles | Justsoundeffects - Water in Motion | 2024 | 70.4 | OK | Olavinlinna |
| myöhemmin | WHOOSH Ball Crackle Small 02 | SmartSoundFX – Medieval | 2020 | 2.2 | TARKISTA (ei tunnistu (Crackle 0.01)) | Olavinlinna |
| myöhemmin | WOODBrk Snap09 InMotionAudio Wood | InMotionAudio - Wood | 2024 | 2.1 | TARKISTA (leikkautuu (1)) | Olavinlinna |
| myöhemmin | WOODFric Scrapes09 InMotionAudio Wood | InMotionAudio - Wood | 2024 | 0.6 | OK | Olavinlinna |
| myöhemmin | WOODMvmt FoleyMovement01 InMotionAudio Wood | InMotionAudio - Wood | 2024 | 3.3 | OK | Olavinlinna |
| myöhemmin | Water Swirl Metal Trashcan Light Medium | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 33.1 | OK | Olavinlinna |
| myöhemmin | Wooden Tearing 09 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 0.6 | TARKISTA (leikkautuu (3)) | Olavinlinna |
| myöhemmin | alien tripod debris rock collapse earthquake rumble large 005 | BluezoneCorp - Alien Tripod | 2024 | 5.7 | OK | Olavinlinna |
| myöhemmin | annihilation debris falling rock 001 | BluezoneCorp - Annihilation - Mech | 2021-23 | 1.8 | OK | Olavinlinna |
| myöhemmin | building collapse debris falling rock 008 | BluezoneCorp - Building Collapse | 2021-23 | 7.3 | OK | Olavinlinna |
| myöhemmin | building collapse debris falling rock rubble 008 | BluezoneCorp - Building Collapse | 2021-23 | 6.7 | OK | Olavinlinna |
| myöhemmin | building collapse debris falling rock rubble glass 010 | BluezoneCorp - Building Collapse | 2021-23 | 2.6 | OK | Olavinlinna |
| myöhemmin | grass 3 single step 3 | RYK-Sounds - Footstep | 2021-23 | 0.8 | OK | Olavinlinna |
| myöhemmin | ice crack break water 032 | BluezoneCorp - Ice Cracking | 2021-23 | 3.8 | OK | Olavinlinna |
| myöhemmin | mud 1 loop | RYK-Sounds - Footstep | 2021-23 | 3.1 | OK | Olavinlinna |
| myöhemmin | snow 7 single step 2 | RYK-Sounds - Footstep | 2021-23 | 0.9 | OK | Olavinlinna |
| myöhemmin | snow footsteps run 004 | Bluezone - Snow Footsteps | 2020 | 1.0 | OK | Olavinlinna |
| myöhemmin | snow footsteps walk 013 | Bluezone - Snow Footsteps | 2020 | 1.0 | OK | Olavinlinna |
| myöhemmin | snow footsteps walk deep 008 | Bluezone - Snow Footsteps | 2020 | 1.0 | OK | Olavinlinna |
| myöhemmin | snow footsteps walk light 008 | Bluezone - Snow Footsteps | 2020 | 1.0 | OK | Olavinlinna |
| myöhemmin | water splash 008 | Bluezone - Splash | 2020 | 5.4 | TARKISTA (ei tunnistu (Water 0.07)) | Olavinlinna |
| myöhemmin | water splash distant 007 | Bluezone - Splash | 2020 | 3.2 | TARKISTA (ei tunnistu (Water 0.23)) | Olavinlinna |
| myöhemmin | water splash drop 006 | Bluezone - Splash | 2020 | 1.3 | OK | Olavinlinna |
| myöhemmin | water splash small 008 | Bluezone - Splash | 2020 | 1.9 | OK | Olavinlinna |
| myöhemmin | wilderness flowing water stream 001 01 | Bluezone - Wilderness - Flowing Water | 2020 | 50.5 | OK | Olavinlinna |
| myöhemmin | 22 BELLMEN Kukuljanski Bell ringers | Ivo Vicic - Bellmen - Folk Custom | 2021-23 | 42.4 | TARKISTA (ei tunnistu (Tubular bells 0.09); puhe 0.41; musiikki 0.49) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | BELLDoor-INT Door Bell Low Tone Stereo | Justsoundeffects - Doors | 2021-23 | 22.8 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | metal heavy creaks shipwreck ship scraping its broadside 02 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 37.0 | TARKISTA (liikenne 0.30; leikkautuu (34)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Drop Soft - Single Plank Drop 02 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 0.5 | OK | Olavinlinna, Mylly ja Tavli |
| myöhemmin | Impacts Hard - Short Wobbly Tail 01 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 0.6 | TARKISTA (leikkautuu (52)) | Olavinlinna, Mylly ja Tavli |
| myöhemmin | Impacts Soft - Short Crack | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 0.5 | OK | Olavinlinna, Mylly ja Tavli |
| myöhemmin | Rustles - Pile Debris 22 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 0.7 | OK | Olavinlinna, Mylly ja Tavli |
| myöhemmin | WOODImpt Drops20 InMotionAudio Wood | InMotionAudio - Wood | 2024 | 0.6 | OK | Olavinlinna, Mylly ja Tavli |
| myöhemmin | WOODImpt Impact Wood 23 DDUMAIS NONE | David Dumais Audio - Melee Weapons Sound | 2021-23 | 1.2 | OK | Olavinlinna, Mylly ja Tavli |
| myöhemmin | stone impact 015 | BluezoneCorp - Stone Impact | 2024 | 1.6 | OK | Olavinlinna, Mylly ja Tavli |
| myöhemmin | stone impact 041 | BluezoneCorp - Stone Impact | 2024 | 2.0 | OK | Olavinlinna, Mylly ja Tavli |
| myöhemmin | stone impact hammer 015 | BluezoneCorp - Stone Impact | 2024 | 0.7 | OK | Olavinlinna, Mylly ja Tavli |
| myöhemmin | stone impact steel bar 01 010 | BluezoneCorp - Stone Impact | 2024 | 0.8 | OK | Olavinlinna, Mylly ja Tavli |
| myöhemmin | Pebbles - DROP - Dense - Mono | Pole Position Production - The Stone & S | 2021-23 | 119.6 | OK | Olavinlinna, Mylly ja Tavli, Käyttöliittymä |
| myöhemmin | Tatak ROCKS Pebbles Dust Tumbling Rolling Debris | Tatak Audio - Rocks and Debris | 2020 | 8.9 | OK | Olavinlinna, Mylly ja Tavli, Käyttöliittymä |
| myöhemmin | 0016 Garage Door Following Door Interior | Wav Junction Sound Effects - Doors | 2020 | 28.9 | OK | – (nykyaikainen) |
| myöhemmin | 006 Strong blast with medium crackles | Sound Villain – Fireworks Malta | 2020 | 20.2 | TARKISTA (ei tunnistu (Fire 0.01); puhe 0.54; leikkautuu (6)) | – (nykyaikainen) |
| myöhemmin | 6 35 GFL - Casings Shell & Cartridges - Drop bounce and roll on Wooden Floor - Outdoor | SculpTunes – Cartridges & Casings Shell | 2020 | 8.7 | OK | – (nykyaikainen) |
| myöhemmin | Alfa Romeo Giulia t12 Var SFX Door Interior DPA4021 | Pole Position - Alfa Romeo Giulia Quadri | 2020 | 1.5 | OK | – (nykyaikainen) |
| myöhemmin | Aston Martin Rapide S t11 Var SFX Door Open Interior | Pole Position - Aston Martin Rapide S 20 | 2020 | 1.6 | OK | – (nykyaikainen) |
| myöhemmin | Audi RS4 - t14 - VAR SFX - Gear Shift Paddle - - | Pole Position Production - Audi RS 4 201 | 2021-23 | 14.6 | TARKISTA (ei tunnistu (Rowboat, canoe, kayak 0.00)) | – (nykyaikainen) |
| myöhemmin | Black Hawk - VAR SFX - Stabilizer Manual Slew Switch - MKH418S | Pole Position - The Vehicle Doors and Mo | 2024 | 9.7 | OK | – (nykyaikainen) |
| myöhemmin | COMType Typewriter Olivetti Backspace key press with carriage movement CSND OLTY Mono | Dramatic Cat - Olivetti Typewriter - Oli | 2021-23 | 19.5 | OK | – (nykyaikainen) |
| myöhemmin | COMType Typewriter Olivetti Typing on keys without cover slow speed CSND OLTY Contact | Dramatic Cat - Olivetti Typewriter - Oli | 2021-23 | 77.3 | OK | – (nykyaikainen) |
| myöhemmin | CREAMisc Heavy Mechanical Footsteps 03 DDUMAIS MCSFX | DavidDumais - Robotic Creatures Sound FX | 2024 | 8.9 | OK | – (nykyaikainen) |
| myöhemmin | CST PlasticBox Tiny Close Multiple | SoundFxwizard - Closets Small Doors | 2020 | 4.7 | OK | – (nykyaikainen) |
| myöhemmin | Cessna 208 - t11 - VAR SFX - Fire Detection Alarm - Telinga | Pole Position Production - Cessna 208 Ca | 2021-23 | 12.4 | TARKISTA (ei tunnistu (Crackle 0.00)) | – (nykyaikainen) |
| myöhemmin | Citroen C5 - t9 - VAR SFX - Door Open and Close from the Inside - - | Pole Position - Citroen C5 2002 | 2024 | 44.0 | OK | – (nykyaikainen) |
| myöhemmin | DESTRCrsh Smashing a ceramics tile on concrete exterior Eneas Mentzel Debris & Rubble 04 | Eneas Mentzel - Debris & Rubble | 2021-23 | 1.5 | OK | – |
| myöhemmin | DESTRCrsh scrap wood falling interior perspective Eneas Mentzel Debris & Rubble 05 | Eneas Mentzel - Debris & Rubble | 2021-23 | 2.6 | OK | – (nykyaikainen) |
| myöhemmin | Designed 055 Hydrophone Water Splash And Flow | Soundholder - Abstract Aqua | 2020 | 15.0 | OK | – (nykyaikainen) |
| myöhemmin | Dodge Challenger Shaker SRT8 t10 Var SFX Door Interior | Pole Position - Dodge Challenger Shaker  | 2020 | 2.7 | OK | – (nykyaikainen) |
| myöhemmin | Dodge SRT8 2011 t10 Var SFX Door Various Interior ORTF MKH8040 | Pole Position - Dodge Challenger SRT8 20 | 2020 | 7.6 | OK | – (nykyaikainen) |
| myöhemmin | FOUNTAIN Medium Invigorating Network of Dribbles Close | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 74.1 | OK | – |
| myöhemmin | FRWKComr Fireworks Multi Close 01-04-Crackle | InspectorJ - Essentials 03 Fireworks | 2021-23 | 5.6 | TARKISTA (ei tunnistu (Crackle 0.10)) | – (nykyaikainen) |
| myöhemmin | Ferrari 308GTB t11 Var SFX Door Various Interior Left DPA4061 | Pole Position - Ferrari 308 GTB 1985 | 2020 | 16.2 | OK | – (nykyaikainen) |
| myöhemmin | Fiat RV - t12 - VAR SFX - Ignition Key 1 - - | Pole Position - Fiat-Sunlight T 67 2013 | 2024 | 11.2 | OK | – (nykyaikainen) |
| myöhemmin | Ford Fiesta WRC t9 Var SFX Door Various Decoded | Pole Position - Ford Fiesta WRC 2016 | 2020 | 6.9 | TARKISTA (liikenne 0.33) | – (nykyaikainen) |
| myöhemmin | GEARBOX - BUILDING BLOCK - LARGE - Original Helmsworth Cylinder Press 13 | Rock The Speakerbox - Gearbox | 2020 | 1.5 | OK | – (nykyaikainen) |
| myöhemmin | GEARBOX - CK - PERFORMANCE Metal Large A | Rock The Speakerbox - Gearbox | 2020 | 22.2 | OK | – (nykyaikainen) |
| myöhemmin | GEARBOX - DESIGNED - LARGE - Original Helmsworth Cylinder Press 01 | Rock The Speakerbox - Gearbox | 2020 | 13.8 | TARKISTA (leikkautuu (18)) | – (nykyaikainen) |
| myöhemmin | GEARBOX - DESIGNED - SMALL - Chronometric Revolving Instrument 02 | Rock The Speakerbox - Gearbox | 2020 | 8.4 | TARKISTA (leikkautuu (7)) | – (nykyaikainen) |
| myöhemmin | GS sail impact 004 | Gladestock Studios - Naval Warfare | 2021-23 | 1.0 | OK | – |
| myöhemmin | Gondola Snowboard Ski Lyft Style Small Size Mechanism Pulley Passing By V2 | Rzpost - The Gondola Lift | 2020 | 49.3 | OK | – |
| myöhemmin | HHDoors - Glass and Metal door - Int To ext - cheap door | SculpTunes - HHDoors - Household Doors a | 2020 | 38.8 | OK | – (nykyaikainen) |
| myöhemmin | HMNBrth Human Adult Female Breathe Growing Panic UberDuo INHL | UberDuo - Inhale – Tanja – Character Pla | 2024 | 19.1 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.00)) | – |
| myöhemmin | Hoof 2 Rocks Gallop-4-Step | Joshua Reinhardt - Ultimate Creature Foo | 2020 | 23.5 | OK | – (nykyaikainen) |
| myöhemmin | Kia Niro Hybrid - t17 - VAR SFX - Door from the Outside - - | Pole Position Production - Kia Niro Hybr | 2021-23 | 51.9 | TARKISTA (leikkautuu (16)) | – (nykyaikainen) |
| myöhemmin | MACHElev-INT Elevator Door Open Close Mechansim Stereo | Justsoundeffects - Doors | 2021-23 | 32.9 | OK | – (nykyaikainen) |
| myöhemmin | Mazda 6 III 2.0 Skyactive G foley doors open close interior mono | Soundholder - Mazda 6 III 2.0 Skyactive  | 2020 | 19.0 | OK | – (nykyaikainen) |
| myöhemmin | Mercedes AMG GTR - VAR SFX - Hand Movement on Steering Wheel - XY - | Pole Position - The Vehicle Doors and Mo | 2024 | 36.8 | OK | – (nykyaikainen) |
| myöhemmin | Mitsubishi Evo 8 t11 Var SFX Door Interior ORTF | Pole Position - Mitsubishi Lancer Evolut | 2020 | 1.0 | OK | – (nykyaikainen) |
| myöhemmin | PM RI Designed 19 Rocks Impact Hit Big LFE Heavy Designed | PMSFX - Rocky Impacts | 2020 | 2.2 | TARKISTA (leikkautuu (1)) | – (nykyaikainen) |
| myöhemmin | PM RI Designed 7 Rocks Impact Hit Big LFE Heavy Designed | PMSFX - Rocky Impacts | 2020 | 1.5 | TARKISTA (leikkautuu (4)) | – (nykyaikainen) |
| myöhemmin | PM SB DESIGNED IMPACT 116 Impact brick rock dirt gravel designed multi LFE | PMSFX - Shattering Bricks | 2020 | 3.1 | TARKISTA (leikkautuu (6)) | – (nykyaikainen) |
| myöhemmin | PM SB DESIGNED IMPACT 48 Impact brick rock dirt gravel designed multi LFE | PMSFX - Shattering Bricks | 2020 | 2.3 | TARKISTA (leikkautuu (6)) | – (nykyaikainen) |
| myöhemmin | Party-Pack Balloons Friction Hand Short 19 | InspectorJ - Party Pack | 2020 | 1.3 | OK | – |
| myöhemmin | Patria 6x6 - t16 - VAR SFX - Door Handle Open and Close - Interior POV - INTERIOR - - | Pole Position Production - Patria Pasi X | 2021-23 | 30.0 | TARKISTA (leikkautuu (12)) | – (nykyaikainen) |
| myöhemmin | Paw 1 Wood Trot-Walk | Joshua Reinhardt - Ultimate Creature Foo | 2020 | 25.4 | OK | – (nykyaikainen) |
| myöhemmin | Polaris Scrambler - t11 - VAR SFX - Ignition Key - - | Pole Position Production - Polaris Scram | 2021-23 | 23.5 | OK | – (nykyaikainen) |
| myöhemmin | Porsche 997 Cup t11 Var SFX Door Various Interior DPA4021 | Pole Position - Porsche 997 Cup 2012 | 2020 | 9.2 | TARKISTA (puhe 0.45) | – (nykyaikainen) |
| myöhemmin | Porsche Macan S Foley 04 - EXT door close saturated mono | Soundholder - Porsche Macan S 3.0 V6 | 2020 | 5.8 | OK | – (nykyaikainen) |
| myöhemmin | Robinson R44 t11 Ext Lift Off Climb Land Behind ORTF CMC6 | Pole Position Production - Robinson R44  | 2021-23 | 459.8 | TARKISTA (ei tunnistu (Bird 0.00); liikenne 0.63) | – |
| myöhemmin | Robinson R44 t5 Onbrd Start Idle Exhaust DPA4062 | Pole Position Production - Robinson R44  | 2021-23 | 371.7 | TARKISTA (ei tunnistu (Owl 0.00); liikenne 0.52) | – |
| myöhemmin | SBvfe1 Door Handle D 002 | Sonic Bat - Videogame Foley Essentials V | 2021-23 | 0.9 | OK | – (nykyaikainen) |
| myöhemmin | SBvfe2 Medium Rock Dropping 011 | Sonic Bat - Videogame Foley Essentials V | 2024 | 0.6 | OK | – (nykyaikainen) |
| myöhemmin | SBvfe2 Shaking Small Wooden Box 030 | Sonic Bat - Videogame Foley Essentials V | 2024 | 2.6 | OK | – (nykyaikainen) |
| myöhemmin | Scania 143 - t11 - VAR SFX - Door Open and Close from Inside - - | Pole Position Production - Scania R143HL | 2021-23 | 44.8 | TARKISTA (leikkautuu (6)) | – (nykyaikainen) |
| myöhemmin | Skydiver - ONBRD - INTERIOR PLANE - Flying with Door Open - Chest - MKH8020 | Pole Position - The Skydiving and Parach | 2024 | 94.7 | TARKISTA (puhe 0.49; liikenne 0.36) | – (nykyaikainen) |
| myöhemmin | TackleHeavy 3 Movement Scrape-Long | Joshua Reinhardt - Ultimate Creature Foo | 2020 | 18.1 | OK | – (nykyaikainen) |
| myöhemmin | Tallons Concrete Gallop-3-Step | Joshua Reinhardt - Ultimate Creature Foo | 2020 | 23.6 | TARKISTA (leikkautuu (101)) | – (nykyaikainen) |
| myöhemmin | Tankietka t5 Onbrd Slow Drive Various Interior Hatch Rear DPA4061 | Pole Position - Tankietka TKS 1936 | 2020 | 805.1 | TARKISTA (liikenne 0.80) | – (nykyaikainen) |
| myöhemmin | Tankietka t8 Var SFX Reload Hatch Closing MS CMC6XT MK41 MK8 | Pole Position - Tankietka TKS 1936 | 2020 | 2.8 | TARKISTA (leikkautuu (11)) | – (nykyaikainen) |
| myöhemmin | Textron WildCat X - t10 - VAR SFX - Ignition Key - - | Pole Position Production - Textron WildC | 2021-23 | 37.1 | OK | – (nykyaikainen) |
| myöhemmin | UBL Lo-Tech 70 one shot key Amin | Used Bin Loops - Lo-Tech Premium Degrade | 2024 | 6.9 | TARKISTA (musiikki 0.30) | – |
| myöhemmin | VW Golf - t12 - VAR SFX - Back Door - INTERIOR - - | Pole Position Production - Volkswagen Go | 2021-23 | 28.2 | OK | – (nykyaikainen) |
| myöhemmin | Volvo L90 Wheel Loader t10 Var SFX Door | Pole Position - Volvo L90c Wheel Loader  | 2020 | 19.4 | OK | – (nykyaikainen) |
| myöhemmin | WOODCrsh Designed Wood Crash And Debris 13 DDUMAIS NONE | DavidDumais - Explosion SFX Pack | 2024 | 1.7 | OK | – (nykyaikainen) |
| myöhemmin | creature footstep damp 015 | Bluezone - Cave Creature Sound Effects | 2020 | 1.1 | OK | – (nykyaikainen) |
| myöhemmin | demolisher debris rubble texture 004 | BluezoneCorp - Demolisher - Robot | 2021-23 | 2.4 | OK | – (nykyaikainen) |
| myöhemmin | demolisher robot mechanical footsteps rusty creak 005 | BluezoneCorp - Demolisher - Robot | 2021-23 | 0.7 | OK | – (nykyaikainen) |
| myöhemmin | designed water impact 006 | BluezoneCorp - Designed Water | 2024 | 3.3 | TARKISTA (ei tunnistu (Gurgling 0.10)) | – (nykyaikainen) |
| myöhemmin | designed water texture 014 | BluezoneCorp - Designed Water | 2024 | 2.0 | OK | – (nykyaikainen) |
| myöhemmin | designed water transition impact 017 | BluezoneCorp - Designed Water | 2024 | 3.7 | TARKISTA (leikkautuu (2)) | – (nykyaikainen) |
| myöhemmin | designed water underwater 005 | BluezoneCorp - Designed Water | 2024 | 4.6 | TARKISTA (ei tunnistu (Gurgling 0.19)) | – (nykyaikainen) |
| myöhemmin | ferrari 458 t10 var sfx onbrd door close firm exhaust right DPA4062 | Pole Position - Ferrari 458 2013 | 2020 | 0.4 | OK | – (nykyaikainen) |
| myöhemmin | ferrari 488 t17 var sfx onbrd door close double interior | Pole Position - Ferrari 488 2016 | 2020 | 3.4 | OK | – (nykyaikainen) |
| myöhemmin | lotus exige t15 var sfx onbrd door openinterior DPA4021 | Pole Position - Lotus Exige-S 2013 | 2020 | 1.5 | OK | – (nykyaikainen) |
| myöhemmin | mountain dweller creature orc footstep mud texture 003 | Bluezone - Mountain Dweller - Orc Sound  | 2020 | 1.8 | OK | – (nykyaikainen) |
| myöhemmin | mountain dweller texture fire whoosh 003 | Bluezone - Mountain Dweller - Orc Sound  | 2020 | 2.2 | TARKISTA (ei tunnistu (Crackle 0.01)) | – (nykyaikainen) |
| myöhemmin | renault master 2.3 dci foley interior slide door close | Soundholder - Renault Master IV 2.3 DCI  | 2020 | 5.6 | OK | – (nykyaikainen) |
| myöhemmin | soviet elevator door close 001 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 2.7 | OK | – (nykyaikainen) |
| myöhemmin | steampunk mechanical gear chain element start stop 014 | BluezoneCorp - Steampunk Mechanical Soun | 2021-23 | 1.2 | OK | – (nykyaikainen) |

### ympäristöt (196)

| merkintä | kuvaus | kirjasto | vuosi | kesto s | laatu | käyttöehdotus |
|---|---|---|---|---|---|---|
| **heti** | DOORWood School Classroom-Door-CD03 Old Wooden Door Squeaky Opening Closing Recorded From  | West Wolf - Quiet School Ambiences | 2021-23 | 20.0 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna |
| **heti** | Sea Seashore Water Lapping On Rocks Sea Wash Gently-AmbiX | Sonik Sound Library - Spatial Shores | 2020 | 215.0 | OK | **Elävä kaupunki: satama** · Olavinlinna |
| **heti** | DOORCreak Wooden Door Door Slams Impacts 3 RogueWaves CreakingDoor | Rogue Waves - Creaking Door | 2024 | 14.8 | OK | **Olavinlinna: vanhat ovet ja lukot** · Olavinlinna, Kuumailmapallo ja elävä kaupunki, Mylly ja Tavli |
| myöhemmin | 053 Very strong blast crackles sparkle | Sound Villain – Fireworks Malta | 2020 | 22.2 | TARKISTA (ei tunnistu (Crackle 0.01); leikkautuu (13)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | 110Hz (9Hz Alpha Waves) | 344 Audio - Mind States | 2021-23 | 60.0 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.00)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 146 Tunnel heavy waves scirocco 01 | Ivo Vicic - Northern Mediterranean sound | 2021-23 | 61.4 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 22 Wind strong hi voltage power lines winter near field | Ivo Vicic - Wind | 2020 | 255.0 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.08)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | 75Hz Monaural (15Hz Beta Waves) | 344 Audio - Mind States | 2021-23 | 60.1 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.00); musiikki 0.34) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBIENCE Huge Waves 1m Away From Impact Point 2 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 42.1 | TARKISTA (leikkautuu (38)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBIENCE Huge Waves 2m Away From Impact Point 1 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 38.7 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBInd Distant Port Atmos Dover Industrial Vehicles | Jake Fielding - Industrial Harbor | 2024 | 129.6 | TARKISTA (ei tunnistu (Waves, surf 0.04); musiikki 0.32; liikenne 0.42) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | AMBInd Industrial Town - Ambience - IT02 Close Distance City Hum Night Electric Buzz Indus | West Wolf - Distant Cities And Morning P | 2021-23 | 92.0 | TARKISTA (ei tunnistu (Owl 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | ANMLCat Cat Moew 03 MWSFX SEC | Mechanical Wave - Sound Effects Collecti | 2024 | 3.5 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Ambience Empty Garage Hum Metal Gate Hitting Wind Outside Scary-AmbiX | Sonik Sound Library - Spatial Roomtones  | 2020 | 200.7 | TARKISTA (ei tunnistu (Wind 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Ambience Through Seashell Sea Waves on Beach Shore Bottom Inside Isle-Aux-Coudres Canada | Articulated Sounds - Seashell Resonance | 2020 | 96.1 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | BELLHand Metallic Bell 22 MWSFX SEC | Mechanical Wave - Sound Effects Collecti | 2024 | 6.9 | TARKISTA (ei tunnistu (Stream 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | BOATMech EXT Small yacht rope moving through metal RogueWaves YachtMarina | Rogue Waves - Yacht & Marina | 2024 | 25.8 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | BOATMisc Boats going past Port | Jake Fielding - Industrial Harbor | 2024 | 164.2 | TARKISTA (liikenne 0.70) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Cromer Beach 3m from Shore Heavy Waves B-Format | Ambisound - Ambisonic Cromer Beach | 2020 | 402.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | E-Scooter Electric Bike - Outdoor Open Road - Start to FullSpeed to Stop - Windy Ride Brak | The Chris Alan - E-Scooter Electric Bike | 2023 | 12.2 | TARKISTA (ei tunnistu (Wind 0.01); liikenne 0.34) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | ELECZap Bug zapper zapping electricity crackle RogueWaves DruidMagic 37 | Rogue Waves - Druid Magic | 2021-23 | 1.1 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | FGHTImpt Fight Combo x4 RogueWaves AnimeStudio | Rogue Waves - Anime Studio | 2024 | 1.1 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Ford Puma WRC - t13 - VAR SFX - Driver Door from Outside - - | Pole Position - Ford Puma Hybrid Rally1  | 2024 | 23.0 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | GAMEVideo Big Explosion Rogue Waves 8-Bit Legend 13 | Rogue Waves - 8-Bit Legend | 2021-23 | 1.4 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | GAMEVideo Evil Spell Rogue Waves 8-Bit Legend | Rogue Waves - 8-Bit Legend | 2021-23 | 1.2 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | GAMEVideo Gem Pick Up Rogue Waves 8-Bit Legend 07 | Rogue Waves - 8-Bit Legend | 2021-23 | 0.3 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | GAMEVideo Inserting SNES Cartridge Sequence RogueWaves SuperCart | Rogue Waves - Super Cart | 2021-23 | 6.5 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | GAMEVideo Plugging in SNES Controller P1 2 RogueWaves SuperCart | Rogue Waves - Super Cart | 2021-23 | 1.1 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | GAMEVideo SNES Power On Static RogueWaves SuperCart | Rogue Waves - Super Cart | 2021-23 | 4.4 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | GLASBrk Glass Break Hit 04 MWSFX GL | Mechanical Wave - Glass | 2024 | 1.2 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | GLASMisc Glass Bottle Open 01 MWSFX GL | Mechanical Wave - Glass | 2024 | 5.3 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | GLASMisc Reverse Glass Effect 04 MWSFX GL | Mechanical Wave - Glass | 2024 | 3.3 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | GLASTonl Dark Tone Thrill 07 MWSFX GL | Mechanical Wave - Glass | 2024 | 4.1 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | HHDoors - 80s wooden door - 80s city apartment door - Opening and closing - close perspect | SculpTunes - HHDoors - Household Doors a | 2020 | 43.4 | TARKISTA (leikkautuu (654)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | ICEMisc Ice Sizzle 05 MWSFX SEC | Mechanical Wave - Sound Effects Collecti | 2024 | 8.8 | TARKISTA (ei tunnistu (Water 0.03)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | JSE Ocean Waves Gentle Sand 07 | justsoundeffects - Ocean Waves | 2020 | 76.4 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | JSE Ocean Waves Strong Cliff 09 | justsoundeffects - Ocean Waves | 2020 | 126.4 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | MAGEvil Dark Spell Dark Energy Attack RogueWaves DruidMagic | Rogue Waves - Druid Magic | 2021-23 | 2.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | METLCrsh Drop Fall Metal Rattle Scrap Debris 06 MWSFX TM | Mechanical Wave - Torturing Metal | 2024 | 0.7 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | METLFric Screeching Metal Rub-11 MWSFX TM | Mechanical Wave - Torturing Metal | 2024 | 3.3 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | METLImpt Metal Impact-03 MWSFX TM | Mechanical Wave - Torturing Metal | 2024 | 1.5 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | METLTonl Contact Mic Cable Rope Stays Percussive RogueWaves YachtMarina 02 | Rogue Waves - Yacht & Marina | 2024 | 23.5 | TARKISTA (musiikki 0.59) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | METLTonl Reversed Metal-28 MWSFX TM | Mechanical Wave - Torturing Metal | 2024 | 2.8 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | MOTRComb Chainsaw Working QUAD-01 MWSFX LJ | Mechanical Wave - Lumberjack | 2024 | 39.6 | TARKISTA (ei tunnistu (Water 0.03)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | MUSCStngr Open String Dive Bomb Down Whammy bar Low RogueWaves MetalTensions 13 | Rogue Waves - Metal Tensions | 2024 | 15.1 | TARKISTA (ei tunnistu (Water 0.00); musiikki 0.74) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | MUSCStngr Pick Scrape Down Short Overdriven RogueWaves MetalTensions | Rogue Waves - Metal Tensions | 2024 | 22.4 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.00); puhe 0.32; musiikki ) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | MUSCStngr Plastic Comb Scraping Strings 2 Overdriven RogueWaves MetalTensions | Rogue Waves - Metal Tensions | 2024 | 55.2 | TARKISTA (ei tunnistu (Water 0.00); musiikki 0.88) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | MUSCStngr Whammy Bar Flutter Clean RogueWaves MetalTensions | Rogue Waves - Metal Tensions | 2024 | 59.5 | TARKISTA (ei tunnistu (Stream 0.00); musiikki 0.86) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | OBJPack Big Cardboard Box Impact 02 MWSFX CDAP | Mechanical Wave - Cardboard and Paper | 2024 | 0.7 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | OBJPack Big Cardboard Box Slide 04 MWSFX CDAP | Mechanical Wave - Cardboard and Paper | 2024 | 2.5 | TARKISTA (ei tunnistu (Water 0.02)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Ocean Cave Resonant Hole Wet Distant Waves 02 | Sound Spark LLC - Ocean Ambience 1 Caves | 2020 | 100.0 | TARKISTA (ei tunnistu (Ocean 0.12); liikenne 0.30) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Ocean Shoreline Wide General Perspective Distant 01 | Sound Spark LLC - Ocean Ambience 1 Caves | 2020 | 98.6 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Ocean Wave Crash Distant Obstructed 04 | Sound Spark LLC - Ocean Ambience 1 Caves | 2020 | 7.5 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Ocean large waves crashing angainst dyke close perspective AmbiX | Dramatic Cat - Ambisonic Waves - Vol.1 B | 2021-23 | 190.8 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | PAPRHndl Large Book Squeak Page Turn 01 MWSFX CDAP | Mechanical Wave - Cardboard and Paper | 2024 | 2.4 | TARKISTA (ei tunnistu (Slosh 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | PAPRHndl Paper Sheet Crumple 04 MWSFX CDAP | Mechanical Wave - Cardboard and Paper | 2024 | 3.1 | TARKISTA (ei tunnistu (Slosh 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | SWSH Dry Bamboo Leaf Swishes 1 RogueWaves DruidMagic | Rogue Waves - Druid Magic | 2021-23 | 3.5 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | TOOLHand Shears Slide Open Close 01 MWSFX SEC | Mechanical Wave - Sound Effects Collecti | 2024 | 1.7 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | TRANSITION Medium Rumbling Wave | SmartSoundFX - Krypton | 2020 | 3.7 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | VEHCnst Bucket Pour Earth MWSFX EXS 07 | Mechanical Wave - Excavator Sounds | 2021-23 | 3.5 | TARKISTA (ei tunnistu (Slosh 0.11)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | VEHCnst Excavator Bucket Shake MWSFX EXS 03 | Mechanical Wave - Excavator Sounds | 2021-23 | 12.2 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.01)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | VEHCnst Excavator Working MWSFX EXS 06 | Mechanical Wave - Excavator Sounds | 2021-23 | 70.0 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.01); liikenne 0.77) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | VEHCnst Excavator Working MWSFX EXS 09 | Mechanical Wave - Excavator Sounds | 2021-23 | 15.5 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.01)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Volvo F6 Tow Truck t0 Onbrd Impulse Response Waves 2 Interior DPA4021 | Pole Position - Volvo F6 1979 tow truck | 2020 | 23.0 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | WATRLap Lake Small Sandy Beach Loop Cascadia Shore Waves | Nick McMahan - Cascadia Shore Waves | 2024 | 191.8 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WATRSurf Ocean Hydrophone In Sand Large Near Single 01 Cascadia Shore Waves | Nick McMahan - Cascadia Shore Waves | 2024 | 36.2 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.00)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WATRWave Water Lapping against port | Jake Fielding - Industrial Harbor | 2024 | 101.3 | TARKISTA (leikkautuu (30)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | WEAPSwrd Mecha Energy Sword Cut RogueWaves AnimeStudio | Rogue Waves - Anime Studio | 2024 | 1.2 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WHSH Whoosh Synth Noise 28 RogueWaves AnimeStudio | Rogue Waves - Anime Studio | 2024 | 8.7 | TARKISTA (ei tunnistu (Ocean 0.00)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WOODBrk Large Tree Heavy Fall-07 MWSFX LJ | Mechanical Wave - Lumberjack | 2024 | 11.9 | TARKISTA (ei tunnistu (Slosh 0.00); musiikki 0.37) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | WOODBrk Tree Crack and Fall-13 MWSFX TJ | Mechanical Wave - Lumberjack | 2024 | 4.6 | TARKISTA (ei tunnistu (Slosh 0.09)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Waves Splashing Boat B8 High Pitched Diffused Muddy Sea Ocean Underwater Boat Ride Designe | LukasTvrdon - Boat Ride | 2021-23 | 150.0 | TARKISTA (liikenne 0.33) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | ambience ocean waves 002 | Bluezone - Crab - Creature | 2020 | 33.6 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | ambience wind blowing short texture tree falling 002 | Bluezone - Forest Creature Sound Effects | 2020 | 8.0 | TARKISTA (ei tunnistu (Wind 0.04)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | electricity surge discharge electrical arc crackling 002 01 | BluezoneCorp - High Voltage | 2024 | 3.5 | TARKISTA (ei tunnistu (Crackle 0.00); leikkautuu (1)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | electricity texture sizzling crackling 006 | BluezoneCorp - High Voltage | 2024 | 2.8 | TARKISTA (ei tunnistu (Crackle 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | soundwave robot footsteps 001 | BluezoneCorp - Soundwave - Robot | 2021-23 | 1.0 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | creature wood attack impact dust 006 | Bluezone - Forest Creature Sound Effects | 2020 | 1.6 | OK | Mylly ja Tavli (nykyaikainen) |
| myöhemmin | 01 SPRING WATERFALLS fall continuous regular flow medium close Saut des Cuves MKH8040 | Sound Sower - Spring Waterfalls | 2020 | 162.8 | TARKISTA (ei tunnistu (Waterfall 0.13)) | Olavinlinna |
| myöhemmin | 02 Water mill wheel outdoor mid field stereo | Ivo Vicic - Watermill | 2020 | 77.1 | OK | Olavinlinna |
| myöhemmin | AMB WATERFLOW Creek Lively 10m Far MS | Systematic-Sound - Sounds Of Nature – Fl | 2020 | 176.4 | OK | Olavinlinna |
| myöhemmin | AMB WATERFLOW Stream Splash 2m Close M | Systematic-Sound - Sounds Of Nature – Fl | 2020 | 252.5 | OK | Olavinlinna |
| myöhemmin | AMBIENCE Water Soft Spring Small Bubbling | SmartSoundFX - Asian Countrysides | 2020 | 79.7 | OK | Olavinlinna |
| myöhemmin | AMBISONIC A EXT VENICE Night Skyline 02 | Coll Anderson - AMBISONICS - ITALY | 2020 | 180.2 | TARKISTA (ei tunnistu (Owl 0.00); puhe 0.83; musiikki 0.52) | Olavinlinna |
| myöhemmin | AMBISONIC A SD Screen Door Spring Tension 07 | Coll Anderson - AMBISONICS A - Metal Sou | 2020 | 9.2 | OK | Olavinlinna |
| myöhemmin | DOORGate Metal Gate Spring Latch Mechanism Screech | Jake Fielding - Squeaky Gates | 2024 | 38.4 | TARKISTA (musiikki 0.44; leikkautuu (16)) | Olavinlinna |
| myöhemmin | DOORGate Wooden Metal Hinge Creaks | Jake Fielding - Squeaky Gates | 2024 | 20.2 | TARKISTA (musiikki 0.46) | Olavinlinna |
| myöhemmin | Eerie Night Ambience | Apple Hill Studios - Horror Background A | 2020 | 212.9 | TARKISTA (ei tunnistu (Insect 0.14); musiikki 0.62) | Olavinlinna |
| myöhemmin | Footsteps Water Drops Dragging Items Ambience | Apple Hill Studios - Horror Background A | 2020 | 278.0 | OK | Olavinlinna |
| myöhemmin | GAMEBoard Chess Contact King Takes UberDuo Game | UberDuo - Game Night Audio Props | 2024 | 2.2 | TARKISTA (ei tunnistu (Insect 0.00)) | Olavinlinna |
| myöhemmin | GAMEBoard Scrabble Shotgun Tiles Drop UberDuo Game | UberDuo - Game Night Audio Props | 2024 | 1.1 | OK | Olavinlinna |
| myöhemmin | Harley Davidson V Rod t3 Ext Fast Away By x2 Up Stop XY | Pole Position - Harley Davidson V-Rod Ni | 2020 | 177.6 | TARKISTA (ei tunnistu (Owl 0.00); liikenne 0.65) | Olavinlinna |
| myöhemmin | Harley Davidson V Rod t7 Onbrd Start Idle Blips Steady in Neutral Off Exhaust DPA4062 | Pole Position - Harley Davidson V-Rod Ni | 2020 | 89.7 | TARKISTA (ei tunnistu (Insect 0.00); liikenne 0.59) | Olavinlinna |
| myöhemmin | ICEBrk FROZEN FARMLAND Footstep on frozen field Eneas Mentzel 39 | Eneas Mentzel - Frozen Farmlands | 2021-23 | 0.6 | OK | Olavinlinna |
| myöhemmin | Ice - HIT - Frozen Lake Surface - Impact - Break Through to Water - Wide AB - MKH8060 | Pole Position Production - The Frozen La | 2021-23 | 4.8 | TARKISTA (ei tunnistu (Water 0.01)) | Olavinlinna |
| myöhemmin | Ice - HIT - Frozen Lake Surface - Throw Ice Shavings - Scatter - Underwater - A - H2a | Pole Position Production - The Frozen La | 2021-23 | 45.4 | TARKISTA (ei tunnistu (Water 0.03)) | Olavinlinna |
| myöhemmin | Ice - HIT - Frozen Lake Surface - Throw Stone - Wide AB - MKH8060 | Pole Position Production - The Frozen La | 2021-23 | 12.5 | TARKISTA (ei tunnistu (Gurgling 0.01)) | Olavinlinna |
| myöhemmin | LIQUID HIT Lake Branch Splash Lake Seaweed in Water Small CU 04 | Articulated Sounds - Magic Elements vol. | 2020 | 2.1 | TARKISTA (ei tunnistu (Water 0.23)) | Olavinlinna |
| myöhemmin | Lyd SFX 359 Silverware 2 | Nikko Barrera-Amaya - Cooking night | 2020 | 0.8 | OK | Olavinlinna |
| myöhemmin | Lyd SFX 401 Plates 2 | Nikko Barrera-Amaya - Cooking night | 2020 | 1.0 | OK | Olavinlinna |
| myöhemmin | Lyd SFX 451 Cooking 6 | Nikko Barrera-Amaya - Cooking night | 2020 | 16.9 | TARKISTA (ei tunnistu (Frog 0.00)) | Olavinlinna |
| myöhemmin | Lyd SFX 535 Cup 10 | Nikko Barrera-Amaya - Cooking night | 2020 | 1.2 | OK | Olavinlinna |
| myöhemmin | SBAr Fire Department Siren 001 | Sonic Bat - Ambisonics - Roomtones | 2021-23 | 186.0 | TARKISTA (ei tunnistu (Fire 0.00)) | Olavinlinna |
| myöhemmin | SBAr3 First Floor Living Room With Balcony Door Closed 001 | Sonic Bat - Ambisonics - Roomtones III | 2024 | 524.9 | TARKISTA (linnut 0.36) | Olavinlinna |
| myöhemmin | The Chris Alan - Hot Tub SFX - Ambience - Seamless Loop - All Bubble Jets On - High Water  | The Chris Alan - Hot Tub SFX (Jacuzzi-Sp | 2020 | 13.0 | TARKISTA (ei tunnistu (Ocean 0.08)) | Olavinlinna |
| myöhemmin | The Chris Alan - Hot Tub SFX - Ambience - Seamless Loop - Bubble Jet Set A On - Medium Wat | The Chris Alan - Hot Tub SFX (Jacuzzi-Sp | 2020 | 26.5 | TARKISTA (ei tunnistu (Raindrop 0.23); liikenne 0.32) | Olavinlinna |
| myöhemmin | WATRFlow Small Waterfall Close Constant White Noise Bubbling Immersive Creek RODE NTSF1 Am | Bolt - Immersive Creek -  Ambisonic Reco | 2024 | 613.6 | OK | Olavinlinna |
| myöhemmin | forest tree wood texture creaking 016 | BluezoneCorp - Forest Textures | 2021-23 | 2.7 | OK | Olavinlinna |
| myöhemmin | forest wood log debris falling 3 007 | BluezoneCorp - Forest Textures | 2021-23 | 1.6 | OK | Olavinlinna |
| myöhemmin | wilderness flowing water waterfall small 002 | Bluezone - Wilderness - Flowing Water | 2020 | 40.0 | OK | Olavinlinna |
| myöhemmin | 0005 Water River Medium Flow Medium Distance | Wav Junction Sound Effects - Rivers & St | 2020 | 54.5 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 0014 Water large stream 1ft waterfall base | Wav Junction Sound Effects - Rivers & St | 2020 | 59.0 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 0078 - Short Mid Weak Wet Screeching Barking Explosive Transient Punchy Natural Cheeser | The Chris Alan - 1000 Winds Project (Far | 2020 | 0.4 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 03 Wind turbine rear near field 2 MS STEREO | Ivo Vicic - Wind turbine | 2020 | 130.1 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.12)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 03b SPRING WATERFALLS river small flow close bubbles Pont des Fees MKH8020 | Sound Sower - Spring Waterfalls | 2020 | 216.5 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 06 Wind turbine rear mid field MS STEREO | Ivo Vicic - Wind turbine | 2020 | 65.1 | TARKISTA (liikenne 0.30) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 06c SPRING WATERFALLS fall river far distance bubbles Cascade Charlemagne hydrophone | Sound Sower - Spring Waterfalls | 2020 | 236.5 | TARKISTA (ei tunnistu (Stream 0.24)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 07 Waterfall near field 7 LOOP | Ivo Vicic - Mountain rivers and streams | 2020 | 70.5 | TARKISTA (ei tunnistu (Waterfall 0.24)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 07 Wind cypress tree canopy near field | Ivo Vicic - Wind | 2020 | 116.2 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 157 Urban island small town harbour water lapping against harbour wall and ship hull 02 | Ivo Vicic - Northern Mediterranean sound | 2021-23 | 45.7 | TARKISTA (ei tunnistu (Water 0.17)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 22 Wind turbine body turbine CONTACT MIC | Ivo Vicic - Wind turbine | 2020 | 28.1 | TARKISTA (ei tunnistu (Wind 0.08)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 29 Rapids near field LOOP 2 | Ivo Vicic - Mountain rivers and streams | 2020 | 95.4 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 63 River near field LOOP 11 | Ivo Vicic - Mountain rivers and streams | 2020 | 73.3 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 74 River mid field LOOP 2 | Ivo Vicic - Mountain rivers and streams | 2020 | 154.2 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMB WATERFLOW Lake Shore Waves Detailed Windy 1m Close Loop 01 ST | Systematic-Sound - Sounds Of Nature – Fl | 2020 | 77.4 | TARKISTA (ei tunnistu (Wind 0.03)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBForst Nighttime-Woodlands Windy Trees Rustling Quiet SYSO SYSO009 | Systematic Sound - General Ambience Seri | 2024 | 265.4 | TARKISTA (ei tunnistu (Wind 0.01)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBISONIC A EXT Forrest Winter Wind Morning 02 | Coll Anderson - AMBISONICS A Countryside | 2020 | 180.2 | TARKISTA (ei tunnistu (Wind 0.03)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBNaut Atmos EXT Marina boats rope creaking RogueWaves YachtMarina 11 | Rogue Waves - Yacht & Marina | 2024 | 90.0 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBRlgn Church Bells Ringing Village | Justsoundeffects - Urban Ambiences | 2021-23 | 252.2 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBRoom Bedroom Groundfloor Doors & Windows Closed 344 Audio UK Residential Room Tones | 344 Audio - UK Residential Room Tones | 2021-23 | 180.0 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBRurl Meadow Open Plane Windy Deep Rumble SYSO SYSO011-1 | Systematic Sound - General Ambience Seri | 2024 | 236.3 | TARKISTA (ei tunnistu (Wind 0.07)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | BOATInt Atmos INT Small yacht cabin hatch open RogueWaves YachtMarina | Rogue Waves - Yacht & Marina | 2024 | 77.1 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | CRWDApls INT British Rock Show Applause Guitar Clapping 344 Audio UK Seaside Town & Theme  | 344 Audio - UK Seaside Town & Theme Park | 2021-23 | 25.6 | TARKISTA (ei tunnistu (Stream 0.00)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Calm River 02 | Stefano Cremona - Rivers, Streams, Creek | 2024 | 121.0 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Calm wind in pine tree forest 2.0 | HERZ - Baltic quad surroundings | 2020 | 579.2 | TARKISTA (ei tunnistu (Wind 0.04)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Cromer Beach In Stones Light Waves B-Format | Ambisound - Ambisonic Cromer Beach | 2020 | 451.7 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | DOORCreak Wooden Door Opening and Closing 09 RogueWaves CreakingDoor | Rogue Waves - Creaking Door | 2024 | 8.4 | TARKISTA (musiikki 0.38) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | EFX SD Design Wind Swells 03 | Coll Anderson - Gentle Wind | 2020 | 198.2 | TARKISTA (ei tunnistu (Wind 0.06)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | EFX SD Fire in Metal Stove 03 | Coll Anderson - Gentle Wind | 2020 | 87.5 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.02); liikenne 0.36) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | EFX SD Sheltered from the Wind 02 | Coll Anderson - Gentle Wind | 2020 | 215.1 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.01)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | FLWA 74 - Dam water flowing splashing waves clucking movement | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 24.2 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Forest cold wind in alitude the morning | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 86.9 | TARKISTA (ei tunnistu (Wind 0.14)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | JSE Ocean Waves Between Rocks 04 | justsoundeffects - Ocean Waves | 2020 | 108.2 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | JSE Ocean Waves Gentle Rocks 01 | justsoundeffects - Ocean Waves | 2020 | 146.0 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Jet - Airliner - Fly - By - Overhead - Distant - Some Leaves and Wind - CMC6 | Pole Position - The Aircraft Ambient Lib | 2024 | 71.1 | TARKISTA (ei tunnistu (Wind 0.02)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | MAGElem Water Spell Splash Attack Medium 2 RogueWaves DruidMagic | Rogue Waves - Druid Magic | 2021-23 | 3.6 | TARKISTA (ei tunnistu (Slosh 0.00)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Moving Loops Wind Breaker Loopable | Badlands Sound - Moving Loops | 2020 | 30.0 | TARKISTA (ei tunnistu (Wind 0.00)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Ocean Transient Coquina Rock Splash Low Noise 06 | Sound Spark LLC - Ocean Ambience 1 Caves | 2020 | 1.9 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Ocean small waves flowing between rocks very close perspective Stereo | Dramatic Cat - Ambisonic Waves - Vol.1 B | 2021-23 | 268.3 | TARKISTA (ei tunnistu (Stream 0.25)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | PM ASR Sea Waves Lapping Bettwen Narrow Rocks | PMSFX - Ancient Sea Ruins | 2020 | 224.8 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | PM ASR Sea Waves Swells Over Stone Ruins 12ft Away | PMSFX - Ancient Sea Ruins | 2020 | 330.6 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RMB10 AMBIENCE CITY RUMBLE Large city Light wind debris | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 131.9 | TARKISTA (ei tunnistu (Wind 0.04); liikenne 0.33) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | River 02 | Stefano Cremona - Rivers, Streams, Creek | 2024 | 120.5 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | SBAsw Mountain Ridge Windy Morning 005 | Sonic Bat - Ambisonics - Springtime Wood | 2020 | 305.0 | TARKISTA (ei tunnistu (Wind 0.02); linnut 0.30; eläimet 0.48) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | SFX Large Wave Splash on Rocks 21 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 7.8 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | SFX Medium Wave Splash on Rocks 12 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 7.9 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Scotch - air tone quiet nature airy wind presence deserted road loch lochy - LR | aXLsound - Scottish Highlands | 2020 | 532.6 | TARKISTA (ei tunnistu (Wind 0.01)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Scotch - loch lochy small quiet waves wavelets ripple lake water movement - C | aXLsound - Scottish Highlands | 2020 | 233.5 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Scotch - loch lochy small quiet waves wavelets ripple lake water movement - LR | aXLsound - Scottish Highlands | 2020 | 233.5 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Scotch - loch lochy small quiet waves wavelets ripple lake water movement - usiAB | aXLsound - Scottish Highlands | 2020 | 233.5 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Small Creek Close 02 | Stefano Cremona - Rivers, Streams, Creek | 2024 | 120.9 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | TRNMisc Rollercoaster Pass By Wooden Mechanism 344 Audio UK Seaside Town & Theme Park | 344 Audio - UK Seaside Town & Theme Park | 2021-23 | 16.6 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | The Chris Alan - ASTRAL - Textures Spirits Sprites Bell-like Rhythmic Uncertainty Fmin | The Chris Alan - ASTRAL - Otherworldly S | 2020 | 16.0 | TARKISTA (ei tunnistu (Tubular bells 0.01); musiikki 0.70) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | The Chris Alan - ASTRAL - Textures Spirts Winds Eerie Airy Scary 04 | The Chris Alan - ASTRAL - Otherworldly S | 2020 | 24.0 | TARKISTA (ei tunnistu (Howl 0.00); musiikki 0.79; leikkautuu (10)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | VEHDoor-INT Opel Zafira Open Close Drivers Door Mono | Justsoundeffects - Doors | 2021-23 | 26.5 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WATRFall Waterfall Roaring Rumble 03 | Justsoundeffects - Streams and Rivers | 2021-23 | 142.4 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WATRFlow River Small Gurgling between Stones 01 | Justsoundeffects - Streams and Rivers | 2021-23 | 48.6 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WATRFlow Trickle Gurgling in Forest | Justsoundeffects - Streams and Rivers | 2021-23 | 50.8 | TARKISTA (ei tunnistu (Drip 0.18)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WATRSurf Ocean Medium to Large Rocks 02 Loop Cascadia Shore Waves | Nick McMahan - Cascadia Shore Waves | 2024 | 208.5 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WATRTurb River Rapids Rushing between Rocks Distant | Justsoundeffects - Streams and Rivers | 2021-23 | 81.6 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WELLINGTON 01C Rockpools Rocks Waves Crash White Water Passes Island Bay MKH8040 | Trent Williams - Aotearoa New Zealand | 2020 | 173.5 | TARKISTA (liikenne 0.33) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WINDVege Mixed Forest Wind Blowing Through Birches Beeches And Spruces Tree Trunk Squeakin | Justsoundeffects - Forests of Norway | 2024 | 140.3 | TARKISTA (ei tunnistu (Wind 0.05)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Waves Splashing Boat D Medium Hitting Sea Ocean Underwater ASF1 | LukasTvrdon - Boat Ride | 2021-23 | 143.5 | TARKISTA (liikenne 0.41) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Wind - Cherry Tree - Strong - Bed - On Ground - ORTF - CMC6 | Pole Position - Wind In Trees | 2024 | 138.4 | TARKISTA (ei tunnistu (Wind 0.04)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Wind - Oak - Calm - Close - Inside Canopy - XY - MKH8060 | Pole Position - Wind In Trees | 2024 | 242.0 | TARKISTA (ei tunnistu (Wind 0.03)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | wilderness flowing water river 002 | Bluezone - Wilderness - Flowing Water | 2020 | 47.0 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | texture wood transition impact 003 | Bluezone - Nightfall - Scary Sound Effec | 2020 | 7.1 | OK | Olavinlinna, Mylly ja Tavli |
| myöhemmin | AMBIENCE Inside Museum Walking POV Bali Indonesia LOOP | Articulated Sounds - Bali Ubud Village A | 2020 | 72.3 | TARKISTA (puhe 0.40; musiikki 0.59) | – |
| myöhemmin | AMBRoom Hotel Corridor - Room Tone - HC16 Old Hotel Corridor Quiet Empty Distant Light Hum | West Wolf - Quiet Hotels At Night Vol.2 | 2021-23 | 304.0 | TARKISTA (ei tunnistu (Owl 0.01)) | – (nykyaikainen) |
| myöhemmin | AMBRoom Hotel Staircase - Room Tone - HS03 Hotel Staircase Service Staircase Quiet Evening | West Wolf - Quiet Hotels At Night Vol.2 | 2021-23 | 130.0 | TARKISTA (ei tunnistu (Owl 0.00); musiikki 0.47) | – (nykyaikainen) |
| myöhemmin | AMBRoom Hotel Staircase - Room Tone - HS07 Hotel Staircase Evening Elevators 11 00 pm 8th  | West Wolf - Quiet Hotels At Night Vol.2 | 2021-23 | 336.0 | TARKISTA (ei tunnistu (Owl 0.02); musiikki 0.52) | – (nykyaikainen) |
| myöhemmin | Ambience Roomtone Computer Classroom 16 iMacs Next Door Light Activity Hum with Hi-Freq Bu | Sonik Sound Library - Spatial Roomtones  | 2020 | 156.7 | OK | – (nykyaikainen) |
| myöhemmin | Electric Electronic Data hard disk pulse crackle spurious long | Sound Sower - Electric Field | 2020 | 54.4 | TARKISTA (ei tunnistu (Fire 0.01)) | – (nykyaikainen) |
| myöhemmin | Ferrari 812 t9 Var SFX Doors Various Interior AMBEO3 | Pole Position - Ferrari 812 Superfast 20 | 2020 | 26.7 | OK | – (nykyaikainen) |
| myöhemmin | Ferrari F12 t13 Var SFX Door Various Interior AMBEO4 | Pole Position - Ferrari F12 2016 | 2020 | 5.2 | OK | – (nykyaikainen) |
| myöhemmin | Fire Monster Vocals 6 | Olivier Girardot - Monster Sounds & Atmo | 2020 | 7.0 | TARKISTA (ei tunnistu (Crackle 0.00); puhe 0.53) | – (nykyaikainen) |
| myöhemmin | ICE Thin Cracked Crust on Lake 16 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 6.0 | TARKISTA (ei tunnistu (Drip 0.00)) | – |
| myöhemmin | Ice - SLIDE - Frozen Lake Surface - Throw Ice Pieces - Scatter - Wide AB - MKH8060 | Pole Position Production - The Frozen La | 2021-23 | 48.0 | TARKISTA (ei tunnistu (Pour 0.12)) | – |
| myöhemmin | MACHAppl Electrical Fridge Hum Water Drips Rattle | Jake Fielding - Fridge Hums | 2024 | 47.6 | TARKISTA (ei tunnistu (Water 0.23)) | – (nykyaikainen) |
| myöhemmin | MACHAppl Water Cooler Fridge Electrical Appliance | Jake Fielding - Fridge Hums | 2024 | 124.2 | TARKISTA (ei tunnistu (Water 0.00)) | – (nykyaikainen) |
| myöhemmin | Peterbilt 359 1969 t11 Var SFX Door Interior Exterior Interior AMBEO2 | Pole Position - Peterbilt 359 1969 | 2020 | 28.8 | OK | – (nykyaikainen) |
| myöhemmin | SBAb 5 Meters From Shore Early Morning 005 | Sonic Bat - Ambisonics - Beach | 2024 | 230.4 | OK | – |
| myöhemmin | Stream - LIGHT - Medium Speed - Flow - Left-Heavy Trickles | Pole Position - Winter Forest Stream | 2024 | 32.1 | OK | – |
| myöhemmin | WATRFlow Babbling Brook Snow Melt Calm Constant Bubbling BOLT Immersive Creek RODE NTSF1 X | Bolt - Immersive Creek -  Ambisonic Reco | 2024 | 179.0 | OK | – |
| myöhemmin | creature wood footstep medium 004 | Bluezone - Forest Creature Sound Effects | 2020 | 1.9 | OK | – (nykyaikainen) |
| myöhemmin | creature wood texture crack heavy rumble 006 | Bluezone - Forest Creature Sound Effects | 2020 | 4.1 | OK | – (nykyaikainen) |

### eläimet (90)

| merkintä | kuvaus | kirjasto | vuosi | kesto s | laatu | käyttöehdotus |
|---|---|---|---|---|---|---|
| **heti** | Summer in the Fields - Evening-Night 002 - Crickets sing close - dogs barks all around - c | SculpTunes - Summer in the field - Crick | 2020 | 251.8 | OK | **Olavinlinna: kesäyö (sirkat, pöllö)** · Olavinlinna |
| **heti** | Summer in the Fields - Evening-Night 004- Distant crickets shrill high frequencies - flat  | SculpTunes - Summer in the field - Crick | 2020 | 182.3 | OK | **Olavinlinna: kesäyö (sirkat, pöllö)** · Olavinlinna |
| myöhemmin | 0002 Ambience Forest Crows Birds Chirping | Wav Junction Sound Effects - Ambience | 2020 | 107.9 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 185 Soundscape mountain forest thunderstorm close birds distant summer | Ivo Vicic - European mountain forest ani | 2020 | 227.5 | TARKISTA (ei tunnistu (Bird 0.05)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMB SUBURB Crow in City Sparrow Chirps Montreal Canada LOOP | Articulated Sounds - Nature in the City | 2020 | 48.4 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBBird Ambience Rural Residencial Birds Chorus Cuckoo Light Human Activity KS Spatial Cou | Sonik Sound Library - Spatial Countrysid | 2024 | 179.5 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBIENCE Birds Medium Distant Village and People | SmartSoundFX - Asian Countrysides | 2020 | 109.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBUrbn Distant Town - Ambience - DT03 Far Distance Distant City Rumble Village Birds Dist | West Wolf - Distant Cities And Morning P | 2021-23 | 124.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | ANMLFarm Pig Squeal and Snort-18 MWSFX FA | Mechanical Wave - Farm Animals | 2024 | 1.6 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | BIRDFowl Chick Squawks-02 MWSFX FA | Mechanical Wave - Farm Animals | 2024 | 10.0 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | BIRDFowl Goose Baby And Adult-02 MWSFX FA | Mechanical Wave - Farm Animals | 2024 | 14.5 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | BIRDFowl Rooster Call-12 MWSFX FA | Mechanical Wave - Farm Animals | 2024 | 2.5 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | BIRDPrey Red Kite Call Screech Bird of Prey Hawk | Jake Fielding - Red Kite | 2024 | 20.5 | TARKISTA (ei tunnistu (Owl 0.13)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | BIRDSong Bird Nature Isolated Spain | Jake Fielding - Sounds of Spain | 2024 | 55.6 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Bird Flamingos 05 | SoundBits - Collected Animals | 2020 | 3.3 | TARKISTA (ei tunnistu (Bird 0.08)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Forest frogs insects birds the morning 390 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 93.8 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | GAMEVideo Creature Birds Rogue Waves 8-Bit Legend | Rogue Waves - 8-Bit Legend | 2021-23 | 0.8 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Jungle insects and birds passing wide the evening 313 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 154.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Jungle quiet insects and birds wide | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 140.9 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RATH - Rain Distant Thunder and Bird Loop | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 64.9 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | ROOMTONE IN BAMBOO HUT MORNING AT SUNRISE BIRDS NATURE ROOSTER WAVES IN BG NEIL ISLAND AND | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 332.4 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.00)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Rain Interior Garage Rainfall Pour Metal roof | toneglowlibraries - Wind and Rain Interi | 2021-23 | 247.4 | TARKISTA (ei tunnistu (Wind 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | SBahob Agapornis Single Call 013 | Sonic Bat - A Handful Of Birds | 2021-23 | 1.3 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | SBahob Psittacula Krameri Single Call 002 | Sonic Bat - A Handful Of Birds | 2021-23 | 1.1 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | SBahob Serinus Canaria Domesticus Singing 013 | Sonic Bat - A Handful Of Birds | 2021-23 | 16.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | SBahob Trichoglossus Moluccanusi Single Call 047 | Sonic Bat - A Handful Of Birds | 2021-23 | 0.5 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Village early the morning birds and insects from a palm farm | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 226.1 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Village mountain very quiet and birds | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 130.2 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WAIKATO 01B Dawn Chorus Birds Magpie Turkey Cow Rural Farmland Hora Hora MKH8040 | Trent Williams - Aotearoa New Zealand | 2020 | 324.6 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Wind Interior Attic Blustery Sporadic Raindrops | toneglowlibraries - Wind and Rain Interi | 2021-23 | 297.8 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Wind Interior Rooftop Soft Whoosh | toneglowlibraries - Wind and Rain Interi | 2021-23 | 163.0 | TARKISTA (ei tunnistu (Wind 0.05)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | birds outside 002 wide | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 56.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBIENCE Insects Medium Night Summer Distant Village | SmartSoundFX - Asian Countrysides | 2020 | 76.2 | OK | Olavinlinna |
| myöhemmin | ANF063 | TheWorkRoom Audio Post - Animal Footstep | 2023 | 17.9 | OK | Olavinlinna |
| myöhemmin | ANF090 | TheWorkRoom Audio Post - Animal Footstep | 2023 | 21.9 | TARKISTA (musiikki 0.38) | Olavinlinna |
| myöhemmin | CKT005 | TheWorkRoom Audio Post - Cricket - Junio | 2020 | 12.9 | TARKISTA (ei tunnistu (Owl 0.00)) | Olavinlinna |
| myöhemmin | CKT020 | TheWorkRoom Audio Post - Cricket - Junio | 2020 | 30.2 | TARKISTA (ei tunnistu (Insect 0.00); leikkautuu (12)) | Olavinlinna |
| myöhemmin | CKT029 | TheWorkRoom Audio Post - Cricket - Junio | 2020 | 70.7 | TARKISTA (ei tunnistu (Insect 0.00); leikkautuu (20)) | Olavinlinna |
| myöhemmin | Dog Chain-Hits | Conor Bradley - Metal Chains | 2020 | 8.7 | OK | Olavinlinna |
| myöhemmin | JSE Cicada Ambience Morning Jungle Thailand 02 | justsoundeffects - Crickets and Cicadas | 2020 | 57.2 | OK | Olavinlinna |
| myöhemmin | JSE Single Cicada Noon Countryside Italy 02 | justsoundeffects - Crickets and Cicadas | 2020 | 55.4 | OK | Olavinlinna |
| myöhemmin | JSE Single Cricket Night Countryside Italy 05 | justsoundeffects - Crickets and Cicadas | 2020 | 28.3 | TARKISTA (ei tunnistu (Insect 0.02)) | Olavinlinna |
| myöhemmin | Rice field frogs and insects close wide at night 376 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 124.4 | OK | Olavinlinna |
| myöhemmin | SBAb In Water Crowded Afternoon 004 | Sonic Bat - Ambisonics - Beach | 2024 | 340.7 | TARKISTA (puhe 0.51) | Olavinlinna |
| myöhemmin | VEHWagn Wood Cart Roll On Stone Pavement In Courtyard 03 DRCA HOCA Kmr81i | Dramatic Cat - Horse Carriage - Draft Ho | 2021-23 | 16.5 | OK | Olavinlinna |
| myöhemmin | ambience outdoors late night cold winter air pack of canine howling into the night and man | Omar Alvarado - Minimal ambiences | 2021-23 | 264.0 | TARKISTA (eläimet 0.77) | Olavinlinna |
| myöhemmin | 0004 Wind gusty buffeted mountainside birds | Wav Junction Sound Effects - Wind | 2020 | 112.1 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 0008 Wind heavy slow headwind distant birds cows | Wav Junction Sound Effects - Wind | 2020 | 57.9 | TARKISTA (ei tunnistu (Wind 0.10)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 0018 Ambience loud flies light birds crickets wind | Wav Junction Sound Effects - Ambience | 2020 | 64.3 | TARKISTA (ei tunnistu (Wind 0.04); eläimet 0.94) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 0770 - Medium Deep Average Juicy Bubbley Speaking Explosive Rhythmic Beefy Forced Froggy | The Chris Alan - 1000 Winds Project (Far | 2020 | 0.8 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 09 River close shot nature birds no people | Federica Vairani - Italian ambience | 2021-23 | 92.7 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMB - 7.1.4 - Suburb Outskirts - Forest Edge - Outside Summerhouse - Many Birds - Wind - A | Pole Position - Ambiences for Atmos Vol  | 2024 | 360.0 | TARKISTA (ei tunnistu (Wind 0.00); linnut 0.38) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMB - 7.1.4 - Suburb Outskirts - Forest Edge - Outside Summerhouse - Many Birds - Wind - A | Pole Position - Ambiences for Atmos Vol  | 2024 | 360.2 | TARKISTA (ei tunnistu (Wind 0.00); linnut 0.40) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMB - 7.1.4 - Suburb Outskirts - Forest Edge - Outside Summerhouse - Many Birds - Wind - A | Pole Position - Ambiences for Atmos Vol  | 2024 | 360.0 | TARKISTA (ei tunnistu (Wind 0.00); linnut 0.32) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMB - 7.1.4 - Suburb Outskirts - Forest Edge - Outside Summerhouse - Many Birds - Wind - A | Pole Position - Ambiences for Atmos Vol  | 2024 | 360.0 | TARKISTA (ei tunnistu (Wind 0.00); linnut 0.35) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMB - 7.1.4 - Suburb Outskirts - Forest Edge - Outside Summerhouse - Many Birds - Wind - A | Pole Position - Ambiences for Atmos Vol  | 2024 | 360.0 | TARKISTA (ei tunnistu (Wind 0.00); linnut 0.38) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMB - 7.1.4 - Suburb Outskirts - Forest Edge - Outside Summerhouse - Many Birds - Wind - A | Pole Position - Ambiences for Atmos Vol  | 2024 | 360.2 | TARKISTA (ei tunnistu (Wind 0.00); linnut 0.40) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMB - 7.1.4 - Suburb Outskirts - Forest Edge - Outside Summerhouse - Many Birds - Wind - A | Pole Position - Ambiences for Atmos Vol  | 2024 | 360.0 | TARKISTA (ei tunnistu (Wind 0.00); linnut 0.32) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMB - 7.1.4 - Suburb Outskirts - Forest Edge - Outside Summerhouse - Many Birds - Wind - A | Pole Position - Ambiences for Atmos Vol  | 2024 | 360.0 | TARKISTA (ei tunnistu (Wind 0.00); linnut 0.35) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMB PARK Solo Cricket Seagulls City Rumble Montreal Canada LOOP | Articulated Sounds - Nature in the City | 2020 | 62.9 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBBird Cicadas Crickets Insects Birds Nature | Jake Fielding - Sounds of Spain | 2024 | 132.3 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBForst Spring Noon Deciduous Forest Gentle Wind Leaves Rustling Blackbird Raven in Backg | Justsoundeffects - Forest Ambiences | 2024 | 111.4 | TARKISTA (ei tunnistu (Wind 0.02)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBIENCE Birds Forest Quiet Wind Loop 02 | SmartSoundFX - Mavic Travel Filmmaker | 2020 | 56.0 | TARKISTA (ei tunnistu (Wind 0.12)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBIENCE Savanna Medium Dawn River Bed Birds Bedlam | SmartSoundFX - Nature South Africa | 2020 | 120.1 | TARKISTA (ei tunnistu (Pour 0.00)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBIENCE Savanna Soft Water Hole Dusk Birds Insects Calm | SmartSoundFX - Nature South Africa | 2020 | 131.2 | TARKISTA (ei tunnistu (Drip 0.00); eläimet 0.59) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBRurl Field Wheat Dry Sizzle Insects Wind Soft SYSO SYSO011 | Systematic Sound - General Ambience Seri | 2024 | 161.9 | TARKISTA (ei tunnistu (Wind 0.01); eläimet 0.90) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | ANF108 | TheWorkRoom Audio Post - Animal Footstep | 2023 | 19.1 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Ambience Residential Night Crickets Night Bird-AmbiX | Sonik Sound Library - Spatial Towns | 2020 | 300.0 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | BIRDFowl Goose coming out of water 344 Audio Geese | 344 Audio - Geese | 2021-23 | 3.9 | TARKISTA (ei tunnistu (Water 0.00)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | BIRDPrey Spring Night Deciduous Forest Many Tawny Owls Wind Leaves Rustling | Justsoundeffects - Forest Ambiences | 2024 | 52.2 | TARKISTA (ei tunnistu (Wind 0.00)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | BIRDSong Spring Noon Coniferous Forest Coal Tit Wind | Justsoundeffects - Forest Ambiences | 2024 | 93.7 | TARKISTA (ei tunnistu (Wind 0.01); linnut 0.81) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | City place quiet birds bell light activity and animals 410 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 95.7 | TARKISTA (ei tunnistu (Bell 0.02); puhe 0.35; musiikki 0.47; linnut 0.) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Desert canyon quiet light birds and wind large reverb | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 167.0 | TARKISTA (ei tunnistu (Wind 0.00); eläimet 0.49) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Forest Daytime Birds Outdoors Nature Spring | 344 Audio- UK Canals, Parks & Forests | 2021-23 | 180.0 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Forest cicadas insects and birds at night | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 174.5 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Forest quiet birds and wind the morning | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 60.8 | TARKISTA (ei tunnistu (Wind 0.00); linnut 0.76; eläimet 0.84) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | JSE Cricket Ambience Evening Jungle Distant Bird Vietnam | justsoundeffects - Crickets and Cicadas | 2020 | 29.4 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | QUIET STREET Night fast chirp crickets distant activities slight wind | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 286.6 | TARKISTA (ei tunnistu (Wind 0.09); eläimet 0.67) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | QUIET STREET Wet air wind sparse birds | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 228.2 | TARKISTA (ei tunnistu (Wind 0.05); liikenne 0.31) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Summer in the fields - DAY Morning - 005 - killing little birds near - owl - cicadas - bee | SculpTunes - Summer in the field - Crick | 2020 | 102.2 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Summer in the fields - DAY Morning - 017 - the cicadas stridulate very loudly - cowbells a | SculpTunes - Summer in the field - Crick | 2020 | 218.5 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | TROPICAL Rainforest night sleep with soft sparse bird calls | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 74.7 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Village quiet insects birds dogs and light activity away | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 152.1 | TARKISTA (ei tunnistu (Bird 0.18)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WAINUIAMATA 02A Bush Dawn Chorus Tree Wind Dawn Birds Breeze Distant River Falling Leaves  | Trent Williams - Aotearoa New Zealand | 2020 | 284.3 | TARKISTA (ei tunnistu (Wind 0.01); eläimet 0.73) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WEATHER WIND Synth Static Pitch Evolutive Low Medium Howling Whistling Eerie | Articulated Sounds - Rare Winds | 2020 | 96.3 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.01)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WIND Wind Soft Wind Howling Soft Leaves Rustle on Concrete KS Spatial Counstryside-Stereo  | Sonik Sound Library - Spatial Countrysid | 2024 | 105.1 | TARKISTA (ei tunnistu (Wind 0.03)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | FEETHors Draft Horse Walk On On Grass And Dirt MONO DRCA HOCA | Dramatic Cat - Horse Carriage - Draft Ho | 2021-23 | 14.7 | OK | – |
| myöhemmin | PD32 Polystyrene Designed Alien Bug Insect Wing Flapping Squeaky Weird | Submerged Tapes - Polystyrene Destructio | 2020 | 7.3 | TARKISTA (ei tunnistu (Water 0.01)) | – (nykyaikainen) |
| myöhemmin | TROPICAL Wetland swamp evening foaming frog dusk chorus | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 140.4 | OK | – |
| myöhemmin | creature texture water movement large animal 009 | Bluezone - Cave Creature Sound Effects | 2020 | 3.2 | TARKISTA (ei tunnistu (Gurgling 0.16)) | – (nykyaikainen) |

### sää (53)

| merkintä | kuvaus | kirjasto | vuosi | kesto s | laatu | käyttöehdotus |
|---|---|---|---|---|---|---|
| myöhemmin | 01 Rain urban gentle 1 MS STEREO | Ivo Vicic - Rain in urban and natural en | 2020 | 146.1 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 22 Rain drainage pit MS STEREO | Ivo Vicic - Rain in urban and natural en | 2020 | 131.3 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 92 Rain mountain cabin porch MS STEREO | Ivo Vicic - Rain in urban and natural en | 2020 | 63.1 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBIENCE Weather Soft Rain Thunder 01 | SmartSoundFX - Asian Countrysides | 2020 | 123.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Aluminium Boat Hull - WAVE IMPACTS - Medium - DPA4061 | Pole Position - The Stormbat Hull Intera | 2024 | 87.1 | TARKISTA (ei tunnistu (Water 0.07)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Ambience Rain Pouring-Long | Blond Panda - Decaying Factory | 2020 | 49.3 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Essential 13 high rpm | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 21.5 | TARKISTA (ei tunnistu (Water 0.00); musiikki 0.87) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Gas Burner Stereo 4 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 26.0 | TARKISTA (ei tunnistu (Fire 0.00); liikenne 0.30) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | HAIL Hail Interior Glass 02 LOOP | InspectorJ - Essentials 06 Rain | 2021-23 | 42.3 | TARKISTA (ei tunnistu (Rain 0.17)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | PM RD DESIGNED CONSTANT BACKING NOISE 5 | PMSFX - Rain Designer | 2020 | 70.0 | TARKISTA (ei tunnistu (Rain 0.06)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | PM RD DESIGNED DRIPPY ON IRON PLATE 3 | PMSFX - Rain Designer | 2020 | 98.2 | TARKISTA (ei tunnistu (Water 0.01)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | PM RD DESIGNED DRIPPY ON TARP FOLIAGE 2 | PMSFX - Rain Designer | 2020 | 64.1 | TARKISTA (ei tunnistu (Rain 0.08)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | QUIET STREET Rain near sewer | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 86.1 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RAIN Distant Thunder and Rain Long Thunderstorm C BOLT BackyardRain UsiPro | Bolt - Backyard Rain & Thunder - Suburba | 2024 | 129.7 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RAIN Weather Rain Heavy with Distant Thunders KS Spatial Rain & Thunders-AmbiX KSL KS010 | Sonik Sound Library - Spatial Rain & Thu | 2024 | 468.6 | TARKISTA (leikkautuu (2)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RAINConc Ambience Rain Moderate 03 LOOP | InspectorJ - Essentials 06 Rain | 2021-23 | 30.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RAINVege Ambience Rain Moderate 02 LOOP | InspectorJ - Essentials 06 Rain | 2021-23 | 20.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RATH - Rain Hard Loop 08 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 19.7 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RATH - Rain and Distant Thunder Loop 01 | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 44.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RATH - Rain on Plastic Outside Loop | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 26.2 | OK | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Rain in forest the day | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 65.9 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | THUN Thunder Very-Close Rain 03 | InspectorJ - Essentials 01 Thunder | 2021-23 | 18.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | THUN Weather Rain Light Rain with Thuder Rumbles and Vehicles Passing on Wet Floor KS Spat | Sonik Sound Library - Spatial Rain & Thu | 2024 | 173.5 | TARKISTA (liikenne 0.31) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | UIGlitch Heavy Glitches RogueWaves GlitchGrains 26 | Rogue Waves - Glitch Grains | 2021-23 | 1.0 | TARKISTA (puhe 0.43) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | UIGlitch Impact RogueWaves GlitchGrains 14 | Rogue Waves - Glitch Grains | 2021-23 | 1.1 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | UIGlitch Radio Static-LW Radio Static RogueWaves GlitchGrains 11 | Rogue Waves - Glitch Grains | 2021-23 | 30.2 | TARKISTA (ei tunnistu (Water 0.01)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | UIGlitch Whoosh RogueWaves GlitchGrains 01 | Rogue Waves - Glitch Grains | 2021-23 | 1.3 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WEATHER Rain Large Camping Tent near Sea Isle-au-Coudre Canada LOOP | Articulated Sounds - Moody Rain Loops | 2020 | 60.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WEATHER Rain Small Designed Metal Plate Asynchronous Drips LOOP | Articulated Sounds - Moody Rain Loops | 2020 | 60.0 | TARKISTA (musiikki 0.49) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | WEATHER WIND Apartment Moderate Strange Whistling Door Gap Moan Argentina LOOP | Articulated Sounds - Rare Winds | 2020 | 74.9 | TARKISTA (musiikki 0.35) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | ambient rain light washed out stereo MS | Soundholder - Rain & Thunder | 2020 | 47.4 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | ambient thunder clap distant with rain mono | Soundholder - Rain & Thunder | 2020 | 30.8 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | ambient thunder with subtle rain short dry mono | Soundholder - Rain & Thunder | 2020 | 75.3 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | rain umbrella 001 wide | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 60.0 | OK | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 0008 Water small drainpipe close to opening | Wav Junction Sound Effects - Water | 2020 | 53.1 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 0434 - Long Deep Powerful Airy Sneaky Thunderous Bomber Steady Tremor Forced Wrecker | The Chris Alan - 1000 Winds Project (Far | 2020 | 1.2 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 0954 - Long Deep Powerful Juicy Crackling Thunderous Explosive Rhythmic Wreckless Forced W | The Chris Alan - 1000 Winds Project (Far | 2020 | 3.3 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.00); leikkautuu (46)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | 102 Rain cave entrance waterdrops MS STEREO | Ivo Vicic - Rain in urban and natural en | 2020 | 127.0 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBISONIC A INT Lift Shack Metal Clock Tick Wind Storm 02 | Coll Anderson - AMBISONICS A - Wind Stor | 2020 | 240.3 | TARKISTA (ei tunnistu (Wind 0.01)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBISONIC A INT Wooden Warehouse Wind Storm 01 | Coll Anderson - AMBISONICS A - Wind Stor | 2020 | 180.2 | TARKISTA (ei tunnistu (Wind 0.10)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | AMBUrbn Nighttime-Urban Side Street Empty Rain Dops Hum SYSO SYSO009 | Systematic Sound - General Ambience Seri | 2024 | 148.1 | TARKISTA (ei tunnistu (Drip 0.01); puhe 0.91) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Aluminium Boat Hull - ROCKING - High Intensity - MKH8060 | Pole Position - The Stormbat Hull Intera | 2024 | 174.8 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | EFX SD Wind Soft Whistling Gusts 04 | Coll Anderson - Gentle Wind | 2020 | 120.1 | TARKISTA (ei tunnistu (Wind 0.08)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | PM RD RAIN 8 MODERATE DRIPPY | PMSFX - Rain Designer | 2020 | 56.0 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RAIN Rain at Night Slow Crescendo Calm Suburban BOLT BackyardRain UsiPro | Bolt - Backyard Rain & Thunder - Suburba | 2024 | 453.6 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RAINMetl Rain Water Gurgling and Spraying in Gutter during Rainstorm Distant Thunder Rumbl | Sonik Sound Library - Spatial Rain & Thu | 2024 | 191.1 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | RAINVege Rain Mixed Forest Dropping On Leaves And Gravel Path | Justsoundeffects - Forests of Norway | 2024 | 74.8 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Strong Wind Gusts Arctic Polar Icy Endless | 344 Audio - Haunting Ambiences Vol. 2 | 2021-23 | 180.0 | TARKISTA (ei tunnistu (Wind 0.02)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WEATHER WIND Beach Strong Gusty Storm Sands & Seaweed Tierra Del Fuego Argentina LOOP | Articulated Sounds - Rare Winds | 2020 | 125.0 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.14)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WEATHER WIND City Street Wind in Trees Strong Foliage Rustle Gust Wash Subtle Creaks & Noi | Articulated Sounds - Nature in the City | 2020 | 159.2 | TARKISTA (ei tunnistu (Wind 0.06)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WEATHER WIND Mountain Slope Strong Inside Jacket Hood Sustained Blustery Gusty Binaural Pa | Articulated Sounds - Rare Winds | 2020 | 48.1 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.13); liikenne 0.33) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | WHSH Airy-Whoosh Wind Gust 11 RSCPC DW | Rescopic Sound - Distinct Whooshes | 2024 | 4.5 | TARKISTA (ei tunnistu (Wind 0.00)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Wind - Aspen - Gusts - Close - Inside Canopy - XY - MKH8060 | Pole Position - Wind In Trees | 2024 | 156.4 | TARKISTA (ei tunnistu (Wind 0.02)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |

### musiikilliset (30)

| merkintä | kuvaus | kirjasto | vuosi | kesto s | laatu | käyttöehdotus |
|---|---|---|---|---|---|---|
| myöhemmin | AMBUrbn City Evening Rain Chef Audio Cinematic Sound FX | Marek Klemczak - ARTA Cinematic Sound FX | 2021-23 | 239.3 | TARKISTA (ei tunnistu (Ocean 0.04)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | CINEMATIC - DRONE or AMBIENCE - Sparking Creaking Buzzing Organic Whale-like Sweeping - Be | Pole Position Production - The Cinematic | 2021-23 | 63.1 | TARKISTA (musiikki 0.43) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | DSGNBoom Cinematic Hit MWSFX CF 05 | Mechanical Wave - Cinematic Feel | 2024 | 8.1 | TARKISTA (ei tunnistu (Water 0.00); musiikki 0.87) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | DSGNDron Mystery Bells | Justsoundeffects - Cinematic Drones | 2021-23 | 128.0 | TARKISTA (ei tunnistu (Chime 0.02); musiikki 0.81) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | DSGNMisc Charge Down Classic 1 RogueWaves AnimeStudio | Rogue Waves - Anime Studio | 2024 | 2.5 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | DSGNMisc Gore Downshifter MWSFX CF 01 | Mechanical Wave - Cinematic Feel | 2024 | 7.3 | TARKISTA (ei tunnistu (Water 0.00)) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Dark Drone Deep Waves Of Darkness | Systematic Sound - Tonal Elements Obscur | 2023 | 211.7 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.00); musiikki 0.82) | Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Dark Drone Intensive Electric Waves | Systematic Sound - Tonal Elements Obscur | 2023 | 224.2 | TARKISTA (ei tunnistu (Boat, Water vehicle 0.01); musiikki 0.83) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | eternity synth chimes texture 001 | BluezoneCorp - Eternity - Ethereal Ambie | 2021-23 | 9.5 | TARKISTA (ei tunnistu (Bell 0.02)) | Käyttöliittymä |
| myöhemmin | DSGNErie Note Howl Metallic Bowed Reverb Eerie Single 06 HZBIT Microbes | Hzandbits - Microbes | 2021-23 | 23.2 | TARKISTA (ei tunnistu (Howl 0.00)) | Olavinlinna |
| myöhemmin | MR - Small Metal Box Bright Creaking Tonal Dragging | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 7.9 | OK | Olavinlinna |
| myöhemmin | WATRFlow Rapid Water Movement Next to Waterfall Vibrations Drone Rumble BOLT Immersive Cre | Bolt - Immersive Creek -  Ambisonic Reco | 2024 | 667.8 | TARKISTA (ei tunnistu (Rain 0.01); liikenne 0.33) | Olavinlinna |
| myöhemmin | DSGNDron Inside the Submarine 344 Audio Wind Sculpture | 344 Audio - Wind Sculpture | 2021-23 | 180.0 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.01)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | DSGNDron Raw Ringing Tree 01 344 Audio Wind Sculpture | 344 Audio - Wind Sculpture | 2021-23 | 180.0 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.06); liikenne 0.47) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | DSGNDron Tibetan Bowl and Rainstick Atmos Wind 2 344 Audio Cymbals From Hell Vol 3 | 344 Audio - Cymbals From Hell Vol. 3 | 2021-23 | 20.2 | TARKISTA (ei tunnistu (Wind 0.00); musiikki 0.36) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Enchanting Bells 4 | CB Sound Design - Dreamcatcher - The Sou | 2021-23 | 75.6 | TARKISTA (ei tunnistu (Tubular bells 0.04); musiikki 0.91) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Heavy Water Churning Deep Ocean Drones Wind | 344 Audio - Haunting Ambiences Vol. 2 | 2021-23 | 180.0 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.05); liikenne 0.58) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | Ice and Wind Drone 6 | CB Sound Design - Exoplanets - Drones &  | 2021-23 | 125.4 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.00)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | TonalWind Atmo FluteLikeRoughMids HeavyBlow Mono | Sound of Essen - Tonal Wind | 2020 | 138.1 | TARKISTA (ei tunnistu (Wind noise (microphone) 0.01)) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | TonalWind Atmo SealLikeHowling Mono | Sound of Essen - Tonal Wind | 2020 | 128.0 | TARKISTA (ei tunnistu (Howl 0.06); musiikki 0.36) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | TonalWind XTra Windmill Outside Stereo | Sound of Essen - Tonal Wind | 2020 | 81.0 | TARKISTA (liikenne 0.33) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
| myöhemmin | BELLMisc Chimes Atmos Dark Magic Unsetting Magical 01 344 Audio Cymbals From Hell Vol 3 | 344 Audio - Cymbals From Hell Vol. 3 | 2021-23 | 16.4 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki, Käyttöliittymä |
| myöhemmin | BELLMisc Chimes Atmos Dark Magic Unsetting Magical 06 344 Audio Cymbals From Hell Vol 3 | 344 Audio - Cymbals From Hell Vol. 3 | 2021-23 | 54.7 | OK | Olavinlinna, Kuumailmapallo ja elävä kaupunki, Käyttöliittymä |
| myöhemmin | CLOCKChim Old Wall Clock 1920 Chimes Ringing | Justsoundeffects - Clocks and Mechanics | 2021-23 | 52.9 | TARKISTA (ei tunnistu (Tubular bells 0.06); musiikki 0.46) | Olavinlinna, Käyttöliittymä |
| myöhemmin | DSGNRise Cinematic Metallic Riser Trailer Designed Eerie Wail JF Haunted Metal Vol 2 02 | Jake Fielding - Haunted Metal Vol.2 - Ci | 2024 | 21.5 | TARKISTA (musiikki 0.77) | – (nykyaikainen) |
| myöhemmin | DSGNRise Cinematic Metallic Riser Trailer Designed Groan JF Haunted Metal Vol 2 08 | Jake Fielding - Haunted Metal Vol.2 - Ci | 2024 | 9.6 | TARKISTA (musiikki 0.82) | – (nykyaikainen) |
| myöhemmin | DSGNRise Cinematic Metallic Riser Trailer Designed JF Haunted Metal Vol 2 39 | Jake Fielding - Haunted Metal Vol.2 - Ci | 2024 | 12.4 | OK | – (nykyaikainen) |
| myöhemmin | DSGNRise Cinematic Metallic Riser Trailer Designed JF Haunted Metal Vol 2 67 | Jake Fielding - Haunted Metal Vol.2 - Ci | 2024 | 22.7 | TARKISTA (musiikki 0.57; leikkautuu (76)) | – (nykyaikainen) |
| myöhemmin | DSGNRise Tense Metallic Creaky Hits Groan JF Haunted Metal Vol 3 14 | Jake Fielding - Haunted Metal Vol.3 - Ci | 2024 | 17.5 | OK | – (nykyaikainen) |
| myöhemmin | Stream - STRONG - Medium Speed - Flow - Gush - Thick Surge with Tonal Burbling | Pole Position - Winter Forest Stream | 2024 | 39.3 | OK | – |

### käyttöliittymä (14)

| merkintä | kuvaus | kirjasto | vuosi | kesto s | laatu | käyttöehdotus |
|---|---|---|---|---|---|---|
| **heti** | GAMEBoard Kid's Board Game Shotgun Pawns UberDuo Game 05 | UberDuo - Game Night Audio Props | 2024 | 1.2 | OK | **Mylly ja Tavli: nappulat** · Olavinlinna, Mylly ja Tavli, Käyttöliittymä |
| **heti** | medium wooden pieces on cardboard 7 | CB Sound Design - Board Games – Gamedesi | 2021-23 | 0.8 | OK | **Mylly ja Tavli: nappulat** · Olavinlinna, Mylly ja Tavli, Käyttöliittymä |
| myöhemmin | GAMEVideo Pressing SNES Start Button 4 RogueWaves SuperCart | Rogue Waves - Super Cart | 2021-23 | 0.4 | OK | Kuumailmapallo ja elävä kaupunki, Käyttöliittymä |
| myöhemmin | OBJCont Coffee Tin Lid Open 3 RogueWaves KawaiiUI | Rogue Waves - Kawaii UI | 2024 | 0.5 | OK | Kuumailmapallo ja elävä kaupunki, Käyttöliittymä |
| myöhemmin | TOONPop Syringe Pop 4 RogueWaves KawaiiUI | Rogue Waves - Kawaii UI | 2024 | 0.7 | OK | Kuumailmapallo ja elävä kaupunki, Käyttöliittymä |
| myöhemmin | UIClick Hand Pop UI Diminished 1 RogueWaves KawaiiUI | Rogue Waves - Kawaii UI | 2024 | 0.2 | OK | Kuumailmapallo ja elävä kaupunki, Käyttöliittymä |
| myöhemmin | UIClick Operating System UI Cursor RogueWaves KawaiiUI | Rogue Waves - Kawaii UI | 2024 | 0.1 | OK | Kuumailmapallo ja elävä kaupunki, Käyttöliittymä |
| myöhemmin | 56 Interior Front door lock button lock unlock mono position 02 | Ivo Vicic - Land Rover Defender TDI 300 | 2020 | 13.5 | OK | Käyttöliittymä (nykyaikainen) |
| myöhemmin | Latchlocker aluminum link jostle slide click out over | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 1.3 | OK | Käyttöliittymä (nykyaikainen) |
| myöhemmin | Robinson R44 t13 Var SFX Master Battery Button CMC6 | Pole Position Production - Robinson R44  | 2021-23 | 35.5 | TARKISTA (ei tunnistu (Bird 0.00); liikenne 0.46) | Käyttöliittymä (nykyaikainen) |
| myöhemmin | SmartNotif - 095 - Pebble - DRY | aXLsound - Smartphone Notification Sound | 2020 | 2.5 | OK | Mylly ja Tavli, Käyttöliittymä (nykyaikainen) |
| myöhemmin | plastic pawns on cardboard more steps 4 | CB Sound Design - Board Games – Gamedesi | 2021-23 | 3.0 | OK | Mylly ja Tavli, Käyttöliittymä (nykyaikainen) |
| myöhemmin | coins sack throwing mono | Soundholder - Sack Of Coins | 2020 | 33.9 | TARKISTA (ei tunnistu (Slosh 0.00)) | Olavinlinna, Käyttöliittymä |
| myöhemmin | coins throwing from hand to hand mono | Soundholder - Sack Of Coins | 2020 | 52.0 | TARKISTA (ei tunnistu (Water 0.00)) | Olavinlinna, Käyttöliittymä |

### ihmiset ja väkijoukot (5)

| merkintä | kuvaus | kirjasto | vuosi | kesto s | laatu | käyttöehdotus |
|---|---|---|---|---|---|---|
| myöhemmin | AMB MADRID Sol Side Street Rain Pedestrians Walla | Systematic-Sound - General Ambience Seri | 2020 | 365.7 | TARKISTA (ei tunnistu (Raindrop 0.04); puhe 0.74) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | AMBISONIC A INT Church Dismiss Long Walla Walk Out 01 | Coll Anderson - AMBISONICS A - People | 2020 | 267.3 | TARKISTA (puhe 0.83; eläimet 0.45) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | AMBUrbn Berlin Balcony Late Afternoon Walla Ambulance Public Transport Church Bells BOLT B | Bolt - Berlin Vignettes - Ambiences and  | 2024 | 303.8 | TARKISTA (ei tunnistu (Bell 0.06); puhe 0.41; liikenne 0.43) | Kuumailmapallo ja elävä kaupunki (nykyaikainen) |
| myöhemmin | Asia Echoes Luang Prabang Night Market 2 | Spectravelers - Asia Echoes - Laos - Vie | 2020 | 309.7 | TARKISTA (ei tunnistu (Insect 0.07); puhe 0.63; musiikki 0.35) | Olavinlinna |
| myöhemmin | Temple Hinduism indoor song singer and bells | Sonniss.com - GDC 2017 - Game Audio Bund | 2017 | 239.7 | TARKISTA (ei tunnistu (Jingle bell 0.11); musiikki 0.74) | Olavinlinna, Kuumailmapallo ja elävä kaupunki |
