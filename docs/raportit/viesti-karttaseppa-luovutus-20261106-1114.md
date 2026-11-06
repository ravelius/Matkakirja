# Karttaseppä: luovutus 6.11.2026 klo 11.14 (KS)
Syy: konteksti 26 %, luonteva tauko: ajo 8 on JU:lla. **Voittaa -1056:n ristiriidassa; siitä pätevät FORUM JA NS ja suunnitelman kohta "portti pakolliseksi vasta Pariisin jälkeen".** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, kärki 82c0130ba, natiivi-backup). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (kärki 1347410ca). Viestit: ListAgents, koko rivi "Nimi (malli, effort) [ref]" tai vastaanottajan from-id; pelkkä "Nimi [ref]" ei mene perille.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).

## AJO 8 (JU:lla, kääntö meni läpi, skenaario käynnissä 11.13)
Y 1347410ca (b8) = 9f5e3e105 + runko ce65ccfe4 + W 82c0130ba + VS 838527412 + VS d4d10bdb6. Skenaario _tyo/karttaseppa/sk-pariisi-yhteinen-8.txt, 20 kuvaa, palat-v9. Tulos JU:n mukaan; pyydetty lokit/karttaseppa-yhteinen-8-b8-1347410ca (käynnissä esikatselu-20261106-111157). **Älä yhdistä Y:hen ajon aikana.** Katso täysikoossa, koko kuva, sitten jaa:
- **KK, viat kerrottuina, kuvat katsottuna:** parit opera, invalidit, nd-sch, sc -nyt|-paletti (samat kamerat; kamerat laskettu, tarkista osuvatko). Kerro: tummat katot ja ikkunat, Opéran kulta, mäen nurmi. co-yla: Louvren länsipää (f743d99ad) ja Tuileries'n raita poissa.
- **VS:n seuraaja (luovutus -1105):** kansio ja po-la, pa3-94, pb-etu, ss-la, co-yla, co-45, em-geysir, em-krumlov, p-roy, p-roy-2, p-car. Jos erikoismalli ei osu ruutuun, kerro VS:lle, se hakee etäisyyden (PT: ratkaistaan kuvasta).
- **NUI:** karsintarivit ja Jyväskylän kaksi nimihakua (Jyväskylä nyt ajon alussa).
- **po-la:n sumeus:** nyt ei ensimmäinen kuva; jos terävä, epäily e23:n ensipiirrosta vahvistuu.
- Mittari: katso rivi skenaarion alusta; koepaletti-rivillä pitää olla 6 mallia.
- Lokin ArgumentOutOfRangeException komennon "ui sulje" kohdalla (JU kertoi) on Unityn oma SearchDatabase, sama ajossa 7. Ei vika.

## SEURAAVAAN YHTEISEEN AJOON
1. **VS abd7d1dd8 korvaa d4d10bdb6:n** (PT: Palais Bourbonin trikolori rajan sisään; 2 vakiota, lippupoikkeus pois työkalusta). JU ajoi vanhan, joten **ajo 8:n pb-etu ei todista lippupäätöstä: sano se VS:lle ja KK:lle.** Valmis yhdistys: 5f44adef2 (natiivi-backup karttaseppa/ajo-yhteinen-8b, 1347410ca + abd7d1dd8). Ajon jälkeen `git -C Y merge --ff-only 5f44adef2`, jos Y ei ole liikkunut. pb-etu seuraavaan ajoon; lipun pari KK:lle, hän voi kumota.
2. NS:n v10, jos KK päättää Forumin katosta: po-la ja louvre-ita samalta kameralta.

## KARTTAPALETTI: MITÄ ON TEHTY
- Tyylikirja main: [PR 6342](https://github.com/ravelius/Matkakirja/pull/6342), f641d75b5, testit olivat kesken 11.12. **-1056:n "ei tarvita tyylikirja.mjs:ää" oli väärin:** lähteen muutos vaatii aina generoinnin, koska tiiviste on css:ssä ja natiivin Tyylikirja.uss/.cs:ssä. Molemmat tehty. Vie PR kaavan mukaan. Worktree /Users/Shared/Claude/wt/karttaseppa-paletti-v2 pois, kun PR on yhdistetty.
- **Portti korjattu (W 8479f9221):** `tyokalut/karttapaletti.py` mittaa GLB:stä vain kolmioiden käyttämät atlaksen pikselit (`nakyvat`). Ennen: ND 6,70 %, Sainte-Chapelle 5,92 % olivat lähes kokonaan näkymätöntä täytettä. Nyt: ND 0,37, SCh 0,29, Opéra 3,13, Invalidit 0,79, Sacré-Cœur 0,45, mäki 28,01 %. Pohjat läpi kaikki, -1056:n "invalides-pohja 2,55 %" ei toistunut työkalulla.
- Muunnettu kansioon Resources/NotreDameKoe/paletti-v2 (6 mallia, kaikki läpi; Opéra 0,19 % juuri rajan alla): tee-kohteet.py `_tyo/karttaseppa/karttapaletti-v2/`. Atlaspareja parit-atlas/.
- Komento `koepaletti <kansio>` (Nahtavyysalue.KoePaletti): vaihtaa kuvat ajon aikana. Oletus ennallaan, kunnes KK sanoo. Muunnos koskee myös atlaksen täytettä, siksi "muuttui" -prosentit ovat koko kuvasta eivätkä kerro näkyvää muutosta.
- **Tuileries'n raita (W 82c0130ba):** kivipinnan länsireunan takaa läpinäkyväksi, kartan nurmi jatkuu; suora viiva, koska värirajaus jäi rosoiseksi; samalla pois pohjan oma suihkulähde ja kulman kiila. Pohja louvre-pohja-talot3, työkalu _tyo/karttaseppa/louvre-talomaski/tee-raita.py, tarkistus3.jpg. Pelissä näkemättä: katso, istuuko kiven reuna kartan nurmeen.
- **KK:n sana auki:** Sacré-Cœurin mäen hyväksytty nurmi (133,144,79 ylhäältä) ylittää rajan 28 %:lla. Muunsin kokeena; KK:lle kerrottu, suositus tehtävä kuvan jälkeen.
- Oletukseksi vasta KK:n sanalla: vaihda Malli.Tiedosto-polut paletti-v2:een.
- Raamattu 4.40 on jo PT:n päivittämä. 3d-maamerkki kohta 35 tarkistamatta.

## FORUM, USVA
Forum: -1056 pätee; palat-v9 ajoissa, kunnes NS tuo sha:n. Usva: omistaja 10.47 mallit ja puut samaan pikseleittäiseen usvaan; PT kirjasi Raamatun 2.215 (#6341): lue se ennen kuin kosket usvaan.

## Oppi
Ketjutetussa komennossa tarkistuksen virhe ei pysäytä PR:ää: aja portti ensin ja lue tulos. Mittaa vain näkyvät pikselit: atlaksen täyte teki kahdesta kohteesta väärän hälytyksen. Tarkista JU:n tila ennen kuin lupaat uuden sha:n ajoon: se voi alkaa minuutissa.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
