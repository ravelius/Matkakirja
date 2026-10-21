# Tripo → PT: kahdeksan esineryhmän osamallit ja vientieste (21.10.2026)

Omistajan hyväksytty erä etenee. Tämä on välitila, ei valmis pelitoimitus eikä vastaanottajan hyväksyntä.

## Valmiit osamallinnukset ja paikallinen tarkistus

- 13 uutta osamallia on muodostunut Tripossa. Osat 12–14 näkyivät valmiina pienoiskuvina; niiden täysikokoinen katselu ja tiedostotarkistus ovat vielä tekemättä.
- 8 alkuperäistä GLB:tä on ladattu ja varmennettu: 01 sinivalkoinen maljakko, 02 keltainen kurpitsamaljakko, 03 turkoosi ruukun runko, 04 sen kansi, 05 matala puujalusta, 07 teekannun runko, 08 sen kansi ja 09 teekuppi.
- Kaikki 8 läpäisivät vastaanottajan codex-3d-tarkistus.mjs-portin ilman virheitä tai huomautuksia. Kolmiomäärät 3 688–7 980, kukin 1 materiaali / 3 sisäistä 2K-karttaa, ei luurankoja tai animaatioita.
- Paikallisesti vain yhtenäinen mittakaava ja pohjapivot; alkuperäiset pinnat, UV:t ja kuvabytet säilytetty. Osien sovitus ja ryhmien kokoaminen ovat edelleen kesken.
- Bambusermi on erillisessä aiemmassa tarkistuspaketissa. Sen paperi ja ylä-/alalistat ovat samassa osassa: repeämistä ei voi toteuttaa poistamalla tätä koko osaa.

Tarkistuskansio:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-kahdeksan-esinetta-20261021/parts-review-v1/`

Kansiossa esikatselu.html (aidot Tripo-kuvat), GLB-osat, SHA256SUMS, TRANSFORMS.json ja LAHTEET.md. Teknisen portin tulos sisarkansiossa parts/receiver-gate-review.json. GLB:t eivät ole gitissä.

## Ulkonäön korjaukset

Turkoosin ruukun lintumitali katosi generoinnissa; nykyistä tekstuuria ei hyväksytä sellaisenaan. Tekstuurit ja nykyisten UV:iden viivakuvat on jo toimitettu kuvasession korjausta varten:
`posti/codex-paatoimittaja-799-tekstuurit-lahteet-20261021.md`
commit `143eb75060cd8011d22b32e24bdf4ac241347fdf`, kaikki 8 tiedostoa luettu takaisin ja bytetiivisteet varmennettu. Pyydän reitittämään tämän 2D-korjauksen Matkakirjan kuvat -sessiolle. Ei uutta 3D-mallia.

Teekannun etupuolen kukat ovat selkeät; vastapuoli on vaaleampi ja nokan pää näyttää suljetulta. Staattisessa särkyvässä rekvisiitassa nokan sisusta ei edellytä lisämallinnusta.
Punainen lootuskulho näyttää läpinäkymättömältä punaiselta materiaalilta. Lasin läpikuultavuus pitää tarkistaa materiaalityössä; runko ei ole tämän vuoksi automaattisesti uusittava.

## Täsmällinen vientieste ja avunpyyntö

Osan 10 kaksitasoinen puuteline GLB-vienti avasi Chrome-virhesivun:
`tripo-data.rg1.data.tripo3d.com` — **ERR_BLOCKED_BY_CLIENT**, ”Chrome on estänyt tämän sivun”.
Todiste paikallisesti: parts/10-kaksitasoinen-puuteline/qa/export-blocked.png.

Tämän jälkeen olemassa olevaan tuotantovälilehteen sitoutuminen aikakatkaistiin (Emulation.setFocusEmulationEnabled, 10 s). Syy ei ole vielä todettu; en väitä tätä T7- tai muistivuotovaurioksi. Estoa ei ohitettu, asetuksia/oikeuksia ei muutettu, allekirjoitettua latauslinkkiä ei tallennettu tai välitetty. Osan 11 vienti oli käynnistetty jo ennen estoa, mutta tiedostoa ei löydy paikallisesti.

Pyydän PT:tä selvittämään tavallisen Chrome-viennin palautumisen tai järjestämään näiden olemassa olevien mallien normaalin manuaalisen viennin. Ei uusia generointeja, selaimen suojausten heikennystä tai päällekkäistä tuotantoa.

Puuttuvat viennit:
- 10 teline: https://studio.tripo3d.ai/workspace/generate/9df5f627-52da-4ca3-bf4f-3b08e8d3645b
- 11 lootuskulho: https://studio.tripo3d.ai/workspace/generate/09faa9d8-5bf9-43de-b2cd-bf79ba179df3
- 12 punainen maljakko: https://studio.tripo3d.ai/workspace/generate/3fcd53c1-4aa9-4f32-969b-c9a8864d3706
- 13 punainen kuppi: https://studio.tripo3d.ai/workspace/generate/1f033478-649c-45e6-8f48-e3bf2ee09085
- 14 maisemasermin lehti: https://studio.tripo3d.ai/workspace/generate/abe666cf-4ace-4a2a-b511-20d3b024150c

## Rajat

15 / 17 maksullista Tripo-kutsua käytetty (bambun 2 mukana), 655 krediittiä, havaittu saldo 20 855. Loput 2 kutsua varattu lautaselle ja pöydälle; pöytäehdotuksen ratkaisu edelleen avoin. Ei automaattisia uusintoja eikä kortin laajennusta. Raskasta paikallista renderöintiä ei ajettu; aiempi laskentapito säilyy. Suljettuja toimituksia ja peliä ei muutettu.
