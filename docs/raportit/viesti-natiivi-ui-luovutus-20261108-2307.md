# Natiivi-UI: luovutus 8.11.2026 klo 23.07 (kontekstivahti 26 %; lisäys luovutukseen -2246)

Lue ENSIN -2246 (`git show 1b730691d:docs/raportit/viesti-natiivi-ui-luovutus-20261108-2246.md`); se on yhä voimassa, paitsi alla
muuttuneet. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KK local_37f7c945-….
Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa. JU:n Mac-jono (pyydetty 23.0x): ipad70-3 → pariisipallo-1 → kameratappi-2 → nostokuvat ×3.

## 1) iPad 70 % -3 (KK 22.56 palautti -2:n: ND ~57 %, Eiffel ~59 %) – TEHTY, Mac-ajo JU:lla
- Syy: täyttö 0,93 laskettiin koko mallin rajauslieriöstä (ND huippu 710 m ja säde 198 m samassa nurkassa), ei näkyvästä mallista.
- Korjaus 233c6d554 (natiivi-backup natiivi-ui/esittely-ipad-70, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-ipad-70):
  NahtavyysRajaus.Muoto = pyörähdysprofiili mallin kärjistä (32 korkeuskerrosta, kerroksen suurin säde; Kylttikohde.MallinKarjet,
  vain kolmioissa käytetyt kärjet). Vain tabletilla (NahtavyysEsittely.Muoto); puhelin = sylinteri ennallaan. Lokiin "muoto näkyvä
  (n kerrosta, huippu, säde), ruudusta 0.xx". Kartta-testit 7/7 (uusi: kapeneva torni 64–74 % ruudusta KOKO kierron 0–360°),
  unity-tarkistus 0 virhettä.
- Mac: /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-ipad70-3-mac.txt (koko ipad), lokit lokit/nui-ipad70-3-ipad-233c6d554;
  kuvat e/nd -ennen-1, -jalkeen-1 (alku), -jalkeen-m (puoliväli), -jalkeen-2 (loppu). Tarkista: ND ja Eiffel ~70 % ruudun korkeudesta
  kaikissa kolmessa, koko malli palkin ja kuvan alla, zoomi ≤ 2,2 (jos zoomi 2.20 ja alle 70 %: katto ZoomMax rajoittaa) → parit PT:lle → KK.
- Avoin riski: profiili on kierron suhteen pahin tapaus, joten pitkä laiva (ND) voi olla osan kierrosta hieman alle 70 %.

## 2) PARIISIN KARTTA A/B/C (omistaja 22.40) – TEHTY, Mac-ajo JU:lla
Haara natiivi-backup natiivi-ui/pariisi-pallo-kuvat = a97e8583c (84a91d530 + 1), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-pallo.
- A: SaapumisKuvat.KaupunginTasolla() = NostoSaannot.KaupunkiPortti (taso ≥ 12, hystereesi 0,4): saapumisen pienet kuvat
  (Nakyvissa) ja nostojen kuvat (NostotKartalla eiKuvaa) vasta kaupungin tasolla. `ui nousukoe` kertoo tason ja portin.
  Riski: NostotKartalla.AsetaKuva päivittyy vain merkin uudelleenpiirrossa – tarkista, ettei kuva jää näkyviin/pois tason ylityksessä.
- B: KaupunkiPallot.PalloLukittu (oletus true; `ui kaupunkipallot lukittu 0|1`): kaupunkipallo ei heilahda esteiden ohi (kulma 0),
  joten pallo, köysi ja "Kuumailmapallo £200" -kyltti pysyvät samassa karttapisteessä. Koskee kaikkia kaupunkipalloja (2.216).
- C: syy (koodista, vahvista Mac-tilasta): pallo häivytettiin 3D-mallin kohdalla (MalliPeitto; Pompidou/Hôtel de Ville kaupungin
  keskipisteen vieressä). Pariisin pallon karttapiste Tuileries'n puutarhaan 48.8638, 2.3255 (PallonMaapiste kuten Lontoo 7.11.;
  Tuileries oli 1870-luvun kiinnitetyn pallon paikka). Lento alkaa yhä keskipisteestä. VALINTA PT:lle/KK:lle tiedoksi raportissa.
  Tila-rivillä nyt kulma, mallipeitto, kyltti ja piilossa olevat pallot syineen.
- Mac: sk-pariisipallo-1.txt koot iphone + ipad, lokit lokit/nui-pariisipallo-1-{iphone,ipad}-a97e8583c: s-1 seutu (ei kuvamerkkejä),
  k-1/k-2 kaupunki + panorointi (pallo ja kyltti yhdessä, samassa karttakohdassa), l-1 lähin (pallo näkyy), x-1 lukittu 0 vertailu.
  ENNEN = omistajan 2240-1/2/3. Katso itse → parit PT:lle → KK. Jos l-1:ssä pallo yhä poissa: lue "piilossa […]" -tila.

## 3) ★-KYLTIT (SEURAAVA TEHTÄVÄ; ei aloitettu koodissa) – haara natiivi-ui/tahtikyltit = juna-223:n kärki 3413b4565,
##    worktree /Users/Shared/Claude/wt/proto-natiivi-ui-tahdet (ei muutoksia)
Selvitetty (koodista + kuva lokit/nui-pienikuva-2-iphone-vaaka-30f7090d8/e-2-pieni.png):
- ★-kohteet = Kohdenostot.Ratkaisu "kyltti": Palais d'Orsay, Palais de l'Industrie, Trocadéron palatsi, Les Hallesin hallit.
  Kylki "ala2" (NostotKartalla.KyltinKylki/NimionLaatikko) = toinen rivi OMAN pisteen alle → toimii vain, jos nykyisen rakennuksen kyltti
  on samassa pisteessä (Orsay: PT:n mukaan samassa kuvapisteessä; tarkista Mac-kuvasta – e-2:ssa Palais d'Orsay näkyi yksin).
- 3D-malleista vain Grand Palais on ★-parin nykyinen rakennus (mallit: Eiffel, Grand Palais, Invalidit, Louvre, Notre-Dame, Opéra,
  Panthéon, Riemukaari, Sacré-Cœur, Sainte-Chapelle, Tour Montparnasse). Sen kyltti on MalliKyltit-rivi (KarttaKyltti, laatikko mallin
  jalanjäljen alla, Rivi.Laatikko paneelin pt) → e-2: Grand Palais peittää Palais de l'Industrien yläosan.
- Les Hallesin hallit: PiirrosKyljet-ohitus "oikea" (rivi ~1277, KK 5.11. Louvren kyltin kulma) → ei ala2:ta; isäntänä kartalla vain
  Nimikerroksen nimi "Forum des Halles" (ei kyltti). Trocadéro: isäntä (Palais de Chaillot?) tarkistamatta.
Ehdotettu toteutus: ★-id → isännän nimi -taulu (Palais de l'Industrie → MalliKyltit "Grand Palais"; muut nostojen nimiöt). MalliKyltit
saa `bool Laatikko(string nimi, out Rect pt)` ja tapahtuman Paivita-lopussa; NostotKartalla.AsetaNimio käyttää ★:lle isännän laatikon
alareunaa (keskitetty, väli KyltinPinoVali × mitta), transformOrigin ★:n omaan yläreunaan. TÄRKEÄ: KylttienTormays laskee ★:n laatikon
NimionLaatikosta → sama isäntäpaikka sinne, ja ★ ei saa törmätä omaan isäntäänsä (muuten häipyy). Isäntä piilossa → ★ entiseen
paikkaan (tai piiloon – kysy PT). Mac-pari ennen | jälkeen iPhone vaaka + iPad (pohja sk-pienikuva-3-mac.txt) → PT → KK.

## 4) Sitten LENTORAJA-6 (ennallaan -2246 kohta 4).

## Käsitelty tässä istunnossa
- Postivahdin aloitusviesti (LISÄYS 1 = kohta 2, LISÄYS 2 = kohta 1). Rivi PT:lle 23.0x lähetetty (molemmat sha:t ja lokikansiot).

## Lisäys 23.1x (JU:n viesti luovutuksen jälkeen)
- JU: ketju A pysäytetty kameratappi-2-ipad:n aikana (iphone ja iphone-vaaka valmiit 22.5x, ipad kesken); ketju C
  (julkaisija-tyokalut/jono-2300-c.zsh) ajaa nostokuvat 10845cd24 × {kuvateksti, kokoruutu, tarina} × {iphone, ipad}. JU nollautuu.
- JU vahvisti 23.1x: ipad70-3 233c6d554 ajossa (ketju D / L1, alkoi 23.03), pariisipallo-1 a97e8583c (iphone + ipad) ketjussa F heti
  sen jälkeen; kameratappi-2 ajettu kokonaan (iphone, iphone-vaaka, ipad 4/4; JU kuittaa erikseen); nostokuvat kuvateksti-iphone
  ajossa, muut 5 ipad70-3:n jälkeen. JU lähettää rivit, kun valmiit. Ei uusia pyyntöjä tarpeen.
