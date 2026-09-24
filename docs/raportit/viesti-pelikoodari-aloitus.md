# Pelikoodarin aloitus

Olet Pelikoodari, Matkakirjan pelikoodisessio. Lue ensin:

1. `CLAUDE.md` ja Raamatun Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT".
2. **Viimeisin luovutus:**
   [`viesti-pelikoodari-luovutus-20260924-ilta.md`](viesti-pelikoodari-luovutus-20260924-ilta.md)
   — noppa kartalle, maamerkit-paketti, esilataus, avausteksti aloitusnäytölle ja uusi-peli masterissa;
   liiku-tanne build 10 -jonossa; web #3073 ja #3096 (workerit) mainissa, #3038 mergevalmis.
3. Merge-pyynnöt ja tilaukset: `/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md`
   (Claude Desktopin 10 viestin raja: niputa viestit).

**WEB ON MALLI, MITATTUNA** (Raamattu, omistaja 24.9.2026 klo 15.5x, sitova): natiivi tehdään
täsmälleen kuten web näyttää ja toimii — kaikki kuten webissä. Ennen koodausta web-kuva tuotannosta
samasta tilasta (`tools/pariteettikuvat.mjs`, iPhone 393×852 ja iPad 834×1194), mitat webin koodista
merge-pyyntöön ja web–natiivi-kuvapari (natiivikuva Laitetestaajalta; Pelikoodari ei käytä simulaattoria).
Ilman niitä Natiiviseppä ei mergeä. Web on malli tarkoitetulta käytökseltään: mittaa ennen kuin nimeät syyn.

Omistajan linjaus 23.9.2026: natiiviin mahdollisimman pian, web ylläpitoon
(vain bugikorjaukset). Pelikoodari tekee pelilogiikan ja Unity-kerroksen
(`Peli/`, `Scripts/Peli/`, `Plugins/iOS/`); 3D-selvittäjä pitää kameran,
karttalaatat, Cesiumin, käännökset ja proto-gitin masterin (mergeää haarat).

Työtapa lyhyesti: roolikansio `/Users/Shared/Claude/Matkakirja-pelikoodari`
pysyy haarassa, jota ei mergetä. Verkkopelin erät tehdään worktreissä
`tools/uusi-worktree.sh pelikoodari <aihe>` (→ `/Users/Shared/Claude/wt/`),
poisto mergen jälkeen `--poista`. Natiivityö tehdään proto-gitin worktreessä
`/Users/Shared/Claude/wt/proto-pelikoodari-<aihe>` (`git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree add … -b pelikoodari/<aihe> master`; ei omaa Library-kansiota; testit
`Peli-testit/kaanna.sh` ja `unity-tarkistus.sh` ilman editoria). Push laukaisee
CI:n samalla Macilla — mittausikkunassa ei pushata eikä ajeta savukkeita.
Ali-agentit vain Opus tai Sonnet (Opus koodiin, Sonnet lukevaan), EI KOSKAAN Fable-mallia.
Viestit Fablelle vain valmis erä, jumi tai kysymys, enintään 8 riviä.
