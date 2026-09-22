# Codex-toimitusten otostarkistus (2026-09-22)

Sisältökirjuri (Sonnet), Fablen pyynnöstä. Otos kolmesta viimeaikaisesta
Codex-toimituksesta: pienoismallit-erä (PR #2669, 97 kohdetta), nostotyyppi-
merkit ja merikoristeet. Tarkistettu lisenssi- ja kaanonvaatimusten osalta
— ei tyylin hienosäätöä eikä pelitoimintaa (se on Karttasepän/Pelikoodarin
alaa).

## 1. Pienoismallit, PR #2669 (97 kohdetta, 12 kaupunkia)

Otos 10 kuvaa satunnaisesti erän tiedostoista (Bryssel, Wien, Lontoo,
Bergen, Ljubljana): `wien-taikahuilu`, `bryssel-grand-place`,
`bryssel-mont-des-arts`, `bryssel-oikeuspalatsi`, `lontoo-faraday-1831`,
`ljubljana-pre-ernin-aukio`, `lontoo-canaletto-lontoossa`,
`ljubljana-kri-anke`, `lontoo-palo-1666`, `bergen-kaupunginkirjasto`.

**Lisenssi:** ei erillistä LUEMINUT/README-tiedostoa
`assets/kartat/miniatyyrit/`-kansiossa eikä commit-viestissä
(`0da998e17`), mutta tilausposti (`posti/fable-codexille-miniatyyrit-
eurooppa-20260921.md`) määrittää lisenssiksi "pelin oma tuotanto" —
sama käytäntö kuin nostotyyppimerkeillä ja merikoristeilla (kohdat 2–3).
Kyseessä on Codexin tilauksesta tuottama alkuperäinen kuvitus, ei
Commonsista poimittu materiaali, joten PD/CC-vaatimus (CLAUDE.md) ei
koske näitä. **Ei toimenpidettä, mutta suositus:** lisää sama
LUEMINUT.md-käytäntö (kuvaus + "pelin oma tuotanto") myös
miniatyyrit-kansioon, kuten nostotyypit/meri-kansioissa on — nyt
lisenssitieto on vain postissa, ei asset-kansiossa.

**Kaanon:** Kaikki 10 otoskuvaa vastaavat tilausta — tunnistettava
kohde/tapahtuma siluettina, ei tekstiä, ei vesileimaa, tapahtumakuvat
(esim. Lontoon palo 1666, Faraday'n induktiokoe 1831) kuvaavat hetkeä
tai esinettä henkilön muotokuvan sijaan, kuten sääntö vaatii. Ei
kaanonristiriitoja tarkistettuihin kaupunkeihin.

**Huomio tilausdokumentin ja toteutuksen välillä (ei virhe
toimituksessa):** Tilaus (`posti/fable-codexille-miniatyyrit-eurooppa-
20260921.md`) kuvailee tyylin sanallisesti "yksivärinen
seepiamusteluonnos, paperinvärinen tausta" ja viittaa esimerkkeinä
olemassa oleviin tiedostoihin (esim. `helsinki-*.webp`). Tarkistin
viitatun esimerkin (`helsinki-johanneksenkirkko.webp`) — se on
värillinen akvarellityylinen kuva valkoisella/läpinäkyvällä taustalla,
EI yksivärinen seepiasluonnos. Uusi 97-erä on tyylillisesti
johdonmukainen olemassa olevien kuvien (siis todellisen kaanonin)
kanssa, ei tilaustekstin sanallisen kuvauksen kanssa — Codex on siis
seurannut oikein viitattuja esimerkkitiedostoja, mutta tilauspohjan
sanallinen tyylikuvaus on virheellinen/vanhentunut. **Suositus:**
korjaa tuleviin miniatyyritilauksiin tyylikuvaus vastaamaan todellista
kaanonia (värillinen akvarelli/kynäjälki, ei "yksivärinen seepia"),
jotta kuvaus ja esimerkit eivät ole ristiriidassa.

## 2. Nostotyyppimerkit (11 PNG-karttamerkkiä)

Tarkistettu kaikki 11 tiedostoa nimeltä, kuvista otos 4: `merkki-vuori`,
`merkki-merenkulku`, `merkki-historia`, `merkki-ruoka`.

**Lisenssi:** `assets/koristeet/nostotyypit/LUEMINUT.md` kirjaa
lisenssin "Pelin oma tuotanto" — kunnossa, dokumentoitu asset-kansiossa
itsessään (parempi käytäntö kuin miniatyyreillä, ks. kohta 1).

**Kaanon:** Kaikki 4 otoskuvaa täsmäävät LUEMINUT.md:n kuvitusohjeeseen
— seepianmusta kynäviiva, hillitty seepiasävy, ei paperitaustaa, ei
kehystä, ei tekstiä, ei vesileimaa, ei aikaleimaa. Alfa-läpinäkyvyys
tarkistettu pikselitasolla (PNG-dekoodaus): kulmien alfa = 0 kaikissa
otoskuvissa — aito läpinäkyvyys, kuten LUEMINUT.md lupaa. Ei
kaanonristiriitoja.

## 3. Merikoristeet (7+2 = 9 tiedostoa: 4 laivaa, 2 kompassiruusua,
1 aaltomerkki — LUEMINUT.md listaa 7 nimikettä, tiedostoja on 7 PNG +
JSON + LUEMINUT)

Tarkistettu otos: `laiva-fregatti`, `laiva-hoyry`, `kompassiruusu-32`,
`aaltomerkki`.

**Lisenssi:** `assets/koristeet/meri/LUEMINUT.md` kirjaa "Pelin oma
tuotanto" — kunnossa.

**Kaanon:** Kaikki otoskuvat vastaavat ohjetta (seepianmusta
kaiverrusjälki, kevyt ristivarjostus, ei tekstiä, ei vesileimaa).
`kompassiruusu-32.png` näytti Read-esikatselussa mustan taustan, mutta
pikselitason tarkistus (PNG-dekoodaus, alfa-kanava) vahvisti kulmien
alfan olevan 0 — kyse on esikatselutyökalun renderöintierosta, ei
todellisesta läpinäkyvyysviasta tiedostossa. Laivakuvissa ei ole vettä
tai aaltoja alla, kuten LUEMINUT.md vaatii. Ei kaanonristiriitoja.

## Yhteenveto

Ei löydöksiä, jotka estäisivät toimitusten käytön. Yksi
dokumentaatiosuositus (miniatyyrit-kansioon LUEMINUT.md) ja yksi
tarkennussuositus tuleviin tilauspohjiin (tyylikuvaus vastaamaan
todellista kaanonia). Molemmat pieniä, ei kiireellisiä — Fable
päättää, tehdäänkö erillisenä pikkukorjauksena.

---

valmis
