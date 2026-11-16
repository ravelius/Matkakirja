# PT:n luovutus 7.11.2026 klo 13.38 (konteksti 30 %, pehmeä raja)

Korvaa -1224:n JUNA- ja MUU AJOSSA -kohdat; -1224:n OPIT, -1104:n ja -1012:n OPIT, -0855:n ULKOISEN EHDOT ja ALOITUKSESSA voimassa. Id:t osoitekirjassa. Taulu Qo5w6Wk4JSYRwYbyf2fJrm. Loki: worktree /Users/Shared/Claude/wt/pt-loki-20261107-1049 (switch -c uusi origin/main; node tools/raamattu-kirjaa.mjs); lokin PR: gh pr diff --name-only ja yhdistä. Monitorit: hooks/odottajat-vahti.py, hooks/codex-posti-vahti.sh, levy alle 20 Gi (30 min, viritä uudelleen).
Proton commitit: git -C /Users/Shared/Claude/wt/proto-karttaseppa-vahdit, remote natiivi-backup; eivät näy tämän checkoutin origin:ssa.
Codex-posti ilman worktreetä: GIT_INDEX_FILE + read-tree + hash-object + update-index + commit-tree + push (malli f2a792b39); ei vie levyä.

## OMISTAJAN PÄÄTÖKSET TÄNÄÄN (lokissa)
12.50 "Tehdään kaikki korjaukset ennen junaa" (PR 6460). KK:n tulkinta: juna 220 ei lähde ennen Lontoon kumpua, Towerin kylttiä, palloa, Lontoo-nimeä, muuriaukkoa ja jalkoja. Kokemus: Lontoon keskustasta ei nouse vuoria, oikeat mäet jäävät. Ei Mapterhornia; muu kuin pysyvän luvan lisenssi kortille.
13.34 julkisivu #2195 kokeeseen yhdessä korttelissa, ei sarjaa, ei junaan ilman korttia (PR 6461).

## JUNA 220: LÄHTÖ MINUN RIVILLÄNI "VIE 220 KOEVERSIONA"
julkaisija/juna-220 = f86137fb4, yhdistelmää ei käännetty. Sisäinen, ei lukitusta, ei mainiin.
TULI TÄLLÄ VUOROLLA: kivet takaisin (cb4834e16), Lontoon kamera + iPhonen lähizoom dd3a2e10f (ei KertojaLokia), kylttimittarit pois 051fc0e01, Kartta-testien korjaus 8d427f3b0, jalat a45afc9af, usva 16 km 02516c056 (702/702).
| Ehto | Tila |
|---|---|
| Lontoon kumpu | KS: laatat _tyo/karttaseppa/lontoo-kumpu/laatat-v1 (Holborn 57→22; Hampstead 144, Highgate 134 ennallaan, laskettu), palat-d10-kumpu. iPad-pari JU:lla (ajopyynto-ipad.md, 6 kuvaa, myös Hampstead ja Stratford). Stratford 41 m rajauksen ulkopuolella: kuva ratkaisee toisen rajauksen. Talot ja MaaH sidottu vanhaan maastoon, leijunta jopa 44 m: MaaH PK:lle kokeen jälkeen. Laatat vain uuteen kansioon 2026-11-07-lontoo, ohjaus koodaamatta; TF 219 ei saa saada uutta maastoa. Offline-lataus tarkistettava ennen vientiä. Vienti vain sanallani. |
| Tower, pallon merkki, Lontoo-nimi | PK 88c858d0b (ei junassa), i9 JU:lla. Pallon merkki i8:ssa ok. Tower syy sillan vino ympärys. Pari KK:lle ajon jälkeen; sitten vuoro. 2c1d8187d ja 708e68f62 ovat sen alla. |
| Muuriaukko | Koskee julkaistua, näkyy ilman kiviä. Materiaali ja lod poissuljettu. LAV seina4 3fd3cba8e JU:lla (lokirivi, vahti pois): rajaus vai piirto, sitten korjaus. Selitettävä: raja-x näytti seinän ennen, ei nyt. |
| Talot kauemmas | Yhdistetty be723da7f (haara karttaseppa/sade-220, pohja 5032205a6; kolme committia), testit ok, ei ajettu; oletukset 1700–2600 m, 4 km vaatii sanani oletuksiin. 40° kunnossa, 80° yli rajan jo 2,6 km:llä (4208–4267). NS muisti80 83d48ba80 JU:lla (vahti pois) kertoo yhden tason vaikutuksen. Raja = omistajan kortti. Sen jälkeen yksi suositus KK:lle, vuoro vasta sitten. Vara päättämättä. |
| Pallon osat koe | VS film2 JU:lla (35 kuvaa; 3ac4b6fbc, a2c2049be). NUI kartan elämä: 9ec3c10fb, ajo 2 JU:lla, kuvat KK:lle ajosta 2. Veneet (kohta 5) odottavat; sano omistajalle 5.11. laivakielto ennen päätöstä. Junaan vain kortilla kuvista. |
| Kylttien selvitys | NUI c50be596d mittaus JU:lla (ei junaan): Sacré-Cœur vilahdus, Sainte-Chapelle 85°, Louvren nimi Sainte-Chapellen juurella. |
| Keisarin jalat | Junassa; ovien kynnykset, esineet ja ruudukko tarkistetaan junan juoksuajosta (PK). |
| Yöportti | Aja lopullisella rungolla ennen VIE. |
Lontoon kamera: lentosaapuminen todistamatta, kerrottu KK:lle; ei kolmatta ajoa, ellei omistaja halua. Muisti yhteisajossa (omistaja: lopuksi). seina2/3-huiput 4282/4319 latauksen lopussa, testiasetukset päällä, eivät pelaajan huippuja.

## MUU AJOSSA
1. Yksi tarkkuus NS: vaihto2 ja muisti80 JU:lla; beige Macilla korjaantui; Seine 46b7cf417 sivuvaikutus z13 satamat ja kanavat. Yksi suositus niiden jälkeen KK:lle. Ei junaan.
2. Julkisivu #2195: NS kytkee yhteen kortteliin omalla haaralla juna-220:stä; muisti80 ja vaihto2 edellä. Parit lähin taso, 45, 70, 85 + ruutusarja, minulle, sitten KK:lle. Kuittaus Codexille tehty. Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261107-talojen-julkisivut.md.
3. Ovet: v127 ei vientiin, irrotus kivistä vain sanallani; lattiareiät auki. PK:n ovilehden tila kysymättä. Nyt kun kivet menivät junaan, päätä v127 uudelleen kivien viennin yhteydessä.
4. Levy 24–28 Gi, swap 12 Gt; KS _tyo 89 Gt. Poistin kaksi omaa worktreetä. Jos alle 20: pyydä rooleja siivoamaan.
5. Työlistassa ilman tuoretta tilannetta: Horisontin usva ja puusto, Juoksupeli täysin valmiiksi, Kadonneiden aarteiden kyltti. Kysy tekijöiltä, älä arvaa.
6. codex-odottaa.py hälytti väärin #2168–2172, koska kuittaus oli KS:n nimissä; Postivahdille sanottu.
7. Tyhjäkäynnit: NS, PK ja LAV odottavat JU:n ajoja; perusteltu.

## OPIT
- Älä ota koko haaraa, kun kokeen tarvitsee yhden commitin: usvan ketjussa oli muutakin; 8d427f3b0 ja 02516c056 menivät yksittäisinä.
- Nollaus voi syödä sanan: lisää se Postivahdin aloitusviestiin.
- zsh ei jaa muuttujaa sanoiksi: `G="git -C x"; $G …` epäonnistuu, ja `&& … || …` antaa väärän tuloksen. Käytä `git -C $W`.
