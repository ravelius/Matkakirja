# Natiivi-UI: luovutus 8.11.2026 klo 22.00 (konteksti 25 %; jono 1–3 koodattu, kierto ja Louvre PT:llä → KK; kyltit uutena tehtävänä)

Korvaa luovutuksen -2108 (`git show 2f9e8735f:docs/raportit/viesti-natiivi-ui-luovutus-20261108-2108.md`); siitä yhä voimassa: FPV-haara
natiivi-ui/fpv-nakyma d1c8a074f/7ddc42970 ja FPV-avoimet, "TARKISTUS:"-rivi jokaiseen ajopyyntöön, OPIT-luku (Mac iPhone-koko: `ui kamerasuhde
laite` + `komento maasto siirtyma 5 0 30` + `siirtyma kallistus 90` + `komento lahizoomi 3`; Mac-kuva vain riviltä `kuva X`).
PT local_5df52e10-…, JU local_06f8c680-…, NS local_99130238-…, KK local_37f7c945-…, Postivahti local_afae44f0-….
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/. Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa. Vanhat viestit käsitelty: älä toista.
JUNA 223 (natiivi-backup julkaisija/juna-223) kärki = 30f7090d8 = pieni kuva -haaran kärki: pieni kuva on jo junassa.
Tulos ja kaikki luvut: proto-3d/_tyo/natiivi-ui/kierto-louvre-1/TULOS.md (lue ensin).

## ODOTTAA PT:tä / KK:ta (kuvat katsottu ja viety PT:lle 22.0x)
1) KIERTO 1,5 × (omistaja 21.08): haara natiivi-backup natiivi-ui/esittely-kierto-135 = cb801202c (ad6936ea7 + cb801202c juna 223:n päällä),
   worktree /Users/Shared/Claude/wt/proto-natiivi-ui-napautus-puhdas. 0°→135° veisi nimet yli 90° → vaihtoehto: lento kääntää −45°, kierto
   −45°→+90° (135°, 2,25 °/s, ennen 1,50). Arkki lokit/nui-kierto-1-iphone-cb801202c/pari-kierto-ennen-jalkeen.jpg. KK:n sanalla junaan
   (ad6936ea7 + cb801202c). Jos KK hylkää käänteen: (b) edestakainen ±90°:ssa tai (c) 135° suoraan, nimet kallistuvat.
2) LOUVRE MUSEO/ESITTELYKIERROS (omistaja 21.07): haara natiivi-backup natiivi-ui/louvre-valinta = 2f7df0ced (juna 223 + 1), worktree
   /Users/Shared/Claude/wt/proto-natiivi-ui-louvre. Kuvat OK iPhone + iPad (lokit/nui-louvre-valinta-1-{iphone,ipad}-2f7df0ced/). KK:n sanalla
   junaan. Ristiriita kierto-haaran kanssa vain NahtavyysEsittely.cs:n otsakekommentissa.
3) LENTORAJA-6 (PT 21.1x): haara natiivi-backup natiivi-ui/merenpohja-pohjapallo-lentoraja = 7bbea110d, worktree wt/proto-natiivi-ui-lentoraja.
   Kaaren huippu leveämpi s(2 − s) vain kohokarttalennossa. Mac-video JU:lla JONOSSA (sk-lentoraja-6-mac.txt, lokit nui-lentoraja-6-7bbea110d):
   kun JU ilmoittaa → katso (kehysloki: korkeus sivuliikkeen alussa ~980 km, -5:ssä ~500; s. 12,3 ei Bretagnen seinämää) → pari -5 | -6 PT:lle.
   Lentoraja (2) linssin sulun 0,9 s paluu: aito vika, Karttasepän Topografia.cs:324 – kerrottu PT:lle, ei koskettu.

## SEURAAVA TEHTÄVÄ (PT 22.0x, KK 21.59; EI korttia): ★-KYLTIT NYKYISEN KYLTIN ALLE
Omistaja 2.11. 08.42 (paatokset-2026-11.md:90): toinen teksti NYKYISEN rakennuksen tekstin ALAPUOLELLE tähtimerkinnällä → kumpikaan ei väisty.
Tehtävä: ★-kyltti kiinteästi nykyisen kyltin alle ilman limitystä – kaikki 2.11.-listan parit (Grand Palais / Palais de l'Industrie, Orsay,
Trocadéro, Les Halles). Oma haara junan kärjestä (natiivi-backup julkaisija/juna-223 tai uudempi). Mac-pari ennen | jälkeen iPhone vaaka + iPad → PT → KK.
Lähtötieto (luettu, ei muutettu): NostotKartalla.KyltinKylki: Kohdenostot.Ratkaisu(id) == "kyltti" → "ala2" = pino OMAN pisteen alle
(NimionLaatikko: perus = alaPv + h + KyltinPinoVali), eli ★ olettaa yläpuolelleen kyltin samassa pisteessä. Grand Palais'n kyltti on kuitenkin
3D-mallin kyltti (Nahtavyysalue.Kylttikohde → KaupunkiPallot.Kyltit, oma paikka mallin kohdalla; ★:n paikka PiirrosKerros.Tahdet 48.865934
2.316692 "Grand Palais'n viereen") → eri piste, joten "ala2" ei osu sen alle ja Grand Palais peittää ★-tekstin yläosan (e-2-pieni.png,
lokit/nui-pienikuva-2-iphone-vaaka-30f7090d8). Ratkaisu: ★-kyltin ankkuri = nykyisen rakennuksen kyltin laatikon alareuna (mallin kyltti tai
kohdenoston kyltti, kumpi kartalla), keskitettynä sen alle, kiinteä (Raamattu 2.216: ei liikettä panoroidessa). Tarkista jokaisen parin
nykyinen kyltti: mallin kyltti vai kohdenoston nimikyltti. Skenaariopohja: sk-pienikuva-3-mac.txt (vaaka: koko iphone-vaaka).

## Muut avoimet ennallaan
c) Merenpohja-3 PT:n vastaus; d) FPV: NS:n A/B-tulos. Sivulöydös PT:lle viety: NRE pelin sulussa MuseoSovitin.Sulje:797 (Linssiseppä).
