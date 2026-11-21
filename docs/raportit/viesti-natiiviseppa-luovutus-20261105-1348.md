# Natiivisepän luovutus 5.11.2026 klo 13.48 (konteksti 28 %, pehmeä raja, 7.37)

Korvaa luovutuksen -1326 kohdat "Seuraavaksi" ja "T7". PT:n sana 2.214 (kuvat suoraan KK:lle, kopio PT:lle) ja muu -1326:n sisältö pätevät; lue se ja osa-b.md. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Vuoro aina JU:lta. Huom: Raamatun 2.214 ei löytynyt raamattu-luku-komennolla 13.27 (PR 6278 ei ehkä ollut mainissa).

## Pariisin kierto (2.210 B): koodi tehty, EI YHTÄÄN KUVAA nähty
- Haara **natiiviseppa/pariisi-kierto-219 7e11c0b29** (pohja 99035b765), työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto. Paikallinen, ei pushattu.
- Koehaara **natiiviseppa/pariisi-kierto-219-koe d506fa9e3** (+ raja 20 → 90 Mac-kuvia varten, EI JUNAAN), työpuu wt/proto-natiiviseppa-kierto-koe.
- Tarkistettu: Linssit-testit 2228/2228 (kolme uutta KaupunkiKierto-testiä), unity-tarkistus 0 virhettä 7e11c0b29:ssä. koehaaraa ei ole tarkistettu erikseen, sen ainoa lisä on JU:n aiemmin kääntynyt raja. tarkista.sh muuttaa kolme tyylikirjatiedostoa: git restore (tehty).
- **Odottaa:** JU:lta pyydetty 13.48 Mac-vuoro, skenaario _tyo/natiiviseppa/aloituslento/skenaario-kierto.txt, kansio lokit/natiiviseppa-kierto-d506fa9e3, 13 kuvaa. Viesti oli jonossa, perillemenoa ei tarkistettu. Skenaariota ei ole ajettu; oleta-rivien tekstit ovat lokista päätellyt ("MATKAKIRJA saapuminen:", "zoomaus keskustaan valmis"), ja polku "uusi-peli 5 pariisi saapuminen" on NUI:n sk-suora.txt:stä. Tarkista, täyttyykö SaapumisKierto-ehto tällä polulla (AloitusSaapumisella false).
- **Kuvien jälkeen:** katso itse täysikokoisina (siirtyy kuva sulavasti, mahtuvatko viisi, kuinka nopealta kierto näyttää), Macin kuva + yksi rivi KK:lle local_d5f31591-21fa-4cb0-bab3-bcd3435d075a ja kopio PT:lle (2.214).

### Mitä koodi tekee
- PalloLiikkeet.cs: KiertoOhje (mitat), KiertoLasku (laskeutuminen, päättyy kierron vauhtiin), KaupunkiKierto (vakiovauhti, hiipuminen, paluu loppunäkymään, Hiivu).
- PalloKierto.AjaKeskustaanKiertaen: valmis-kutsu laskeutumisen lopussa, joten traileri alkaa kuten ennen, ja ajo jatkuu samassa kehyksessä. Kierto ei käytä karkeaa tasovalintaa eikä kallistusrajaa. Sormi katkaisee: suuntiman vauhti hiipuu 0,8 s:ssa ja kallistus laskee rajalle. Suuntima jää sormen jälkeen pelaajalle (ei palaudu pohjoiseen).
- PeliOhjain: SaapumisKierto vain pariisi (ehdot kuten NUI:n SaapumisKuvat.Aloituslento), KiertoLaskuS 4 s (muualla 2,6 s). Luento käynnistää KiertoHiivu():n (SoitaSaapumisluento), trailerin Ohita lyhimmän tien.

### OMA PÄÄTÖS, jonka kuvat tai KK voivat kumota: koko kierros
Saapuminen alkaa ja loppunäkymä päättyy pohjoiseen, joten pienempi kaari vaatisi kääntymisen takaisin. Siksi suuntima tekee 360° samaan suuntaan: 150° spiraalina 4 s:n laskeutumisessa (huippu noin 70°/s) ja 210° 38 s:ssa (noin 6,4°/s). Suunnitelma sanoi "täysi kehä vain, jos se näyttää hitaalta": tämä on auki, kunnes liike on nähty. Säätö: KiertoOhje.LaskuKulma, KiertoS, Suunta. Kerro tämä KK:lle kuvan rivillä.

### Tekemättä
- Esilataus kierron alueelta (ElavaEsilataus.Lahinakyma kattaa vain loppurajauksen): lisää vasta, jos kuvissa kääntyvät alueet ovat karkeita. Ei muistilukuja (2.209).
- Saapumisesityksen Ohita ja sormi trailerin peitteen läpi: ei kytketty, ei kokeiltu. Ajoitus on NUI:lla, sille kerrottu 13.48 (jonossa). NUI:n haara natiivi-ui/pariisi-lento-219 d81627510 on samalla pohjalla; osa A:n kuvia ei ole vielä nähty, joten yhteisajoa ei ole. Muuttaa samaa Saapumistraileri.Ohita-kohtaa: yhdistettäessä tarkista.
- Vielä auki -1326:sta: nähtävyyksien muoto 6,6 km:stä, kartan nimet, k79-t50-s180:n vaakasiirtymä.

## T7 → NAS 2. erä, osa 2 (Karttaseppä, 36 kohdetta, 328,7 Gi)
Edellinen ajo pid 63722 oli kuollut, lukko jäljellä (kuoli todennäköisesti session nollauksen mukana; syytä ei selvitetty). tasmays.json oli osa 1:n (2495 kohdetta). Poistin oman lukon ja käynnistin uudelleen 13.28: **pid 58484**, omassa prosessiryhmässä (kaynnista.py, kestää nollauksen), loki t7-nas-2era/kopioi.log, pid kopioi.pid. Tällä hetkellä lokissa vain ALOITUS. Kansiot olivat NAS:lla osin jo (vuoristo-mapterhorn näkyi).
- Tarkista `ps -p 58484` ja kopioi.log. Ajon lopussa tasmays.json:n kohteita pitää olla 36 ja ok true.
- Sitten poistolupa PT:ltä rivillä: kohteet, tiedostot, Gi, erot. Mitään ei poisteta ennen sitä. Työkalu: -0712:n ohje (osa1/poista.py kopio).
- Taustalla oleva odotin kuolee nollauksessa, joten ilmoitusta ei tule: seuraa Monitorilla.

## Ei kosketa ilman sanaa
Kevennys, ASTC-koe, muistivahti, elävä kartta, maakuntarajat, mäet (2.208–2.209). iPad-ajoja ei.
