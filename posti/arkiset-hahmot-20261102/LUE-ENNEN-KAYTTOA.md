# Neljä arkista palatsihahmoa — toimitus pelitarkistukseen

Paketti sisältää neljä hahmoa, neljä irrotettavaa tavaraa, kolme jäännemallia ja 121 tarkistuskuvaa.
Paikallinen numeerinen ja kuvallinen tarkistus on tehty. Pelikoodarin/Lavastajan pelietäisyysarvio,
pelikytkentä ja lopullinen taiteellinen hyväksyntä ovat seuraavat vaiheet. Tämä ei ole lupa julkaista.

Kyseessä ovat siirretyt Blender-ehdokkaat ja niiden paikalliset korjaukset. Uusia Tripo- tai
ImageGen-generointeja ei tehty: 0 kutsua, 0 krediittiä. Alkuperäiset lähteet säilyvät.

## Sisältö

| Malli | Kolmiot |
| --- | ---: |
| ruokaeunukki.glb | 18999 |
| palvelijatar.glb | 19000 |
| vedenkantaja.glb | 16258 |
| lakaisija.glb | 15180 |
| jaanne-posliini.glb | 212 |
| jaanne-ruoka.glb | 1728 |
| jaanne-vesi.glb | 952 |
| tavara-ampari.glb | 1168 |
| tavara-luuta.glb | 564 |
| tavara-maljakko.glb | 1640 |
| tavara-ruokalaatikko.glb | 1048 |

Kaikissa hahmoissa sama 65 nivelen järjestys, yksikkö metri, +Y ylös ja kasvot +Z:aan.
Hahmot: ruokaeunukki 1,65 m, palvelijatar 1,55 m, vedenkantaja/lakaisija 1,65 m.
Tummat kengänpohjat; vaaleat työasut erottuvat jahtaavan eunukin indigosta.
Kuvat ovat `kuvat/<malli>/`. Rinnakkaiskuvassa uusi hahmo on vasemmalla.

## Liikkeet ja irrotus

Kaikilla idle, walk, startle, startle_idle ja walk_empty. Lakaisijalla myös sweep.
Vedenkantajalla fill_right, fill_left, idle_after_fill ja walk_after_fill.
Leikkeiden täsmälliset kestot: RUNTIME-CONTRACT.json. startle on 1,0 s; irrotus 0,40 s.

Irrotettaessa:
`standaloneParentWorld = currentCharacterTavaraWorld @ inverse(standaloneRootLocal)`.
Käytä arvioitua elävää maailmamuunnosta, mukaan lukien hahmon sijoittelu ja skaala.
Piilota hahmoon upotettu tavara ja poista sen esikatselupudotuksen kanavat käytöstä,
kun pelifysiikka alkaa. Luurangon kanavat jatkuvat. Älä näytä kahta esinettä päällekkäin.
Luuta jää kokonaisena maahan. Särkymisääni EI houkuttele jahtaajia.

Vedenkantajan sovittu jono: fill_right (2,6 s) → fill_left (2,6 s) → idle_after_fill.
idle/walk ovat täysillä ämpäreillä; idle_after_fill/walk_after_fill tyhjennetyillä.
startle_idle/walk_empty tarkoittavat pudotettuja esineitä. V7 palauttaa molempien
ämpärien asennot myös liikkeen vaihtuessa kesken kaadon. Kaatojen liikeradat säilyivät.
WATER-POUR-CONTRACT.json sisältää pronssiastian paikan (+Z 1,1 m), lähdehashin ja
vesivirran ajat 1,08–1,50 s. Vesi/VFX toteutetaan pelissä; tässä ei ole nestesimulaatiota.
Pronssiastia on aiemmin toimitettu riippuvuus, eikä sisälly tähän pakettiin.

## Tarkistukset ja näkyvät rajoitteet

Kaikki 121 mukana olevaa kuvaa on katsottu ja sidottu oikean GLB:n SHA256:een.
Neljän suunnan kuvat, säikähdyssarjat, käsiotteet, lakaisu, molemmat kaadot ja
palautukset sekä esineiden/jäänteiden ylä- ja viistokuvat sisältyvät pakettiin.
Ruokajäänteen vanhojen päällekkäisten tasopintojen mustat kolmiot on korjattu.

Hihansuiden kulmikkuus ja pienet rannekohtien aukot näkyvät lähikuvissa, erityisesti
lakaisijalla ja vedenkantajan kohotetuissa käsissä; lievemmin myös koko hahmon kuvissa.
Tämä on kirjattu pelietäisyysarvioon, ei peitetty hyväksyntäväitteeseen. Hahmoja ei ole
sertifioitu lähikuvakohtauksiin. Otteet ovat tukevia/avoimia kämmenasentoja, eivät
kaikkialla tiukkoja nyrkkiotteita. Peukalon tavoitejäännös enintään noin 22 mm
lakaisijalla, 18 mm ruokaeunukilla ja 11 mm palvelijattarella.

Vanhojen lakaisijan/ruokaeunukin/palvelijattaren yksittäiskuvien alareunan musta
lattiakaistale on esikatselukameran ja lattian raja, ei mallin osa. Korjatuissa
vertailukuvissa ja vedenkantajan uusissa kuvissa sitä ei ole. Hahmot eivät leikkaudu.
Maljakon sisus ja posliinisirpaleet ovat yksinkertaistettuja pelietäisyydelle.

QA ei sisällä Unityn animaatiosekoituksia, törmäysmuotoja, fysiikkaa, pelivalaistusta
tai VFX:ää. Ne sekä lopullinen ulkonäkö arvioidaan saman kameran pelikuvasta.
RUNTIME-CONTRACT:n irrotuspintojen numeerinen ero on alle 0,000001 m.

Raakoja numeerisia raportteja ei kirjoitettu uudelleen: v6-raportin vanhat kolme
kantajahashia eivät vastaa nykyisiä otteita. PACKAGE-MANIFEST.json ohjaa oikeisiin
carry-grip-v1/grip-v1-raportteihin. Vedenkantajan v7 käyttää v6:n vesikaatotarkistuksia
ja v7:n muuttumattoman geometrian/liikeratojen sekä asentopalautuksen todistetta.
Ruokajäänteen v2:lla on oma geometriaraportti. Katso qa/FINAL-VISUAL-REVIEW.json.

SHA256SUMS kattaa kaikki paketin tiedostot paitsi itsensä. Muuttumattoman paketin
stateAtPackaging kertoo kokoamishetken; erillinen toimituskuitti todistaa postin tavut.
