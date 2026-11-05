# PT:n luovutus 4.11.2026 klo 02.19 (konteksti 30 %, pehmeä raja)

Edellinen: viesti-fable-luovutus-20261104-0130.md (ba3b5ab5e); sen yö-ohje ja opit voimassa, tila korvattu tällä. Tallenne: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-04-klo-0132-0218.md.
Vahdit Monitorilla 30 min: python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py | grep --line-buffered -E 'ODOTTAA|TYHJÄKÄYNTI|TILA\|.+' ja /Users/Shared/Claude/hooks/codex-posti-vahti.sh. Viritä heti.
YÖTILA: omistaja nukkuu, KK hyväksyy puolesta (ei TF, ei junan lukitusta, ei ostoja, ei asetuksia, ei yli 3 % generointia). Kuvat PT:n kautta KK:lle. Lista: /Users/Shared/Claude/proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md. KK:n id tällä tilillä local_d5f31591 (osoitekirja); local_37f7c945 ei löydy.

## ENSIN: AAMUN KOKO PARIISI (KK 02.05, ei junaan)
Kuvat iso iPadilta viimeistään 05.30. VS tuo yhdistelmäshan (k26 057520875 tai parempi + NS b70ee175a) ja sk:n (mukana k-laaja 0,08) JU:lle ja PT:lle viimeistään 03.30; JU aloittaa viimeistään 04.00 (ajo 21–30 min, käännös ≤ 30 min oletus, ei mitattu). JU kuittasi etusijan; menee PK:n sarjan ja Tripon edelle. Valvo: jos sha ei ole tullut 03.30, kysy VS:ltä heti; varalla k25 7967cf01c tai k26 + 3332c8e15. PT:n viimeinen viesti 02.2x oli VS:n jonossa, tarkista perillemeno (VS luovutti 806af006e, jossa vielä 3332c8e15; jos nollattu, lähetä uudelleen). KK ei ole vielä kommentoinut k26:ta: viesti jonossa.
KK:n pyyntö: k-laaja 2029-vs-laaja.png:n rinnalle samassa m/px:ssä (Raamattu 4.48, m/px kummallekin puolelle; c44dea441 PR 6235:ssä, mergeämättä). JU tuo k24-ajon k-laajan täysikoossa noin 02.45.

## JU:N iPAD-JONO
1. k24 3332c8e15 (alkoi 02.00, valmis noin 02.45; lokit/julkaisija-k24-iso-3332c8e15/): tekninen todistus (saumat, reuna, häivytys, hiusviiva, Alma, muisti, kulu), EI pinnan hyväksyntä. Katso kuvat täysikoossa → KK.
2. PK 0d688683a: sali 1+2 kuvilla, 40 x uudestaan, Pariisi muistilokilla. 3. Koko Pariisi (etusija). 4. Tripo palvelijatar v2 viimeisenä.

## MUISTI = JULKAISURISKI (PK)
Vuoto todistettu: 9f8d2d13f + 12 x uudestaan = VIKA 4081 Mt, verkot +41 Mt/kerta. Korjaus 2cce14eb2: 40/40 huippu 3749 Mt, sali 3696/3764 (vahdin tulokset katsottu; muisti-tarkka.log tyhjä, joten +0,23 Mt/kerta on PK:n luku). Pelaajan Uudestaan sama metodi (koodi). JULKAISTU TF 217: sama vuoto koodin mukaan, ei mitattu; KK:lla aamulistalla.
Kameran nollaus 0d688683a (2cce:n päällä, ei ajettu). 2 s pelkkää taivasta joka uudestaan-komennon jälkeen: PK selvittää Mac-kamera-ajosta, näkyykö pelaajalle; jos näkyy, samaan shaan ennen iPad-mittauksia (JU pitää ne siihen asti).
JUNAEHTO, KK 02.12 vahvisti: kameran nollaus + lopullinen sha: sali 1+2 kuvilla, 40 x uudestaan, Pariisi muistilokilla. Erillistä Releasea ei tule: mittausreitti on jo Release-kokoonpano (JU luki: ei debug-lippuja, ei Development Build; kokoonpano skriptin riviltä, bundle .kehitys). Raamattu 9.4 täyttyy (PT:n ratkaisu).

## PARIISIN TILA
- VS: k26 (z15/z13 rivimassat, z17 julkisivut, ratapiha nippuina): EI 2029. Havaintoni: nykykartan tuntu, kadut hallitsevat, z17 siniharmaita laikkuja. Seuraavaksi KK:n kanta; pohjan puistot liian vihreitä (190/180/125, 2029 196/170/106; KK 02.12), tarkista k26:sta.
- NS: b70ee175a (haamut korkeus_m [16600, 17800], z11 vihreä ja kadut, d82d501c0 pätkintä), ajamatta; sha VS:lle ennen 03.15. Pystyreuna x noin 2420: tiet siirtyvät, syy auki, ratkaisee iPad-kuvista. KK: vinjetti suunnaksi ok; EI pystyreuna, z11/z12-saumat, haamut.
- KS (nollattu a5ff5623a, luovutuksessa kaikki): Codex 15g–k 521084500 tilattu (Champ-de-Mars, Champs-Élysées, Luxembourg + oma tekotapavalinta Palais-Royal ja Plantes, 1 otto, pysyvä kuvalupa). Invalidit hyväksytty koosteena. Tuileries koodilla KK:n arvioitavana (jonossa, myös oikaisuni). Nimet väistävät puita (KK 02.15): KS mittaa ensin, bulevardit laajasti → KK ennen kytkentää. Mittari `nimet laske` JU:lla.
## MUUT
- PK: palvelijat KK 02.15: maljakko ok; sirpaleet erilleen ja ohuemmiksi; lätäkön väri EI; ämpärin sisus puuksi. v10, L1 JU:lta Pariisin ehdoilla, kuvat PT:lle ennen junaa. Palvelijattaren malli Tripolla.
- LAV v125: Wumenin juova pieneni, ei poistunut (koeajo3/wumen-edesta-v125g.png), kiilat ja katkoviiva; ylhäältä kuva tilattu JU:lta. Ei vientiin.
- NUI levossa; jono ei vaadi mitään.

## Opit
- Väri: sanoin "2029 vihreämpi", KK mittasi päinvastaista. Toinen kerta samana yönä: havainto havaintona, älä perusta suositusta väriin.
- Tarkista yhdistelmä ennen ajoa: k24:ssä ei ollut häivytystä, vaikka KK:n ajo sitä vaati (merge-base).
- Nollauksen jälkeen tarkista, että jonossa olleet tuoreet käskyt ovat luovutuksessa (KS 5305d0394, JU d81643b7d puuttuivat; lähetin uudelleen).
- Korjaa väärin kirjoitettu lause heti omalla viestillä.
