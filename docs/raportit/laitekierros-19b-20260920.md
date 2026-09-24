# Laitekierros 19b — WebKit-Playwright, EI iPadOS-Safari

20.9.2026 n. klo 20.55–21.10. **Ei ajettu oikealla iPad-simulaattorilla:**
mikään käytettävissä oleva iPad (Air, Pro, mini, A16) ei avautunut —
laitesimulaattorityökalu vaatii omistajan kertaluontoisen hyväksynnän
("Let Claude use it"), johon ei päässyt käsiksi tästä sessiosta.
Fablen ohje: jatka WebKit-Playwrightilla nyt, toista oikealla
simulaattorilla myöhemmin kun lupa on annettu.

**Menetelmä:** paikallinen palvelin + `webkit`-selain (Playwright,
sama moottori kuin Safarissa mutta ei sama kuin iPadOS:n oma Safari),
viewport 820×1180 dpr 2 (iPad Air 11"). Pelitila rakennettiin suoraan
`Game`-luokasta (kuten `tools/savukkeet/*.mjs`), ei kosketuksin koko
matkaa Brysselistä — ks. rajoitteet alla.

## 1) Tuplasaapuminen (Berliini → Rooma)

**Ei toistunut.** Pelaaja aloitettiin Berliinissä (ei täyttä
Bryssel→Amsterdam→Berliini-reittiä, ks. rajoitteet), kaikki
`assets/audio/*.mp3`-pyynnöt viivästettiin keinotekoisesti 2,5 s
(hidas-verkko-korvike), ja heti sivun latauduttua — Berliinin
saapumisluenta oletettavasti yhä viiveessä tai kesken latauksen —
kutsuttiin `game.actionFly('rooma')` suoraan. 12 mittauspistettä
500 ms:n välein kuudessa sekunnissa: `ui.diaryVoice` pysyi koko ajan
samana (`puhe-fokus-matkakirja-berliini.mp3`, currentTime kasvoi
tasaisesti 0,29 s → 5,68 s), eikä toista ääntä ilmaantunut missään
pisteessä. Konsolissa ei virheitä.

**Rajoite, joka heikentää tulosta:** `actionFly` kutsuttiin suoraan
pelilogiikasta, ei kartan lento-animaation kautta, joten UI:n oma
`lueLennonRepliikki()`-polku (js/ui.js ~22004, "avauslennon repliikin
luenta") ei ehkä lauennut samalla tavalla kuin oikealla
kosketuspolulla. Tämä on siis NELJÄS ei-toistuminen (Opus 1: koodilla,
oikealla UI-polulla; nyt: koodilla + hidas verkko + WebKit) — vahva
viite, että vika on joko jo korjattu (viivepolun kovennukset,
15.45–16.30 samana iltana) tai vaatii juuri oikean iPadOS-Safarin
äänenkäytöksen, ei pelkkää WebKit-moottoria tai hidasta verkkoa
sellaisenaan.

## 2) Ihmisen matka -linssin kuvat

**Latautuvat oikein, myös hitaalla verkolla.** `ui.kaynnistaAikajana
('ihmisen-matka')` palautti `true`. Kaikki media.matkakirja.app-
kuvapyynnöt (yli 1000 palvelinta vasten, 1,2 s viive per pyyntö)
päättyivät statukseen 200; ainoat epäonnistumiset olivat karusellin
omia ennakkolatauksia, jotka selain itse peruutti ("cancelled") kun
seuraava kuva korvasi ne — normaalia esilatauskäytöstä, ei
verkkovikaa. Kaappaukset (`6`–`9`) näyttävät sarjan: musta
aloitusruutu → tähtikentän Maa-piste → ensimmäinen valokuva
(Jebel Irhoud -tyylinen leirikuva) kartan päällä ajassa "285 399 v.
sitten", aikajanapalkki ja kategoriavalikko toimivat.

**Ei löydetty puuttuvia tai rikkinäisiä kuvia tällä ajolla.**

## Kuvat

`docs/raportit/kaappaukset/kierros19b-20260920/`:
1–4 Berliini/Rooma-koe, 5 Ihmisen matka -alkuruutu, 6–9 linssin
eteneminen (0 s / 8 s / 16 s / 28 s).

## Jatko oikealla simulaattorilla (kun lupa saadaan)

- Aja sama kahden epäilyn koe uudestaan oikealla iPadOS-Safarilla
  (todellinen kosketuspolku Bryssel→Amsterdam→Berliini→lento, todellinen
  Network Link Conditioner).
- Jos kumpikaan ei toistu oikealla laitteellakaan, molemmat epäilyt
  voitaneen sulkea kierros 19b:n osalta.
