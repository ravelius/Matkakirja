# Natiivi-UI: luovutus 16.10.2026 klo 22.0x (Postivahti: kova raja 39 %, levy 17,6–23 Gt)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; -ilta3 ja vanhemmat on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-remote natiivi-backup. Ennen käännöstä tyokalut/tarkista.sh (0 virhettä).
Ketjut: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ketjut-20261016/*.zsh. LEVY: käännösraja 25 Gt – älä käynnistä
käännöstä alle sen (Postivahti 22.0x). _tyo/natiivi-ui/: .app vain nimi7 + nimi9 (nimi3, nimi5 poistettu).
SKENAARIOT: teokselle AINA pelaajan reittiä `linssi museo valitse <id>` + `oleta 60 museo: saapui <id>` (QA-komento `teos` ohittaa
pysähdyksen: ei KatseKohtaa, ei zoomia, ei leveän teoksen levennystä). Rijksmuseumissa ensin `tap-teksti <näyttely>` + `tap-teksti
Siirry näyttelyyn`; tauko komennolla `linssi museo tauko 1|0`.

## 1. ENSIMMÄISENÄ: MUSEO-NIMI-197 693f265ed → KUVAT → PT → KK (omistajan hyväksyntä) → vasta sitten NS
Haara natiivi-ui/museo-nimi-197 (wt/proto-natiivi-ui-museo-nimi-197). Käännös nimi9 = 32eecb39c (21.58, valmis). AJOSSA
museo-nimi9-ketju.zsh (out _tyo/natiivi-ui/museo-nimi9-ketju.out): iPhone sk-museo-nimi8-197 (lista), Laivamalli iPhone + iPad
(sk-museo-laivamalli-197: K1/K2 Grafiikka-kabinetin tulokyltti ja kortti lasilla, L1–L5 i-nappi, tauko, zoom, vaaka). Lokit
lokit/todistus-museo-{nimi8,laivamalli}-{iphone,ipad}-197-*. Jos ketju kuollut: aja ajo-museo-*.zsh käsin nimi9-appilla.
Tarkista:
- T6/T7: nimilista nousee ylöspäin (e3c7e19e0) – nimet EIVÄT katkea "…", alin häivytetty rivi ei kehyksen päällä.
- i-nappi (693f265ed, omistaja 21.38): seinällä nimen vieressä (tekijärivin perässä tai nimen yläpuolella), EI kehyksen eikä
  paspartuun päällä; pysty, vaaka, iPad. Laivamallin leveä paspartuu on paras koe.
- K1/K2: Grafiikka- ja valokuvakabinetin kortti lasipohjalla, tiivis kyltti ilman viivaa ja tyhjää riviä.
Sitten kuvapari PT:lle (pari.py: omistajan kuva Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261016/museo-laivamalli-nimi-
nakyy-2047.png vs uusi L1/L2 + K1) → PT vie KK:lle. PT 21.4x: ÄLÄ vie SHA:ta NS:lle (local_674b9ec4-e2f3-48e9-a810-a129f20a4f03)
ennen omistajan ok:ta. Vasen kerma-kortti = juna 196:n KORTTI-pohja paperiteemalla (kerrottu PT:lle).
Jo hyväksytty (PT 21.4x): T1–T4 pitkät nimet, T8 nimi piiloon zoomissa, lasikortit, ‹ › -rivit pois (c5dff5d39).

## 2. JUNA 198: MUSEO-IKORTTI-198 fb82e9f08 (⊃ leveys f7ed065c7 ⊃ nimi-197) – KÄÄNTÄMÄTTÄ
Haara natiivi-ui/museo-ikortti-198 (wt/proto-natiivi-ui-museo-ikortti-198). Omistaja 21.51 ("Kyllä, teksti ja puhe") + 21.54
("Pyöreä kuva yläriville"):
- MuseoTaulu.IKortti.cs (uusi): i-nappi avaa KORTTI-lasikortin kehyksen yläpuolelle nimikyltin paikalle (muotokuva pyöreänä
  mk-linssirivi__kuva 44 pt, tekijä + elinvuodet, nimi, lyhyt_fi, vuosi · tekniikka · mitat, kokoelma, kaiutin); nimikyltti
  visibility hidden ja i-nappi piiloon kortin ajaksi; ohinapautus sulkee (KohdatOhinapautus).
- kohtaKortti siirretty turvaan: ympyrän otsikko + teksti KEHYKSEN ALLE kohdan luennan ajan (NaytaKohtaKortti ei enää pysäytä luentaa).
- MuseoKierros.UiTila (leveyden LaajaTavoite = max(leveys, UiTila), max 2,5): jos kortit eivät mahdu, kuvakulma levenee pehmeästi.
- Teos.Lyhyt (teokset.json lyhyt_fi), muotokuva Resources/Museo/taiteilijat.json { tekijä: { kuva: Resources-polku } }.
TEHTÄVÄÄ: (a) omistaja 21.54: lisää MUOTOKUVARIVI uutena pohjana tyylikirjaan (webin tyylikirja.json pohjat; pyöreä kuva kuten
mk-linssirivi__kuva, tekijä + elinvuodet, tuntematon ilman kuvaa) – web-PR. (b) Sisältökirjurin data (22.1x viimeisin sopimus, PR-numero
tulossa ~22.3x): webin repoon docs/kohtaukset/museoteokset/: taiteilijat.json (tekijä-avain → tiedosto tai null) + kuvat/<slug>.jpg
256×256 + teokset {"tunnus","faktat":[…]} ≤ 160 merkkiä, alankomaat (kohtia-teokset) ensin, sitten ranska → tuo proto-gitiin: kuvat Resources/Museo/taiteilijat/, taiteilijat.json kuva-polut, lyhyt_fi teokset.json:iin.
(c) Käännös (vasta levy ≥ 25 Gt): museo-ikortti-ketju.zsh <sha> ajaa sk-museo-ikortti-198 (Laivamalli, Yövartio, SK-A-2099,
mauritshuis-605: nimi / i-kortti / kohdan teksti / kiinni) JA sk-museo-leveys-198 iPhone + iPad. (d) Kuvapari iPhone + iPad
(i auki + ympyrän teksti) PT:lle → KK ennen kytkentää. Leveät teokset: kuvat PT:lle → NS juna 198 (rebasetaan juna-198 4b6ef2395).
HUOM Pelikoodari (22.1x, ratkaistu): seuraaja (luovutus e2901ef71) rakentaa museon pehmeän liikkeen nimi-197:n 0048e60e6:n päälle
(AutoZoomViive 2,5 s pysyy, 0,5 s:n viive poistuu) ja liikepohjan avaintemme päälle. UiTila on MuseoKierros.cs:n leveysosassa –
huomioi yhdistäessä.

## 3. LASIPOHJA + LIIKEPOHJA -198 a25eb9122 (pohja master BUILD 196 → rebase juna-198 ennen NS:ää) – KÄÄNTÄMÄTTÄ
- a4c257a4a: ISS-ohjaamo + Äänet Luokat-listaan, videopelikortti Kiinnita-ehdolla videopeliteeman sinisellä, toimintorivi
  läpinäkyväksi; PuluChat ei muutosta (tarkista P1/P2-kuvasta). Skenaario sk-lasipohja-198 (NYK/UUSI-parit, iPhone), ketju
  lasipohja-ketju.zsh <sha>. PT hyväksyi tehtävän (20.2x), juna 198.
- 9c21f8ffd + a25eb9122: Tyylikirja.Liikkeet/Kayrat/USS-käyrät generoitu; Ponnahdus-kortit niistä; Ponnahdus.Kaari(Vector4).
  Web ravelius/Matkakirja#4728 MERGED (liike.liikkeet, liike.uss). Pelikoodarin seuraaja rakentaa liikepohjan avainten päälle.

## Opit
- Ketjuskriptiä ei muokata ajon aikana (zsh lukee kesken): tapa vanhempi (pkill -f <ketju>), lapsi jatkaa; uusi ketju odottaa lasta.
- Ympyröiden kohdat ovat vain Rijksmuseumissa (alankomaat/kohdat.json) → i-nappi vain niille teoksille.
- Metrolistan tiivistys katkaisee kaksiriviset nimet → nosta listaa ylöspäin ennen tiivistystä.
