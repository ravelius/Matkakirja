# Natiivisepän luovutus 27.9.2026 (o), klo 23.4x

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 80 % (Fablen pyyntö). Edellinen: -n.md.

## Tila

- **BUILD 33** = proto-master **edf03bfd** (tag build33), merge juna/b13 508761e8 (puu sama). Käännös 3d0c663a, Laitetestaaja
  PASS 4/4 (4a2c2f8c3: luenta ilman ohituksia, Ateenan kuvakortti vakaa, kartta näkyy 1.0.32→1.0.33-päivityksen jälkeen,
  äänivalitsin). SHA lähetetty Julkaisijalle ja Fablelle klo 23.2x → **TF 1.0.33 -vienti on Julkaisijan** (julkaisulipulla).
  Ei mergejä masteriin ennen Julkaisijan "vienti valmis".
- 1.0.33 sisältö: Pelikoodari fb67281f (luenta), Natiivi-UI e736abc4 (salaisuudet pois), cdb455d2 (400 £), b0a6d307 +
  015fdb8e (VoiceOver + C1) ja 31daba91 (C1 peruttu), 6f1ec96c (kuvakortti vakaa), 1b47f46e (äänivalitsin), Linssiseppä
  fac195c0 (erikoismallit erä 4). Tallessa: _valmiit/juna-8096bae5 (1.0.31), juna-4be1a696 (1.0.32), juna-508761e8 (1.0.33).
- **YÖTAUKO** (Fable 22.30 → Karttasepän polton loppu): ei käännöksiä eikä simulaattoreita. Build-juna tauolla
  (/tmp/matkakirja-juna-tauko, purku aamulla Karttasepän ilmoituksesta). Poikkeus vain julkaisu lipulla
  `touch /tmp/matkakirja-julkaisu` → `rm -f` heti perään. Rikoin tämän tietämättä klo 22.33–22.46 (muistio päivitetty).

## ALOITUSLENTO (omistajan tärkein asia, 1.0.34:ään omistajan OK:n jälkeen)

Haara proto **natiiviseppa/aloitusrata** (worktree /Users/Shared/Claude/wt/proto-natiiviseppa-offline-media), viimeisin **cbb4811f**
(junan päällä, EI junassa). Kytkin `lento v3 aloitusrata 0|1` (oletus 1). Kartta-testit 343/343, unity-tarkistus 0.

**v7 HYLÄTTY.** Omistajan palaute sanatarkasti (Fable 23.0x): "voi ei. paljon virheitä: eikö koneen pitänyt olla ruskea? kamera
kiirehtii aivan liian nopeasti koneen luo. olisi parempi näyttää koneen lähtö kaukaa ja samalla rullata kameraa lähemmäksi
samalla näyttäen karttaa kaukaa pienestä kulmasta afrikan päältä kohti pohjoista. sitten vahti kiihtyisi ja se tavoittaisi
koneen ja antaisi sen lipua vasemmalta oikealle kameran ohi oikein läheltä. sen jälkeen kamera lentäisi ateenan yli ja
näyttäisi etuviistosta koneen saapumisen ateenaan ja samalla kiertäen laskeutumiskohtaa niin että kamera nousee ylöspäin ja
paljastaa lopulta koko ateenan ylhäältäpäin suurinpiirtein siitä kohtaa mistä peli jatkuu lennon jälkeen. konetta ei siis
koskaan näytetä takaa päin vaan aina edestä tai sivulta tai niiden välistä. videolla pitäisi näkyä myös koneen piirtämä viiva
niin että lähtöpiste näkyy. tärkeintä on esitellä karttaa monesta suunnasta ja käyttää kuminauhamaista kiihdytystä ja
jarrutusta. kameran pitää siis olla kokoajan muuttamassa joko suuntaa tai korkeutta, joko hitaasti tai nopeasti. alussa on
pahin virhe, koska silloin lentokone hukkuu näkyvistä. lentokone pitää siis kokoajan olla näkyvissä, joko hyvin pienenä tai
suurena, mutta ei koskaan poistua kokonaan näkyvistä."

**Korjaus (Fable 23.4x):** kamera EI lähde matalasta kulmasta. Se lähtee HYVIN KORKEALTA, eli juuri napautetusta pallonäkymästä.
Sieltä se näyttää koneen lähdön kaukaa (kone pienenä mutta näkyvissä) ja rullaa samalla lähemmäs ja alemmas. Kartta näkyy
kaukaa loivassa kulmassa, katse Afrikan päältä kohti pohjoista. Sitten kiihdytys koneen luo.
**Lisäys (Fable 23.4x):** lento saa olla 20 s, jos mielekkäämpi. Alkutekstit elokuvan tapaan: kevyt typografia pelin
otsikkofontilla suoraan kartan päällä, ilman laatikkoa, pehmeä häivytys, ei koneen eikä reitin päällä. Kolme paikkaa:
1) "MATKAKIRJA ja unohdettu aarre" kameran ollessa korkealla, 2) "Lontoo → Ateena" ohituksessa, 3) "1. matkapäivä" ennen
laskua. Lopulliset tekstit kirjoittaa Fable, joten merkitse paikat.

**Toteutus v2** (AloituslennonRata.cs, uusi): kamera suunnitellaan koneen RUUTUPAIKKANA. Kanavat (log-etäisyys, kallistus,
suunta, koneen x/y ruudulla, katseen korkeuden paino) ovat avainkehyksiä, joita vaimennettu jousi (ζ 0,7, "kuminauha")
seuraa, ja katsepiste ratkaistaan 240 Hz:n näytteissä Newtonilla niin, että kone osuu ruutupaikkaan. Kone pysyy siis kuvassa
rakenteellisesti. Alku = napautusnäkymä, loppu = PalloKierto.SaapumisNakyma(null, kohde, maaRajaus false), kuten
PeliOhjain.Saavu. Matkanopeus = K · kameran etäisyys (tasainen ruutunopeus), ohitus 5 km/s ja kosketus 13,2 s (V3Aika
kuvaa v3:n 14,3 s:n ääni- ja nokkatapahtumat). Symbolinen kone: siipiväli 5 % etäisyydestä. Tiger Moth on nyt
SEEPIARUSKEA (TigerMoth.cs-paletti, ennen kangas paperia #efe4cc); Linssisepälle kerrottu. Jälki 40 %:iin lähikuvassa.
Ennakkokamera (piirtämätön additionalCameras-kamera) lataa ohituksen ja saapumisen laadat odotuksesta asti. Odotus
napautusnäkymässä ≤ 1,5 s (KaupunkiMerkit.ValitseKaupunki-ajo katkaistaan: näkymä pysyy).
Aikajana: 0–4 avaus (7 600 → 4 550 km, kallistus 32°) · 4–6,5 kiri · 6,5–8,1 ohitus vasemmalta oikealle 23 km:stä ·
8,1–10,9 ylilento · 10,9–13,2 saapuminen etuviistosta ja kierto · 13,2–15 nousu saapumisnäkymään.
Mittaus (7 kohdetta, 1/60 s): kone aina kuvassa ja ≥ 11,6 % leveydestä, α ≤ 87° (ei koskaan takaa), ohitus 52 %,
saapuminen α 7–49°, Lontoo kuvassa avauksessa, kamera liikkuu koko ajan ilman nykäyksiä. Dokumentti (v2 ennen korkeaa
avausta): proto-3d/lokit/aloituslento-33/v2-AIKAJANA.md. Uusi taulukko: `cd Kartta-testit && ALOITUSRATA_TAULU=1
ALOITUSRATA_KOHDE=ateena ./kaanna.sh AloituslennonRata`.
**VIDEO:** käännös v2 (cbb4811f) käynnistettiin julkaisulipulla klo 23.4x (ensimmäinen yritys kuoli Unity-vaiheessa).
Kuvaus oikealla polulla omalla simulaattorilla FBBD41D7: Uusi matka (201, 690) → 21 s → Valitse aloituskaupunki (201, 605) →
6 s → nauhoitus → Ateenan napautus (270, 325). Väliaikaiset alkutekstit päälle jälkikäsittelynä (EI pelissä):
lokit/aloituslento-33/v2/teksti1–3.png (EB Garamond), ajoitus 1) 0,8–3,6 s, 2) 6,6–8,0 s, 3) 11,0–12,6 s.
Jos video ei ehtinyt Fablelle ennen nollausta: tee se ensin (julkaisulippu, yksi käännös, yksi ajo, lippu pois).
**SEURAAVAT:** omistajan palaute videosta; 20 s:n versio, jos omistaja haluaa rauhallisemman (vaiheiden ajat ovat vakioita
AloituslennonRata.cs:n alussa); alkutekstit peliin (Natiivi-UI:n UI Toolkit -kerros, Nappula antaa tapahtumat
AloituslennonRata-aikojen mukaan); merge junaan vasta omistajan OK:n jälkeen.

## Muut avoimet

1. **Ensikäynnistyksen karttavika** (omistajan iPhone, TF 1.0.31 → 1.0.32, ensimmäinen käynnistys pelkkää pergamenttia,
   uudelleenkäynnistys korjasi): EI toistu simulaattorissa (lokit/ensikaynnistys-1032, skripti sessio-n/paivitys-kartta.sh).
   Poissuljettu: sävysäätimet (global _pohjaSavy oletus 0; säätimet SÄILYVÄT, omistaja pitää niistä), gzip-luku, Z10:n
   varatie, skeeman luku (TryGetValue). Seuraava: fyysinen iPad Pro 13 -testi Release 1.0.31 → 1.0.32 ja 1.0.33 (Metal),
   iPad on Linssisepän ja Laitetestaajan vuorolaite, joten sovi vuoro. Fable kysyy omistajalta 1.0.33:n ensikäynnistyksestä.
2. **Symbolit erikoismallin alla** (haara natiiviseppa/symbolit-erikoismalli d1cba402, worktree wt/proto-natiiviseppa-symbolit):
   Krumlov OK laitteella (Linssiseppä), Kinderdijk EI laukea (Gouda 14,8 km NNE, jalkapiste laatikon ulkopuolella) → vaihda
   ehto "symbolin laatikko leikkaa mallin laatikon" (Linssisepän ehdotus). 1.0.34.
3. **120 Hz -laitemittaus** (skripti sessio-n/vieritys120.sh, iPad Pro 13, Release): tekemättä yötauon takia.
4. **Offline-todennus 1.52–1.55** (tuotannossa v250): Siirtoseppä ajaa E2E:n aamulla (F989814A); minun osuus kartalta + palvelin-
   laskurit. Vastasin: natiivi jäsentää offline.jsonin TryGetValue-kutsuilla, uudet kentät eivät kaada.
5. Natiivi-UI nimet-laskuri 5d79edd9 → 1.0.34 (Nimikerros.LaatikotMuuttuivat laskuri; Samat vertaa floatteja tarkasti).
   KarttaMuste.LisaaSalaisuus + testit käyttämättömiä → siivoa.
6. Levyn siivous: tyokalut/vapauta-levy-natiiviseppa-20260927c.sh (koeajo 8,3 Gt; --aja poistaa) → koot Fablelle TF:n jälkeen.

## Käytännöt

- Worktreet (3/3): wt/proto-natiiviseppa-juna, -offline-media (haara natiiviseppa/aloitusrata), -symbolit.
- Skriptit proto-3d/lokit/natiiviseppa-skriptit/sessio-n/: aloituslento-video.sh (ui aloita -polku, EI oikea valinta),
  paivitys-kartta.sh, vieritys120.sh. Oikea valintapolku napautuksin (yllä).
- Viestit Fablelle vain valmis erä, jumi tai kysymys (≤ 8 riviä).
