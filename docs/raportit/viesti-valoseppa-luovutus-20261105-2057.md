# Valosepän luovutus 5.11.2026 klo 20.57

Korvaa luovutuksen -1934 SEURAAVAKSI-listan. Muu -1934:ssä (äänierä, PEITTO 3) on yhä voimassa. Pariisin valokokeet pysyvät seis.

## UUSI TYÖ (PT 20.4x; omistaja 20.44, Raamattu 2.213, kirjaus PR 6312)
2–3 Pariisin kohdetta ohjelmana tehtyinä sarjan rinnalla. Kortissa: "2–3 kohdetta, ja kuvat Tripon mallien rinnalle." Oikeat mitat, ei Tripoa, ei tavallisia taloja. Omistaja näkee neljästä suunnasta ja 45°:sta Tripon nähtävyyden rinnalla, mikä ero on.
Rajaus: oma haara, ei junaan, ei vientiä. Lontoon osat A–F eivät kuulu tähän. Overpassiin ei kyselyjä. Skriptattu haku vain robots.txt:n salliessa (Wikimedia API sallittu 2.183, hitaasti: minulle tuli kerran 429). Karttaseppä muokkaa samaan aikaan Nahtavyysalue.cs:ää ja usvaa: jos joudut koskemaan niihin, sovi suoraan sen kanssa (suunnitelmassa ei tarvitse). Yksi ajo JU:lta, täysikoossa katsottuna kuvat KK:lle, rivi PT:lle.

Tähän mennessä EI koodia eikä committia. Tehty: lähtötaso, kohteet, mitat ja suunnitelma.

## Lähtötaso (katsottu koodista)
- Erikoismallit (Kartta/Erikoismallit/*.cs, Symbolimallit.Rakentaja): C#-koodi, mallit ajossa, kärkiväri, normitettu leveys ≈ 1, ääriviiva-apu, ei oikeita mittoja. Pääosin elossa koodina, ja niiden rajapinta on Symbolimallit.Erikoismallit.cs.
- Maamerkit (Kartta/Maamerkit.cs, Lahde~/*.py): Blender-skripti + FBX. 255e37543 (27.10.) vei 3D-merkit kartalta, ja komento `maamerkit` kytkee. Lontoo ja Ateena, ei Pariisia. Ei lähtökohta.
- Päätös: oma pieni C#-generaattori oikeissa metreissä, ei Symbolimallit-rajapintaa. Rakentaja on UInt16 ja vie 3 kärkeä per kolmio, joten raja on 21k kolmiota, ja se on yksikkö 1:ssä.
- Tripot: Nahtavyysalue.Alueet, GLB + atlas, varjostin Resources/NotreDameKirkko, mallit liioiteltuja (Eiffel 795 m; ND tornit liioiteltu tilauksesta). Oikeissa mitoissa ohjelmamallit näkyvät suhteessa pieninä. Tämä on olennainen ero: kerro se KK:lle, älä korjaa skaalalla.

## Kohteet (omistajan selite 12.57: "kuten sillat ja Hôtel de Ville")
Kolme: Hôtel de Ville, Pont Neuf, Pont Alexandre III.

## Aineisto
Kaikki kansiossa /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/
- osm.json, hdv.json, renkaat.json, hdv-paikallinen.json: Geofabrik `/Volumes/T7 4TB/Matkakirja-karttaseppa/vesimaski/lahteet/ile-de-france-latest.osm.pbf` (ladattu 8.10., ODbL), työkalut hae.mjs, hae-hdv.mjs (T7 kiinni).
- Jalanjäljet ruudukolla: hdv.png, pn-pohj.png, pn-et.png, pa3.png (akselin suunnassa, ruudukko 5 m).
- viite/: hdv-1-0.jpg (koko julkisivu, CC BY-SA 4.0, paras), pn-2-0.jpg (kaaret, puolikuut, konsolit), pa3-1-1.jpg (koko silta), pa3-1-3.jpg (lyhdyt, pylväs, Pegasos). kuvat.json: lähteet ja lisenssit. Vain vertailuun, ei peliin.

## Mitat (lähde suluissa)
HÔTEL DE VILLE. Keskipiste lat 48.8563106, lon 2.3524401. Paikallinen x = itä·cos a + pohjoinen·sin a, y = −itä·sin a + pohjoinen·cos a, a = 70,1°, joten Unityn Suunta = −70,1 (malli +X ≈ NNE, +Z ≈ WNW = pääjulkisivu aukiolle). Keskitä x:stä −14,3.
- Ulkomitat 144,2 × 89,2 m (OSM relation 284089, ulkorengas way 55448726, sisäpihat 55469423 ja 55469426). Pääjulkisivu 143 m (fr-Wikipedia).
- Korkeudet: julkisivu 18,8 m, kulmapaviljongit 26,8 m, kellotorni 50 m (fr-Wikipedia). OSM height 40.
- Keskitetyt x-rajat (OSM): keskiosa ulkonee −32…31, etu z = 43; siivet z = 37; kulmapaviljongit −72…−57 ja 57…72, z = 40. Takaseinä z = −46 (keskiosa −39…31), siivet z = −43. Vasemmalla sivulla sisennys x = −66, kun z −24…21 (oikea sivu suora, x = 71,5). Sisäpihat x −44…−18 ja 18…43, z −10…22.
- Muoto valokuvasta: keskellä kaksi isoa paviljonkia (−32…−17 ja 17…32; jyrkkä katto, kaksi korkeaa savupiippua, katon yllä harjakaide), niiden välissä iso katto (harja noin 30 m) ja kellotorni: kello, kivilyhty, tumma kahdeksankulmainen lyhty, kupoli, piikki. Siivissä mansardi + kattoikkunat (harja noin 25 m). Kulmapaviljongit: räystäs noin 21 m, huippu noin 31 m, savupiippu. Kerrokset: alin 0–7 (kaariaukot, kolme isoa porttia), 7,5–13,5 korkeat ikkunat, 14–18 matalammat; vyöhykelistat 7,2 ja 13,6, räystäslista 18,8. Kivi harmaankerma, katto sinertävän tumma liuske.

PONT NEUF, kaksi vartta, rakennetaan yhdellä funktiolla. Pituus 238 m, leveys 20,5 m, ajorata 11,5 m (fr-Wikipedia).
- Pohjoisvarsi (Q335277, way 53574164): keskipiste 48.857809, 2.341924, akseli −118,48°, x −74…81. 154 m, 7 kaarta, 6 pilaria. Kansi y −12,3…+10,4 (reunuksineen). Puolikuut, ylä (+y): x −53, −31, −8, 16, 38, 59; ala (−y): −50, −27, −4, 19,5, 42, 63; pullistuma noin 2,6 m, eli pilarit ovat vinossa virtaa vasten. Päät levenevät rantaan x −63:sta ja 66:sta (profiili sovita.py).
- Etelävarsi (way 53574149): keskipiste 48.856531, 2.340819, akseli −120,33°, x −44…43. 78 m, 5 kaarta, 4 pilaria, kansi y −10,6…+12,5. Puolikuut, ala: −32, −14,5, 5, 24; ylä: −27, −10, 8,5, 26.
- Muoto (pn-2-0.jpg): täysikaaret, kansi noin 14 m veden yllä (arvio kuvasta, ei lähdettä); pilarilla keula alhaalla, ylhäällä pyöreä puolikuu ja reunakaide; räystään alla konsolirivi; kaide kivi; pylväslyhdyt puolikuilla.

PONT ALEXANDRE III (Q390418, way 183620685). Keskipiste 48.863608, 2.313623. Ring 155 × 60,7 m. Akselia sovita.py ei sovittanut: sivut viettävät noin 5°, käytä noin 86° (x pituussuunta, tarkista pa3.png:stä). Leveys ring-profiilista noin 41 m; fr-Wikipedia 45 m kaikkineen.
- Yksi 107 m:n matala teräskaari, nousu 6 m (en/fr-Wikipedia), kolmenivelinen. Vastaseinät 44 × 30 m. Sokkelit 17 m (en), kuvassa deck-tasolta mitaten. Kansi noin 9 m veden yllä kuvan suhteesta (arvio).
- Muoto (pa3-1-1, pa3-1-3): tumma kaari ja koristellut sivut; vaalea tasakaide, kaiteen päällä tumma käsijohde; lyhtyjä kaiteella 13 m välein (arvio), kolme lasipalloa; neljä pylvästä kulmissa (sokkeli, nurkkapylväät, ylälista, kultainen Pegasos noin 5 m); rannalla vastaseinässä kaariaukko.

Kartan pinta on tasainen, malli y = 0 kartan pinnalla (MaanpintaH 90 kuten Nahtavyysalue). Vesi ja kaaret toimivat näin.

## SUUNNITELMA (toteutus)
Haara linssiseppa2/ohjelmakohteet, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Haara tehty paikallisesti natiivi-backup/karttaseppa/nahtavyydet-219:stä (994f4001e, sisältää sarjan); ei committeja, ei pushattu. Tarkista ennen aloitusta, onko KS:n haara edennyt.

1. `Assets/Matkakirja/Kartta/OhjelmaKohdeGeometria.cs` ILMAN UnityEnginea (oma vektori, kärjet/normaalit/värit/kolmiot, kolmio 3 kärkeä, tasainen varjostus, sRGB-heksa → lineaarinen, korkeuden mukaan AO kärkivärissä). Apuna seinäkehys (u, korkeus, ulos), Laatikko, Ikkuna (kehys, tumma, ikkunalauta, kaari tai pääty), Mansardi, Kattoikkuna, Savupiippu, Lyhty, Kaari. Yksi funktio per kohde, palauttaa verkon.
2. `Kartta-testit`: lisää tiedosto kaanna.sh:n listaan + testi: ulkomitat vastaavat yllä olevia (±1 m) ja kolmioraja. Ympäristömuuttujalla OBJ-vienti.
3. ESIKATSELU ILMAN MAC-AJOA: Python + PIL, maalarin algoritmi, sama valokaava. Vertaa viitekuviin neljästä suunnasta ja 45°:sta ja korjaa muoto ennen JU-pyyntöä (Raamattu 10.5: lyhyet ajot; muisti "Oikea rakennus ensin").
4. `Assets/Matkakirja/Kartta/OhjelmaKohteet.cs` (MonoBehaviour) ja `Kartta/Resources/OhjelmaKohde.shader` (NotreDameKirkkon kopio, valo sama, albedo COLORista, ei UV:tä; normaalia ei käännetä, Cull Off). Nahtavyysaluetta EI muuteta. Mallina sen LuoOsat/LuoMalli: lat/lon → ankkuri, perus = LookRotation(pohjoinen, ylös), Euler(0, Suunta, 0), jono 3080, näkyvyys LahiKaari 0,13 – KaukoKaari 0,2, _Valo/_Ylos joka kuva, usva kuten PaivitaUsva, kasvu ja häivytys, vapautus. Maavarjo: oma pehmeä suorakulmioverkko Symbolimallit.SarjaVarjoMateriaali(2994):lla (kärkiväri Karttaesineet.VarjoSavy, alfa VarjoPeitto). Oletus POIS (`Paalla = false`, 2.215: Pariisissa vain nimetyt 3D-kohteet), komento `ohjelmakohteet 0|1` Komennot.cs:ään (ndpuut-kohdan viereen). Ei kylttejä kokeessa.
5. Peli-testit/unity-tarkistus.sh 0 virhettä, Kartta-testit vihreä, commit, push natiivi-backupiin.
6. sk-ohjelmakohteet.txt JU:lle (linja 2, vuoro JU:lta). Rivi "mitä tämä ratkaisee": mikä ero ohjelmamallilla ja Tripolla on samasta kulmasta. ESIKATSELU_PISTEKERROIN=0.465 (10.5), "pistekerroin 0.465" lokissa ennen arviointia. Alku: `alku odota-tila Aloitus 40;uusi-peli 5 pariisi;odota-tila Kartta 40`, `ui konsoli pois`, `ui sulje`, `odota 60`, `komento elavakartta`, `komento ohjelmakohteet 1`, `komento kallista 45`, `komento aja LAT LON KAARI 2`, `komento suunta D`, `odota 20`, `kuva nimi selite`. Kallistettuna (yli 20°) kartan tarkkuustaso ei vastaa iPadia; ehkä `komento maasto siirtyma 5 0 30` + `maasto siirtyma kallistus 90` (sk-kartta-45.txt).
   Kuvat (10.5: noin 5, enempi perusteltava; peruste: omistajan kortti neljä suuntaa + Tripo rinnalla): RYHMÄ A samassa ruudussa Notre-Dame (Tripo) + Hôtel de Ville + Pont Neuf, 4 suuntaa 45°:ssa; RYHMÄ B Grand Palais (Tripo) + Pont Alexandre III, 4 suuntaa; lähikuva kustakin ohjelmakohteesta, 3 kpl. Yhteensä 11. Yhteiskuva tekee Tripon erillisajot tarpeettomiksi. Kaari haettava: 1 km ruudussa, kokeile 0,012 (Nahtavyysalue näkyy alle 0,13).
7. Katso kuvat täysikoossa (muistit "Saumat täysikoossa", "Valmis vasta kuvat katsottuna"), vertaa viitekuvaan, kerro erot. Kuvat KK:lle (local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe; VS:n valokoonnit-poikkeus), rivi PT:lle: mitä, sha, kuvien polku. KK vie omistajalle kortin Lontoosta, en minä.

## Muuta
- Viittausvahvistus JU:lle 19.40 oli Postivahdin virherivi; oikaistu JU:lle ja PT:lle. Tulos piti, ei toimia.
- Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
- Etäohjaus päällä tässä sessiossa; aloitusviesti käskee kytkeä uudelleen.
