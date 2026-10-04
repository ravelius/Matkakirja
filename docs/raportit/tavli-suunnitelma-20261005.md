# Tavli — suunnitelma (Siirtoseppä 5.10.2026, luonnos Päätoimittajan hyväksyttäväksi)

Omistaja valitsi 4.–5.10. klo 00.5x kortilla seuraavaksi minipeliksi Tavlin (pelikatalogi GRC-1, kortti 7).
Rakennetaan Myllyn kehykseen (Peli/Pelit, UI/Pelit). Koodi aloitetaan vasta, kun Päätoimittaja on hyväksynyt
tämän sivun ja Mylly-erä 142 on valmis.

## 1. Mitä v1 sisältää

- **Portes** (perus-backgammon), **yksi erä**. Plakoto ja Fevga sekä ottelu 5 tai 7 erään tulevat myöhemmin.
  Säännöt kirjoitetaan niin, että muunnelma on yksi parametri. Tuplauskuutiota ei ole (ei kuulu tavliin).
- **Vastustaja:** botti (helppo, normaali, vaikea) tai kaveri samalla laitteella, kuten Myllyssä.
- **Yksi koti:** kafeneio Ateenassa (`ateena`). Kohtaaminen tarjotaan kaupunkikortin tehtävänapissa, kun
  kaupungin muut tehtävät on tehty (Myllyn malli). Uusintapelit pelataan Pelit-välilehdeltä yhdeltä riviltä.
- **Palkinto kaanonin mukaan:** botin voitosta rahapalkkio ja laudat esineinä Peleihin. Aarnin vihjeitä ei
  anneta (kaanonkorjaus 1.10.). Katalogikortin "voitosta vihje" on vanhentunut.

## 2. Oppimisen kärki: noppien todennäköisyydet

- Kahdella nopalla on 36 yhtä todennäköistä heittoa. Pelaaja näkee luvut siinä hetkessä, kun niillä on
  merkitystä:
  - **Riskirivi:** kun pelaaja jättää yksinäisen nappulan vastustajan ulottuville, tilariville tulee esim.
    "Yksinäinen nappula 6 pisteen päässä: vastustaja osuu siihen 17 heitolla 36:sta (47 %)." Laskenta
    huomioi suorat osumat, yhdistelmät ja tuplat sekä välissä olevat suljetut pisteet.
  - **Palkilta sisään:** "Kolme kotipistettä suljettu: pääset sisään 27 heitolla 36:sta (75 %)."
  - **Säännöt-kortti:** taulukko, jossa on 1–12 pisteen päässä olevan nappulan osumatodennäköisyys
    (esim. 6 → 17/36 ja 7 → 6/36), sekä kerran luettava selitys siitä, miksi 7 on yleisin summa.
- Kaikki nämä tulevat olemassa oleviin pohjiin (tilarivi ja Säännöt-kortti). Uusia elementtejä ei tehdä.

## 3. Botti

Myllyn negamax ei sovi noppapeliin. Tavli saa oman `TavliBotti`-luokan puhtaana C#:na (Peli-testit ilman
editoria, siemenellinen `Satunnainen`).

- **Siirtojen generointi:** kaikki lailliset kokonaiset siirrot heitolle. Sääntö: kumpikin noppa on
  käytettävä, jos mahdollista, ja muuten suurempi. Saman lopputuloksen tuottavat siirrot yhdistetään.
- **Arvio (heuristiikka):**
  - pip-ero
  - yksinäisten nappuloiden osumatodennäköisyys × hinta
  - suljetut pisteet, ja kotialueella niiden paino kaksinkertaisena
  - prime-pituus
  - palkilla olevat nappulat
  - poistovaiheen eteneminen
- **Tasot:**
  - **Helppo:** heuristiikan paras siirto, mutta 35 %:n todennäköisyydellä satunnainen kolmen parhaan joukosta.
  - **Normaali:** heuristiikan paras, 10 %:n häiriö.
  - **Vaikea:** noppaodotusarvot eli 2-tasoinen expectimax. Jokainen oma siirto arvioidaan vastustajan
    21 eri heiton keskiarvona, ja vastustajalle valitaan kunkin heiton paras vastaus heuristiikalla.
    Laskenta ajetaan taustasäikeessä.
- **Mittarit (Peli-testit):** vaikea voittaa helpon vähintään 75 % ja normaalin vähintään 60 % 400 pelissä.
  Botin siirto vie iPhonella alle 300 ms.

## 4. UI (vain olemassa olevilla pohjilla)

- Myllyn kehys:
  - LAUTAPELI-pohja
  - JULISTE-otsikko TAVLI ja laudan nimi
  - tilarivi ja pelaajarivit (nappuloita laudalla, palkilla ja poistettu)
  - napit Säännöt, Luovuta ja Poistu
- Ei ✕:ää eikä uusia tyylejä. Peitto on enintään 45 %, ja lippu on piilossa pelin ajan, kuten Myllyssä.
- **Siirto:** napauta nappulaa, jolloin mahdolliset kohteet korostuvat Myllyn renkailla. Napauta sitten kohdetta.
  Poisto tehdään laudan reunan poistoalueelle. "Kumoa" palauttaa vuoron siirrot ennen kuin noppien heitto
  on vaihtunut. Tämä on Myllyn Peru-kutsu; uutta nappia ei tule, jos pohjassa ei ole sille paikkaa
  (puuttuva → Päätoimittaja).
- **Nopat:** tulos arvotaan ensin `Satunnainen`-lähteestä, sitten 3D-nopat vierivät ja pysähtyvät oikealle
  silmäluvulle (valmiit liikeradat ja lopussa kääntö). Näin peli on toistettava ja testattava.
- Tuetaan iPhone pystyssä ja vaakana sekä iPad. Lauta sovitetaan kuten Myllyssä (Ylapalkki.Varaus).

## 5. Työnjako

| Kuka | Mitä | Muoto |
|---|---|---|
| Siirtoseppä | säännöt, botti, Peli-testit, UI, kohtaaminen, Pelit-rivi, tallenne | proto-haara `siirtoseppa/tavli` |
| Linnanrakentaja | puinen taittolauta perinteisellä koristekuvioinnilla, nappulat (vaalea/tumma), 3D-nopat (CC0-tekstuurit) | Resources-kerrokset kuten Myllyn laudoissa; nopat .fbx/.glb + tekstuurit |
| Pelikoodari | äänet: noppien kolina (3 muunnelmaa), nappulan napsahdus, lyönti, poisto laudalta, voitto ja häviö | CC0 WAV, attack 0–5 ms, huippu −6 dBFS |
| Sisältökirjuri | säännöt, historia (bysanttilainen tabula, ottomaanien tavla, kafeneiot 1873), kohtaamiskortti, laudat ja lähteet | samaan muotoon kuin Myllyn historiatekstit |

**Laudat** (ehdotus, Sisältökirjuri tarkistaa esikuvat):

- Kafeneio 1873: käytössä heti.
- Bysantin tabula: avautuu normaalin botin voitosta. Esikuvana Zenonin pelin kuvaus noin vuodelta 480.
- Ottomaanien tavla: avautuu vaikean botin voitosta. Esikuvana upotekoristeinen taittolauta museokokoelmasta.

## 6. Hyväksyntäkriteerit

1. **Säännöt Peli-testeissä:**
   - pakko käyttää molemmat nopat tai suurempi
   - tuplat antavat neljä siirtoa
   - palkilta pääsee sisään ennen muita siirtoja
   - lyönti
   - poisto vasta, kun kaikki 15 ovat kotona, ja suuremmalla silmäluvulla poistetaan kauimmainen
   - voitto
   - osumatodennäköisyydet tarkistetaan täydellä 36 heiton luettelolla
2. **Botin mittarit** (kohta 3) Peli-testeissä.
3. **Simulaattorissa oikeilla napautuksilla:**
   - kohtaaminen Ateenassa
   - Pelit-rivi
   - yksi kokonainen peli bottia vastaan
   - kuvat iPhone pysty ja vaaka sekä iPad
4. **Ääniraidallinen tallenne yhdestä pelistä**, jossa on heitto, siirto, lyönti, palkilta sisääntulo, poisto
   ja lopputulos. Mittauksessa kaikki tapahtumat erottuvat taustasta. Tehosteissa on käytössä omaIsku-lippu:
   Myllyn opetus oli, että webin 10 ms:n nousuverho syö naksujen iskun.
5. **Esine ja palkkio:** näkyvät tuloskortissa ja Peleissä.

## 7. Järjestys

1. Päätoimittaja hyväksyy tämän sivun. Linnanrakentaja, Pelikoodari ja Sisältökirjuri aloittavat samanaikaisesti.
2. Siirtoseppä tekee säännöt, botin ja Peli-testit. Ne eivät tarvitse grafiikkaa.
3. UI tehdään väliaikaisilla kiekoilla, kunnes laudat ja nopat tulevat. Sen jälkeen kytketään tekstit, äänet ja laudat.
4. Tallenne ja kuvat lähetetään Päätoimittajalle, ja merge-pyyntö menee junaan Päätoimittajan kuittauksella.
