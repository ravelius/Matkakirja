# Linssiseppä 2:n luovutus 5.10.2026 (klo 06.0x)

Edellinen: viesti-linssiseppa2-luovutus-20261004.md. Päätoimittaja local_5df52e10-10e4-4b72-9554-0049db300dfe.
VUOROT: käännös- ja simuvuoro aina Julkaisijalta ("NYT käännös", "SIMU NYT"). Ilmoita: "KÄÄNNETTY <sha>, lukko vapaa" ja "simu vapaa".

## ISS-ohjaamo, proto-haara linssiseppa2/iss-ohjaamo (worktree /Users/Shared/Claude/wt/proto-linssiseppa2-ohjaamo)
Ohjaamo siirtyy junaan 143 (Päätoimittaja 02.36). Sen ehtona on, että kuusi maailmakuvaa hyväksytään.
Kuvat lähtevät Päätoimittajalle vasta, kun olen tyytyväinen niihin: ei sumeutta, kiiloja eikä saumoja. Mukana Meksiko täysikokoisena.
- LCD (9f2af091) ja cupola cold open (06ce558b, BUILD 139) ovat valmiit. Natiivi-UI:lla on 9f2af091. Kun kuvat on hyväksytty,
  pyydä Natiivi-UI:ta mergeämään iss-ohjaamon kärki.
- Commitit 5.10.:
  - d87b90a6: S2-limitys ristihäivytetään 9,8 km:n leveydeltä, varakuva vain aukkoon.
  - 2d53f9f5: indeksin versio on vakio S2Maailma.Versio, ja välimuisti on versioitu.
  - ad726e1f: usvatasoitus mitataan limitysparien saman maan mediaanierotuksena. Vanha tummin 1 % luki meren usvattomaksi
    (Meksikon kaista −40).
  - 69e49d69: **v2-juuri** (Karttaseppä: luvallinen, 6/6 indeksiä ämpärissä). Kierros 2 hakee datattomille lehdille
    toisen radan täytekuvan ("toinen_rata", valinta 3).
- Testit: Linssit 647+ läpi, unity-tarkistus 0.

## Avoinna
1. **Käännä 69e49d69** (Julkaisijalta vuoro) ja aja kuusi kuvaa F2D9B022:lla: lokit/linssiseppa2-skriptit-20261001/maailma-kuvat.sh
   (APP=, OUT=, LUPA=, PAIKAT=). Päätoimittajan toiveesta paikat ovat: amazonia -3.1 -60.0, **amazonia-20mrc -2.26 -59.85**,
   sahara 25.0 9.0, australia -25.3 131.0, pohjois-amerikka 36.1 -112.1, meksiko 31.8 -114.8, venetsia 45.44 12.33 ja
   **kanaria-28sca 32.08 -16.59**. Täytekiilan sauma tarkistetaan 20MRC:stä (tummempi) ja 28SCA:sta (vaaleampi). Jos sauma
   näkyy, seuraava erä on Karttasepän kiilan sävytasaus indeksiin. Huom.: usvatasoitus ad726e1f vertaa myös täytekuvaa
   limitykseen, joten se voi tasata kiilan jo itse.
2. **Meksikon suiston vaalea suorakulmio** (ecf0883f, lokit/linssiseppa2-maailma-ecf0883f/kuvat/20261005-024336.jpg) näkyy yhä.
   Todennäköinen syy on, että SCL merkitsee kirkkaat suola- ja vuorovesitasangot pilveksi. Silloin pilvisen lehden varakuva
   (valinta 1, eri päivä) näkyy lehden muotoisena suorakulmiona. Offline-toisto:
   `INDEKSI_JSON=<ix-amerikka.json> TASOT_PPM=mx.ppm TASOT_KULMA="31.258 -117.525 424 31.858 -114.447 122" TASO=11
   PILVIMASKI=1 USVA=1 ./kaanna.sh KaikkiTasot` (Linssit-testit; hidas, hakee koko resoluution curlilla). Korjausehdotus: pilveksi
   merkitty pikseli vaihdetaan varakuvaan vain, jos varakuva on selvästi tummempi (oikea pilvi). Kirkas pinta, joka on molemmissa
   kirkas, pidetään ensisijaisena.
3. Saharan ohut suora katkoviiva vasemmassa alakulmassa: todennäköisesti 1 px:n nodata-rako ruudun 32RNN radan reunassa (nodata 3 %).
4. Pilvien "popcorn"-ilme on omistajan 1.10. linjaus, ei muuteta. Meksikon aavikon vaaleus on dataa.

## Muut
- Poistettu wt/linssiseppa2-web-main (Päätoimittaja, levy). HEAD on mainissa squashina 5441e20e8.
- Scratchpadin *-app-kopiot siivotaan käännösten jälkeen (~440 Mt kpl).

## Päivitys 5.10. klo 06.4x: v2-ajo 10c31692 (kahdeksan kuvaa, laattavedos)
Kuvat: /Users/Shared/Claude/proto-3d/lokit/linssiseppa2-maailma-10c31692/kuvat. Vedos: …/laatat/laatat-<id>/<taso>/<x>/<y>.png.
- **Amazonian kiila on poistunut** toisen radan täytteellä (20261005-033346.jpg). Venetsia, Australia ja Pohjois-Amerikka ovat hyviä.
- 20MRC (033507): täytteen raja näkyy lievänä pystysaumana, ja täyte on hieman samea. Karttaseppä tekee kiilan sävytasauksen.
- Kanaria 28SCA (034056): avomerellä on selvät suorat heijastussaumat, eri ottopäivien auringon heijastus. Ei vielä kunnossa.
- Meksikon suiston suorakulmio (033930) näkyy myös laatoissa (taso 4: x 9, y 16). Syy on 11SPR:n (2024-08-27) ja 11SQR:n
  (2023-07-01) eri ottopäivä, koska vuorovesitasangon kirkkaus vaihtelee. Usvasiirto ei korjaa tätä. Pyyntö Karttasepälle:
  naapuriruuduille sama datatake aina kun mahdollista. Offline-toisto v1-indeksillä ei näyttänyt tätä (eri lehtijako ja tarkkuus).
- Viestit Päätoimittajalle ja Karttasepälle 06.4x. Kuvia EI ole lähetetty: Kanaria ja Meksiko eivät ole vielä kunnossa.
- Seuraavaksi, kun Karttasepän indeksi päivittyy: sama kahdeksan kuvan ajo (vaihda vain APP ja OUT), sitten tarkistus ja lähetys.
- 06.4x: **v2b-tuki valmis** (iss-ohjaamo d227d4c9): valinta.savy {vahvistus, siirto} → TCI · vahvistus + siirto ennen usvaa ja lutia.
  Juuri on yhä "v2". Karttasepän v2b valmistuu noin klo 8 polkuun s2-indeksi/v2b/. Vaihda S2Maailma.Versio = "v2b" VASTA
  Päätoimittajan kuittauksen jälkeen, käännä ja aja kahdeksan kuvaa. Saman datataken indeksi (v2c, 3–4 h) odottaa
  Päätoimittajan etusijapäätöstä.

## Päivitys 5.10. klo 09.5x (uusi Päätoimittaja local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31)
- **78f1a7ed** radan reunan syövytys 2 px: Saharan tumma pisteviiva on COG-yleiskuvatasojen (40/80 m) keskiarvoistama reunapikseli
  (COG häviötön Deflate, ei JPEG). Kehä tarkistetaan vain nodatalaattojen lähellä (NodataLaatat-lippu).
- **231c3c21** vesitaso ruuduittain (TasaaVesi): Kanarian meri on kaikkialla SCL 6, mutta sunglint-päivät (28SBA 2025-06-13,
  28SCB 2023-06-27) ovat 40–50 kirkkaampia; ruudun oman meren mediaani → merenväri, vain poikkeama jää 25 %:lla. Linssit 649/649.
- Avoin: radan reunan ristihäivytyksen askel (datapuolen paino hyppää ~0,56:sta 0:aan, eri päivät 7–26 % eri kirkkaus). Katso
  kuvista ennen korjausta (vaatisi etäisyyskentän nodataan).
- Jonossa: käännös 231c3c21 Siirtosepän jälkeen (~11.45), simu F2D9B022 ~12.20 (Julkaisija). Karttasepän v2b julkaisu ~11–12.
  Jos v2b on ämpärissä simuvuoroon mennessä: toinen ajo MAAILMA=<v2b maailma.json> VERSIO=v2 (maailma-kuvat.sh kopioi nyt
  versioidulle nimelle), jolloin v2b:n voi todentaa ilman versiovakion vaihtoa.

## Päivitys 5.10. klo 13.0x — ohjaamo junaan 144 (VIE-ikkuna klo 20)
- Proto linssiseppa2/iss-ohjaamo: c598aecf v2b-vakio · 43c7e0f2+8b780990 meri mosaiikin vakioon (48,64,85; Karttasepän
  euromosaiikki-v2.mjs MERI) → Kanarian sauma 31,95° N poissa · a693e5e1 vesitaso myös kulmasta haetulle ruudulle (28SCB-kiila).
- Päätoimittaja HYVÄKSYI 8b780990: Sahara, Amazonia, 20MRC (parit lokit/linssiseppa2-kuvaparit-20261005/).
- Avoinna: Kanarian pari a693e5e1:n ajosta (käännös junan 143 jälkeen, simu ~13.15; skripti scratchpad/aja-a693.sh,
  LUPA-tiedosto simu-lupa), Meksikon pari kun Karttasepän v2c valmis (13–15; vaihda Versio "v2c" vasta kuittauksella).
  Sitten Natiivi-UI:lle iss-ohjaamon kärjen merge-pyyntö junaan 144.

## Päivitys 5.10. klo 15.4x
- Proto iss-ohjaamo-kärki 962ff4ee: d9bc4a58 vesitaso tasona (sunglint-liuku) · 962ff4ee pilvikuori pois ISS-kuvan
  renderöinnistä (Päätoimittaja hyväksyi). Kanaria HYVÄKSYTTY (pari kanaria-10c31692-8b780990.png). Sahara/Amazonia/20MRC hyväksytty.
- Käännökset tehdään yhdistelmänä `linssiseppa2/iss-ohjaamo+pelikoodari/testimykistys-natiivi`, kunnes mykistys on masterissa;
  maailma-kuvat.sh asettaa `aani mykistys 1` ja kirjaa tilan.
- Avoinna: Meksiko odottaa v2c:tä (vahti; vaihda Versio "v2c" vasta kuittauksella → käännös → kuvapari). Sitten Natiivi-UI:lle
  iss-ohjaamon merge-pyyntö junaan 144 (VIE 20). Euromosaiikin saarisädekehät: Karttasepän korjaussarja uuteen polkuun →
  vaihda AstronauttiKerros.S2Juuri.
- SEURAAVA ERÄ (Päätoimittaja hyväksyi): GIBS 250 m -pilvimaski ISS-kuvaan (VIIRS paikkaa MODIS-raot, pinta S2, attribuutio
  "NASA EOSDIS GIBS"), kuvapari pilvinen/pilvetön + Cupola samaan aikaan; tavoite juna 145.

## Päivitys 5.10. klo 16.5x — GIBS-pilvet
- OMISTAJAN PÄÄTÖS 15.5x: "aina selkein 7 päivästä" (ISS-kuva; Cupola ennallaan).
- Proto-haara linssiseppa2/gibs-pilvet (worktree wt/proto-linssiseppa2-gibs, iss-ohjaamon 962ff4ee:n päällä): c2927bd8 + 5b1a018a.
  GibsPilvet.cs (maski, selkein päivä, pysyvä valkoinen pois, varjo, terävä reuna), KuvanTyosto.PiirraPilvet (kuvauspaikat),
  IssKameraKuva.HaeGibs, A/B `astro kyyti kuvaa gibs 0|1`, offline-esikatselu GIBS_PPM (Linssit-testit). Testit 656/656.
- Kuvaparit Päätoimittajalle 16.5x: lokit/linssiseppa2-kuvaparit-20261005/gibs-{helsinki,amazonia}-7032ae79.png. EI mergeä ennen
  ohjaamon junaa 144; sitten gibs-pilvet rebase/merge iss-ohjaamon junaversion päälle → juna 145.
- Esiselvitys: lokit/linssiseppa2-gibs-esiselvitys-20261005/YHTEENVETO.md. Ajoskripti scratchpad/aja-gibs2.sh (KAARI2="kuvaa gibs 0").

## Päivitys 5.10. klo 18.1x — OHJAAMO JUNAAN 144 (omistaja: lähtee joka tapauksessa)
- Merge-pyyntö Natiivisepälle 18.0x: linssiseppa2/iss-ohjaamo **a2941f8f** (lopullinen): v2d, avomeri tasainen (f6d3a436),
  paikat.json maanosa (87863aae, Natiivi-UI:n elävä opas). Testit Linssit 651, Kartta 442, Peli 388, unity 0. Simu e3c7217b OK.
- Avoinna indeksinä (ei koodia): Meksikon 11SPR radan reuna (pyydetty Karttasepältä v2e = koko suiston kattava päivä; vaihda
  vain S2Maailma.Versio). Euromosaiikin saarisädekehät → Karttasepän korjaussarja (polku tulossa).
- JUNA 145 järjestys (Päätoimittaja): (a) GIBS-pilvet (valmis, haara linssiseppa2/gibs-pilvet 5b1a018a; rebase ohjaamon päälle),
  (b) s2-maailma/v2 natiiviin: Cupola + ISS-kuvan kaukoalue koko maailmaan (laatat.json: yksi puu {z}/{x}/{y}.jpg z6–z10,
  saatavuus-bittikartta; korjaus.json tulossa) — kuvapari 3 aluetta Euroopan ulkopuolelta nyt vs v2 ennen merge-pyyntöä,
  (c) euromosaiikin korjaussarjan polku.
- Worktreet wt/proto-linssiseppa2-ohjaamo ja -gibs poistetaan mergen jälkeen (git worktree remove, proto-gitissä).

## Päivitys 5.10. klo 19.5x
- JUNA 144: iss-ohjaamon kärki **eea832b1** (a2941f8f + v2e) Natiivisepällä; Meksiko v2e todennettu (meksiko-v2d-v2e.png).
- JUNA 145 (proto-haarat, worktree wt/proto-linssiseppa2-gibs, nyt haarassa linssiseppa2/s2-maailma):
  - (a) linssiseppa2/gibs-pilvet **30e870d9** (GIBS + ohjaamo) — Päätoimittaja hyväksyi.
  - (b+c) linssiseppa2/s2-maailma **032129c8** (= gibs + s2-maailma v2 + korjaussarja (korjaus.json "korjatut", vakio
    S2MaailmaLaatat.KorjausKansio) + Euroopan mosaiikki v2 (vakio Laattapalvelin.S2EuroopanVersio)). Natiiviseppä kuittasi
    lisäysversion ehdoin: vanhat buildit ennallaan, mittaus (phys_footprint Cupola/ISS-kuva Euroopan ulkopuolella nyt vs v2,
    S2-välimuisti levyllä 10 min kyydin jälkeen ≤ 384/192, verkon Mt), purku taustalla (< 16 ms), hakuvirhe = nykyinen.
  - Koeajo 1 (b4f9eba3): ISS-kuvat OK (Australian suolajärvi valkoinen), Saharassa MGRS-saumat (Karttasepän tasaus →
    v2-korjaus2), Cupola v2 sumea → koeajo 2 käännöksellä 11bae6ef (CUPOLA_ODOTUS=25, muisti fp) simuvuorolla ~20.35.
  - Kuvapari Päätoimittajalle ennen merge-pyyntöä: 3 aluetta Euroopan ulkopuolelta nyt vs v2.
- maailma-kuvat.sh: KAARI2 toinen kierros (A/B), CUPOLA_ODOTUS, muisti (footprint, PID ps:stä), S2-välimuisti lopussa.
  HUOM: ajo.log sisältää binäärimerkkejä → grep -a (vahdit jäivät jumiin ilman sitä).

## 23.0x: lokit arkistoitu
proto-3d/lokit/linssiseppa2-* (skriptit, kuvaparit, gibs-esiselvitys, maailma-ajot) on siirretty arkistoon
/Volumes/T7 4TB/proto-3d-lokit-arkisto/ (sama nimi). maailma-kuvat.sh ajetaan sieltä; tulosteet (OUT) edelleen lokit/-kansioon.
S2-maailman koeajo 2 (käännös 11bae6ef, aja-s2m2.sh → lokit/linssiseppa2-s2maailma-koe3) odottaa yhä simuvuoroa (siirtyi junan 144 takia).
TYÖTAPA (Päätoimittaja 23.1x): vika toistetaan ennen korjausta, sitten sama ajo korjattuna (ennen/jälkeen-parit).

## 6.10. klo 00.0x — ohjaamon pallon kosketus (omistajan palaute, juna 146)
- Haara linssiseppa2/ohjaamo-kosketus **2c2ad7ac** (cad8ede1 + PalloKierto.EleetMuualla, CupolaVeto asettaa/nollaa,
  A/B `astro kyyti pallolukko 0|1`). Merge-pyyntö Natiivisepälle junan 146 ensimmäiseen käännökseen (Julkaisija: ei omaa
  käännöstä). Todennus junan appilla: scratchpad/kosketus-ajo.sh (APP=, OUT=, LUPA=) → `valmis`-tiedosto → oikeat eleet
  simulaattorityökalulla videolle pallolukko 0 ja 1 → `touch $OUT/loppu`. Kuittaus Päätoimittajalle ennen 9.30.
- S2-maailman koeajo (11bae6ef, aja-s2m2.sh) tulee sen jälkeen. GIBS f810ec54 junaan 145/146 Päätoimittajan kuittauksella.

## 6.10. klo 01.2x — tila (viestit muille sessioille tauolla, 10 viestin raja; jatkuu omistajan seuraavasta viestistä)
- Pallolukko 2c2ad7ac: toisto oikeilla eleillä EI tehty – simulaattoripaneelin lupa (F2D9B022, "Let Claude use it") odottaa
  omistajaa. Ajoskripti scratchpad/kosketus-ajo.sh (APP lokit/natiiviseppa-app-146toisto2-7ac47be9). Kuittaus Päätoimittajalle ennen 9.30.
- Juliste (juna 147), proto-haara linssiseppa2/iss-kamera-juliste: 172915f6 siluetti → 7ee03d6a Päätoimittajan palaute
  (sommittelu kaari 22 %, GIBS lähialue tarkempi saman selkeimmän päivän mukaan, paikan oma aika paikat.json TIMEZONE)
  → d977f81d (kuvaa suunta -testikomento, siluetti kaaren kohdalle; EI käännetty). Stillit 2504ef45:
  lokit/linssiseppa2-juliste-2504ef45/kuvat/20261005-220332.jpg (Helsinki: sommittelu ok, mutta Suomenlahti kiiltää
  valkoisena – kamera luoteesta kohti aurinkoa; seuraavaksi kuvaa suunta 170) ja 220534.jpg (Manaus ok, klo 10.30 paikallista).
  Siluetti katosi mustaa avaruutta vasten → d977f81d. Ei vielä Päätoimittajalle.
- S2-maailma v2 koeajo 11bae6ef tehty 01.11–01.18: lokit/linssiseppa2-s2maailma-koe3/kuvapari-cupola.png (v2 vs nyt, 0/25 s).
  v2 selvästi tarkempi ja luonnollisempi; näkyviä laattojen sävysaumoja (Amazonia vino raja, Australia suorakaiteet) →
  korjaussarja. ISS-kuvat v2:lla 0 Mt haettua (mosaiikki) vs 21–30 Mt nyt. phys_footprint Cupola 1015–1488 Mt (v2) vs 1292–1515 (nyt).
- Natiivi-UI kysyi (vastaamatta): nopein onnistuva kuva = astro kyyti; kello +X (päivä); siirra 60.17 24.94; kuvaa 4:5 1080.
  UI on piilossa vain renderöintivaiheessa (kamera.targetTexture = rt, Edistyminen 0,85→1); KEHITETÄÄN-palkki näkyy haku- ja
  työstövaiheissa (0→0,85). Ehdotus: näyttökamera renderöinnin ajaksi, tai kehittyvä kuva (RT) UI:hin.
- Natiivi-UI 2. kysymys (vastaamatta, viestit tauolla): meren yllä ei kuvaa tarkoituksella. Lopputila on IssKameraKuva.Tila, kun
  Kaynnissa → false: "valmis" | "ei maata" (näkymässä < 3 % maata) | "ei kuvauspaikkaa" (S2-indeksin ulkopuolella) |
  "keskeytyi" (muu virhe) | "osta" (kuvat loppu, heti Laukaise-kutsussa). LCD-ehdotus 2 s: EI MAATA KUVASSA / EI KUVA-AINEISTOA /
  KUVAUS KESKEYTYI. Nopea onnistuva kuva simussa: astro kyyti; astro kyyti kello +<h> (paikallinen päivä); astro kyyti siirra 60.17 24.94;
  astro kyyti kuvaa 4:5 1080.
- Pelikoodari (todistusajon skenaario 12, pallolukko) – vastaus valmiina, lähettämättä:
  1) Yhden sormen veto pallon päällä riittää (PalloKierto: veto liikuttaa karttakameraa ja PelaajanEle lopettaa seurannan);
     nipistys zoomaa samoin, mutta ei ole välttämätön. iPhone 402×874 pt: (150, 300) → (260, 460), 0,8 s + pito 1 s
     (vältä vasen säätönappi ~(30, 315), Pulu oikealla alhaalla ja kytkinpöytä y > 700).
  2) Tunniste: `astro kyyti tila` → rivi "astro kyyti: <Tila> … kamera (lat, lon) N km kall K° suunt S°". Kysy ennen vetoa ja
     pidon aikana (komento kesken pidon): vika = kameran lat/lon/km/kall muuttuu selvästi (yli ISS:n oman liikkeen,
     ~0,07°/s 1×:llä); korjaus = ennallaan. Korjauksen läsnäolo: `astro kyyti pallolukko` → "pallo (lukittu|auki)" (vain 146:ssa).
  3) Veto + pito riittää; kahden sormen ele vain lisävarmistukseksi.

## 6.10. klo 08.3x — juliste E v3 ja pallolukko (viestit taas tauolla)
- Juliste proto-haara linssiseppa2/iss-kamera-juliste @ a3fd4d94 (EI käännetty): E v3 -asettelu (41658bec), tarkka aineisto
  (b45dd8b2: budjettiarvio mosaiikin jälkeen, raja 100 Mt; filmi + ilmavoima 3,5; ohjaamo näkyviin haun ajaksi), kehitys
  (81cedf76: paikallinen kontrasti, sinisyys, hehku; halo kaarisini 1,2 + syvä 1), a3fd4d94: SUOMENLAHTI polygonista, nimen varjo,
  GIBS-pilvet kuvan hetkeltä. Stillit d06ffe2c:llä (b45dd8b2): lokit/linssiseppa2-juliste-b45dd8b2/kuvat/20261006-052215.jpg
  (Helsinki 21.6. 17 UTC, z6–9 mosaiikista, 1,1 Mt; 52 mm, 869 km → ~220 m/px, eli 10 m ei näy tällä etäisyydellä) ja 052429.jpg
  (Manaus 202 Mt: haku 100 + datattomien kiilojen varakuvat 102 → raja ylittyy, ehdotus: varakuvat budjettiin).
  Helsingissä lokakuun GIBS-pilvet harmaana laattana → a3fd4d94 hakee pilvet kuvan päivältä. Seuraavaksi käännös + Helsinki ~5 min.
- Pallolukko 2c2ad7ac → juna 147 (Päätoimittaja). Pelikoodarin A/B ei toistanut vikaa yhdellä sormella: Cupolassa (Ikkuna) yhden
  sormen veto oli estetty jo ennen (CupolaVeto: YhdenSormenVetoMuualla = cupola) → vika on kahden sormen eleessä (nipistys/kierto)
  ohjaamossa. Tilarivit ristissä = ruudun viive (EleetMuualla päivittyy seuraavassa ruudussa) → korjattu 7cc8f2be
  (linssiseppa2/ohjaamo-kosketus). Kerrottava Pelikoodarille: kahden sormen nipistys pallon päällä ohjaamossa.
- Cupola-palaute (omistaja 08.3x, juna 147): kehys iss-cupola-kokonainen-{iphone-1206x2622,ipad-1536x2732}.png + heijastus on
  Codexin kuvatoimitus 26.9. (bf8a6101d, posti/kuvatoimitus-iss-cupola-20260926.json, NASA-viitekuvat iss035e010551 ym.), ämpäri
  karttanostot/20260926/. LasiZoom 1,3 (IssKyyti.cs, LS1:n tiedosto) suurentaa sen → pehmeä. Tarkempi (≥ 2,6× = 3136 × 6817 /
  3994 × 7103) vaatii Codexin uuden toimituksen tai uudelleenpiirron (generointi omistajan luvalla). iPad: LasiZoom pienemmäksi
  (esim. 1,15) vain iPadilla (CupolaKerros.HaeKuvat ipad-tunnistus) – LS1:n kuittaus.
