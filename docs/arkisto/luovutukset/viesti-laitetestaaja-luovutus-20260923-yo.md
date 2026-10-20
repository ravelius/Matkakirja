# Laitetestaaja → seuraava Laitetestaaja-sessio: luovutus (23.9.2026 yö, klo 22.30)

Fable pyysi luovutuksen kontekstin täyttyessä (71 %) ennen nollausta.
Edellinen luovutus: `docs/raportit/viesti-laitetestaaja-luovutus-20260923-ilta.md`.

## Lue ensin

1. `CLAUDE.md`, `docs/roolitus.md`.
2. Raamatun Ydinajatus-osion kohta 2 "TYÖTAPA JA SESSIOT".
3. `/Users/Shared/Claude/proto-3d/TYOTAPA.md`.
4. Tämä raportti kokonaan.

## Tila nyt

- Web-puoli: kaikki tämän vuoron muutokset dokumenttiraportteja (ei
  koodimuutoksia peliin) haarassa **`laitetestaaja-pelisilmukka-siivous`**
  (PR #2970, avoin, MERGEABLE, ei CI-tarkistuksia koska pelkkiä
  .md-raportteja + 2 työkalutiedostoa). Julkaisija voi mergetä suoraan.
- Natiivi (proto-3d): simulaattori build **d4017f9** (master 9b1fa8c +
  radiojärjestys) asennettuna. iPad palautettu Natiivisepälle vapaana.
- Merge-pyyntö auki Natiivisepällä: haara `laitetestaaja/linssit-
  simulaattori` @ 2391c2e (natiivi-backup) — Linssit-testit/
  laitetesti-simulaattori.sh, laitetesti.sh:n devicectl-kaksonen
  simulaattorille.

## Tämän vuoron savukkeet (kaikki raportoitu ja hyväksytty)

Kaikki PR #2970:ssä (`docs/raportit/`):
1. `rosvo-tapahtuma-savuke-20260923.md` — rosvokierto (nyt poistettu
   kaanonista, ei enää ajeta).
2. `aloitus-huipennus-offline-20260923.md` — huipennus-bugi löydetty,
   korjattu Natiivi-UI:n toimesta (9312cae), offline-lataus todistettu
   (733 offline-osumaa).
3. `linssit-laitetesti-simulaattori-20260923.md` — 15/16 OK.
4. `lehti-savuke-20260923.md` + `lehti-web-vs-natiivi-20260923.md` —
   6/6 näkymää molemmilla alustoilla, kolme sisältöeroa löytyi (ks.
   raportti).
5. `omistajan-ensikokemus-20260923.md` + `-ipad-20260923.md` —
   kaksi UX-löydöstä varmoja, kaksi jäi auki (ei työkalua oikean
   kosketuksen injektointiin, ks. alla).
6. `linssi-ui-savuke-20260923.md` — valitsin/peite/selite OK.
7. `build3-vastine-20260923.md` — TestFlight build 3 ei asennu
   simulaattoriin, ajettu vastine masterilla: kaikki OK.
8. `omistajan-testflight-lista-20260924.md` — 17-kohtainen
   tarkistuslista omistajan huomisille TestFlight-kokeiluille.

## Avoimet velat ja opetukset

1. **Radion savuke odottaa**: radion kuori (UI-näkymä) ei ole vielä
   masterissa (vain radioluokat/radiojärjestys). Kysy Natiivisepältä
   tilanne ennen ajoa — `ui linssi valitsin` näyttää "Maailmanradio"
   jo listalla, mutta oma näkymä puuttuu.
2. **Kaksi ensikokemus-löydöstä avoinna**: "Aloita seikkailu" -napin
   kosketus ja Pariisiin/Lontooseen saapumisen ohjeistus vaativat
   OIKEAN sormen fyysisellä laitteella — ei simulaattorin kosketus-
   työkalu (toimii vain simulaattorilla) eikä devicectl (ei tue
   kosketussyötettä). Vain omistaja tai fyysisesti laitteen ääressä
   oleva voi varmistaa nämä.
3. **Mittausten jono odottaa Karttasepän maastoajoa** (~2 h, 8
   prosessia, ilmoitettu 22.9.2026 alkuillasta / tarkka aika Fablen
   viestissä): EI sulavuus- tai kehysaikamittauksia ennen kuin
   Karttaseppä ilmoittaa valmiista. Toiminnalliset savukkeet
   (kuvakaappaukset, tila-tarkistukset) saavat jatkua normaalisti.
4. **Opetus**: `existsSync`-pohjainen tila-tiedostojen polling on
   VAARALLINEN uudelleenkäytetyssä Documents-kansiossa — vanhat
   tiedostot samalla nimellä antavat väärän "heti valmis" -tuloksen.
   Käytä uniikkeja tiedostonimiä (esim. `b3-`-etuliite) TAI varmista
   tuoreus lukemalla sisältö eikä pelkkää olemassaoloa.
5. **Opetus**: Node-skriptissä `execFileSync('sleep', ...)` pääsilmukassa
   BLOKKAA event loopin kokonaan — `setInterval`-pohjainen rinnakkainen
   mittaus (esim. muistinäytteet) ei koskaan laukea. Käytä
   `await import('node:timers/promises').then(({setTimeout}) => ...)`
   -tyylistä asynkronista odotusta jos tarvitset rinnakkaisia ajastimia.
6. **Opetus**: `uusi-peli 12345` (ilman kaupunkia) käyttää nyt
   `PeliOhjain.AloitusKaupunki`-oletusta, joka on **Lontoo** (23.9.
   kaanonimuutos C8, EI bugi) — vanhat skriptikopiot jotka eivät anna
   kaupunkia (esim. `napauta lontoo` ensimmäisenä matkana) menevät
   sekaisin. AINA käytä `Peli-testit/silmukka-30s.txt`:ää suoraan
   proto-3d/Matkakirja-proto-masterista (ei worktree-kopioita, ne
   voivat olla jäljessä).
7. **Opetus**: kaksintaistelu (rosvon kysymystyyppi) on **poistettu
   kaanonista kesken tämän vuoron** — älä enää testaa sitä, tapahtumakortit
   jäävät.

## Ympäristö

- Simulaattori: iPhone 18 Pro, UDID `1572C658-6455-4E55-8C05-3F88CB3C32F6`,
  build d4017f9 asennettuna, vapaa.
- iPad: UDID `00008142-0019686E02F3801C`, palautettu Natiivisepälle.
- Työkalut kertaluonteisina (ei committoitu, jätetty worktreehin talteen):
  `wt/laitetestaaja-kontakti-web/tools/mittaus/kontakti-linssit-web.mjs`,
  `kontakti-lehti-web.mjs` (web-lehden kaappaus).

## Aloitusviesti uudelle sessiolle

```
Olet Laitetestaaja (Sonnet), Matkakirjan laitetestaus- ja
mittaussessio. Lue: CLAUDE.md, docs/roolitus.md, Raamatun Ydinajatus
kohta 2, /Users/Shared/Claude/proto-3d/TYOTAPA.md, tämä raportti
(docs/raportit/viesti-laitetestaaja-luovutus-20260923-yo.md)
kokonaan.

Avoimet: 1) radion savuke kun radion kuori mergetään, 2) kaksi
ensikokemus-löydöstä vaatii oikean kosketuksen (omistaja/fyysinen
laite), 3) EI sulavuusmittauksia ennen kuin Karttaseppä ilmoittaa
maastoajon valmiiksi.

Vastaa suomeksi, tiiviisti.
```
