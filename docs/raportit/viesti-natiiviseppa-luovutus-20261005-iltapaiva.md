# Natiivisepän luovutus 5.10.2026 iltapäivä (13.0x)

Luovuttaja: Natiiviseppä (Opus 5.5, high). Edellinen: viesti-natiiviseppa-luovutus-20261005.md (käytännöt voimassa).

## ALOITUSVIESTI (tilinvaihto 6.10. ~23.3x)

Olet Natiiviseppä (Opus, high). Lue tämä osio, MEMORY.md ja natiiviseppa-tila-20261003.md. Kytke Remote Control päälle.
Kerro Julkaisijalle ja PÄÄTOIMITTAJALLE, että olet paikalla. Juna-SHA:t otetaan vain PÄÄTOIMITTAJAN suoralla kuittauksella,
ja käännökset, simut ja iPad vain Julkaisijan NYT-viestillä.

## TILA HETI

- **BUILD 154 = master 8878ab70** (juna/b13 286e8f34, käännös 787db464, muutosloki #4079); TF 154 Julkaisijalla.
  BUILD 153 = 72788914 (b9f09bcd, 7920e6a0, #4073). Jättilogo korjattu d8cf0e82:lla (LaunchScreen-Musta-*, ei imageViewiä).
- **JUNA 155:** runko natiiviseppa/juna-155-koe **eb951c97** (wt/proto-natiiviseppa-j144) = 8878ab70 + LS2 gibs-pehmea 640eb7b4
  (merisumu + valotuksen olkapää; vauhtirajaus 5683ffaf EI). Testit 0/762/419/444. PAKOLLINEN: NUI:n noston ja pinnatun tilan
  erä 241fb080 (NUI kääntää ja ottaa stillit). Otetaan runkoon vasta PÄÄTOIMITTAJAN SHA-kuittauksella stilleistä. 14d/14e
  mittauksen jälkeen, jos ehtii. Käännösskriptin pohja: scratchpadin kaanna-153koe.sh → tyokalut/proto-kaanna.sh <SHA>,
  simukopio lokit/natiiviseppa-app-<nimi>-<käännös>. Muutosloki-PR PÄÄTOIMITTAJAN tekstillä (≤ 3 lausetta, 280 mrk;
  kysymysmerkki lainausmerkeissä).
- **JUNA 156:** yövalot (LS1 960b1bd7 / v5 koe-154 d78bd96e). iPad-mittaus mitätön, koska iPadin Wi-Fi on pois (omistaja kytkee
  huomenna töissä). d78bd96e on asennettuna iPadissa 00008103. Lisäksi äänimaiseman pilotti, kun kuitattu.
- **MAC v1:** 62f6b368 kaatui Burst AOT -linkkiin (hostmac-työkaluilta puuttui suoritusbitti). Korjaus f5d0e029
  (natiiviseppa/mac, wt/proto-natiiviseppa-mac). Vuoro Julkaisijalta NUI:n 241fb080-käännöksen jälkeen (~23.50):
  `perl -e 'use POSIX; exit if fork; setsid; exec "zsh", @ARGV' /Users/Shared/Claude/wt/proto-natiiviseppa-mac/tyokalut/mac-kaanna.sh f5d0e029 1.1.0 154`
  Tulos lokit/kaannospalvelu/*-mac-f5d0e029.log (KÄÄNNETTY-MAC / VIKA). .app Matkakirja-proto-mac/Build/mac/. Valmistuttua
  "lukko vapaa" Julkaisijalle; NUI tarkistaa ikkunan, skaalan ja hiiren.
- **Lokin appikopiot:** jäljellä 150-ea457278 (Siirtoseppä vahvistaa) ja 154lopullinen-787db464.

## AIEMPI (6.10. ilta)

- **6.10. 17.5x: BUILD 151 = master 1c71db03** (juna/b13 974806b0, käännös 204b3f9b; muutosloki #4066). BUILD 150 = 79d7a396
  (959abb6f, ea457278: muistioikeus, TF:ssä increased-memory-limit = 1). JUNARYTMI: ei VIE-ikkunoita — juna lähtee kun kuitattua
  sisältöä on ja edellinen on TF:ssä (omistaja 6.10. 17.4x).
- **JUNA 152:** kootaan 974806b0:n päälle Päätoimittajan kuittauksilla (jonossa NUI d408102b, LS1 00668144/fb53c4c1 still-parin
  jälkeen, Siirtoseppä linna-149 183866ed ym.). Worktree wt/proto-natiiviseppa-j144.
- **Muistioikeus:** vain TF/App Store -käännöksiin (f3a48802); .kehitys käyttää wildcard-profiilia, Xcodessa ei tiliä.
  Musta LaunchScreen: storyboardien tausta kirjoitetaan mustaksi PostProcessBuildissa (246c4817), koska Unity jätti valkoisen.
- **iPad-tallenne:** toimii, kun QuickTime on kiinni ja koodaus konsolissa; Wi-Fi-ilmoitus peitti ruudun (omistaja Kumoa).
  Kylmäkäynnistys- ja oppaan video lokit/natiiviseppa-ipad151/. Konsoli katkesi ~15 s:n jälkeen (devicectl), komennot menivät silti.
- **NATIIVI MAC:** natiiviseppa/mac 52882bce (= 974806b0 + Mac-pohja), ensimmäinen käännös kun kone vapaa (Julkaisija; ≥ 38 Gi).

## AIEMPI (6.10. iltapäivä)

- **6.10. 14.0x: BUILD 148 = master 9977dc2c** (juna/b13 385894e2, käännös b9499e74 = 148c; opas-juna, sisältää junan 147;
  muutosloki #4048). TF 148 ajossa (37453430258). Juna 147 ei lähtenyt erikseen.
- **JUNA 149:** kuitattu toistaiseksi vain kirjaukset; Päätoimittaja kuittaa osat todisteista (Natiivi-UI maakunta-149 fc38a9f5,
  Siirtoseppä Pulu-chat, LS1 siltalause, LS2 korjaus4-rivi, Linnanrakentajan liikkeet ja kaiku, LS1 PCM jo 148:ssa).
  Pallolukko EI 149:ään (vikaa ei toistettu). Googlen logo fc38a9f5:ssä kuitattu tietoisesti (pakollinen nimeäminen).
  Runko tehdään 385894e2:n päälle worktreessä wt/proto-natiiviseppa-j144.
- **NATIIVI MAC:** haara natiiviseppa/mac 19a6108e (wt/proto-natiiviseppa-mac) = 385894e2 + Mac-pohja d2d9c1b9
  (Rakennus.MacOS arm64 Mono, StreamingKansio, mac-kaanna.sh omaan kopioon Matkakirja-proto-mac, UNITY_TARKISTUS_MAC=1)
  + MatkakirjaMacSyote.bundle a23b81a7 (NSEvent, sama C-rajapinta kuin iPad-on-Mac; tyokalut/mac-plugarit/kaanna.sh).
  Natiivi-UI tekee TouchSimulationin, minimikoon ja PanelSettings-skaalauksen. Ensimmäinen Mac-käännös pyydetty Julkaisijalta
  (≥ 38 Gi, assettien tuonti 30–60 min). IL2CPP-moduuli: omistajan Hub-toimi (ei latauksia ilman lupaa). Allekirjoitus/ASC Julkaisija.
- Ennen: BUILD 146 = 783b6fe5 (50938e7f), BUILD 145 = eff8d65c (f16f7fa7), BUILD 144 = d8d89704 (72645b63).

## AIEMPI (6.10. aamupäivä)

- **6.10. 10.3x: BUILD 146 = master 783b6fe5** (juna/b13 4b8e8159, käännös 50938e7f, app lokit/juna-1.1.146-50938e7f; muutosloki #4040).
- **JUNA 147 RUNKO 642e40e1** (haara natiiviseppa/juna-147, wt/proto-natiiviseppa-j144) = 4b8e8159 + pelikoodari 3610cf64 (valmisluennat)
  + natiivi-ui 38100de1 (koe-147: ISS-ohjaamo v3, LCD, LAAJA/TELE ym.) + pelikoodari fe9fba87 (ei havaintovaraa) + LS1 9df9f436
  (kuvatekijä) — kaikki Päätoimittajan suoraan kuittaamia. Testit 0/712/419/444. Odottaa: LS2 2c2ad7ac (pallolukko, omistajan
  simulupa), tyylikirja #4035 (web). Muutosloki 1.1 (147) junan mukana. Käännös vasta Julkaisijan KÄÄNNÖS NYT -luvalla.

## AIEMPI (6.10. yö)

- **6.10. 00.0x: BUILD 145 = master eff8d65c** (juna/b13 c2d40258, käännös f16f7fa7, app lokit/juna-1.1.145-f16f7fa7). BUILD 144 =
  d8d89704 (juna 921a1a80, käännös 72645b63; omistajan VIE tunnetulla Amsterdam-vialla). Muutosloki 1.1 (145) PR #4034
  (Julkaisija mergeää ja vie; Actions-häiriö). Tunnetut viat → 146: kaupunkivalinta vaatii joskus toisen napautuksen, tumma vyö.
- **JUNA 146 RUNKO 79ccbffb** (haara natiiviseppa/juna-146, worktree wt/proto-natiiviseppa-j144) = c2d40258 + natiivi-ui c29f57af
  (⊇ 7cd1b88d ⊇ d26cc56a ⊇ c7fb7875, LS1 5f4e8d56 + 3bbb18d2 ⊇ 7ac53d22, orbit 388b8707) + pelikoodari 0630b15b (⊇ 2a32671a) +
  siirtoseppa 85c0a6bb + natiivi-ui d1d1f0ee — kaikki Päätoimittajan suoraan kuittaamia. Testit 0/707/415/444.
  Lopullinen käännös KLO 10 (ei välikäännöksiä, #4030), sitten savu + yhteinen video (Amsterdam 5/5, pin-, +N-kuva- ja
  korttistillit, siltalauseet, nimiäänet), VIE klo 12. Odottaa: LS1:n loput (odotus, tumma vyö) kuittauksella; Final IK
  544cd079 vain erillisellä merge-pyynnöllä. Muutosloki 1.1 (146) kirjoitetaan junan mukana (Natiiviseppä → Päätoimittaja).
  Käännösskripti: scratchpadin kaanna-145vie.sh-malli (sha + nimi), Julkaisijan KÄÄNNÖS NYT.

## AIEMPI (5.10. ilta)

- **20.36: JUNA 144 -koe 92b2bad6** (natiiviseppa/juna-144-ohjaamo-koe) = e636bc55 + lontoo b3aee96b (OpasKuvaus-kamera) + 429-korjaus
  6895f050 + opas-kevyt-144 a6af31b8. Odotetaan hionnat (krediittien koko, otsikon varjo; Natiivi-UI/Linssiseppä lähettävät SHA:t,
  Päätoimittaja kuittasi etukäteen) ENINTÄÄN 21.15, sitten simu + iPad-laite kerralla (MATKAKIRJA_KIRJASTOT-ohitus; laitteen Unity
  hakee Cinemachinen rekisteristä). iPad-ajo: lokit/natiiviseppa-skriptit/ipad-opas-muisti.sh (esikäynnistys ennen --consolea).
  Pöllön IP-raja täynnä → Pelikoodarin suoja-PR nollaa; kuvat/ääni sen jälkeen. VIE vasta omistajan luvalla.

- **JUNA 144 LOPULLINEN KOE e636bc55** (haara natiiviseppa/juna-144-ohjaamo-koe, worktree wt/proto-natiiviseppa-j144; simukäännös
  061121c9, .app lokit/natiiviseppa-app-144vie-061121c9) = ec0038f4 + ISS-ohjaamo (natiivi-ui/iss-ohjaamo-144 2bb26db8 + LS2 v2e
  eea832b1) + plist 5e9d2c7f + linna/kaupunki-kuva 79a3582c (sumu/Volume pois) + elävä opas (natiivi-ui/opas-kevyt-144 650f9325,
  lontoo → 9cf44e55 → 110c7dee → 7db42dcc; EI 2c490b78) — kaikki Päätoimittajan kuittaamia. Testit 0/444/415/675.
  VIE ja TF ODOTTAVAT OMISTAJAN LUPAA (19.5x "Odota junaa hetki"). VIE-ehdot: Natiivi-UI:n 4 kuvaa (dc9b6022), Laitetestaajan
  napautuspolku, iPad-muistiajo 10 min (laitekäännös minulla, Linssisepän komentojono viestissä 19.5x), Linssisepän koesimu.
  Avaus: juna/b13 91220fb6 → e636bc55 (git update-ref), juna.log-rivi, vahti kääntää, BUILD 144 -master, kopioi-juna-app.sh.
  Pelikoodarin #4018 julki vasta kun TF-build ⊇ e636bc55 → ilmoita hänelle.
  Juna 145 -jono: pulu-testiotsake 23b682e1, astrokuva-tauko bc66e66d, pulu-chat-yksi d1d1f0ee, linna-145 12eeab86, LS2 S2-maailma
  (kuittasin ehdoin), lontoo 2c490b78 (PCM) — kuittaukset Päätoimittajalta.

- **JUNA 144 SIIRRETTY (omistaja ~17.4x, Julkaisijan välittämänä): EI avata klo 20.** Lähtee vasta kun elävä opas on todennettu simussa
  (Linssiseppä, Pelikoodari, Natiivi-UI; tavoite ~22–23); opas ec0038f4:n päälle vain Päätoimittajan kuittauksella; ISS-ohjaamo vain jos
  Meksikon + Kanarian parit hyväksytty. Juna 145 -jono: pulu-testiotsake 23b682e1, astrokuva-tauko bc66e66d, pulu-chat-yksi d1d1f0ee,
  linna-145 12eeab86 (kuittaukset vahvistettava Päätoimittajalta).
- (aiempi) VIE kokeella ec0038f4 (simukäännös 5f257c20, .app lokit/natiiviseppa-app-144koe-5f257c20).
  Ehto (a): Pelikoodarin 5 min todistusajo kuvaselitteen kaiuttimesta tästä kokeesta ennen VIE:tä (pyydetty, simuvuoro Julkaisijalta).
  Ehto (b): ISS-ohjaamo vain jos Meksikon pari hyväksytty + koe käännetty ja tarkistettu klo 19.00 mennessä, muuten ilman.
  Klo 20: Julkaisijan NYT → git update-ref refs/heads/juna/b13 <ec0038f4> <91220fb6> (proto-repo) + rivi juna.logiin; vahti kääntää;
  BUILD 144 -master (merge --no-ff juna/b13 master a5a18288:n päälle, viestiin käännös-SHA) + kopioi-juna-app.sh 1.1.144 <käännös>.
  Kohta 1 ("1.1 (144)") tarkistetaan TF 144:stä. Laitetestaajan raportti docs/raportit/kuittaus-juna144-koe-5f257c20-20261005.md.

- **Juna 144 -koe a1cfce55** (natiiviseppa/juna-144-koe, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-j144) = master a5a18288
  + latauspalkki 62bafb4a + kytkentä da6b8a27 (Siirtosepän pieni haara; palkki vain kytkennän kanssa) + testimykistys-natiivi
  8ff03da0 + lukija-william f5e5372c + asetukset 89ba8062 (todistus lokit/natiiviseppa-asetus-todistus/). Testit 0/444/415/625.
  Ehdolliset (vain Päätoimittajan kuittauksella): siirtoseppa/linna-143 (EI Steam Audiota 144:ään; tarkistukseen
  MATKAKIRJA_KIRJASTOT=/Users/Shared/Claude/proto-3d/_lahteet/unity-paketit-siirtoseppa/kirjastot), LS2 ISS-ohjaamo.
  VIE-ikkuna klo 20: ennen sitä käännös + rutiinikuittaus Laitetestaajalta (napautuspolku, poikkeukset, ääni) + VIE Päätoimittajalta.
  Uusi Asetus-kutsu → lisää avain Matkakirjan tools/vienti/asetusavaimet.json (Pelikoodarin #3994).

- **BUILD 143 = proto master cc57dde7** (juna/b13 91220fb6, vahdin junakäännös 81ac41ea klo 12.22–12.33; .app
  lokit/juna-1.1.143-81ac41ea). Sisältö: BUILD 142 + Brotli ca4251f5 + chat-linna b38360f4 + x-napit 9a688396 +
  siirtoseppa/linna-143 024a098d + x-siivous 121b0840 + Tavli ea02bae1 + kirjainväli-kerning 46b62059 + ei-linssiä
  7837ac54 + glint-2 5b6b9d46. TF 1.1 (143) on Julkaisijalla (muutosloki #3990).
- Master sen jälkeen: 38519dad (pelikoodari/todistusajo d257025c) → **a5a18288** (todistusajo OHJE.md bf2f924f). Vain työkaluja.
- **Datasiirto (Päätoimittaja kuittasi ehdotuksen 5f7cc5418):** haara natiiviseppa/asetukset **89ba8062**
  (worktree /Users/Shared/Claude/wt/proto-natiiviseppa-asetukset, pohja a5a18288). Testit 0/444/415/625.
  - Peli/Asetus.cs: kokoelmat/asetukset.json (valinnainen), oletukset koodissa, skeema 1. Koekansio
    Documents/sisalto-koe/kokoelmat/asetukset.json. Komento peli-komento `asetus` | `asetus <avain>` | `asetus lataa`.
  - Ryhmät: aanet (AaniVakiot ~35 + TavliVahvistus/MyllyVahvistus/MyllyLisaKerroin), pelit (Peliluettelo nimet/historia/
    alkuperä/nappi), tekstit (tavli/mylly.valinta.otsikko), kamera (Yokuori), osoitteet (Cupolan karttanostot-juuret).
  - Käännös jonossa Julkaisijalla (~13.40), simu FBBD41D7 hiljaisessa ikkunassa (~13.50).
  - **Todistus (Päätoimittajan ehdot):** 1) BUILD 143 vs 89ba8062 ilman asetuksia: ääniraita samalla tasolla; 2) koekansiolla
    teksti + äänitaso vaihtuu, ilman sitä oletukset → kuva + ääni Päätoimittajalle. Skripti proto-3d/lokit/natiiviseppa-skriptit/ajo-asetus.sh
    (APP=… KOE=0|1 ajo-asetus.sh <nimi>; äänet päälle oikealla tapilla (201,567) ja touch <K>/aanet-ok).
  - Junaan vasta kuitattuna, VIE-ikkunat klo 12 ja 20 (omistaja). Natiivi-UI tekstit vasta kun infra masterissa;
    vienti + skeemavalidointi tilataan Sisältökirjurilta/Julkaisijalta.
- iPad-mittaus EI ole VIE-ehto (omistaja 12.30). Brotli-laitemittaus puhtaalla asennuksella jäi tekemättä
  (devicectl: kill launch-pid, ei timeout-käärettä; xctrace ~15 min/ajo). Tulokset: lokit/natiiviseppa-ipad143/.
- Juna 144 -ehdokkaat: Siirtosepän laineet-uusinta 0fb2fc7b (Cinemachine e9a7915b päällä; Steam Audio -koko kuitataan minulla),
  ISS-ohjaamo (LS2 kuvaparit), linna-kuva 9f37a9e9 (omistajan sävy), datasiirto vaihe 1.
