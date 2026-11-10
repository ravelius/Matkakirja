# NUI: mikä rajoittaa lähintä kameraa Pariisissa (1:1-kohteet) – selvitys PT:lle 10.11.2026 klo 22.4x

Tehtävä: PT 22.3x (KK). Koodi: natiivi-backup `natiivi-ui/nahtavyys-paisuu` 1228952e8 (juna 224 + KS 098f9f05c + paisunta).
Luvut on laskettu koodin kaavoista. Kuvanäyte tulee ajosta nui-paisunta-4-1228952e8 (JU:n jonossa): a-video otetaan komennolla `lahizoomi 5`.

## 1. Vapaa kamera: lähin korkeus

- **Raja on PalloKierto.MinKorkeus()** (Kartta/PalloKierto.cs ~1302): näkyvä leveys = `leveys × 360 / 12000` astetta, jaettuna kuvakulmalla ja kuvasuhteella.
  Pariisin piirroksella `leveys` tulee **PiirrosKerros.LahinLeveysPaikassa** (Kartta/PiirrosKerros.cs 298): porrastettujen tasojen lähitaso
  `lahig` (isoisän kartta 2,48 m/px), **IsoisaLahinLeveys = 0,525** (omistaja 3.11. 15.40 / PT 16.0x). Arvo korvaa myös elävän kartan lähimmän.
- Siitä seuraa **näkyvä leveys noin 1,75 km**. Lähin korkeus on iPadilla noin 1,5–1,7 km ja Macin esikatselussa 1,679 km (VS 7.11., `komento eletila`).
  Lähitason ulkopuolella leveys liukuu 1 200 m:n matkalla arvoon 1,4 (laaja- ja välitaso).
- **Jo nyt lähemmäs:** vasen liiketappi vie 5 × lähemmäs, noin 0,3 km (DroneSyvyys, cd0edaa29, omistaja 9.11. 21.03). Nipistys, eleet ja
  kierron zoomi pysähtyvät MinKorkeuteen.
- **Mittasuhde:** kun näkyvä leveys on 1,75 km ja ruutu 4:3, pystynäkymä on noin 1,3 km. 1:1-Notre-Dame (96 m tornin kärkeen) on silloin noin 7 % ruudun
  korkeudesta, kallistettuna ja ohuen tornin vuoksi vähemmän. Tämä täsmää KJ7:n 55 px / 1032 px (5 %) ja Panthéonin ~5 %:n kanssa.
  **ND ≥ 1/5 vaatii näkyvän leveyden ≤ ~0,64 km**, eli noin 2,7 × nykyistä lähemmäs (leveys ~0,19).
- Vertailuajossa voi käyttää komentoa `komento lahizoomi k` (PalloKierto.LahizoomiPakko): se jakaa lähimmän k:lla kaikilla laitteilla.

## 2. Esittely (napautus → lento → kierto): etäisyys

- Kameran etäisyys = NahtavyysRajaus.Etaisyys(..., minD = MinKorkeusPaikassa, täyttö iPadilla 0,70). Kun kohde ei täyty lähitasolla,
  kuvakulma kapenee (EsittelyZoom) **enintään ZoomMax = 2,2** (UI/NahtavyysEsittely.cs 510, PT 8.11. 22.3x).
- **Ennen 1228952e8:tä** rajat tulivat kyltin **Tripo-mallista**, joka on koodimallin tilalla piilossa (ND:n rajalaatikko 620 m korkea). Siksi kamera pysähtyi noin 1,85 km:iin.
  **Korjattu 1228952e8:ssa:** rajat tulevat piirtyvästä 1:1-koodimallista (Paisunta.PiirtyvaMalli), ja kamera rajataan paisuneeseen kokoon.
- Arvio: minD noin 1,7 km ja zoomi 2,2 → ND 1:1 noin 15 % ruudusta ja paisuneena (×2–2,5) noin 1/3. **Esittelyn tavoite 1/3 näyttää
  saavutettavalta ilman, että lähintä korkeutta muutetaan.** Varmistus ajosta paisunta-4 (Riemukaari) ja seuraavaksi ND.

## 3. Mitä lähemmäs meno maksaa

- **Piirros pehmenee.** Lähitaso on 2,48 m/px. Kun näkyvä leveys on 1,75 km, yksi piirroksen pikseli on noin 2,9 ruutupikseliä iPadin 2 752 px:n leveydellä.
  0,64 km:n leveydellä se on noin 8 ruutupikseliä. 0,5 m/px -tarkkuuspaloja ei ladata, koska porrastus on päällä (PorrastettuPelissa).
  Samasta syystä lähin rajattiin 3.11. arvoon ~1,75 km ("piirros pehmenee hieman").
- **Talot ja laatat:** zoomaus ei lataa lisää. Talot ovat koodilla tehtyjä paloja (talokone), eikä tasoja ole lisää. Muistikuorma ei kasva. Lähellä näkyy
  talojen yksinkertaisuus ja kartan pehmeys. Vasen tappi menee jo 0,3 km:iin, joten näkymä on omistajan tiedossa (9.11.).
- **Tarkempi pohja** vaatisi uuden lähitason, eli Codexin piirroksen tai 0,5 m/px -palat porrastuksen päälle. Se maksaisi muistia ja levytilaa, ja se on KS:n ja Codexin työtä.

## Suositus

1. Esittely: paisunta + 1:1-rajat (1228952e8) riittävät tavoitteeseen 1/3. Lähintä korkeutta ei tarvitse muuttaa.
2. Vapaa kamera: tavoite ND ≥ 1/5 vaatii nipistykselle noin 2,7 × lähemmäs (IsoisaLahinLeveys 0,525 → noin 0,19, Kartta/PiirrosKerros.cs = KS:n
   tiedosto, tai NS:n kameran puoli). Hinta on pehmeä piirros. Päätös KK:lle kuvaparin jälkeen: lähin nyt / lahizoomi 2,7 samasta paikasta.
   Kuvapari ND-ajoon (paisunta-5) NUI:lta.
