# Karttaseppä: luovutus 4.11.2026 klo 17.19 (KS)
Vanha, ei tarvitse lukea: docs/raportit/viesti-karttaseppa-luovutus-20261104-0035.md haarassa karttaseppa/luovutus-20261104-0035 (104486271; 678 riviä, hae vain tarvittaessa). Pidä seuraava luovutus enintään 60 rivissä (PT 16.5x).
Syy: konteksti 31 % (7.37). Python: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä (numpy). A = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104.

## Valtuus
KK 17.1x, omistaja 17.13: "Saat hyväksyä puolestani kaikki"; KK hyväksyy, ja kuvat näytetään omistajalle jälkikäteen.

## 1. Notre-Dame, kierros iPad-tuloksen jälkeen (KK 17.1x)
**Haara karttaseppa/nd-ipad-219b 22ac31363** (natiivi-backup pushaamatta, proto-3d:llä ei ole originia; worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219). Koe, ei junaan, ei lippua 99eb9931e. Kääntämättä ja ajamatta.
- Tulos ja viat: A/nd-ipad-602eee8d1/TULOS.md. Kuvat lokit/julkaisija-nd-ipad-602eee8d1, muisti 3237 Mt.
- **Kohta 1 tehty:** KeskiMip 3,6 → 1,5 (e2e19a06b; sama muutos myös karttaseppa/nd-kirkko-219, worktree wt/proto-karttaseppa-nd-219). Katso y-0036 ja y-013.
- **Kohta 2 tehty:** VS:n reitti 50315d774 poimittu, lisäksi 11 pistettä uoman keskelle (A/nd-ipad-602eee8d1/reitti-pohjalle.py, reitti-pohjalla.jpg; 32 pistettä pohjalla, 0 maalla). Pohjoishaara pysyy. Pieni mutka noin 695,402. Jos VS muuttaa reittiä, aja skripti uudelleen.
- **TEKEMÄTTÄ, jos pieniä:** kohta 4 joen liitosten tumma läiskä ja liukuma (A/nd19c-k55/reuna-maski-2.py, VESI_SIGMA, kooste A/nd19d/) ja kohta 5 nimi "Hôtel-Dieu de Paris" katkeaa kirkkoon (nimet 2995 < kirkko 3080; OsuuNahtavyyteen / NahtavyysRuudut). Jos eivät ole pieniä, kerro KK:lle ja jätä pois.
- **Kohta 3 väri on VS:llä. Kohta 6 (viiri ruudun reunassa k-0012:ssa) jää listalle.**
- **Sitten:** vuoro JU:lta, sama skenaario _tyo/karttaseppa/sk-nd-ipad.txt. Uudet kuvat samoista kameroista täysikoossa, rivi PT:lle ja KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a). Omistajalle KK vie yhdessä VS:n valon kanssa.
- Suorista-nappi on todistamatta, koska kuvissa ei ole käyttöliittymää: kerro, ei estä.

## 2. Puut (omistaja 16.13, suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-nd-valo-ja-puut.md, C ja D)
- **nd20a hyväksytty** (KK 17.1x), kuitattu Codexille.
- **nd20b tilattu 4f29e9faa:** _tyo/codex/pariisi-nd-puut-20261104/TILAUS-20b-tripo.md, toimitus puut-3d-v1/. Noin 1 000 kolmiota, rungot hillitymmiksi, iso runko 0,7 ×. Kaksi epäonnistunutta ottoa → KK ennen kolmatta.
- **Kun malli tulee:** node tools/codex-3d-tarkistus.mjs, mittaa kolmiot ja korkeudet itse, vertaa _review-puut-20a/kooste.png:hen, kuvat KK:lle. Kerro samalla nd20a:n kohdat: sivukuvien ero, kapean puun kierre, kukkalaikut.
- **Sen jälkeen D, sijoitus (KS):** 12–20 puuta, vain viheralueelle tai kirkon sivuille ja taakse; ei veteen, kadulle eikä aukiolle julkisivun eteen; noin 1/7 kirkon korkeudesta; sama valo, pehmeä varjo ja näkyvyyskaari; instanssit. KK:lle kirkko ilman puita | puiden kanssa, samat kamerat. Tarkista pohjan piirretyt puut päällekkäin.
- Kirjasto: _kirjasto/kartta-osat/ (hakemisto.json).

## 3. Muu odottaa (ei toimia ennen sanaa)
- Tasankopoltto seis (PT): 115/507 osaa, levy; tilantarve mitattava ensin, ei du:ta koko syvä-kansiosta. Jatko vain PT:n sanalla: zsh _tyo/karttaseppa/tasangot-poltto-20261103/jatka.sh.
- Nimet vain kokonaan ruudulla: 79186922b ja ed711573d (Pariisi-linja), kokeita, kääntämättä; kuvat seuraavan ajon mukana. Katso s-090: "Pariisin katakombit", "adeleine"; kulu vierityksessä.
- Kipinät 052e192f9 kunnossa Macilla, iPadilta mittaamatta.
- Karsi b920a2998 yhdistelmässä; Vincennes, Boulogne, minor-nimet 205c0e443 ja puut 43ba52fe7 odottavat pelikuvia. Arkit ja korttelipinnat seis. Ei muita nähtävyyksiä ennen omistajan korttia.

## Käytännöt
- **Vahti:** Monitor, git fetch origin claude/postilaatikko 60 s välein (/Users/Shared/Claude/wt/karttaseppa-postilaatikko, irrotettu HEAD), käsitelty 4f29e9faa asti. Vahdi myös _tyo/codex/pariisi-nd-puut-20261104/puut-3d-v1/SHA256SUMS. Kuolee nollauksessa.
- Mac-ajot: /Users/Shared/Claude/julkaisija-tyokalut/esikatselu-rungolla.zsh, vuoro JU:lta. iPad vain JU:n ajona.
- OpenFreeMap-haut kielletty.

## Opit
- Reitin testi: pohjan vesi on 169/170/147, joten vertaa väriä, ei sinistä kynnystä.
- Mip kannattaa mitata isolla iPadilla: Macilla hyvältä näyttänyt pehmennys oli laitteella pääasiallinen vika.
- iPad-kuvissa ei ole käyttöliittymää, joten nappien todistus vaatii oman kuvan.
