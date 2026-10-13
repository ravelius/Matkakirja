# Pelikoodarin luovutus 13.10.2026 klo 21.30 (tilinvaihto)

## Tila lyhyesti
Pääkaupunkien e04–e14 kytkentä on valmisteltu (#4565 mergetty), mutta SK:n uusintapistokoe 21.xx: kaikki erät
KORJATTAVA (VIRHE 2 / KORJAA 99 / HUOM 122), e06 EI KYTKETTÄVISSÄ. **ÄLÄ KYTKE** ennen PT:n päätöstä Codexin
löydöslistasta ja SK:n erä-kuittausta. Raportti docs/raportit/paakaupunkitekstit-uusintapistokoe-20261013.md (3d8e5b807),
tulokset proto-3d/_tyo/sisaltokirjuri/teksti-uusinta-20261013/tulos-eNN.json.

## Tehty tässä sessiossa
- **#4565 (MERGED)**: kytke-pilvisisalto.mjs kohdekarttasäännöt (PIIRRÄ = KS:n <erä>/kohdekartat-mac.json:n rajat;
  vanha kartta saa Codexin kohteet + esittelyn vain, jos ne mahtuvat; muuten vanha rivi jää; ei karttaa, jos < 3 kohdetta;
  korvattava vanha rivi poistetaan), tools/paakaupungit/yhdista-kuvat.py (v2-kuvat, tyhjät kuvapaikat pois, "yleiskuvitus"
  3 tekstistä pois), testit (nostokuvaosoitteen alikansio, kohdekartta vain ≥ 3 kohteella). Kuiva-ajo 11 erää + #4560:
  5524/5524, 861/861 kuvaa 200 ämpärissä (HEAD vaatii User-Agentin, Pythonin oletus saa 403).
- **Juna 188, proto**: pelikoodari/raketti-kehittaja-188 **357069b3d** (masterin 6b14ba649 päällä, worktree
  wt/proto-pelikoodari-raketti): kehittäjätilassa (Linssirekisteri.Kehittajatila) ISS-raketti mistä tahansa ja ilmaiseksi,
  ei laskuria; pelaajalla ennallaan. Peli-testit 584/584, unity-tarkistus 0. PT:lle kuitattu; simussa ei ajettu.
- **Kööpenhaminan ääninäyte** (LS2 ajoi): proto-3d/lokit/todistus-kph5-20261013-1914/aani/ (5 paikkaa, kertoja pois),
  viety PT:lle. Löydös: venelähteitä soi 45–50 → LS2 korjasi (linssiseppa2/veneaanet-raja 6ba38960a, junaan 188).

## Avoin jono
1. **Pääkaupunkien kytkentä** (odottaa PT + SK): kun SK kuittaa erän, aja
   `proto-3d/_tyo/pelikoodari/pk-kytkenta/kytke-era.zsh eNN` (luo haaran pelikoodari-pk-kytkenta-eNN worktreessa
   wt/pelikoodari-pk-kytkenta origin/mainista, hakee Codex-haaran erän + KS:n kohdekartat-mac.json:n, yhdistää kuvat,
   kytkee, ajaa testit; data kansioon pk-kytkenta/era-eNN). Codexin korjausten jälkeen kuvien targetTokens-polut
   voivat muuttua: tarkista "ohitettu 0" ja testit. Yksi web-PR per erä, rivi PT:lle.
   Huom: 15 vanhaa Afrikan karttaa pitää vanhat kohteensa (Codexin kohteet eivät mahdu / niitä ei ole), joten niiden
   Codex-nähtävyysjutut eivät osu karttakohteisiin; 44 pientä pääkaupunkia ilman kohdekarttaa (lehti toimii).
2. **#4560 MERGED** (KS:n kohdekartat): näkyvyystarkistus webissä ja natiivipaketissa TEKEMÄTTÄ (yksi rivi PT:lle).
   Kartat tulevat peliin vasta kytkentä-PR:issä (maakartat.js-rivit), joten tarkistus kannattaa tehdä ensimmäisen
   kytketyn erän jälkeen.

## Worktreet
Web: wt/pelikoodari-pk-kytkenta (haara pelikoodari-pk-kytkenta-valmistelu, mergetty; .pk-rajat.json jäänne).
Proto: wt/proto-pelikoodari-raketti (juna 188), vanhat {shakki,shakki186,aarre,koopenhamina,kph-aanet,nappula} mergetty.
