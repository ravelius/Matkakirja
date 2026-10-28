# Kivipinnat v4 — nykyinen UV-sopimus säilyy

Yksi muunnelma v01. Reunakivi-v01 on v3:n omistajan lukitsema pinta TAVUTARKASTI ennallaan. Sokkelin ja lattian uusi per-kivi-jako on havainnekorjaus f0766ed58 / Lavastajan 28.10. tilauksen mukaan.

| Pinta | Metriä | PNG px | Toisto |
|---|---|---|---|
| reunakivi | 0,70 × 0,52 | 360 × 266 | Clamp |
| sokkeli | 2,00 × 1,20 | 1024 × 614 | X Repeat / Y Clamp |
| sokkelin-ylapinta | 2,00 × 0,10 | 1024 × 51 | X Repeat / Y Clamp |
| pilarin-etu | 0,60 × 1,20 | 307 × 614 | Clamp |
| pilarin-sivu | 0,40 × 1,20 | 205 × 614 | Clamp |
| lattialaatat | 2,00 × 2,00 | 1024² | X/Y Repeat |

Sokkelissa nyt KAHDEKSAN 0,15 m tiilikertaa; pituus 1/3m, puolikas limitys 1/6m. Kuvan yläreuna = ylin kerta. Yläpinnan saumat ovat samassa x-kohdassa kuin ylin kerta. Pilarissa 0,30m tiilet: etukuvan OIKEA reuna liittyy sivukuvan VASEMPAAN; kulman yli 0,20/0,10m vuorottelu. Samaa kuvakorkeuden suuntaa käytettävä. Reunakiven aiempi UV-avaus .30m top + .02m bevel + .20m front ennallaan.

Lattian pystysuunta = kujan suunta. Kolme vaihtelevan pituista .70/.55/.75m kivilinjaa poikittain; kunkin rivin leveydet ja saumat vaihtuvat, joten pystysuunnassa ei kulje katkeamatonta kaistasaumaa. Harmaat eivät vuorottele ruutukuviona. Suurin osa kivistä pidempiä kujan suuntaan, lyhyimmät lähellä neliötä. Pintaan ei ole piirretty valkoisia suonia.

Sauma noin1cm; pyöreä olkaprofiili lattialla27mm ja tiilillä13mm, myös tasossa pyöristyvät kulmat (lattia24mm, tiili10mm). Korkeusero saumasta kivipintaan5,7mm. Pyöristys tulee normal/height-kartoista, eikä muuta siluettia tai törmäysgeometriaa.

Jokaisessa kansiossa:
- albedo: sRGB PNG, valaisematon pohjaväri. Esikatselun valoa/AO:ta/varjoa ei ole leivottu siihen.
- normal-opengl: lineaarinen tangenttiavaruuden +Y-normal map. PNG:n rivit kulkevat alas, tavallinen UV-v kulkee ylös. Jos importer käyttää DirectX/-Y-normalia, käännä vihreä kanava importerissa. Älä käännä koko kuvaa yhden kanavan sijasta.
- roughness: lineaarinen harmaasävy, valkea = karhea. Jos moottori käyttää smoothnessia, smoothness=1−roughness. Metallic=0.
- height: vapaaehtoinen 16-bit lineaarinen PNG, korkeus metreinä = arvo/65535 ×0,007 −0,006. Älä lisää displacementia normaalin lisäksi automaattisesti; normal riittää mobiiliin. Nämä eivät muuta törmäyspintaa.


Yksi uusi, rauhallinen ImageGen-albedopohja (native1254²) säilytetty sources/stone-calm-native.png. Lähdekuvaa ei retusoitu. Mittatarkka materiaaligraafi näytteistää pohjaa kiviin ja määrittää saumat, sävyerot, pyöristykset ja normaalit geometrisesti. Albedossa ei ole esikatselun valoa. Kehote sources/PROMPT.txt ja job imagegen-job.json. Tripo0kutsua/0krediittiä.

24PNG:n hash/readback/koko,16bitheight,normalin yksikköpituus ja +Z, pilarikulman jatkuvuus sekä toistorajat tarkistettu. Vertailuarkki on tekninen materiaaliesikatselu, ei uusi pelikamerapari. LR kokoaa ja ottaa parin samoilla asetuksilla; KK/omistaja hyväksyy sen.
