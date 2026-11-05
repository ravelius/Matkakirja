# Natiivisepän luovutus 5.11.2026 klo 14.28 (konteksti 26 %, pehmeä raja, 7.37)

Korvaa luovutuksen -1408 kohdat "Ensimmäinen työ", "Haarat" ja "Ajot ja kuvat". Sen "Opittua", "T7 → NAS", ja -1348:n T7-ohje, "Ei kosketa ilman sanaa" sekä PT:n sana 2.214 pätevät. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Vuoro aina JU:lta.

## Tila
KK:n 14.0x-tehtävän kohdat 1–4 tehty ja raportoitu KK:lle 14.27, kopio PT:lle. KK ei ole vielä vastannut. KK:n sana "Liike ruutusarjana KK:lle ennen lukitusta" on täytetty, lukitus odottaa KK:ta.

## Haarat
- **natiiviseppa/pariisi-kierto-219 6655127dd** (pohja 99035b765), työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto. Paikallinen, ei pushattu. NUI odottaa tätä samaan runkoon, ja NUI kytkee Ohitat KiertoHiivu()-kutsulla; NUI:n haara natiivi-backup peili/proto/natiivi-ui/pariisi-lento-219 9fd4cfdc8.
- **Koehaara natiiviseppa/pariisi-kierto-219-koe c0217caf9**, työpuu wt/proto-natiiviseppa-kierto-koe, EI JUNAAN. Pääkierron lisäksi koelisäykset kuten -1408:ssa.
- Tarkistus 0 virhettä molemmissa, PalloLiikeTestit 15/15. tarkista.sh muuttaa kolme tyylikirjatiedostoa: git restore (ohje -1408:ssa).

## Mitä koodi nyt tekee
- PalloLiikkeet.cs: KiertoOhje.KokoS 38 s, AlkuS 1 s, HiipumaS 6 s, Vauhti = 360 / (38 − 0,5 − 3) = noin 10,4°/s. KiertoLasku kiertää jo tätä vauhtia. KaupunkiKierto laskee keston jäljellä olevasta kulmasta pohjoiseen, joten pelaajan kääntämä alkusuuntima muuttaa kestoa, ei vauhtia.
- Luennan alun hiipuminen pois (PeliOhjain.SoitaLuento): se olisi kiihdyttänyt tai venyttänyt kierron luennan loppuun. PalloKierto.KiertoHiivu() on nyt vain Ohitalle, ilman parametreja.
- NUI 14.2x: luento alkaa noin 25,5 s zoomauksen alusta (osa A, viisi kuvaa). 38 s on luennan puolivälissä (2.210 "alkupuolella"). Jos KK haluaa aiemmaksi, KokoS pienemmäksi nostaa vauhtia.

## Ajo ja kuvat
lokit/natiiviseppa-kierto4-c0217caf9: s01–s44, loppu, kuvaväli noin 1,4 s. Arkit _tyo/natiiviseppa/aloituslento/kierto4-arkit/. Skenaario _tyo/natiiviseppa/aloituslento/skenaario-kierto4.txt. Katsottu: kaikki arkeilta; täysikoossa rajaukset s24 (oikea ala) ja s26 (keskusta), ei saumaa; muita ei täysikoossa. Liikkeen tuntumaa ei voi arvioida pysäytyskuvista.

## Ensimmäinen työ: viat kuvissa (KK:lle kerrottu "korjaan 1:n seuraavaksi, ellet sano muuta"; lue KK:n vastaus ensin)
1. **Piirros puuttuu s03–s09 (3–11 s):** vain nimet tasaisella pohjalla, terävä vasta s10 (12 s). Edellisen ajon k00 samanlainen. Hypoteesi, ei varmistettu: ElavaEsilataus.Lahinakyma kattaa vain loppurajauksen (PeliOhjain.Esilataus.cs:103), kierron keskipiste ja 6,6 km on sen ulkopuolella. Lisäksi kuvaus tekee 0,8 s:n ruutuja, joten Macin aika voi olla pidempi kuin laitteella. Selvitä lokista, mikä piirrostaso ja milloin saapui; toista vika ennen korjausta (9.7). Ei muistilukuja (2.207, 2.209).
2. **Nimet katoavat s28:ssa (38 s), kun kierto pysähtyy, ja palautuvat s43:ssa (noin luennan lopussa) eri joukkona.** Vertailu natiiviseppa-aloituslento-b2-99035b765/k66-t00-s000: levossa nimet näkyvät, sama joukko kuin s43. Vain "Col de la Chapelle" pysyy. Syy auki, Nimikerroksesta ei löytynyt luentasääntöä; epäilty on nimien vaihto ajon ja levon välillä tai ui lentopiilo. Tarkista myös ilman lentopiiloa.
3. Päällekkäiset nimet (Grand Palais / Place de la Concorde, Temple / Musée): -1408:n "kartan nimet".

## Vastaus KK:n kysymykseen (kerrottu)
Kamera palaa Ranskan näkymään pelaajan polullakin, ensimmäisellä saapumisella maahan: PalloKierto.SaapuminenAlkaa ja MatkaPerilla → ElavaKartta.Saavu → Odota (ElavaKartta.cs:1012) ajaa, kun kartta on ollut hiljaa 0,6 s, ja kohtaus soi. Järjestys on KK:n 4.11. 15.5x. Todiste koodi ja testipolun loki, oikeaa pelaajan polkua ei ajettu.
HiljaisuudenEste ei katso kiertoa: jos luento ei soi (kertoja pois), kohtaus voi katkaista kierron. Ei korjattu, elävä kartta on seis ilman sanaa.

## Avoinna
- LAITTEELLA: SiirtymaEste kytkee saumakorjauksen pois kierron aikana, päätös PT:llä (pyydetty uudelleen 14.27). Ei Macin kuvia todisteeksi laitteesta.
- Esilataus kierron alueelta: kohta 1. Saapumisesityksen Ohita ja sormi trailerin peitteen läpi: NUI. Nähtävyydet rakennuksina: kuten -1348. Louvren pyramidi: työlista.
- JU:n viestien "T/ns-kierto4.log" ja "T/ns-kierto5.log" eivät löytyneet haussa; ajo silti valmistui ja 45 kuvaa on tallella.

## T7 → NAS 2. erä
pid 58484 käynnissä 14.27 (59 min), lokissa vain ALOITUS 13.28. Monitor kuolee nollauksessa: aseta uudelleen. Muu -1348:n mukaan; ei poistoja ennen PT:n lupaa.
