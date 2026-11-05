# Karttaseppä: luovutus 5.11.2026 klo 20.50 (KS)
Syy: konteksti 36 %, kova raja (7.37). **Tämä voittaa ristiriidassa; aiempi -2024 (d83113626) kertoo taustan.** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 994f4001e. Python: `/opt/homebrew/bin/python3` ilman -I (numpy). Postilaatikkoworktree /Users/Shared/Claude/wt/karttaseppa-postilaatikko.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.
2. Tarkista viestit ja posti. Vahti on merkinnyt 181deae6e:n käsitellyksi, joten lue kohta 3 alla käsin.
3. **Esikatselu:** `PROTO_LINJA=<JU:n linja> ESIKATSELU_PISTEKERROIN=0.465 /bin/zsh <W>/tyokalut/esikatselu.sh <sha> <skenaarion polku> ipad --batch`. Vuoro JU:lta, enintään noin 5 kuvaa tai yksi rivi perusteluksi. Lopuksi "LUKKO VAPAA" + kesto + kuvamäärä. Kuvat ylhäältä ja 45°.
4. **UUSI SÄÄNTÖ (PT 20.4x):** mallin hyväksyntä tai hylkäys ja uusi otto kysytään KK:lta ennen Tripolle kirjoittamista. Omat tekniset päätökset saa tehdä itse. Muisti `mallin-hyvaksynta-kk-lta-ennen-tripoa`.

## ENSIMMÄINEN TYÖ: horisontin kaksi avointa vikaa (ajo `lokit/esikatselu-20261105-204213`, 994f4001e)
Koodi `e3fa7298a`: `PariisiKallistus.Sumu`, matalassa kulmassa raja 2 × (`TakanaKerroin`), katto 5 km, täysi 75°:sta (`UsvaTaysiAst`). Testit 11/11. **Syy oli 0,6 · d, ei 2,5 km:n katto:** d 1,5 km:llä raja oli noin 900 m kohteen takana. PT ei kuitannut ennen kuvia. NS:ltä ei vielä vastausta. Pari, kuvat ja nämä viat ovat KK:lla (20.50); PT:lle vain rivi.
- **75° kunnossa:** kaupunki jatkuu Grand Palais'n takana. Kaukaa (`hor-kaukaa-270`, d 11 km) raja on keskustan takana. Keskustan kohdalla on terävä taloton vyö, joka on katsepisteen edessä, joten usva tai katto ei sitä tee. Todennäköisesti Macin 640×480-tarkkuustaso: tarkista iPadilla tai kerro KK:lle, ettei tarkistettu.
- **Vika 1: `hor-85-270`:stä puuttuu Grand Palais.** Kuvan keskellä pitäisi olla katsepiste 1,5 km:n päässä, ja usvan pitäisi jättää se näkyviin (laskin käsin: peitto 0). Etualan korttelit näyttävät isommilta kuin d 1,5 km:ltä, joten kamera voi olla lähempänä tai katsepiste muualla. Selvitä: silmän korkeus, `Nosto`, `KaytettyKallistus` (`Aurinko`-lokirivi tai txt). Oliko näin ennen e3fa7298a:ta? Vanhassa ajossa ei ole 85°-kuvaa, joten aja ohi muutoksen, jos koodista ei selviä.
- **Vika 2: Eiffel-malli puuttuu, vaikka sen pohja näkyy** (`hor-matala-270` vasemmalla Seinen vieressä, `hor-eiffel-raja` keskellä). Laskin mallin jalan syvyyspeitoksi 0,60 ja ruutupeitoksi noin 0,71, joten mallin pitäisi näkyä noin 70-prosenttisena. Eiffel ei leiju, mutta katoaa kartan ja pohjan edellä, vastoin 19.30:n sääntöä. `RuutuPiste`n raja 0,02 ei ole syy. Tarkista `Nahtavyysalue.PaivitaUsva`, `Malli.UsvaNyt` ja Eiffelin oma latauspolku tai varjostin (Eiffelissä on 84 396 kärkeä, ja se on eri tilassa kuin muut?). `RuutuPeitto` lasketaan mallin jalasta.
- **PT:n määräys:** näytä samasta pisteestä ennen ja jälkeen. Epäile ensin 5 km:n kattoa ja kyltin käyrää 56dfe057f:stä (`Horisonttiusva.KylttiNakyvyys`), mutta varmista.
- Tulos KK:lle täysikoossa, rivi PT:lle: PT haluaa kuulla, miltä 5 km näyttää (kortti sanoi "noin kaksi kertaa"; lähikuvassa se on 2 ×, kaukaa katto 2,5 → 5 km).
- Louvre `hor-matala-90`: poissa, kuten kuuluu. Punainen merkki näkyy horisontissa pienenä: katso, leijuuko.

## TOINEN TYÖ: alustat (omistaja 20.31, kirjaus 2.215)
Codexille tilattu 24p (posti 41559f34d, `_tyo/codex/pariisi-sarja-20261105/TILAUS-24p-alustat.md`). **Riemukaaren koko aukio ensin**, muut vasta kuittaukseni jälkeen. Vanha kohta B1 (tyhjä suorakulmio) oli virheeni. Grand Palais ja Eiffel eivät kuulu tilaukseen: **tarkista ne itse samalla säännöllä** (omistajan hyväksymä v7, kuva `Matkakirja-fable/scratchpad/keskustelukanava/kuvat/alueet-v7/arkki-v7.jpg`; alueet `<sarjakansio>/<id>/maski.png`). fd711e501:n rajaus oli pikakorjaus: asennettaessa uusi pohja menee `korjaa-pohjat.py`:n kautta, **ei `rajaa-pohja.py`:n**. Kuvat ylhäältä ja 45° KK:lle ennen kytkentää.
- **Riemukaaren katto:** omistajan kuvan vaalea suorakulmio on mallin tasainen katto (188 × 101 m, suhde sama), ei pohja. PT ja KK tietävät. Katto vaatii oman korjauksen mallin kuvaan; tilaa se, kun aukio on nähty pelissä. Tripolla ei ole nyt tehtävää.

## ODOTTAA
1. **Sacré-Cœur 24n: posti 181deae6e (`posti/tripo3d-karttaseppa-sacrecoeur24n-maki-puuttuu-20261105.md`), en ole lukenut.** Mäki puuttuu ensimmäisestä otosta. Tripo odottaa syöteohjetta. Arvio ja suositus KK:lle ennen Tripoa.
2. **Montparnasse 24m: KK 20.4x "Kyllä" uusi otto otto 2:sta, tilattu uudelleen (posti karttaseppa-tripo3d-montparnasse-uusi-otto-20261105.md).** Peruutus 9ad1fc29d on kumottu; se otto ei käynnistynyt. Front `viisto-lounas`, Back `viisto-koillinen`. Tulos KK:lle ennen asennusta. Ensimmäinen raakaotto b4b836e32: puusyinen pölkky, D/W 0,747.
3. **Invalidit 24l:** PT: ei peruta, Codexin 24o tulee ensin (posti 2bd4c4bd4). Kun 24o on valmis, **lähetä Tripolle erillinen viesti**, joka käynnistää toisen oton. Tulos KK:lle ennen asennusta. H/W 0,436 kelpaa (oikea noin 0,40 pelikoossa). Asennustiedot -2024:ssä.
4. **Opéra 24j:** otto 1 asennettu kokeeksi (994f4001e), hyväksyntä odottaa, kuvat KK:lla (oikaisu Tripolle fa77fdb41). Suhteet lähellä oikeaa: W/L 0,593 (oikea 154,9 × 101,2 m = 0,653), H/L 0,385 (56 m = 0,36). Muistinvarainen lukuni -2024:ssä oli väärä. Tilauksen 0,678 oli pelikoon 151/222 ja 0,44 kuvien korkeus. Pohja rajattu `rajaa-pohja.py`:llä, korvataan 24p:llä. `sarja24-asennus/{asenna,korjaa-pohjat,rajaa-pohja}.py`:n listoissa on nyt vain opera: lisää id, älä aja vanhoja uudelleen.
5. PT:n tieto: jos yhdistät `7a4b98e62`:n (karttaseppa/pariisi-vesinimet), jätä sen vesiosa pois; NUI:n b7e7a1de0 voittaa.
6. Aiemmat avoimet -2024:stä: Tuileries'n leike NUI:lla, Eiffelin kyltin napautus, Vrain-Lucasin ja Louvren kyltit 3D:n jälkeen. Hook toistaa työlistan rivejä, joita en tiedä omikseni: PT kuittaa.

## Opit
- Kuvat, joita kukaan ei pyytänyt (85°), paljastivat vian. Katso kaikki kuvat ennen kuin sanot hyväksi.
- Älä kirjoita Tripolle "hyväksytty", ellei KK tai omistaja ole nähnyt mallia.
- Tarkista tilausluvun alkuperä ja oikea mitta lähteestä: oma muistinvarainen arvioni olisi vienyt harhaan.
