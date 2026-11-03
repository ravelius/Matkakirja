# Pelikoodari: luovutus 4.11.2026 – palvelijat v8b/v9 ja salin muistimittaus JU:lla

Edellinen: -20261104-0030 (f85694815) ja -0015 (a6cf944ba), voimassa ellei alla toisin. Syy: pehmeä raja 26 % (7.37). Ei omia taustaketjuja. Kuvat PT:lle, PT vie KK:lle; roolit eivät viesti KK:lle.

## Tehty
- **Palvelijat v8** 9006f47c1 katsottu. Ämpärit sivussa, läpimenoa ei näy, mutta kuva katkeaa jalkoihin. Lätäkkö EI todennettu: säikähdys 5 m:ssä, vedenkantaja poistui kuvasta. PT arvioi sirpaleet kesken (8 samaa kolmiota, tasainen sini).
- **Palvelijat v9, KK 01.06** (ei hyväksyntä, KK ei nähnyt kuvia): arkihahmot-218 70e16d3a9, kuvarunko palvelijat-kuva-218 e53ff7ce8. Kannetun maljakon Cobalt blue underglaze ja sirpaleet: ArkiHahmot.Koboltti (28, 62, 135). Sirpaleet 8 eri kokoista ja muotoista laskettua verkkoa (SirpaleVerkko), lepo eri suuntiin, lasitteen vahvuus vaihtelee. Muiden arkihahmojen värit ennallaan. Unity-tarkistus 0 virhettä, valovahti ok; ajamatta. Muodot koodista, koska Codexin palat ovat samanlaisia: kerro PT:lle kuvien kanssa (3D kuuluu Codexille).
- **Muistipiikki 9f8d2d13f**: tulos lokit/pk-muistipiikki-219/TULOS.md (ei muuteta tässä). Reitti 3910 ja 3805, "sali" 3916 oli ulkotilaa; kierroksen 2 sali jäi ajamatta. PT 01.20: EI junaan.

## AVOIN (järjestys JU:n ilmoitusten mukaan)
1. **v8b**: `_tyo/pelikoodari/palvelijat-v8/aja-v8b.zsh`, käynnissä tai valmis. Kuvat vesi1-*, vesi2-*. Tarkista: lätäkkö erottuu juoksuvauhdissa eikä tee tummaa reikää, ämpärit ja jalka, varjostinvirheet. Hyppy-jos 0,15 s:n kyselyllä säikäyttää noin 12 m:stä (PÄÄTELTY, tarkista huom-*.txt). Lähikuva + osuma PT:lle.
2. **v9**: `_tyo/pelikoodari/palvelijat-v9/aja-v9.zsh 2`, JU-jonossa. Kuvat malja1-*, malja2-* (005 = maljakko kädessä). Tarkista: sininen ei enää musta, ei kirkas; palat eri kokoisia; pinnat oikein päin (Cull Back, kolmioiden järjestys päätelty, ei nähty). Väri (28, 62, 135) on laskettu kuvasta, ei nähty. Kuvat PT:lle yhdessä v8b:n kanssa.
3. **Salin sisämittaus**: JU, `_tyo/pelikoodari/muistipiikki-219/mittaa-sali.zsh 9f8d2d13f 1` ja `2`; ei vielä ajettu laitteella. Tulos sali-9f8d2d13f-1 ja -2. Katso kuvat sali-sisa-*: PT vaatii, että kuva todistaa salin sisätilan. Tarkista myös Puyin paikka lokista ("salin katto ... keisarin halli"). Junaan vasta kahdella onnistuneella alle 4080. Release ratkaisee julkaisun. Lataus +6 s: PT vie KK:lle.
4. **+491 Mt selvitetty** (TULOS.md Lisäys): pääosin käyttömuistia. Kokeilemattomat vivut: toinen _CameraDepthAttachment 68 Mt, valoatlakset, lämmitys. Odottaa PT:n kantaa.
5. **Otsikko 6aed10e25**: -0015 kohta 1; B5 kohta 2.
6. **Palvelijatar v2**: KK 00.13, erikseen, kuva edestä ja takaa ennen kytkentää (-0015 kohta 5).
7. **Vesi-219**: -0015 kohta 6.
8. **Ennen junaa**: liikevahti valittaa JuoksuV4Maailma.Palvelijat.cs 3 > 0 (ei v9:n aiheuttama), lisää liikepoikkeukset tai liikepohja. Pohjavahti pysäyttää tarkista.sh:n JuoksuAvausJuliste.cs:ään (vari 1 > 0; ei minun muutokseni). tarkista.sh muuttaa tyylikirjatiedostot: palauta ne, älä committaa.
