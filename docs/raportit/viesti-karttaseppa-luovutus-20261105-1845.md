# Karttaseppä: luovutus 5.11.2026 klo 18.45 (KS)
Syy: konteksti 25 % (7.37), tauko omistajan sanan ja Tripon odotuksessa. **Lue tämä, sitten -1834 (haara karttaseppa/luovutus-20261105-1834; sen Riemukaari- ja Overpass-kohdat pätevät), sitten -1817:n Grand Palais- ja Codex-kohdat.** Tämä voittaa ristiriidassa. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 3505c7556. Python /opt/homebrew/opt/python@3.14/bin/python3.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (käsitelty-kohta tilassa).
2. Tarkista viestit molemmista kanavista: **KK:n sana kolmesta arkista** ja **PT:n sana PR 6301:n mergestä**. Molemmat lähetetty 18.3x–18.4x, kumpikaan ei ollut vielä vastannut.

## PR 6301: vihreä, PT:llä
SHA 63b61c06a, CI testit ja reitti SUCCESS, CLEAN. Rivi PT:lle lähetetty 18.3x. Sisältää 6297:n commitin (3731d10e3). **VALMIS: PT yhdisti 6301:n ja sulki 6297:n, kierros 2.183 kuitattu.** Worktreen poisto: katso `git worktree list | grep overpass`; jos rivi on vielä, `tools/uusi-worktree.sh --poista karttaseppa-overpass-pois`.

## Opéra, Panthéon, Montparnasse: arkit KK:lla, odottaa omistajan sanaa
Kansio `_tyo/karttaseppa/sarja24-opera-pantheon-montparnasse/<kohde>/`: `arkki-omistajalle.jpg`, `kartalla.png`, `pohja-siisti.png`. Skripti `tee-arkit.py`. Kaikki kuvat katsottu täysikoossa, ilmansuunnat tarkistettu oikeaa kuvaa ja karttaa vasten: kaikki kolme oikein. Kuvat `_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/<kohde>/`.
Maapohja: Codex keksi kaikille puiston, joten käytä **pohja-siisti.png:ää omalla alfallaan**, älä maskia eikä Codexin pohjaa.
Kysymys KK:lle: "tilaanko Opérasta ja Panthéonista Tripo-mallit ja Montparnassesta oton 2 Codexilta?" Suositukseni ja mitä sen jälkeen tehdään:

**Opéra: kelpaa.** Tripo-syöte tehdään 24g:n mallilla (`riemukaari/tee-syote.py`), tilaus omalla numerolla:
- Mittakaava leveyksistä, ei päälistasta (S/N 101 m, E/W 149 m), koska px/m vaihtelee 9,1–11,4.
- Itäpaikalle `lansi.png` peilattuna: `ita.png`:ssä on väärä päätykolmio. Varmista Tripolta, että peilikuva kelpaa.
- `etela.png`:n sivukupolien tornit kelluvat noin 190 px maan yläpuolella: jatka ne maahan syötteessä kiviseinällä, lähde esim. `pohjoinen.png`:n tornin alaosa (x 218–330, y 812–922) tai `ita.png`:n rumpu. Katso tulos täysikoossa ennen tilausta. **Ei vielä kokeiltu.** Jos ei näytä hyvältä, yksi korjauskuva Codexilta.
- Kerrottu KK:lle: etelän kupoli ja näyttämötorni 15–20 % liian korkealla, sivukupolit hieman liian pohjoisessa. Suuntataulukko alla.

**Panthéon: kelpaa.** Skaalaa `lansi.png` samaan kuin muut (päälista 348 → 296 px, kerroin 0,851, maaviiva 996 → 944); tämän jälkeen E/W 982/971 px ja S/N 1246/1249, suhde lähellä oikeaa 112/85. **Itäpää on suora:** kartan oikea jalanjälki (tarkistus.jpg) on suora kulmapaloin, Codexin viistot ja yläkuva pyöristävät sen väärin. Kirjoita tilaukseen, että viistoja ei käytetä itäpään muotoon. Kartan muoto on myös peruste, jos Tripo tekee pyöreän.

**Montparnasse: suositus otto 2.** Massa, kattokansi, jalanjälki ja suunta kelpaavat. Korjattava: leveät vaaleat rivat ja vaakanauhat pois, tilalle tumma lasi ja ohuet pystylinjat kuten `oikea.jpg`:ssä; pitkät sivut kuperiksi; suhde 62 × 39 × 210 m (nyt 10–20 % liian leveä). Pohja-siisti käy ottoon 2 sellaisena.

**Suuntien nimet tilauksessa:** Montparnassen "etela" ja "pohjoinen" ovat leveät sivut (kaakko ja luode, Suunta 129,4 on leveän sivun normaali), "ita" ja "lansi" kapeat. Suunta = koko_m[0]:n normaalin atsimuutti (Opéra 74,1 → pitkä akseli 164°). Tripon Left = lansi, Right = ita Sainte-Chapellen kokeen mukaan, tarkistus raakamallista (-1834).

## Tripo
Vastaus af99a5029: Grand Palais 24f käynnissä, Riemukaari 24g jonossa sen jälkeen, generointia ei vielä. Malleista: -1834 ja -1817. Kun 24g tulee, **kuva pelistä KK:lle on luvattu omistajalle.**

## Tuileries'n leike: tehty, NUI:lla
3505c7556 (push tarkistettu), 186 × 204 (oli 268 × 400): keskipaviljonki ja lyhyet siivet. Skripti ja vertailu `_tyo/karttaseppa/tuileries-leike/`. Pelissä ajamatta; NUI katsoo seuraavassa ajossaan, häiritseekö siipien suora katkaisu. Jos häiritsee: kokeile leikettä siten, että eteläpään paviljonki tuodaan siiven akselia pitkin lähemmäs (akseli (0,62; 1), rakennuksen rinnakkaisprojektiossa sauma täsmää), mutta silloin kuva pysyy lähes yhtä vinona.

## Odotetaan Codexilta ja muu auki
Sacré-Cœur ja Invalidien otto 2. Kierto kuten -1817. Pieni iPad JU:lla. ND:n tornit: ei tehdä. Eiffelin kyltin napautus testaamatta, ND:n ja Louvren pohjat eivät häivy usvaan, Vrain-Lucasin ja Louvren kyltit 3D:n jälkeen.

## Opit
- Älä hyväksy Codexin rakennuksen muotoa pelkästään viistoista: kartan oma jalanjälki kertoi, että Panthéonin pyöreä itäpää on keksitty, vaikka kuva näytti uskottavalta.
- Rajauslaatikon täsmäys ei todista suuntaa, koska kierretty suorakaide antaa saman laatikon peilattuna; tarkista pääakseli (`paa_akseli` tee-arkit.py:ssä).
- Kartan oma vaalea väri: suurin tasainen ruutu voi olla rakennus. Tarkista kartalla-kuvasta, ei väriarvosta (Opéra meni ensin ruskeaksi, sitten liian oranssiksi).
