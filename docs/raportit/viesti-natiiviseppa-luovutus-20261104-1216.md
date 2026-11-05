# Natiivisepän luovutus 4.11.2026 klo 12.16 (konteksti 25 %, 7.37)

Korvaa luovutuksen -1113. Siitä yhä voimassa vain "Tulos 2" (vieritys k34) ja "Tulos 3" (piirtokulu) tiedoksi: `git show 21c594c44:docs/raportit/viesti-natiiviseppa-luovutus-20261104-1113.md`. -0935:n sävyero (vasta TF 217 -kuvan jälkeen) ja 1,75 km (KK:n päätös) kuten ennen.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta.
Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-maskik4 haarassa natiiviseppa/tasainen-striimi (03ba511b7), puhdas. Luovutushaara natiiviseppa-luovutus-2052 (PR 6215), työpuu wt/natiiviseppa-luovutus-2052.
Python, jossa numpy ja PIL: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tulivuoret/venv/bin/python.

## Tila: korjaus valmis, ajamatta, odottaa PT:n sanaa
- **Sauma näkyy striimikartassa e4180ac69** (lokit/julkaisija-striimi-iso-e4180ac69): z14 2,2412, 2,4170; z13 2,5488; z12 1,9336, 2,8125. Sama vika kuin 8b9cfbbb6:ssa, päätelty koodista ja ruudukosta: ajon zoomit ovat juuri kynnysten alla. p-z11:n ennustettuja L9-reunoja ei näy, selitys auki. PT katsoi z14-rajauksen.
- **PT:n käsky 12.0x:** korjaa juuri, ei koealuetta, oma haara e4180ac69:n päälle, z12–z14 samalle tasolle, ei paikkakohtaista. **iPad-ajo vasta VS:n muistikorjauksen päälle PT:n sanalla.** Muistikaatuminen z9 → z10 on VS:llä, ei rinnan selvitystä.
- **Korjaus 03ba511b7** (natiivi-backup): TasainenLaatta.cs + .meta, Komennot.cs +8 riviä. Vain pallon tileset, elävä kartta, ≤ 70 km, kallistus ≤ 3°, K = 8 oletuksena; `maasto tasainen pois` kontrolliin. tarkista.sh 0 virhettä (ajo muuttaa tyylikirjatiedostoja työpuussa: palautettu, älä committaa). Yhdistyy striimi-vesi d34cacd08:n kanssa ilman ristiriitaa.
- **Kerrottu:** PT:lle rivi lisämuistiarviolla (+20–100 Mt, noin 3550 / 4080, ei mitattu striimistä) ja VS:lle tiedostot. Molemmat viestit olivat jonossa 12.15, vastausta ei vielä ole. VS kertoo kärkensä, kun korjaus on valmis.

## Kun PT antaa sanan
1. Haara VS:n korjauksen päälle, ajo JU:lle: samat komennot kuin striimi-iso-ajossa z11–z14:lle ja lopuksi `maasto tasainen pois` samassa paikassa kontrolliksi. Skenaario tekemättä; mallina lokit/julkaisija-striimi-iso-e4180ac69/laheta/komennot.txt.
2. Mitta: _tyo/natiiviseppa/striimi-sauma/reunat.py <kansio> (reunat poissa, kontrollissa takaisin) ja muisti-kuvissa.py <kansio> p; kuvat myös täysikoossa (muisti saumakuvat-taysikoossa). Rivi PT:lle.
3. Mittaamatta jää: vieritys, latauksen kesto, koko näkymän vaihto kerralla zoomatessa.

Tiedot: _tyo/natiiviseppa/striimi-sauma/tulos.md, rajaus-*.png. tasainen-laatta-koe 8b9cfbbb6 jää koehaaraksi, ei poimintaa. KK:n listan kohta 2 (ND:n irtosaarekkeet) ei tehdä (PT 11.3x). Kohdat 3–4 kuitattu.

## LISÄYS 12.2x (PT, sitoo; ohittaa kohdan Tila ja "Kun PT antaa sanan" -kohdan pohjan)
- **Pohja nyt 7f64cd657 (VS). Korjaus ee2cca3b4, haara natiiviseppa/tasainen-striimi-2 (natiivi-backup), korvaa 03ba511b7:n.** Työpuu tässä haarassa, puhdas. tarkista 0 virhettä.
- **Ajo JU:lle vasta, kun VS:n sk-muisti-z10 on pitänyt alle 4080 Mt:n, ja PT:n sanalla.**
- **Kallistus ≥ 3° z12–z14:llä on avoin vika, ei valmis:** kuvaa ei ole, portti ei korjaa. Ajoon lisätään `kallista`-kuvat 0,13, 0,26, 0,52 (15°, 45°), kokeen kanssa ja pois. Kerrottu PT:lle.
- Lisämuisti ennallaan (siirtymässä Nyt = Varjo → korjaus kiinni; pahin noin 3860 / 4080, arvio). Tiedot: _tyo/natiiviseppa/striimi-sauma/tulos.md.

## LISÄYS PT, nollauksen aikana (SITOO; ohittaa edellisen lisäyksen ehdotuksen)
- **ee2cca3b4 kuitattu.** Kallistettu sauma kirjattu avoimeksi viaksi.
- **SEURAAVA TYÖ: valmistele skripti.** Hyväksytty ajo: zoomit 0,13, 0,26, 0,52, kallistukset 15° ja 45°, koe päällä ja pois (`maasto tasainen pois`), muisti lokiin. Runko ee2cca3b4. Komento `kallista`: Komennot.cs:692 ja :713. Mallina lokit/julkaisija-striimi-iso-e4180ac69/laheta/komennot.txt. Tee se _tyo/natiiviseppa/striimi-sauma/:een, ei ajoa.
- **Rivi JU:lle vasta PT:n sanalla, kun VS:n sk-muisti-z10 on pitänyt alle 4080 Mt:n.** Valmis skripti: rivi PT:lle.
- **VS 12.2x:** kärki 7f64cd657, ei rivejä päällekkäin; yhdistelmää ei ole ajettu. VS kysyi, lukeeko TasainenLaatta kameroita siirtymässä: ei lue, gate on `LiikeLaatat.Nyt == Paa`, mutta lisää oman kameransa additionalCamerasiin. Muistivaroituksen jälkeen (SiirtymaMuistiJarru) siirtymässä ei ole varjoa, joten Nyt = Paa ja TasainenLaatta voi olla päällä alle 70 km:ssä. Kerro tämä VS:lle.
