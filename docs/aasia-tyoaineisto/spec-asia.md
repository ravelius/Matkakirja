# Aasian lehtityö (täydentää lehtityo-resepti.md:tä)

Lauta on `asia` — visat ovat js/packs/asia-questions.js:ssä,
saapumiset asia-saapumiset.js:ssä, valokuvakortit asia-valokuvat.js
(+ asia-lisat-valokuvat.js). Mallilohkot: kulttuuri-kategoriat.js
tokio/soul/shanghai (aasialaiset) ja medina/mekka (tuoreimmat).
Uuden säärivin menetelmä: ERA5 1991–2020 kuten Lähi-idässä —
saanormaalit- ja kaista-apuskriptien kaavat ovat
docs/arkisto/lehtityon-apuskriptit.md:ssä; kirjoita omat versiot
omaan työkansioosi (esim. /tmp/…), uusintalogiikka mukana.

## Täydennyserät (Venäjän kaupungit)
Kuten Lähi-idän Vaihe B: lisää kaupunki-sivulle avauskuvat 3 +
matkailijalle-opas 5 jaksolla; ÄLÄ koske olemassa oleviin nostoihin,
johdantoihin, visoihin. Lisäksi KOHDEKARTTA JUTTUINEEN (piirto,
maakartat.js, nahtavyysjutut.js) niille kaupungeille joiden erälista
sen sanoo — Kamtšatka ja Sahalin ovat alueita, EI karttaa niille.
VENÄJÄ-LINJAUS (Raamattu/kaupunkilehti.md): ei nykysotaa eikä
nykypolitiikkaa missään muodossa; painotus 1873-henkiseen historiaan,
kulttuuriin, maantieteeseen, arkkitehtuuriin; ei uutisosiota;
neutraalit maantieteelliset nykytosiasiat ok. Kuvissa sama:
ei sotilaskohteita, ei Z-symboliikkaa, ei poliittisia julisteita.
Säärivit ovat jo paketissa — älä muuta niitä.

## Uudet lehdet: kolmiportainen putki
1. FAKTAPOHJA (Sonnet): kokoa Medinan faktapohjan rakenteella
   (docs/arkisto/faktapohja-medina.md on malli): sivuehdotukset
   (kaupunki + 1 vakioteemasivu), 8 nostoehdotusta lähteineen,
   5 opasjaksoehdotusta, 8–10 kohdekarttakohdetta koordinaatteineen
   (en-Wikipedia; merkitse epävarmat), säätietokohta (EI keksittyjä
   lukuja), kuva-aiheet sanoin, JA OMA EPÄVARMUUSOSIO. Kaikki
   en-Wikipedian raakatekstistä (action=raw, #REDIRECT-varo,
   uusinnat). Tallenna annetulla polulla (docs/aasia-tyoaineisto/,
   ei committia). Älä koske pelikoodiin äläkä muihin tiedostoihin.
2. TARKISTUS (Sonnet, ERI agentti): tarkista jokainen väite
   raakatekstistä, laske koordinaatit uudelleen, sisältölinjaus-
   huomiot. Raportti annetulla polulla.
3. KIRJOITUS (Opus): resepti + faktapohja + tarkistusraportti →
   4 pakettitiedostoa kuten Medinassa (saatiedot-rivi ITSE haettuna
   ERA5:stä, kartta piirrettynä, maakartat, jutut, kategoriat),
   kuvatyö itse. Lue kaupungin visa (asia-questions.js) ja
   saapumiset — visan opetukset lehteen, minitehtävä ei toista visaa.

## Herkkien kohteiden linjaukset (SITOVAT)
- **Lhasa**: Tiibet historiallis-kulttuurisena (Potala, luostarit,
  1873-ajan suljettu kaupunki ja tutkimusmatkailijat); EI
  nykypolitiikkaa, ei vuoden 1950 jälkeisiä kiistoja kummankaan
  osapuolen kehyksellä; hallinnollinen nykyasema saa näkyä
  neutraalina tosiasiana (Nikosian "Antaa olla").
- **Taipei**: sama "Antaa olla" — hallinnollinen asema neutraalisti,
  ei suvereniteettikysymystä kummankaan kehyksellä; painotus 1800-
  luvun Formosaan, teehen, Kiinan keisariajan perintöön, museoon.
- **Hongkong**: 1800-luvun satamahistoria, kolonialismi neutraalina
  historiana, arkkitehtuuri, ruoka; EI 2010–2020-lukujen protesteja
  tai turvallisuuslakia.
- **Yangon & Mandalay**: 1800-luvun Burma (kuningaskunta, Mandalayn
  palatsi 1857, brittivalta historiana); EI juntta- eikä
  konfliktisisältöä; kuvatekstit eivät väitä nykytilaa.
- **Kashgar**: Silkkitie, basaari, 1800-luvun Suuri peli
  -tutkimusmatkailijat; EI Xinjiangin nykypolitiikkaa.
- **Kabul**: kuten Venäjän kaupungit (kaupunkilehti.md): 1873-
  painotus, ei nykysisältöä, ei uutisosiota.
- **Karachi/Kolkata/Mumbai ym.**: siirtomaahistoria neutraalina;
  jaon 1947 väkivalta vain maininnan tasolla ilman yksityiskohtia.
- Sotahistoria (esim. Hiroshima ei ole laudalla, mutta jos aihe
  sivuaa toista maailmansotaa): neutraali historia, ei uhrilukujen
  korostusta.

## Julkaisu
Yksi erä = yksi versio; Fable ajaa portit, versionoston, TUOREET- ja
TESTATTAVAA-päivitykset ja PR:t. Erien koko: täydennykset 2–3
kaupunkia, uudet lehdet 1–2 per versio (uusi lehti on iso).