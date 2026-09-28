# Aloituslento v3 (Natiiviseppä 28.9.2026 klo 07.3x)

Omistajan palaute v2-videoon (27.9. klo 23.5x, Fablen kautta): "kone pitää näkyä paljon pienempänä kun se kuvataan
kaukaa. laskeutuessa kamera pitää olla sen verran kauempana että töksö laskeutuminen ei näy kun kone näkyy ihan pienenä."
Fablen lisäykset: ohituksen ja saapumisen usva, saapumisen verkosta latautuvat laatat.

## Tulos

- Haara proto `natiiviseppa/aloitusrata` **d2fe17dc** (cbb4811f:n päällä, ei junassa). Käännös **4530895b** = master 17c2928b +
  aloitusrata, oma simulaattori FBBD41D7, oikea valintapolku (Uusi matka → Valitse aloituskaupunki → Ateenan napautus).
  0 poikkeusta. Kartta-testit 345/345, unity-tarkistus 0.
- Video: `proto-3d/lokit/aloituslento-33/v3/aloituslento-v3-tekstit.mp4` (736 × 1600, 17,8 s, versiokaista, alkutekstit
  väliaikaisena päällysteenä kuten v2:ssa). Raakavideo `v3/aloituslento.mp4`, loki `v3/konsoli-lento.txt`.
- Kuvaparit v2 | v3 samoista lennon hetkistä: `v3/kuvaparit/pari-avaus-3.0s.png`, `pari-ohitus-7.5s.png`,
  `pari-kosketus-13.2s.png` (versio, hetki ja mitta kuvassa).

## Muutokset (AloituslennonRata.cs, Aurinko.cs, Nappula.Aloitusrata.cs, Nappula.LentoV3.cs)

| | v2 | v3 |
|---|---|---|
| Koneen koko | siipiväli 5 % etäisyydestä → aina ≥ 11,6 % leveydestä | maailmassa vakio 5 km, ruudulla vähintään 2,5 % (4-normi); kasvaa vasta alle ~470 km:ssä |
| Ohitus | 23 km, kone 52 %, kallistus 83° | 25,6 km, kone 46 %, kallistus 76° |
| Saapuminen | 150 km, kosketus 135 km:stä, kone 14 % | etuviistosta 200 km:stä, kamera nousee: kosketus 490 km:stä, kone 2,9 % |
| Horisonttiusva | webin raja 0,6 × etäisyys (ohituksessa 14 km koneen takana) | raja vähintään 250 km radan ajan (Aurinko.UsvaVahintaanM, nollaus perillä ja purussa) |
| Ennakkokamera | yksi: ohitus, ohituksen jälkeen saapuminen | kaksi: ohitus ja kosketus odotuksesta asti |

Mallin mittaus (Kartta-testit, 7 kohdetta): maa näkyy usvan läpi ohituksessa 72 % ruudusta (loput taivasta), v2:n
usvasäännöllä 56 %. Uudet testit KaukaaPieniJaLaskuKaukaa ja UsvaEiHukutaMaata.

## Havainnot laiteajosta (v3b:n aiheet)

1. **Ohitus osuu merelle.** Ohitus on reitin puolivälissä; Lontoo → Ateena se on 45,4° N 13,2° E eli Adrianmeri. Lähikuvassa
   maa on vaaleaa, piirteetöntä merta, joka näyttää usvalta (sama v2:ssa). Horisontissa Alpit näkyvät nyt terävinä.
   Ehdotus: ohituskohta maan päälle (esim. osuus 0,45 → 46,0° N 12,0° E, Dolomiittien juurella).
2. **Saapumisen maa on suttuinen.** Cesiumin lokissa lennon ajan 1 000–1 400 laattaa odottaa latausta (Loading-Worker), vaikka
   laatat tulevat enimmäkseen laitteen välimuistista (lennon aikana 2 056 välimuistista, 363 verkosta; v2 2 542 verkosta).
   Pullonkaula on Cesiumin latausjono: lähellä kulkevan pääkameran laatat ohittavat jonossa kaukaisen kosketusnäkymän
   (ennakkokamera ei riittänyt). Nousussa (14–15 s) Kreikka tarkentuu terävänä. Ehdotus: kevyempi laattakysyntä kiressä ja
   ylilennossa (LiikeLaattojen SSE 32 vain näissä vaiheissa, ohitus ja saapuminen täydellä tarkkuudella).
3. Simulaattorin h264-nauhoitteessa PTS ja DTS eroavat lopussa ~3 s; ffmpeg päättelee osan kehysten ajan DTS:stä, jolloin
   saapumiskortti välähti kesken lennon. Kooste luetaan `-fflags +igndts` (skripti sessio-p/aloituslento-kooste.sh).

Merge 1.0.35-junaan vasta omistajan OK:n jälkeen.
