# Natiivisepän luovutus 24.9.2026 (b), klo 10.30

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 70 % (Fable).
Edellinen: viesti-natiiviseppa-luovutus-20260924.md. Rooli: natiivin pääkehittäjä, proto-gitin master, Unity/iPad/simulaattori.

## Lue ensin

CLAUDE.md, Raamatun Ydinajatus kohta 2 ja NATIIVI PELI ETUSIJALLE (LENNON ESITYS, KAMERA-AJOT, TEMPO päivitetty 24.9.),
proto-3d/TYOTAPA.md, Assets/Matkakirja/RAJAPINTA.md (uusi luku 3c NostoKerros). Muisti: natiiviseppa-tila-20260924-aamu.md,
natiiviseppa-tf-sha-viesti.md, lokikansiot-vain-kuvat-konsoli.md.

## Tila

- **Proto-master 333d3f0** (tarkista 0, kaanna 248/248). TestFlight build 5 = 7878cbc (Julkaisija vei klo ~09).
- **Laitteet:** iPad = development-build 63a2852 (Linssisepän piikkiajo 4 käynnissä, odota "iPad pois", palauta sitten release).
  iPhone 18 Pro -simulaattori 1572C658 = 333d3f0 (Natiivi-UI ja Linssiseppä kuvaavat). iPad-simulaattori 503000D1 = 3b107c0.
- **Levy:** ~30+ Gt vapaana. `tyokalut/siivoa-levy.sh` (+ launchd-plist, omistaja asentaa). Hae iPadilta vain nimetyt tiedostot:
  `tyokalut/ipad.sh hae <kansio> a.png b.png`. EI koskaan koko Documentsia. Pysyvät poistot tekee omistaja.
- Unity: kysy Julkaisijalta ennen omaa ajoa, jos TF-vienti on tulossa. Jokaisen merge-erän jälkeen SHA Fablelle ja Julkaisijalle.

## Jonossa (merge-pyynnöt)

- `natiivi-ui/nostomerkit` 33a8e7e (8d554a8 2.0-lukijat + 33a8e7e pulun chat SSE). Ei uusia tiedostoja? tarkista. Asenna iPhone-simulaattoriin.
- `natiiviseppa/syva-ranska` 3e8509a KESKEN, EI mergetty: SyvaPohja.cs (Karttasepän Ranska z9–11, overlay päälle vain Ranskan yllä
  < 900 km). Tarkistamatta: Laattapalvelin/varakuva (PohjaPolku minimumLevel 0 → syvä ei saa varalaattaa, ok), Cesiumin 3 kerroksen raja linssien kanssa.
  Odottaa väritasoa (Fable: 1 → 2 → lentokamera ensin).
- Linssiseppä tekee `Linssit/Ydin/Kamera/Kamerakoreografia.cs` (käyräkirjasto Kamerakayrat + Kameravaihe/Kameraketju), tarvitsee .metan.

## BUILD 6 -lista (omistajan löydökset, Fablen järjestys)

1. **Nostot** — VALMIS masterissa: Kartta/NostoKerros.cs (osuus 0,5, saapumisportti 1,4 s, katto 120, paakartalla, lahizoom)
   + Natiivi-UI NostotKartalla.cs (merkit aina, ryhmitys 44 px, viuhka). iPadilla ennen suodatuskorjausta merkit eivät näkyneet
   (suodatin "ei"); 5b75610 korjasi. **Todenna iPadilla** Ateenassa (aja 38.3 23.5 8 2).
2. **Sepiapohja + väritaso + ääriviiva** — KESKEN: odottaa Karttasepän osoitteita (kysytty: sepiapohja z0–8, vari/<ISO>/z/x/y.webp,
   pyramidi-luettelo varitasot[ISO]). Web: vain nykyinen maa värillinen (12 mpk), ääriviiva #6b5539 1,6–3 px (KOROSTUS_PEITTO 1,
   VEKTORIT_HAIVE_MS 260), EI huntua. Fable peruutti "pohjaero hyväksytty": web on oletus. Kerrottu Linssisepälle.
4. **Lentokamera** — OSIN: masterissa etuviisto + lähikuva + jatkuva kulma/suunta + aloituslennolla vain kohdekaupunki
   (Nappula.cs Lento, KaupunkiMerkit.LahinId/NaytaVain) + smootherstep (PalloKierto.Smootherstep, Aja oletus, AutokyydinVaihe).
   KESKEN (omistajan uudet sitovat tilaukset, Raamattu LENNON ESITYS / KAMERA-AJOT / TEMPO):
   - avainkehysaikajana DATANA (osuus, kesto, käyrä expo/back/smootherstep/lineaarinen, etäisyys/kulma/korkeus/kohde),
     kuminauhamaiset siirtymät; ALKU syöksy lähelle konetta + kuminauhajarrutus, LÄHIKUVA hidas panorointi, IRTAUTUMINEN kiihtyvä
     vetäytyminen (pallo paljastuu), MATKA tasainen, LOPPU kiihtyvä kierto kohdekaupungin ympäri viistosta (kaupunkikohtainen suunta/korkeus,
     19 aloituskaupungin taulukko), hidastuva lasku; tahdissa luennan kanssa. Käytä Linssisepän Kamerakoreografiaa (PalloKierto.AjaKetju).
   - 3D-maasto lennolla (korkeuskerroin matalalla) + Aurinko.cs rinteet/varjot pelin kellonajan mukaan (9/13/18)
   - SININEN taivas (ilmakehägradientti, horisontti vaalea), ei mustaa; musta vain astronauttilinssissä
   - Toimita 8 kuvan sarja + mieluiten video iPadilta (ui aloita ateena, lento 31 s). Edelliset kuvat: lokit/lento-nostot-20260924/.
13. **Offline-laatat** — VALMIS masterissa (39452a1): Laattapalvelin uusintayritykset 3×, pergamenttivaralaatta pohjakerrokselle,
    Alueet rinnakkain 2 kun Laattapalvelin.Kiireinen tai kamera liikkuu. iPad-testi: 6 Balkanin maata + liikkuminen, 0 virhettä, ei mustaa
    (alkuperäistä vikaa ei toistettu). iPadin testilataukset poistettu (offline poista).
14. **Navat** — iPad-testissä napa ok (napakansi, ei mustaa); musta sektori oli sama laattavika kuin 13. Tarkista omistajan iPhone-kuva
    uudelleen buildissa 6. "Etelämanner sumeana kermana" = napakansi: tarkista webin napapiirto (ei tehty).
17. **Aloitusnäytön pallo** — EI ALOITETTU (minun osani): kaupunkien pisteet pois, pallo täyttää ruudun, pyörii hitaasti, sumennus
    (web js/etusivupallo.js, .intro-verho: nopeus, sumennus, etäisyys). Sumennus: `public static bool PalloKierto.PorttiSumea` (luvattu
    Natiivi-UI:lle, se kytkee Aloitusnakyma.PorttiMuuttui → tähän) → URP renderScale ~0,12 portin ajaksi (bilineaarinen = pehmeä).
    Sumennus pois ja pisteet näkyviin aloitusvalinnassa (19 kultapistettä + hehkurenkaat).
- **Hehkurengas** (aloitusvalinta, Laitetestaajan pariteetti #3034 rivi 2) — EI ALOITETTU: sykkivä kulta/oranssi rengas valittavien
  kaupunkien ympärillä webin mukaan (KaupunkiMerkit).
- **PalloKierron käyrät** — smootherstep VALMIS; yhteinen käyräkirjasto kaikkiin ajoihin (lennot, matkat, saapuminen, zoomit,
  paljastus, huipennus, aloituspallo) Linssisepän Kamerakoreografian päälle erä kerrallaan, jokaisesta kuvasarja.

## Muut tehdyt (tämä sessio)

- 2.0-valmius: Sisalto.Paaversio = 1 (+ Documents/sisalto-2.txt → sisalto/2/), Osoitin ominaisuutena; Reitit päätasolta (lauta, laji, via).
  Siirtoseppä: 2.0 julkaistaan PR #3030:n jälkeen → vaihto Fablen päätöksellä.
- Sisalto: välimuistin luku/purku/kirjoitus taustasäikeessä (UI-piikit 25–58 ms).
- Kamera FOV 50° (web PALLO_FOV). Kartan PalloKierto.Pistekerroin = Round(dpi/163). MaaTaytto raja 1 px + sRGB-peittävyys.
- MATKAKIRJA_KEHITYS=1 = Development-laitekäännös (`ui piikit`). Komennot/peli-/linssi-/ui-komento pois App Storesta.
- piikit3: `ui jatka` < 16 ms. Linssisepän ensipiirto vesistöt/topografia 10–16 ms (ScheduleDraw) → esilämmitys (EI tehty).

## Aloitusviesti uudelle sessiolle

> Olet Natiiviseppä (Opus). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja NATIIVI PELI ETUSIJALLE (LENNON ESITYS, KAMERA-AJOT,
> TEMPO), docs/raportit/viesti-natiiviseppa-luovutus-20260924-b.md (haara selvittaja-3d-luovutus), proto-3d/TYOTAPA.md ja
> RAJAPINTA.md. Proto-master 333d3f0. Ensin: mergeä natiivi-ui/nostomerkit 33a8e7e, sitten BUILD 6 -lista järjestyksessä
> 2 (kun Karttasepän osoitteet tulevat) → 4 (aikajana, taivas, 3D-maasto) → 17 → hehkurengas.
