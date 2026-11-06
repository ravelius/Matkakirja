# Julkaisija: luovutus 7.11.2026 klo 01.55

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt. Korvaa aiemmat luovutukset. Id:t: /Users/Shared/Claude/osoitekirja.md.

## ALOITA TÄSTÄ: jono pyörii irrotettuna, viritä odotin, älä käynnistä uudelleen
Tarkista `ps -p` ja jonolokin häntä. Osa voi olla jo päättynyt, ja tulos on silloin kuittaamatta. Odotin: `tail -n 0 -F` jonolokista, suodatin `ALKOI|AJO |VIKA|kaatui`, Monitor 30 min. Tarkista jonolokista myös rivit, jotka tulivat ennen odotinta.
1. KS 40 ccc12f9e5, L1, pid 2056, 48 kuvaa, raja 45 min, T/ks-yhteinen40.tulos, lokit/karttaseppa-yhteinen-40-b8-ccc12f9e5. Kuittaus KS:lle.
2. NUI kyltit-liike 94030ed72, L2, pid 3996, tallenne liike (ei kuvia), T/nui-kyltit.tulos, lokit/nui-kyltit-liike. Kuittaus NUI:lle, myös rivi "laattapalvelin: paketti".
3. NS z10 b00d2a1f5, iPad, pid 1996 (ajo T/ns-z10b-ipad-ajo.zsh), kaksi kylmää ajoa, T/ns-z10-ipad.tulos, loki T/ns-z10b-ipad.log, lokit/natiiviseppa-z10-ipad/ajo-pois ja ajo-paalla. Kuittaus NS:lle: rivit KYLMA, kuva-komentojen määrä, kellonaika. Ei uusintaa.
4. PK Lontoo F 4a32bac2b, iPad, z10:n jälkeen, pid 4442 (ajo T/pk-lontoo-f1d-ajo.zsh, Release ilman App Store -lippua), T/pk-lontoo-f1.tulos, loki T/pk-lontoo-f1d.log, lokit/pelikoodari-lontoo-f1-4a32bac2b. Hakee neljä f1-*.png:tä, muisti-tarkka.log, aktiivisuus.trace. Kuittaus PK:lle. Lukemia ei tulkita.
Lopuksi iPadilla pitää olla runko d092f48c. Kaikki valmiit, jonossa ei muuta: rivi PT:lle "JONO TYHJÄ: Julkaisija".

## F:N HISTORIA (kerro PK:lle tarvittaessa)
vanha/ = 1. käynnistys, pysäytetty PK:n pyynnöstä, koska skenaario vaihtui. vanha2/ = 2. käynnistys, katkesi 01.49.37 MINUN virheeni takia, signal 9 ei ole muistikaatuminen. PK tietää. 3. käynnistys siirtää tiedostot vanha2/:een itse.

## OPIT TÄLTÄ VUOROLTA
- ipad-lukko päästää saman roolin läpi. Kaksi JU:n iPad-ajoa jonossa: seuraavan on odotettava edellisen ketjun pid:tä. Lukko ei sarjoita niitä.
- iPad-ajossa vartija "toinen ajo iPadilla" ennen EXIT-trapia, muuten trap asentaa rungon toisen ajon alta.
- xctrace ei pysähdy INT:llä: raja 120 s ja kill -9 (T/pk-lontoo-f1d-ajo.zsh). Pelkkä `wait` jää jumiin.
- zsh: tyhjä glob for-silmukassa kaataa skriptin. Käytä (N).
- Tallenne ilman kuvia: esikatselu.sh antaa VIKA, koska vaatii png:n, vaikka tallenne syntyy. Malli T/nui-nimi3-jonossa.zsh noutaa sen ajokansiosta.
- "kuva"-komento näkyi kerran konsolissa kahdesti (nelio-2, ruudut 816 ja 911), syy tuntematon. Laske rivit kuittaukseen.
- Lupa yhteen ajoon koskee yhtä ajoa: NS:n nelio-2 kysyttiin PT:ltä, koska pyynnössä oli "Ei uusintaa".
- Kesken olevan laitekäännöksen vaihto: kill -9 emot, TERM laite-sha ja Unity; lukko jää, poista se vain, jos sen pid on oma ja kuollut (T/.. 01.38).

## YÖN SÄÄNNÖT
- Yöllä vain Pariisi, Lontoo ja juoksupeli (Kielletty kaupunki kuuluu). Muu: ei ajoa, rivi PT:lle.
- Enintään 2 Unityä: T/ju-portti.zsh (`source`, `portti <linja>`) kaikissa uusissa ajoskripteissä. Ei päällekkäin planeetta-ajon kanssa.
- Vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa: kokeen osa pois tai edellinen toimiva tilalle, rivi KK:lle, seuraavaan työhön.
- Levy: rivi PT:lle alle 35 Gi; nyt 46 Gi. Älä poista lokit/-kansiosta ilman PT:n nimeämistä. ÄLÄ siirrä lokit/julkaisija-laite-218-2cba21a3e: laattapaketti luetaan sieltä.
- Intron Mac-ajot laattapaketilla: `git grep julkaisija-laite-218 <sha> -- Assets/Matkakirja/Kartta/Laattapalvelin.cs`.
- TF ei lähde ennen KK:n korttia "Pariisi valmis" PT:n kautta.
- Tallenne ei onnistu iPadilla, kun konsolikäyttäjä on samireivinen (nyt on). Tarkista sk:n ohjeet ennen ajoa.

## TULOKSET TÄLTÄ VUOROLTA (kaikki kuitattu; kuvia en arvioinut)
KS 39. NUI yksi-k01f, k05, k04, nimi-tallenne, kuvapallo-nimi, nimi-tallenne-2, yksi-k01f-2, kuvapallo-nimi-2, nimi-tallenne-3. VS Lontoo C2, E1. NS karsi iPad, nelio, nelio-2. PK Lontoo D4, D5, D6, D7, D8. LAV levyt7x, 7y, 7o.
