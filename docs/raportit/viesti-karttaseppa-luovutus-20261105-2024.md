# Karttaseppä: luovutus 5.11.2026 klo 20.24 (KS)
Syy: konteksti yli 35 % (7.37). **Tämä voittaa ristiriidassa; aiempi -1927 (18c486dee) kertoo taustan.** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 56dfe057f. Python /opt/homebrew/opt/python@3.14/bin/python3.

## ENSIN
1. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.
2. Tarkista viestit ja posti. Seuraavaksi tulevat Tripolta Opéra 24j, Invalidit 24l, Montparnasse 24m ja Sacré-Cœur 24n.
3. **Esikatselu:** `PROTO_LINJA=<JU:n linja> ESIKATSELU_PISTEKERROIN=0.465 /bin/zsh <W>/tyokalut/esikatselu.sh <sha> <skenaario> ipad --batch`. `/bin/zsh` on pakollinen, koska skriptiltä puuttuu suoritusoikeus: ilman sitä ajo kaatuu ja poistuu silti koodilla 0. Vuoro aina JU:lta, lopuksi "LUKKO VAPAA" + kesto + kuvamäärä. Tarkista lokista pistekerroin.
4. **Kuvat (omistaja 20.09):** kartan kuvissa ylhäältä otetun lisäksi noin 45° samasta kohteesta. Yli 20°:ssa Macin tarkkuustaso ei vastaa iPadia, mainitse se.

## Tehty
- **Usva valmis 56dfe057f.** Ajo `lokit/esikatselu-20261105-201500`. Eiffel poissa, Grand Palais selkeä myös matalalla. Malli häipyy nyt `Horisonttiusva.KylttiNakyvyys`-käyrällä. Pari PT:llä, kuvat KK:lla. Kartan usvakoodi ennallaan. Louvre 90°:n matalakuvaa (`usva-matala-90`) en katsonut täysikoossa: katso se seuraavalla katselulla.
- **Riemukaari 24g, Panthéon 24i kartalla** (asennus `_tyo/karttaseppa/sarja24-asennus/asenna.py`, pohjat `korjaa-pohjat.py`). Sävy Louvren `Savy` 1,26/1,33/1,15, koska atlas on kirkas. Kuvat KK:lla.
- **Sacré-Cœur:** omistaja 20.13 "Kelpaa". Tilattu Tripolta 886baba49, ohje `TILAUS-24n-sacre-coeur-tripo.md`, syöte `sacre-coeur/tripo-syote/`. Front etelä, Back pohjoinen, Left itä, Right länsi. Asennus: **Suunta noin -4,3** (akselin atsimuutti 175,7 = 180 + Suunta), mäki 420 × 200 m on osa mallia, Qid tarkistettava. Kuva pelistä KK:lle. Maapohjaa ei ole tehty: mäen reuna kartalla kokeilematta.
- **Grand Palais'n kyltti** näkyy ajossa `esikatselu-20261105-200135/gp-kyltti.png`.
- **Eurooppa:** `kyltit-eurooppa-taysi.png` ilman mustaa pohjaa pakotetulla täydellä kerroksella. PT tietää.
- **ND:n maa lennossa:** LAV:n mallin maa (v6k29, maa_v9f), ei sävytys eikä VS:n pohja (`nd-pallopohja-selvitys-20261105.md`). KK siirsi sen LAV:n jonoon. Pohja-alue on omistajan hyväksymä, joten sitä ei muuteta ilman paria.

## Avoinna (KK:lle kerrottu, odottaa sanaa)
- **Panthéonin pohja näkyy suorakulmiona** ja peittää vieressä olevia kortteleita. Riemukaaren vasemmalla puolella on pieni vaalea laikku. Suositus KK:lle: yksi pohjakierros, ei uutta mallia. Tee, ellei omistaja halua toisin: käytä jalanjäljen lähelle rajattua alfaa (lähtöpohjat `riemukaari/pohja-siisti.png` ja `sarja24-opera-pantheon-montparnasse/pantheon/pohja-siisti.png`, sitten `korjaa-pohjat.py`).

## Odotetaan
- **Tripo:** Opéra (Suunta noin -16, `opera/pohja-siisti.png`, kupoli ja näyttämötorni 15–20 % korkealla), Invalidit (pohja `invalides-asennus/pohja-siisti.png`, kupoli px 706,802, Suunta noin 4,1, korjaa `alue.json` ja jalanjälki), Montparnasse (Suunta noin -51, `montparnasse/pohja-siisti.png`, tarkista katto). Pohjat omalla alfallaan. Mene `korjaa-pohjat.py`:n kautta (lisää id), jotta irtolaikut lähtevät ja kiveys vastaa katua.
- Aiemmat avoimet -1927:stä: Tuileries'n leike NUI:lla, Eiffelin kyltin napautus, ND:n, Louvren ja Eiffelin pohjien usva tarkistettu tässä vain Eiffelin ja Louvren osalta 45°:ssa, Vrain-Lucasin ja Louvren kyltit 3D:n jälkeen. Hook toistaa työlistan rivejä, joita en tiedä omikseni: PT kuittaa.

## Opit
- Lue, mitä kohdetta kuvat näyttävät: pallolennon ND on eri malli kuin kartan ND. Pelikuva ei vastannut `pohja.png`:tä, ja se paljasti asian.
- Usvan peitto suoraan malliin haalisti sen kartan edellä. Syvyyspeitto näyttää suurta arvoa, vaikka kartalla ei ole sillä rivillä usvaa.
- Sarjan kirkkaat atlakset (mediaani yli 170) palavat oletussävyllä: vertaa `atlas`-mediaania ennen ajoa.
- Tarkista ajon loki: exit 0 ei kerro, että ajo edes alkoi.
