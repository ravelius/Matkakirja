# Työkalu 2, KK 14.11. 23.40 (ajz) päätökset tehty (Valoseppä 15.11.2026)

Kuvat: `asemat-elysee-1.jpg` (Nord, Saint-Lazare, Lyon uusilla halleilla + Élysée U:na), `palatsit-2.jpg` (13 palatsia ylhäältä, siipien peitto).
Ei junaan.

## LUVUT
- PARIISI: 425 malliin / 222 ei sovi (oli 410 / 233). Muutos: +5 asemaa ja palatsia hallien ja pihan hyväksynnällä (Nord, Saint-Lazare, Lyon,
  11 palatsia + Palais Royal), Oratoire kirkoksi, Palais de la découverte ei enää ikoni (jää perustaloksi: ei nimilistalla).
- LONTOO: 892 / 458 (oli 894 / 455). Kaksi kirkkoa, joiden pienempi kokoluokka olisi ollut mittakaavassa 1,25–1,31, ovat nyt ei sovi (A).
  St Margaret's vapautui ikonista (kirkoksi tai ei sovi säännöllä). Lontoon 189 asemaa ja palatsia ilman nimilistaa ennallaan.

## A) Mittakaavan yläraja 1,2
- SOVITUS max_mittakaava 1,2. Yli → yksi suurempi kokoluokka, muuten ei sovi. Askel alas (alle 0,7) ei saa tuottaa yli 1,2:ta.
- Tulos: luonnolliset nyt 0,70–1,19; yhtään siirtoa suurempaan ei tarvittu (pinta-alan kokoluokka on aina mallia pienempi tai yhtä suuri).

## D) Palatsit (umpipiha + U)
- `TyyppiPalatsiPiha(pituus, leveys, julkisivu, avoin)`: julkisivu "+z/-z/+x/-x" (malli rakennetaan +z:lla ja kierretään neljänneksin),
  avoin = poistettava siipi. Jos pääjulkisivun puoli on auki (kunniapiha), risaliitti ja portti ovat pihan puolella päärakennuksessa.
- `palatsin_sovitus`: 1) akseli seinien vallitsevasta suunnasta (ei pienimmästä suorakaiteesta: Élysée'n vino kulma kiersi mallin);
  2) reunan uloke rajataan (2 m:n kaista alle 20 % pohjaa, enintään 35 %; Luxembourgin länsisiipi 28 m); 3) siipi auki, jos alle 50 %:ssa
  sivun 16 kohdasta reunalta 24 m (1,5 × siipi) sisään ei ole pohjaa. Sisäpihat (OSM inner) eivät ole pohjaa. KK:n "alle puolet siivestä"
  toteutettuna suoraan siiven alalla avasi Luxembourgin ja Élysée'n kaksi sivua (sisäänvedetty puutarhajulkisivu, kapeat siivet) → säteen muoto.
- Tulos: umpipiha Luxembourg, Hôtel de Ville, Marine, Légion d'Honneur, Cambon, Matignon, Muette, Palais Royal; U: Élysée (avoin lounaan puoli, 19 %);
  tanko: Crillon, Quai d'Orsay, Lassay. Bourbon ei sovi (nimilista: toisen kierroksen käsimalli).
- KK katsoo: Élysée'n avoin sivu tuli lounaaseen (puutarhan puoli), koska OSM-pohjassa kadun puolen portti- ja talousrakennukset ovat mukana.
- Pääjulkisivu käsin (julkisivu + katu nimilistassa). Epävarmat: Palais Cambon (itä, Rue Cambon), Château de la Muette (itä, Rue André-Pascal),
  Légion d'Honneur (etelä = porttikaari Rue de Lille; rotunda Seinen puolella), Lassay (etelä).

## E) Asemat
- `AsemanHallit(leveys)`: lähin 50 m:ä, hallin leveys 35–65 m, 1–5. Nord 3 × 46 m (944 kolmiota), Saint-Lazare 5 × 49 m (1 324), Lyon 4 × 45 m (1 104).
- Julkisivu max(20, 0,8 × harja); paviljongit julkisivu + 6 m. Kellopääty keskimmäisen hallin edessä: räystäs ≥ harja + 1,5 m, kolmiopääty,
  kello kokonaan harjan yläpuolella, pääovi päädyssä.
- Austerlitz ja l'Est: lista halleja 1 ohittaa (KK: "lista saa ohittaa"), mutta pohjat ovat 119 ja 114 m leveitä → yksi 114–119 m:n halli on
  sääntöä karkeampi. Ehdotan listasta pois (sääntö antaisi 2 hallia). KK päättää.

## F) Ikonin pohjaleikkaus
- `Luonnos.dll ikonit tulos/ikonit.json`: jokaisen koodimallin rungon (ei Verkko.Ulko-kärkiä: portaat, terassi, mäki) XZ-rajat JA kupera kuori,
  paikka ja Akseli. Kierron lähde tarkistettu: OhjelmaKohteet.cs @1ccace4a6 rivit 34 ja 1046–1056 (itä = x·cos a − z·sin a,
  pohjoinen = x·sin a + z·cos a, ankkuri = Lat/Lon + kierretty Siirto; Koko vain komennolla "isot").
- Testi: ohitus, kun yhteinen ala kuoren kanssa ≥ 25 m² ja ≥ 5 % ehdokkaasta. Akselien suuntaiset rajat eivät riittäneet: Louvren 329 × 673 m:n
  laatikko peitti Oratoiren kulmallaan, kuori ei.
- OHITETUT-LISTAN ERO (tulos/ikoniero-*.tsv): vapautuivat Oratoire (Louvre) → kirkko, Palais Royal (Louvre) → umpipiha, Palais de la découverte
  (Grand Palais; koodimallin kommentti: jää OSM-taloksi) → ei sovi = perustalo, Gare du Musée d'Orsay (Orsay; 651 m²:n erillinen pala museon länsipäässä)
  → ei sovi = perustalo, St Margaret's (Abbey). Chapel of St Peter ad Vincula jää Towerin kuoren sisään (ohitettu; Tower-mallissa ei ole kappelia, KK päättää).
- KK:LLE KYSYMYS (tulos/koodimallit-pariisi.tsv): pelissä on koodimallit myös Hôtel de Villelle, Madeleinelle, Palais Bourbonille, Saint-Eustachelle,
  Saint-Sulpicelle, Tour Saint-Jacquesille ja Pompidoulle (OhjelmaKohteet KaikkiKohteet, ei IKONIT-listalla). Niiden pohjat leikkaavat
  Hôtel de Villen (umpipiha), Madeleinen (pylvästemppeli), Saint-Sulpicen ja Saint-Eustachen (kirkko) tyyppimallia. Lisätäänkö ne ikonilistalle
  (tyyppimalli pois, koodimalli jää)? Hôtel de Lassay osuu Bourbonin kuoreen vain 75 m² (6 %), ei ohiteta.

## Tiedostot
oma/Tyyppimallit.cs (TyyppiPalatsiPiha-kuormitus, TyKierra, AsemanHallit, kellopääty), oma/Luonnos.cs (ikonit, palatsi-piha julkisivu avoin, asema),
tyypitys.py, palatsikuva.py, arkki-ajz.py, renderoi.py (piha2-). Tulokset tulos/: merkit-, poistot-, eisovi-, ohitetut-, ikoniero-, koodimallit-,
ikonit.json. Ennen-tila: varmuus/tulos-ennen-ajz, varmuus/oma-ennen-ajz, varmuus/tyypitys-ennen-ajz.py.
HUOM: kynnys.py:n kirkkopiirto peilaa mallin z:n (symmetrisille kirkoille ei näy); palatsikuva.py käyttää oikeaa kiertoa (OhjelmaKohteet).

## KK 14.11. 23.59 vastaukset (tehty 15.11.)
1. Kaikki pelin koodimallit ikoneiksi AUTOMAATTISESTI: ikonilista.py lukee OhjelmaKohteet.cs:n (Unity-repo, sha = lahde/LAHDE-SHA; kopio
   varmuus/OhjelmaKohteet-<sha>.cs) → tulos/koodimallit.tsv (41) → `Luonnos.dll ikonit tulos/koodimallit.tsv tulos/ikonit.json` (heijastus; 40,
   Kuumailmapallo puuttuu osakirjastosta; lambdat = Pont Neuf ja Concorde ohitetaan). Leikkausraja nostettu 5 → 10 % (Hôtel de Lassay osui Bourbonin
   kuoreen 6 % naapurina). Uudet ikonit: Saint-Sulpice, Saint-Eustache, Madeleine, Hôtel de Ville, Palais Bourbon.
2. Austerlitz ja l'Est: sääntö → 2 hallia (59 ja 57 m).
3. Cambon itä (13 rue Cambon, länsipuoli), Muette itä (arvio: True).
LUVUT: Pariisi 421 malliin / 221 ei sovi; Lontoo 892 / 458 (ennallaan).
