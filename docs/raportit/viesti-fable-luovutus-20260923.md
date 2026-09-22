# Fablen luovutus 23.9.2026 klo 00.30 (Mac-käyttäjä koodaus, sessio 22.9. klo 20.13 → 23.9. klo 00.30)

Edellinen luovutus: viesti-fable-luovutus-20260922-ilta.md. Kaikki päätökset lokissa
docs/raamattu-loki/paatokset-2026-09.md (22.9. klo 20.14 → 23.9. klo 00.29). Raamattua ei muutettu.

## Tuotanto: v2140 (v2139 liikemittari p5 + v2140 koe ?koe=vientibudjetti mainissa klo 00.40)
Illan sarja v2124–v2138: profiiliketju, Piirtokoe-valikko (4 tilaa + automaattilataus), alpha0 aito,
profiili jakaa, eivienti laattoihin, tilarivi, mittari p4, Piirtokoe 7, valikon siivous (Vedon
seuranta ja Tarkkuus pois valikosta, liput ?koe=/?tarkkuus= toimivat), orvot globe.gl-tickerit pois,
kaksi palstaa kaikkiin nostoihin (#2868, kuva ensin isona → Lisää → kuva vasemmalle, teksti oikealle,
≥ 1100 px), lehtipalstat pidempiin nostoihin (#2871, ≥ 600 merkkiä / 2 kappaletta, teksti ≥ 600 px),
Codexin Pulun 70 elettä (v2138). Mac-Safari-Piirtokoe-raportti mainissa (#2852).

## SULAVUUS: MISSÄ OLLAAN (tärkein)
- Omistajan iPad-kierros (v2135/36): eivienti pudotti >20 ms 25 % → 8 %, MUTTA omistaja: "tökkii yhtä
  pahasti, vain isompi hyppäys kun liike pysähtyy. Vika on jossain muualla." → laattabudjetti oletukseksi
  PERUTTU (#2874 suljettu; tehdään tarvittaessa lipuksi ?koe=vientibudjetti). alpha0 ja Safarin 120 Hz
  -lippu eivät auttaneet. ?koe=syotetouch "ehkä parempi kuin muut" = ainoa myönteinen signaali.
- Johtopäätös: kehysaikamittari ei mittaa nähtyä nykimistä; suunta on syöteputki (interpolointi laskee
  kohta-ajan ja sormen näytteet eri kelloista; iOS toimittaa touchmoven kehysrytmissä).
- Pelikoodarin liikemittari #2875 (profiili p5: rivit liike ja syöte) → v2139. WebKit: interpvanha CV
  46–54 %, interp 17–23 %, syotekello 12–20 %, tahdistettu 14–16 %.
- AAMUN KIERROS omistajalle v2139:llä, kehysprofiili päällä, 10 s veto: 1) oletus, 2) ?koe=syotetouch,
  3) ?koe=syotekello, 4) ?koe=syotetouch,syotekello. Vertaa CV, nollat, tuplat, virheen sd. Jos
  syotetouch tasaisin → Pelikoodari tekee PR:n "touch oletukseksi kosketuslaitteilla".
- Sivulöydös: vanhalla vientitahdilla kirjaston pohja (~400 dc) piirtyy 52–82 %:ssa vetokehyksistä,
  koska häipyvät laatat eivät peitä (dc 431) → oma korjaus myöhemmin (peittävä laatta alle).
- Nettiselvitykset lokissa (Safarin GPU-prosessi; alpha/komposiittori; ProMotion; three r186 / globe.gl
  2.46.2 uusimmat, ei korjauksia; WebGPU ainoa uusi reitti; MapLibre ei ratkaissut iOS:ää).

## CI
WebKit-savukkeet kaatuvat launch-aikakatkaisuun 22.9. klo 19.44 alkaen (ympäristö, ei koodi); ajurin
restart ei auttanut. Muistio Laitetestaajan haarassa laitetestaaja-ci-webkit (docs/raportit/
ci-webkit-launch-20260922.md). AAMULLA: koneen reboot omistajan kanssa → webkit-2336 uudelleenasennus →
ajurin env-dump. Siihen asti merget omistajan säännöllä: vain launch-aikakatkaisut sallittuja punaisia.
savuke-kerma-heti V2 punainen myös mainilla (Ranska σ 0,7 vs Saksa 10) — tutkimatta.

## Sessiot
Pelikoodari ja Karttaseppä Opus 5.5 (omistaja vaihtoi 22.9. klo 20.55); Pelikoodari nollattu 21.45,
Laitetestaaja 20.33, Karttaseppä 00.05. RC päällä kaikilla (Fable kytkee, luokitin estää sessioita
itse). Julkaisija: head-tarkistus nappaa haaraan lisätyt commitit; ei mergejä yöllä ilman Fablen viestiä.

## Jono aamulle
1. Omistaja: syöteputken kierros (yllä). 2. Laitetestaaja: Pulun 70 eleen live-QA v2138 → posti/
fable-codex-pulun-eleet-qa-20260923.md; sitten CI-reboot-kierros. 3. Pelikoodari: kierroksen analyysi →
touch oletukseksi?; sitten Codexin kaksi lisäkohtausta (liviaEnsitapaaminen → uusi-ilahtuu,
liviaPitkaKirjahaku → uusi-bookPanic, ehdot posti/codex-fable-pulun-lisakohtaukset-20260923.md).
4. Karttaseppä: odottaa omistajan päätöksiä (kartta 22c, nostotason poltto harmaalla pisteellä, meren
lika). 5. Julkaisija: hae laitetestaaja-ci-webkit-muistio mainiin docs-PR:nä.
