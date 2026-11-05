# Karttaseppä: luovutus 5.11.2026 klo 20.24 (KS)
Syy: konteksti yli 35 % (7.37). **Tämä voittaa ristiriidassa; aiempi -1927 (18c486dee) kertoo taustan.** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki fd711e501. Python /opt/homebrew/opt/python@3.14/bin/python3.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.
2. Tarkista viestit ja posti. Seuraavaksi tulevat Tripolta Opéra 24j, Invalidit 24l, Montparnasse 24m ja Sacré-Cœur 24n.
3. **Esikatselu:** `PROTO_LINJA=<JU:n linja> ESIKATSELU_PISTEKERROIN=0.465 /bin/zsh <W>/tyokalut/esikatselu.sh <sha> <skenaario> ipad --batch`. `/bin/zsh` on pakollinen, koska skriptiltä puuttuu suoritusoikeus: ilman sitä ajo kaatuu ja poistuu silti koodilla 0. Vuoro aina JU:lta, lopuksi "LUKKO VAPAA" + kesto + kuvamäärä. Tarkista lokista pistekerroin.
4. **Kuvat (omistaja 20.09):** kartan kuvissa ylhäältä otetun lisäksi noin 45° samasta kohteesta. Yli 20°:ssa Macin tarkkuustaso ei vastaa iPadia, mainitse se.

## UUSI TYÖ, ALOITA TÄSTÄ: Pariisin horisontti kauemmas (PT 5.11., omistaja 20.25, en ehtinyt aloittaa)
Kortissa: "Matalassa kulmassa noin kaksi kertaa kauemmas, ja saat uuden kuvan." Omistajan kuva `docs/raportit/kaappaukset/omistaja-20261105/horisontti-aikaisin-2023.png`. Kirjaus 2.215, PR 6311.
Tavoite (KK): matalalta kaupunki jatkuu katsotun rakennuksen takana, mutta koko Pariisi ei näy kerralla (14.55 pysyy). KK:n mukaan kartta häviää zoomin mukaan 0,6 · d katsepisteen takana ja Pariisin katto on 2,5 km (`PariisiKallistus`, `Horisonttiusva`), joten molemmat vaikuttavat matalassa kulmassa: varmista koodista. 19.30:n sääntö pysyy: 3D-kohde ja pohja häipyvät kartan mukana. Kartan usvakoodin muutos: sovi NS:n kanssa (local_c7344e20-fba8-433d-ba8e-184a325037ef).
Kuvat, kerroin 0,465, yksi ajo JU:n vuorolla: sama piste kuin `usva-matala-270` (kallista 75, suunta 270, `aja 48.86616 2.31223 0.0126 2`), sama piste 45°:ssa ja kuva, jossa Eiffel on uuden rajan tuntumassa. Täysikoossa katsottuna pari KK:lle ja rivi PT:lle. Panthéonin pohja-ajo meni jo erikseen, joten tämä on oma ajonsa (kerrottu PT:lle). JU:n nollaus odottaa ajojen loppua: pyydä vuoro heti, kun koodi on valmis.

## ENSIMMÄISET TYÖT (vahti on merkinnyt tämän postin käsitellyksi, joten se ei ilmoita siitä uudelleen)
1. **Opéra 24j, Tripo odottaa päätöstä (posti a8f7c919c, liite `posti/tripo3d-opera24j-kaksi-ottoa-20261105/`).** Kaksi ottoa, molemmat alle tilausluvun: otto 1 pituus 222 m, W/L 0,593 (−12,6 %), H/L 0,385 (−12,5 %), otto 2 W/L 0,601, H/L 0,380 ja kultalyhdyssä reikä, 3 mustaa pikseliä. Tripo pitää ottoa 1 parempana. Kuvia en katsonut. Tee: katso täysikoossa oikeaa rakennusta vasten, ja **tarkista, mistä tilausluvut tulivat, ennen kuin päätät** (opit -1927:ssä; muistinvarainen lukuni oikeasta on W/L noin 0,72 ja H/L noin 0,32: varmista lähteestä). Vastaa Tripolle postilaatikkoon: raaka kelpaa poikkeamin vai tarkennus. Kolmatta ottoa ei tule ilman päätöstäsi.
2. **Kuittaa Tripolle Riemukaari ja Panthéon (posti 15e045334):** raakamallit hyväksytty ja asennettu. Tripo odottaa arviota.
3. Invalidit 24l on Tripolla käynnissä: etelän pihajako näyttää syötteessä 3/4, mutta sitova yläkuva on 4/6. Tripo raportoi ristiriidan.

## Tehty
- **Usva valmis 56dfe057f.** Ajo `lokit/esikatselu-20261105-201500`. Eiffel poissa, Grand Palais selkeä myös matalalla. Malli häipyy nyt `Horisonttiusva.KylttiNakyvyys`-käyrällä. Pari PT:llä, kuvat KK:lla. Kartan usvakoodi ennallaan. Louvre 90°:n matalakuvaa (`usva-matala-90`) en katsonut täysikoossa: katso se seuraavalla katselulla.
- **Riemukaari 24g, Panthéon 24i kartalla** (asennus `_tyo/karttaseppa/sarja24-asennus/asenna.py`, pohjat `korjaa-pohjat.py`). Sävy Louvren `Savy` 1,26/1,33/1,15, koska atlas on kirkas. Kuvat KK:lla.
- **Sacré-Cœur:** omistaja 20.13 "Kelpaa". Tilattu Tripolta 886baba49, ohje `TILAUS-24n-sacre-coeur-tripo.md`, syöte `sacre-coeur/tripo-syote/`. Front etelä, Back pohjoinen, Left itä, Right länsi. Asennus: **Suunta noin -4,3** (akselin atsimuutti 175,7 = 180 + Suunta), mäki 420 × 200 m on osa mallia, Qid tarkistettava. Kuva pelistä KK:lle. Maapohjaa ei ole tehty: mäen reuna kartalla kokeilematta.
- **Grand Palais'n kyltti** näkyy ajossa `esikatselu-20261105-200135/gp-kyltti.png`.
- **Eurooppa:** `kyltit-eurooppa-taysi.png` ilman mustaa pohjaa pakotetulla täydellä kerroksella. PT tietää.
- **ND:n maa lennossa:** LAV:n mallin maa (v6k29, maa_v9f), ei sävytys eikä VS:n pohja (`nd-pallopohja-selvitys-20261105.md`). KK siirsi sen LAV:n jonoon. Pohja-alue on omistajan hyväksymä, joten sitä ei muuteta ilman paria.

## Lisäys: PT:n pyyntö, tehty ja ajettu
- **Kärki fd711e501.** Panthéonin ja Riemukaaren pohjat rajattu mallin jalanjälkeen (`sarja24-asennus/rajaa-pohja.py`). Ajo `lokit/esikatselu-20261105-202248`, kooste `kooste-pohjat.png`. Suorakulmio ja laikku poissa, kuvat KK:lla, rivi PT:llä, lukko vapaa JU:lle. Ei vientiä.
- **Uudet mallit:** aja ensin `korjaa-pohjat.py` ja sitten `rajaa-pohja.py` (lisää id ja Suunta kummankin listaan). Grand Palais ja muut laajemmat pohjat eivät kuulu tähän.
- Usvapari KK:lla. Omistajalle ei ole muuta avointa pohjista.

## Odotetaan
- **Tripo:** Opéran asennus päätöksen jälkeen (Suunta noin -16, `opera/pohja-siisti.png`), Invalidit (pohja `invalides-asennus/pohja-siisti.png`, kupoli px 706,802, Suunta noin 4,1, korjaa `alue.json` ja jalanjälki), Montparnasse (Suunta noin -51, `montparnasse/pohja-siisti.png`, tarkista katto). Pohjat omalla alfallaan. Mene `korjaa-pohjat.py`:n kautta (lisää id), jotta irtolaikut lähtevät ja kiveys vastaa katua.
- Aiemmat avoimet -1927:stä: Tuileries'n leike NUI:lla, Eiffelin kyltin napautus, ND:n, Louvren ja Eiffelin pohjien usva tarkistettu tässä vain Eiffelin ja Louvren osalta 45°:ssa, Vrain-Lucasin ja Louvren kyltit 3D:n jälkeen. Hook toistaa työlistan rivejä, joita en tiedä omikseni: PT kuittaa.

## Opit
- Lue, mitä kohdetta kuvat näyttävät: pallolennon ND on eri malli kuin kartan ND. Pelikuva ei vastannut `pohja.png`:tä, ja se paljasti asian.
- Usvan peitto suoraan malliin haalisti sen kartan edellä. Syvyyspeitto näyttää suurta arvoa, vaikka kartalla ei ole sillä rivillä usvaa.
- Sarjan kirkkaat atlakset (mediaani yli 170) palavat oletussävyllä: vertaa `atlas`-mediaania ennen ajoa.
- Tarkista ajon loki: exit 0 ei kerro, että ajo edes alkoi.
