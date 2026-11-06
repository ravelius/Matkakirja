# Karttaseppä: luovutus 6.11.2026 klo 08.29 (KS)
Syy: konteksti 30 %, luonteva tauko: ajo katsottu ja tulokset lähetetty. **Voittaa aiemmat ristiriidassa; -0804:stä pätevät enää LOPPUTESTIT, VIESTIRAJA ja AUKI-kohdat, joita tässä ei mainita.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki 3cb30461b). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (karttaseppa/ajo-yhteinen-tasoitus, kärki b79255f00, kääntämättä). KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. PT = local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc. JU = local_b4a7e82a-2522-437f-84ff-813401120931. NS = local_c7344e20-fba8-433d-ba8e-184a325037ef. NUI = local_a3754ed8-f155-43b5-9095-b51e9e29ff53. VS = local_3b36fe96-0199-4b17-9eb4-46a882ce7399.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. Katso, onko KK vastannut ND-pariin ja onko NS tuonut palat-v4:n kansion.

## 1. OMISTAJAN PÄÄTÖKSET 08.13
- **Montparnasse:** lasipinta kelpaa kokeena, ei lopullinen hyväksyntä, **Tripolle tai Codexille ei kuitata**. Seinän ruskea yläreuna korjattu (`mp-torni.py`), nähty ajossa 382618036, `mp-oikea-kulma`. KK 08.23: reunus tarkoitti myös `mp-lahi`:n rosoista kattoreunaa. Rosoisuus oli maalattu kattokuvaan, ei mallin muodossa. **3cb30461b laskee reunuksen ja kannen rajan mallin ääriviivasta: EI nähty pelissä**, vain atlaksesta. Kysymys seuraavassa ajossa: onko reuna sileä, ja näyttääkö tasainen reunus liian tyhjältä.
- **Notre-Dame rantaan:** vain koe. `Resources/NotreDameKoe/pohja-ranta.png` tehty työkalulla `_tyo/karttaseppa/nd-ranta/tee-pohja-ranta.py` NS:n maskista `_tyo/natiiviseppa/pariisi-talot/selvitys-yhteinen/nd-ranta/maski.png`. Talot `palat-v3-nd-ranta`. Oletus ennallaan: koe vain komennolla `koepohja notre-dame NotreDameKoe/pohja-ranta`. Pari KK:lla, polut `_tyo/karttaseppa/parit-nd-ranta-382618036/`. Kiekko poissa, talot rantaan. KK vie omistajalle. Älä muuta oletusta ennen omistajan sanaa.
- **Viat, kerrottu KK:lle:** koekuvista puuttuu nimiä (Rue Jacob, Rue de Buci, Seine, Belleville): syytä ei selvitetty, epäily latausaika. Laiturilaatikko Pont Neufin länsipuolella on molemmissa kuvissa, NS:lle kerrottu.

## 2. ND:N HAAMU: TODISTETTU, EI VIKA (loppu)
usvamitta ajossa 382618036 (`unity.log` rivi 4159-): usvan loppu 2391 m, ND:n jalka 2418 m, malliUsva 1,00 ja kartta 1,00. Sainte-Chapelle 2182 m ja Panthéon 2120 m, malliUsva 0. Omistajan 5.11. 19.30 päätös: koko malli häipyy jalan mukaan. Suositus KK:lle: ei muutosta. NUI:lta auki: pitääkö kyltin häipyä mallin mukana (kyltti täysi ss-la:ssa). Sainte-Chapellella kohdePeitto 0,37 mutta malliUsva 0: en selvittänyt tätä eroa.

## 3. KK 08.23
Tasainen oletukseksi vasta, kun merkit mäellä (ajo 3, NUI arvioi sc-45, sc-80) ja NS:n palat-v4:n seinät on nähty; sana KK:lta kuvien jälkeen. Älä kytke sitä ilman sanaa. NS löysi seinäaukot, jotka tasaus paljastaa.

## SEURAAVA YHTEINEN AJO (ei vielä pyydetty)
Y:n kärki b79255f00 (+ NS:n v4, kun se tulee). Odota NS:n v4-kansiota; jos se viipyy, pyydä ajo ilman sitä, koska VS odottaa. Skenaario uusi `sk-pariisi-yhteinen-4.txt`, rakenne kuten -3: `komento talot 0`, odota 5, `talot kansio`, `talot 1` (kansion vaihto ei vapauta ladattuja paloja ilman `talot 0`:aa). Mukaan:
- `mp-lahi` (kamera sk-pariisi-mp-3: kallista 45, suunta 40, aja 48.84211 2.32197 0.012 2).
- VS: loppuun `_tyo/linssiseppa2/ohjelmakohteet/sk-sillat-pompidou-3.txt`, 7 kuvaa (tila: tasainen, palat-v3, ohjelmakohteet 1). OhjelmaKohde.shader koskee kaikkia ohjelmakohteita. Kansio VS:lle.
- NS: po-la ennen ja jälkeen (palat-v3 | -nd-ranta), etelärannan kuva, jossa ND ja talot, Tour Saint-Jacques ja Hôtel de Ville talot päällä. Kansio NS:lle.
- NS:n v4: sama kamera ennen ja jälkeen.
- Yli 5 kuvasta perustelu ajopyyntöön. Älä yhdistä Y:hen ajon aikana.

## Oppi
Kysy, mitä sana "reunus" tarkoittaa, tai näytä kaikki kohdat, jotka se voi tarkoittaa: korjasin ensin vain seinän yläreunan. Laske syvyysero lokista, älä koordinaateista: arvioni 340 ja 425 m oli väärin, mitattu 236 ja 298 m. Kynnyksestä tehty kuvamaski jättää tahroja; mallin ääriviivasta laskettu raja on siisti.

## LOPPUTESTIT (Karttasepän oma lista, ei tehdä nyt; siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
