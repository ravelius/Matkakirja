# Nähtävyyskuvien koneellinen tyylin tasaus — 27.9.2026

Omistajan päätös (Fablen välittämänä 27.9.2026, tyylitarkastuksen
[docs/raportit/nahtavyyskuvien-tyyli-20260927.md](nahtavyyskuvien-tyyli-20260927.md)
pohjalta): **koneellinen yhtenäistys + 7 Codexille**. Tämä raportti kuvaa
koneellisen osan tuloksen. **KUVIA EI OLE VIELÄ KORVATTU TUOTANNOSSA** —
korjatut kuvat ovat tarkastelua varten, ja tämä PR sisältää vain skriptit,
mittausdatan ja ennen/jälkeen-kontaktiarkit.

## 1. Menetelmä

`tools/nahtavyyskuvien-tasaus.py` (Pillow) siirtää jokaisen paikallisen
kuvan HSV-kylläisyyttä (S-kanava) kohti väriKORJATUN (-vari2) referenssin
tasoa (tavoite S-mediaani 0,332), kahdessa vaiheessa:

1. **Sukupolvikerroin** korjaa systemaattisen harhan: "vanha/muu mitta"
   -sukupolvi (n=363, oma mediaani 0,243) kerrotaan 1,3663:lla, "Codex-
   kohtaus (korjaamaton)" -sukupolvi (n=86, oma mediaani 0,417) kerrotaan
   0,7962:lla.
2. **Yksittäisen kuvan kaistaveto**: koska MIKÄÄN lineaarinen skaalaus ei
   voi muuttaa yksittäisen kuvan suhteellista poikkeamaa (z-arvoa) omassa
   sukupolvessaan — todennettu simulaatiolla ennen toteutusta — kuvat,
   jotka jäävät vaiheen 1 jälkeen tavoitekaistan [0,332 ± 1,0 × 0,071]
   ulkopuolelle, vedetään lisäksi lähemmäs kaistan reunaa (15 %:n
   vaimennuksella, ei täyttä litistystä).

Molemmat vaiheet sovelletaan YHTENÄ kertoimena per kuva, vain "sisältö"-
pikseleihin (ei-läpinäkyvät JA ei-lähes-valkoiset — sama maski kuin
`tools/nahtavyyskuvien-tyylimittari.py`:ssä, PR #3398). Tausta, läpinäkyvyys
ja tumma viivapiirros jäävät koskemattomiksi. Vain S-kanavaa muutetaan —
V (kirkkaus) säilyy, joten kontrasti ei muutu eikä kuva "räjähdä".

**7 maalattua taustaa EI korjata mekaanisesti** (S-skaalaus ei muuta
taustan muotoa/kuviointia) — ne menevät erilliseen Codex-tilaukseen
(kohta 4).

## 2. Kokonaistulos

| | Ennen | Vaihe 1 jälkeen (simulaatio) | Lopputulos (koko putki) |
|---|---|---|---|
| vanha/muu mitta: mediaani | 0,243 | 0,334 | 0,334 |
| vanha/muu mitta: hajonta | 0,070 | 0,085 | 0,050 |
| vanha/muu mitta: poikkeavia (>1,75σ) | 32/363* | 32/363 | 23/332** |
| Codex-kohtaus: mediaani | 0,417 | 0,331 | 0,331 |
| Codex-kohtaus: hajonta | 0,088 | 0,071 | 0,053 |
| Codex-kohtaus: poikkeavia (>1,75σ) | 9/86* | 9/86 | 0/81** |

\* alkuperäisen raportin luku (42 poikkeavaa yhteensä, ks.
nahtavyyskuvien-tyyli-20260927.md kohta 3) jakautuu tässä sukupolvittain
uudella laskutavalla — ei suoraan vertailukelpoinen rivi riviltä, mutta
suuruusluokka sama.
\*\* n on pienempi kuin ennen (332+81=413 vs. 363+86=449), koska 36
orpoa/duplikaattitiedostoa poistettiin samassa PR:ssä (kohta 5) — ne eivät
olleet käytössä pelissä eivätkä siten osa vertailua.

**Kaikki jäljelle jäävät 23 poikkeamaa ovat "vanha/muu mitta" -sukupolvea**
(Codex-kohtaus-sukupolvi täysin korjattu, 0 poikkeamaa) ja niiden
kylläisyys on nyt 0,42–0,49 (oli 0,42–0,86 ennen korjausta) — huomattavasti
lähempänä tavoitetta 0,332 kuin alun perin, vaikka ei täysin sen tasolla.
Tämä on odotettu, hyväksyttävä jäännösvirhe yhdestä mekaanisesta ajosta:
skripti tasaa KESKIMÄÄRÄISEN kylläisyyden per kuva, ei muuta kuvan
värikylläisyyden sisäistä JAKAUMAA (esim. yksittäisen yksityiskohdan
punainen katto pysyy suhteellisesti muita kohteen osia värikkäämpänä).

## 3. Kaupunkikohtainen yhteenveto (48 kaupunkia, keskiarvo per kaupunki)

Suurimmat muutokset (kylläisyyden keskiarvon muutos):

| Kaupunki | n | Ennen | Jälkeen | Muutos | Suunta |
|---|---|---|---|---|---|
| oslo | 6 | 0,231 | 0,322 | +0,091 | nosto (oli haalein kaupunki) |
| moskova | 6 | 0,263 | 0,353 | +0,090 | nosto |
| teheran | 8 | 0,263 | 0,353 | +0,090 | nosto |
| varsova | 6 | 0,263 | 0,352 | +0,089 | nosto |
| firenze | 9 | 0,235 | 0,324 | +0,089 | nosto |
| valletta | 6 | 0,469 | 0,372 | −0,096 | lasku (oli värikkäin kaupunki) |
| kosice | 8 | 0,388 | 0,308 | −0,079 | lasku |
| bergen | 8 | 0,365 | 0,295 | −0,070 | lasku |
| bryssel | 7 | 0,413 | 0,346 | −0,067 | lasku |
| pariisi | 30 | 0,382 | 0,342 | −0,040 | lasku (kontaktiarkki, kohta 4) |

Pienimmät muutokset (kaupunki oli jo lähellä tavoitetta): rooma (−0,001),
ateena (−0,006), luxemburg (−0,013), wien (−0,014), lontoo (+0,027).

Kontaktiarkit kuudelle kaupungille (pyydetyt Pariisi/Lontoo/Helsinki/Wien +
Madrid ja Rooma, viimeiset kaksi valittu koska niissä on sekä "Codex-
kohtaus"- että "vanha/muu mitta" -kuvia SAMALLA kartalla — hyvä näyte
kahden sukupolven korjauksesta rinnakkain):
`docs/raportit/kuvat/nahtavyyskuvien-tasaus-20260927/kontaktiarkki-<kaupunki>.png`.
Jokaisessa arkissa ENNEN vasemmalla, JÄLKEEN oikealla, ruudukon alla
tiedostonimi + sukupolvi + kylläisyys ennen→jälkeen.

## 4. Ei tehty tässä PR:ssä (odottaa omistajan hyväksyntää)

Korjatut kuvat (413 kpl) EIVÄT ole tässä PR:ssä eivätkä missään
committoidussa paikassa — ne ovat vain tämän session tilapäisessä
scratchpadissa. Kun omistaja hyväksyy kontaktiarkkien perusteella (kohta 3),
seuraava PR:
1. Kirjoittaa 413 korjattua kuvaa `assets/kartat/miniatyyrit/`-kansioon
   (korvaa alkuperäiset, häviötön webp/png).
2. Ajaa `node tools/mittaa-miniatyyrit.mjs` (päivittää
   `tools/miniatyyri-mitat.json`:n sha-tarkisteet — muuten
   `tests/miniatyyrit-leikkaus.test.mjs` punastuu, koska se vertaa
   tiedoston sha256:ta tallennettuun arvoon).
3. Versionosto `tools/uusi-versio.mjs`, koska kyseessä on pelin
   sisältöpaketin muutos.

## 5. 36 orpoa/duplikaattitiedostoa poistettu (tämä PR)

Ks. nahtavyyskuvien-tyyli-20260927.md kohta 2.3. Varmistettu grepillä ettei
mikään koodi (`js/`, `tools/`, `.github/`) viittaa näihin — vain
`sw.js`:n palvelutyöntekijän SHELL-precache-lista viittasi kuuteen
Nikosia-tiedostoon (poistettu myös SHELListä, ks. commit).

- 30 kpl `.jpg`-duplikaattia (Bagdad, Firenze, Kairo, Shanghai, Soul,
  Tampere, Teheran, Tokio, Tripoli) — sama kohde on jo kartoitettu
  `.webp`-muodossa.
- 6 kpl Nikosian vanhaa `.webp`-tiedostoa — kaikki 6 nikosia-kohdetta
  ovat siirtyneet kokonaan `-vari2`-versioihin (vain R2-ämpärissä).

Versionosto tehty (`tools/uusi-versio.mjs`), koska muutos koskee
tuotantoassetteja (`sw.js` + kuvatiedostojen poisto), ei pelkkää dokumentaatiota.

## 6. Codex-tilausluonnos: 7 maalattua taustaa (EI lähetetty)

Sama luonnos kuin nahtavyyskuvien-tyyli-20260927.md kohta 5, rajattuna
VAIN näihin 7 kuvaan (34 "liian värikäs" + 2 "liian haalea" -kuvaa EIVÄT
enää tarvitse Codex-tilausta, koska mekaaninen korjaus kattaa ne):
`ateena-diogeneen-astia.webp`, `ateena-elginin-marmorit.webp`,
`pariisi-impressionistit.webp`, `pariisi-vrain-lucas.webp`,
`rooma-kolikko-olan-yli.webp`, `wien-taikahuilu.webp`,
`wien-vuoristovesijohto.webp`. Lähetetään postilaatikkohaaraan
(`claude/postilaatikko`, `posti/`) erillisenä commit-erana.

---

*Skriptit: `tools/nahtavyyskuvien-tasaus.py`,
`tools/nahtavyyskuvien-kontaktiarkki.py`. Riippuu PR #3398:n
`tools/nahtavyyskuvien-kartta-json.mjs`:stä (map-JSON:n tuotanto) ja
`tools/nahtavyyskuvien-tyylimittari.py`:stä (uudelleenmittaus) — ei
kopioitu tähän PR:ään päällekkäisyyden välttämiseksi.*
