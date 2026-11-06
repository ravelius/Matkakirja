# Valosepän luovutus 6.11.2026 klo 11.23

Korvaa luovutuksen -1105 kohdat USVA ja SEURAAVAKSI 1. Sen PALETIN REITTI, RAYSTAS5 ja MUUTA pätevät, samoin -1048:n SILLAT ja PT:n sanatarkka usvakäsky. Syy: konteksti 25 %, pehmeä raja (Raamattu 7.37).
Luin lukulistan 7.47: periaatteet, 7.4, 7.23–7.25, 9.1–9.3, 9.5 ja 12.9 (pisimmät katkaistuina). Luvusta 6 vain kohtien alut, luvusta 2 vain linssirivien alut, luvusta 12 vain 12.9, 12.10 ja 12.13. Lue loput itse.

## USVA: KOODI VALMIS, AJAMATTA
`linssiseppa2/usva` 61a6f5321 (natiivi-backup), 5f44adef2:n päällä. Ei junaan. Unityssä kääntämättä, kuvia ei ole. Kartta-testit 668/668 (`sh Kartta-testit/kaanna.sh`; tiedostolla ei ole suoritusoikeutta). Worktree `wt/proto-linssiseppa2-k30` on nyt tällä haaralla, ei `ohjelmakohteet`-haaralla.
Sha ja `_tyo/linssiseppa2/ohjelmakohteet/sk-usva.txt` (6 kuvaa) KS:llä, viesti perillä 11.2x. PT:n viesti jonossa, perillemenoa en tarkistanut. Yhdistyminen ajo-yhteinen-8b:hen kokeiltu `git merge-tree`llä: ei ristiriitaa.

Muutos:
- NotreDameKirkko, OhjelmaKohde ja puut (sama varjostin): `_Usva` pois. Pikseleittäinen syvyysusva samalla kaavalla kuin TaloKerros, viimeinen neljännes pisteytettynä.
- NotreDamePohja: ruudun usva pois, syvyysusva, viimeinen neljännes alfassa.
- Mallien oma alku pois (`PariisiKallistus.Sumu`, `RuutuKohdeAlkuM`, `KohdePeitto`, `KohdeUsvaPeitto`). Tämä kumoaa 5.11. 21.28:n.
- Loivennus: `LahinAlku` 0,85 → 0,6, `PehmeaLiuku` 2,25 → 2,75. Loppu ei muutu laskennassa (testi kattaa liu'un; `LahinAlku` ei koske loppua). Luvut ovat minun valintani laskelmasta, eivät kuvasta.
- `JalanUsva` siirtyi PalloKiertoon. Arvoa käyttävät enää kyltti ja maavarjo. OhjelmaKohteet käyttää nyt samaa kaavaa: pitkän kohteen maavarjo ei enää katoa, kun ankkuri on ruudun ulkopuolella (päätelty koodista).
- Ruudun usva (nimet, viivat, liput, Symbolimalli) ennallaan omilla vakioillaan `RuutuPehmeaLiuku`, `RuutuLahinAlku`. Syy: kokeessa ruudun usva peitti katsepisteen 0,62:lla, kun syvyysusva on siinä 0,35 (laskettu, 85°, d 6,6 km).

Tarkista kuvista, nämä ovat auki:
1. Taivas ja usvan väri: PT:n käskyn kohta. Vain koodista luettu, ei mitattu: kameran tausta on sama UsvaVari kuin sumun väri, kun Usva on täysi, ja taivaan kaari voi erota. Mittaa `us-eiffel-85` ja `us-kauko-85` pikseleinä, eli usva tornin kohdalla vastaan taivas.
2. Leijuminen: tornin yläosa on lähempänä katseen suunnassa kuin jalka (Eiffel 20°:ssa noin 110 m, laskettu), joten huippu häipyy vähän jalan jälkeen. En tiedä, näkyykö se.
3. Katsottu kohde on usvassa: 85°:ssa 25–32 % (ennen malli 0 %, kartta 11–15 %, laskettu 0,6:lla). 45°:ssa en laskenut lukua 2,75:llä: 2,25:llä 3 %, 3,5:llä 27 %. Aja `scratchpad`-laskelma uudelleen tai mittaa kuvasta. Jos vaalenema on liikaa, säädä vakioita ja kerro KK:lle pareissa.
4. Maavarjot: Mallien ja ohjelmakohteiden varjo katoaa kynnyksellä `VarjoUsvaRaja` 0,6 eikä häivy pikseleittäin. Puun varjo on eri materiaalilla (`SarjaVarjoMateriaali`), sen usvaa en katsonut. Voi näkyä ponnahduksena.
5. Puiden erikoismallit ja Symbolimalli jäivät ruudun usvaan: ne eivät ole käskyn listalla. Erottuuko Pariisissa, katso kuvasta.
6. Metal-varianttitarkistus (9.1) ajamatta.
7. Jos varjostin ei käänny, ensimmäinen epäilty on `MixFogColor` tai Fog.hlsl-include, ne on kopioitu TaloKerroksesta.

Parit nykyinen | uusi KK:lle, täysikoossa katsottuina. Nykyinen tarvitsee saman listan ajon ilman 61a6f5321:tä: pyysin KS:ltä, vastausta ei vielä ole. Puiden pienennystä ei tehdä (PT: odottaa koetta).

## SEURAAVAKSI
1. Kuvat5 loppuun (-1105:n RAYSTAS5), sitten sha 35f849838, polku ja AUKI-kohdat PT:lle ja LAV:lle. Odottaa jo, ei vaadi ajoa.
2. KS:n vastaus nykyisen ajosta. Usvakuvat, kun KS ilmoittaa, sitten parit KK:lle.
3. Siltakuvat ja palettikuvat, kun KS ilmoittaa (KS: ajo 8 ajetaan kärjellä 1347410ca, abd7d1dd8 seuraavaan).
4. Pompidoun muodot KK:n järjestyksellä.

## MUUTA
Skriptit `usva-luvut.py` (laskelma) ja muokkausskriptit olivat scratchpadissa, eivät jää; laskelma on helppo tehdä uudelleen `Horisonttiusva.Sumu`:n ja `KartanSumu`:n kaavoista.
zsh: `=====` komennossa ja `--include=*.cs` ilman lainausmerkkejä kaatavat komennon. `$Y:polku` kuten ennen: `"${Y}:polku"`.
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
