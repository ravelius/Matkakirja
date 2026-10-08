# Latauskuvat ja kevyt liike (Natiivi-UI 8.10.2026)

Omistaja 8.10. ~08.5x: latauskuvat kevyesti animoiduiksi; pallo kahdesta osasta, pallo heiluu hitaasti ja köysi vektorina.
Pohja LATAUSKUVA (web-PR #4188, proto natiivi-ui/latauskuva f27294f3f): tausta + 1–2 liikkuvaa kerrosta alfalla + köysi
vektorina; heilahdus ±1–2°, nousu ≤ 8 pt, jakso 6–8 s; nimi ja latauspalkki ennallaan; ilman kerroksia still.

## Latausnäkymät, joissa on kuva (yksi rivi = ehdotus)

| # | Näkymä (koodi) | Kuva nyt | Ehdotettu kevyt liike |
|---|---|---|---|
| 1 | Kuumailmapallon latauskuva (OpasValikko siirtymaKuva, R2 julisteet/latauskuva-kuumailmapallo, 3 rajausta) | yksi still koko ruudulla | Pallo omaksi kerrokseksi (kääntöpiste kuvun yläosassa), ±1,5°, nousu 4 pt, jakso 7 s; 4 köyttä korin kulmista kuvun alareunaan vektorina; tausta (taivas, maisema, tumma alaosa) still. Osat Codexilta. |
| 2 | Oppaan latauskuva (OpasSovitin.LatausKuva, kohteen 1. valokuva 80 % Kuvasuurennoksessa, ≤ 8 s) | valokuva + lähderivi | Ei kerroksia (valokuva, lähde); suositus: ennallaan. Vaihtoehto omistajalle: AvausTausta-pohjan hidas lähentyminen (Ken Burns) 1,00 → 1,03 / 8 s. |
| 3 | Sovelluksen aloitusverho (Kartta/Aloitusverho, valkoinen Matkakirja-logo 30 %, 1–8 s) | logo mustalla | Ei liikettä (tunnus, lyhyt, iOS-käynnistysruudun jatke); suositus: ennallaan. |
| 4 | Saapumistraileri (Pulu/Saapumistraileri, kaupungin 1–3 avauskuvaa) | kuvat liukuvat jo | Ei latausnäkymä, liikkuu jo; ei muutosta. |

## Odotusnäkymät ilman kuvaa (musta tai peite)

Linnan nimiruutu (DioraamaTaulu: Olavinlinna, Kielletty kaupunki; 2–9 s, latauspalkki), astronautin kameran avaus, Cupolan
avaus (LCD-teksti), Lontoo-pilotti (KierrosTaulu), Ajattelijat (prologin pimeä), LinssiPeite/Odotuspeite, Mustaverho.
Ehdotus: linnan nimiruutu on pisin odotus. Jos omistaja haluaa, sille sopisi LATAUSKUVA (linnan siluetti stillinä + lippu
kerroksena ±1°, lipputangon naru köytenä); vaatii uudet kuvat (generointi omistajan luvalla). Muut ennallaan (lyhyitä, tekstiä).
