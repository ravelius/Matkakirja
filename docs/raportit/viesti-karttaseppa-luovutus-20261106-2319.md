# Karttaseppä: luovutus 6.11.2026 klo 23.19 (KS)
Syy: konteksti 25 %, ajot käyvät. Korvaa 1fe808cc2:n, 64a283e18:n ja kaikki aiemmat. Pohja `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 217a40fb6, remote natiivi-backup, ei origin). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, eb4fa95d2). L = wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty).
## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen). Ajon seuranta: `pgrep -f '^zsh .*/mac-ajo.zsh'` (ankkuri ^zsh pakollinen: ilman sitä pgrep osuu omaan vahtiin). Uudelleenviritettävä skripti `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/ajovahti.sh` (kopio), vaihda siihen ajon 36 loki.
2. **Omistaja 23.07, yön sääntö (PT):** kun vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa, kokeen osa pois tai edellinen toimiva tilalle; rivi KK:lle (vika, mitä kokeiltu, suositus) ja seuraavaan työhön. KK kokoaa kysymykset aamuun.
3. **Ajo 34 valmis ja raportoitu.** Arvio `_tyo/karttaseppa/parit-yhteinen-34/ARVIO.md` (täysi polku /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/parit-yhteinen-34/). VS ja NUI saivat polun. PT: Eiffel-parit eivät mene KK:lle valmiina. Montparnassen r1b-parit kansiossa `kk/ei-kelpaa-r1-ilman-alfaa/`.
4. **Korjattu väite:** Montparnassen ruskea EI tule pohjakuvasta. Poistettujen talojen kohdalla oletuspohjan alfa on 0, ruskea tulee kartan rakennustasosta. Sama syy kuin Eiffelin läiskissä. r1 hukkasi alfan (oma virhe).
5. **Poistosääntö (PT 23.0x), Y 217a40fb6, ajamatta:** poistettu talo lähtee myös kartan rakennustasosta. `TaloPoistot.cs` generoitu v13:n päätöksistä (`lahialue-20261106/poisto/tee-poistot.py <ulos.cs> <raportti.json>`, raportti.json, analysoi.py): 973 taloa, 2191 rengasta. `TaloAlue.PoistoPala/PoistoPois`, komento `talot poisto 0|1`, pääte `-poisto1`. Koepohjat r1 ja r1b poistettu Y:stä. Lisäksi käsin way/54108363 (alle 8 m², läiskä poistetun vieressä). Mitattu: 54108364 26/27 m², 54108369 17/17, 54031857 34/34.
   Rajaus: 4 z14- ja 40 z13-rengasta jää (yhdistetty kortteli, rengas > 2 x talo; esim. Monoprix z13:lla). 71 taloa ilman z14-rengasta. Jos tv päivittää v-palat, aja tee-poistot uudelleen.
6. **Ajo 35 käynnissä L2:lla (alkoi 23.0x):** Y 00dea49d1, `sk-pariisi-yhteinen-35.txt` (`tee-sk-35.py`), 30 kuvaa, raja 45 min, loki `karttaseppa-yhteinen-35-b8-00dea49d1`. Sisältö: ryhmä 2 `r2-<pantheon|opera|invalidit>-<45|70|yla>-<nyt|uusi>`, NS:n 98180b82d `kn-opera-45-kadut`, VS:n `sv-*`, `ua-*` (usva a; viisto usva ja maalattu taivas päällä listan ajan, kerrottu VS:lle), `sm-z13-*`.
   Valmistuttua: parit PT:lle, viimeinen sana KK:lta; polku VS:lle (local_fa464945, sv, ua, sm), Sacré-Cœur ja Invalidit korjattuina KK:lle (PT 22.4x); lokikansio NS:lle. Tarkista lokista 'talot: vapautettu' ennen v13:a ja kolme koepohja-riviä. Ryhmän 2 kuvat katsomatta: `lahialue-20261106/ryhma2/RYHMA2.md` (orpo talo Panthéonin lounaispuolella, pohjan reunan sauma, Panthéonin pohjoisen isot rakennukset). Näissä kartan jäljet ovat vielä mukana: arvioi yhdessä ajon 36 kanssa.
7. **Ajo 36 tilattu JU:lle 23.15, kuittausta ei vielä tullut:** Y 217a40fb6, `sk-pariisi-yhteinen-36.txt` (`tee-sk-36.py`), 24 kuvaa `p-*-nyt|uusi` + tallenne `p-gr-8-m`, raja 35 min (JU:lle ilmoitettu), loki `karttaseppa-yhteinen-36-b8-217a40fb6`. Korvaa abaaa1dfb:n (JU:lle sanottu). Jos JU:lta tulee 'abaaa1dfb alkoi', se on väärä ajo: pyydä pois. Parit samasta ajosta, palat v13, pohjat r2. Valmistuttua: kuvat katsottava täysikokoisina, parit PT:lle, lokikansio NS:lle (0c544d4ef ensi kertaa ajossa: kaupunginosat ja pienet vedet pois). Tarkista lokista 'talot poisto: päällä' ennen `-uusi`-kuvia ja `-poisto1`-palojen syntyminen. Jos ei ratkaise, yön sääntö.
8. **Y:ssä nyt myös:** VS 074dc595e (usva a oletukseksi: 85° ja 75° eroavat aiemmista pareista, `usvakauas 0` palauttaa), NS 0c544d4ef (1282a6327). Seuraavat ajot kärjestä 217a40fb6.
9. **Avoin testi:** `sh kaanna.sh TaloAlue` 8/9: `IenanSiltaJatkuuPohjoisessaEikaEtelassa` "eteläpää ei liiku". Muutos ei koske IenanJatkoa; tutkimatta, ei tiedetä, kaatuiko jo ennen.
10. **Kadun katkos (PT):** r1b-eiffel-092, y noin 1700, `rajaukset/katkos.png`. Arvio z16-palaraja 2,29065°, ei varmistettu toiselta kameralta. Kerrottu VS:lle, odottaa sen vastausta.
11. Ryhmä 3 (Grand Palais, mittaa verkko ensin) ajon 35 jälkeen.
12. Etäyhteys vain KK:lla. Hookin työlistarivit ovat PT:n työkalulla, en päivitä. Session id:t osoitekirjasta.
14. **PT 23.2x, tee nämä:**
   a) IenanSilta-testi: aja ilman muutostani (esim. väliaikainen worktree kohdasta 217a40fb6:n pohja 1282a6327, `sh kaanna.sh TaloAlue`); kaatuuko myös pohjalla? Rivi PT:lle.
   b) gr-8-m:n pohjan vaihto ruudut 110→111 (joki beigeksi, kadut vaaleammiksi; `/Users/Shared/Claude/proto-3d/lokit/nui-tahtikyltit-20261106/ajo34/gr-8-m-72-124-rajaus.jpg`). PT:n hypoteesi r1-pohja: lento on 48,857–48,865°, r1:n suorakulmio ulottuu vain 48,8467°:een, joten geometrian mukaan r1 ei selitä. Katso `p-gr-8-m` ajosta 36: jos toistuu, syy on muualla, rivi PT:lle. Kuva näyttää koko näkymän vaihdon yhdessä ruudussa.
   c) Seuraavaan ajoon 37 (ajon 36 jälkeen): VS:n `_tyo/linssiseppa2/sk-pb-piha.txt` (poimi dac44e3d9) ja `sk-sillan-valo.txt` (poimi 386945015, sama haara linssiseppa2/sillan-paa, natiivi-backup; sisältää myös dac44e3d9:n); NUI:n f29ff0335 (natiivi-ui/kyltti-nopea-ylitys) ja `_tyo/karttaseppa/lisa-kyltti-ylitys-35.txt` loppuun (8 tallennetta; tallenteiden kesto listan mukaan). Lokikansio NUI:lle (local_43962c89), polku VS:lle. Ajon 35 polku VS:lle (sv, sm). VS luki ajon 34 lokista itse.
   d) Jäävät 44 rengasta näkyvät parissa, älä rajaa pois: `p-invalidit`, `p-louvre`, `p-mp-z13`. PT kuittaa vasta ajon 36 kuvista.
13. Ajon 33 ja 31 arviot NUI:lta ja VS:ltä PT:lle. Eiffelin pikkutalot: palat v12. ND #2184 s85 oletus Y 6eefdbbb1, ajojen 34 ja 34b ND:n varjo peilissä. Omistaja 22.15: maalattu taivas kelpaa kokeena, vain Pariisissa.
## AJO 32 (arvio `parit-yhteinen-32/ARVIO.md`, parit `parit-yhteinen-32/kk/`)
- Ryhmä 1 oikein: `talot 0`, odota, `talot kansio v11`, `talot 1` (pelkkä kansio ei vapauta ladattuja paloja, ajon 31 r1 kelvoton, `parit-yhteinen-31/kk/ei-kelpaa-v10-molemmilla`). Eiffel: jalka vapaa. Montparnasse: juuri näkyy; **puiden alla ruskea tasainen alue, syy tutkimatta** (kartan rakennuspinta?).
- ND #2184: Y `NotreDameKoe/lod5-20261106` (092fee5bb, `codex-lod-20261106/tee-lod-v5.py`). Leveneminen 1,247, nykyinen 1,174, tilaus 1,25; fleche vihreä. Kivi julkisivulla Y: nykyinen 0,416; 100 % 0,473; 85 % 0,425; 72 % 0,382. Piirrosjälki ja isot vaaleat tasanteet omistajan nähtäviksi. Kuittaus Codexille ad9c139e5: SHA, päätös erikseen. Nykyinen pysyy, kunnes omistaja on nähnyt.
- Pont d'Iéna: pyöreä pää poissa, PT kelpuutti, KK:lla `parit-yhteinen-31/kk/silta-iena-etela-4x.jpg`. Vain Y:ssä. Muut kaksi pyöreää päätä = Quai Branlyn tunnelin suut (81 m), ei vika (LUOKITUS.md).
## OMISTAJAN JA PT:N PÄÄTÖKSET VOIMASSA
- **ND 20.58:** kevyt eteenpäin kolmella korjauksella; tavoite istuu kartalle Sainte-Chapellen rinnalla, liioittelu säilyy, mittari G-kuva.
- **Eiffelin reuna 18.49 "Kelpaa":** haiv2 oletus W 0ab14d552 ja Y 1ab552a69. Avoin juna on runko 603d4213a, jossa ei ole Eiffeliä eikä Nahtavyysalue.cs:ää; häivytys lähtee samalla kun mallit menevät runkoon. Ei omaa vientiä.
- **Riemukaari #2172 "Kelpaa" 18.09:** oletus lod3, kokeena. Viat 1–6 Codexilla. Korjattu versio uuteen kansioon.
- **Pont d'Iéna "Vaalea kaista" 18.09**, muut neljä viivaa pois.
- 16.46: Seinen litteät muodot "Kaikki pois"; oikea rakennus ei lähde, epäselvä KK:lle kuvan kanssa. 17.08: Off Paris Seine lähtee. 17.24: Seinen kävely- ja metrosillat ohuina viivoina, pienet kadut pois, kuva ennen junaa.
- Lopputulos junaan (e23, -pariisi3, mallit) vain KK:n ja omistajan kuvan jälkeen. Malleista muuta Tripolle tai Codexille vain KK:n sanalla.
## ODOTTAA KK:LTA (kuvat `parit-yhteinen-26/kk/`, ellei toisin mainita)
- **Sillat:** -austerlitz, -beauvoir, -national, sillat-lista.txt (48/63 palaa). **Katettu vesi:** katettu-vesi.jpg. **Laivat:** `parit-yhteinen-25/kk/`, jos KK pyytää. **ND vesi1:** `parit-yhteinen-29/kk/raita-yla.jpg`.
## MUUT ODOTTAVAT
- VS: parit ja arvio ajoista 26, 28, 30.
- PT: koti-haaran tiedostot. Seuraamattomat omat luovutukset + `.claude/settings.local.json.ennen-kevennysta` (ei committiin, ei poisteta). Ei poistoja ennen sanaa.
- h=40 (48.83891,2.37506) jää joesta tunnistamatta. Raita (`laikka-vesi-20261106/syy.md`) jää. Posti #2174/#2178: KK, VS, Codex.
## AUKI, MUIDEN KÄSISSÄ TAI EI KIIREELLINEN
Louvren haamu PT ja VS. Eiffel 85b VS. NUI:n kylttisyy NUI. Kärkilaskenta iPadilla mittaamatta. Tuileries'n ruskeat pisteet (pn-matala-2, noin 590,1437 ja 920,1432) tutkimatta. Pohjakirja: rannan kadun mukaan rajattu Eiffelin reuna vain KK:n sanalla.
## TYÖTAVAT
- Ajotilaus JU:lle: UNITY b8, Y + kärki, skenaario, loki karttaseppa-yhteinen-NN-b8-<sha>, 1 rivi "ratkaisee". Laske kuvamäärä, älä muuta skenaariota alkaneen ajon jälkeen; ennen alkua uusi tilaus korvaa. Muiden lisät: lue lista, NUI:n kamerat viimeisenä. Kerronta: `odota 120`, ennen kuin "ui liiku: esiin" on tullut.
- Parit samasta ajosta: `koemalli` malleille, `koepohja <alue> <kuva>` pohjakuville. Talot: ks. ajo 32. Parityökalu `parit-yhteinen-32/tee-parit-32.py`, ND-koonti `tee-nd-32.py`, malli asennukseen `codex-lod-20261106/tee-lod-v5.py`.
- Kartta-testit `sh kaanna.sh <nimi>`. Python /opt/homebrew/bin/python3 (numpy, PIL). Kuvat 2752 × 2064. Pelin mvt: /private/tmp/*/Matkakirja/*/laatat/elava/mvt/<z>/<x>/<y>.pbf. Kohteet paikalta `laikka-vesi-20261106/tasot-paikka.py lat lon sade_m`; ilmakuva `hae-orto.py`. OpenFreeMapin robots 403: ei hakua.
- Parit KK:lle ilman selitekaistaa, samassa vuorokaudenajassa. Lähteen tyylikirjamuutos vaatii `node tools/tyylikirja.mjs`.
- Codex-posti: worktree karttaseppa-postilaatikko, `checkout --detach origin/claude/postilaatikko`, commit, `push origin HEAD:claude/postilaatikko`.
- Luovutus committiin ilman checkoutia: väliaikainen indeksi (`GIT_INDEX_FILE`), `read-tree origin/main`, `update-index --add --cacheinfo`, `write-tree`, `commit-tree`, push uuteen haaraan.
## OPIT
- Kansion vaihto ei todista: katso lokista vapautus ennen kuvia, kun parin puolet tulevat eri aineistoista. Vertaa kuvaa myös aineistoon (`ryhma1/palasta.py`).
- Ennen väitettä "tuo talo näkyy kuvassa" katso paloista, onko talo olemassa. Kuva todistaa korjauksen vain, jos vika näkyy samalta kameralta ennen korjausta. Rajaus täysikokoisena, koko kuva ensin.
- Kuvan alueen mittaus: tarkista ensin rajauksesta, että alue on mallia (ajon 32 ensimmäinen kivimittaus osui kaupunkiin).
- Ennen "junaan"-lupausta katso, onko riippuvuus rungossa (`ls-tree`). Polku muille aina täysi.
- `aja`-komennon kolmas luku ei skaalaudu suoraan. zsh: `=sana` laajenee, `--include=*.cs` vaatii lainaukset. JU:n ajokansio voi olla `esikatselu-*-N`: katso `ajo.log`.
## LOPPUTESTIT (siirrä jokaiseen luovutukseen, kunnes PT muuta sanoo)
1. Saapumislento laitteella (2.209, KK, PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
