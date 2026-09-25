# Savukierros: build 14 (juna/b13 @ 7f68d1f7, sisältää 066c01fb), iPhone 18 Pro

Pelikoodarin Fablen kautta pyytämä kohta + Fablen build 14 -kierros yhdistettynä
(25.9.2026, 16.0x). Laite 1572C658 (402×874 pt). Kosketustyökalu toimi läpi
kierroksen (`attach`+`tap`), tekstikomennot (`peli-komento.txt`, `ui-komento.txt`,
`linssi-komento.txt`) käytössä liikkeen ja linssien varmistukseen.

## PASS

1. **Kylmä käynnistys + "Uusi matka":** aloitusportti avautui puhtaana intro-
   ruutuna. Kuva 1.
2. **Löydös 109 — VALITSE ALOITUSKAUPUNKI kartalta (ei komentoa):** globaali
   kartta näytti valittavat kaupungit (Moskova, Istanbul, Ateena, Kairo)
   korostettuina, Lontoo nastalla. Napautin Ateenaa suoraan kartalta. Kuva 2.
3. **Aloituslento (~10 s):** kone nousee, "Ohita"-nappi näkyy, teksti "Kone
   nousee." Kuva 3.
4. **Perillä Ateenassa:** matkakirjakortti "Ateena, elokuussa 1873" 🔊-kuvakkeella
   näkyy heti saapumisen jälkeen; EI reittiviuhkaa eikä katkoviivoja näkyvissä.
   Kuva 4.
5. **Nosto + teksti klikattavissa:** napautus "Ateena, elokuussa 1873" -kortista
   avasi postikortin (kahvinjuontikuva, kuvateksti). Kuva 5.
6. **Radio:** `linssi radio` → `auki: radio`, `radio taajuus 0.3` → Viritys →
   Lukittuu → Soi DZA "Algérie Chaine 1 / Sahara". `linssi pois` → kamera palasi
   siististi (ei jäänyt Saharaan tällä kertaa, toisin kuin iPad-kierroksella).
7. **Avaruuslinssi (satelliitti):** `linssi satelliitti` → `auki: satelliitti`,
   maapallo näkyy oikein (ei kermaväriartefaktia), satelliitin rata piirtyy.
   Oikea komento-id on `satelliitti`, ei `avaruus`. Kuva 6.
8. **Löydös 109 — Liiku-nappi ja reittiviuhka:** ennen `ui liiku`-komentoa
   kartalla ei näkynyt katkoviivareittejä eikä onttoja välipisteympyröitä (Sofia
   näkyi vain "Liiku"-nappina + noppakuvakkeena, kuva 7). `ui liiku` avasi
   reittiviuhkan (Sofia korostettuna rengaskuviolla, noppa aktiivinen, kuva 8).
9. **Siirto Ateena → Sofia:** `siirto c:sofia` (HUOM: oikea kohdemuoto on
   `c:<id>`, pelkkä `sofia` antaa "ei siirtokohde") vei "Matkalla" → "Traileri"
   → "Kartta" -tiloihin. Perillä Sofiassa (BULGARIA, "Sofia, elokuussa 1873")
   EI näy reittiviuhkaa eikä katkoviivoja — reitit häviävät saapumisen
   jälkeen kuten pyydettiin. Kuva 9.

## Ei löydöksiä/poikkeamia tällä kierroksella

- Radion kamera-Sahara-jumi (iPad-kierroksen löydös 2) EI toistunut iPhonella
  tässä ajossa — kamera palasi normaalisti `linssi pois`-komennolla.
- Löydöksiä 93 (karttanosto aukeaa myös nimiöstä) ja 104 (nostokortti aukeaa
  heti) EI ehditty erikseen — kohta 5 yllä (postikortti aukesi napautuksesta)
  sivuaa 104:ää mutta ei todista sitä eksplisiittisesti "heti"-vaatimuksen osalta.
  Jää seuraavaan kierrokseen.
- Löydös 100 (kartun radionappi: valo punaiseksi + kuuluu) EI ehditty — vaatii
  maailmankartan kartun UI:n, ei testattu tässä ajossa (aloitettiin Kreikasta/
  Bulgariasta, kartun sijaintia ei etsitty).

## Tekniset opit tälle kierrokselle

- Kosketuskoordinaatit: `simctl io screenshot` palauttaa kuvan pikseleinä
  (esim. 1206×2622 iPhone 18 Prolla), mutta `tap`/`swipe` odottaa laitepisteitä
  (`attach`:n ilmoittama tila, esim. 402×874 = kuva/3). UI-puun (`ui puu` →
  `ui-puu*.json`) `x`/`y`/`w`/`h` on jo laitepisteinä — luotettavin lähde
  kosketuskoordinaateille kuvasta laskemisen sijaan.
- `siirto <kaupunki>` vaatii `c:`-etuliitteen (esim. `c:sofia`), pelkkä nimi
  antaa virheen "ei siirtokohde".
- `linssi satelliitti` on avaruuslinssin oikea tunnus (ei `avaruus`).
- `ui liiku` pitää kirjoittaa `ui-komento.txt`-tiedostoon (ei
  `peli-komento.txt`), muuten "tuntematon komento".

## Kuvat

`docs/raportit/kaappaukset/savukierros-b14-20260925/`
1-kylma-kaynnistys, 2-valitse-aloituskaupunki, 3-aloituslento,
4-perilla-ateenassa, 5-nosto-ja-teksti-klikattavissa, 6-avaruuslinssi,
7-liiku-ei-reitteja-ennen, 8-liiku-reittiviuhka, 9-perilla-sofiassa-ei-reitteja.

iPhone 1572C658 sammutettu kierroksen jälkeen.
