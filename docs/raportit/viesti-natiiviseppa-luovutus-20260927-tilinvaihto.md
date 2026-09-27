# Natiivisepän luovutus 27.9.2026 (tilinvaihto), klo 11.3x

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: viikkokiintiö 93 % → tilinvaihto (Fablen pyyntö). Edellinen: -j.md.

## Tila

- **BUILD 27** = master 65f725ce = TF 1.0.27 (01.55). **BUILD 28** = master **7788b629** (juna 1eff4f76, käännös d3fa3c78,
  Laitetestaaja PASS 4393a1739) = **TF 1.0.28** (09.19). Tagit build27-juna, build28-juna. Varmuuskopio ok (09.03 VIKA-rivi =
  samanaikainen push, ratkaisurivi lisätty varmuuskopio-VIKA.txt:hen).
- **1.0.29-juna** `juna/b13` **962a94cc**, viimeisin käännös **6c6abe4c** (11.31, asennettu Laitetestaajan simulaattoreihin
  1572C658, 3B4CDACB, C1D5E34C, 993F8873; oma savuke FBBD41D7 0 poikkeusta, verho 2,4 s). Laitetestaajalle EI ilmoitettu
  (viestit tauolla) → seuraava: SHA Fablelle → Laitetestaaja → PASS → master BUILD 29 → Julkaisija TF 1.0.29.

## 1.0.29-junassa (mergetty)

nostot-heti 934103a9 · meri-tuotanto 0a9fdba5 (10 lajia) · lahitaso a811b222 (+ kynnys pienissä maissa) · taso1-kynnys be33f310
(mallikoko pienissä maissa) · pelikoodari/kortti-ilman-ajoa c7b475d7 · pelikoodari/maailma-auki 7041fd0e · natiiviseppa/taysi
1d069fd3 (Symbolimallit lukee Nosto.Taysi) · natiiviseppa/maakunnat-heti 6d3e2c36 (MaaKartta: herätys ja Heraannyt/Herata/
PaivitaHeraaminen poistettu kokonaan) · linssiseppa/maakunta-taytto 643a5ff9 → abfb54e5 · pelikoodari/pulu-ilman-kytkimia
bae36144 (web #3386 oli auki mergehetkellä) · natiiviseppa/nimio-vaisto 0bdc3626 (erikoismallit kalusteina KaupunkiMerkit.
Kalusteet-koosteessa) · natiivi-ui/nosto-ylarivi a5aae711 · natiivi-ui/nostot-taysi 18543b3c · natiivi-ui/luennan-saatimet
56ab226b (merge 0054d08d; Natiivi-UI pyysi SHA:n Pelikoodarille) · mallinseppa/lahitaso be353929 (erikoismallit3 + Lahi-verkot).

## Puuttuu / odottaa

- **pelikoodari/puhevirta b6fc76d7**: RISTIRIITA Puhe.cs (luennan-saatimet) → Pelikoodari mergeää juna/b13:n haaraansa.
- **natiivi-ui 0ca9c11e (maakuntaerä)**: ristiriita, näyttää vanhemmalta versiolta nostot-taysi 18543b3c:ssä olevasta → varmista
  Natiivi-UI:lta, tarvitaanko.
- **pelikoodari/talous-vaihe1 fbda3812** (talous vaihe 1, web #3394): ei Fablen 1.0.29-listalla → kysy Fablelta.
- natiivi-ui/avauskortti (korjausten jälkeen), lento v3 natiiviseppa/lento-v3 cdd285f9 (Fablen vastaukset: sisäiset lennot 15 s?
  käytävän prioriteetti; ääni puuttuu), Malja-symbolin ja Kinderdijkin päällekkäisyys (ei 3D-mallien keskinäistä väistöä).

## Omat haarat (kaikki junassa paitsi lento-v3 ja s11)

mallit-rajapinta (Rekisteroi, LiikkuvatOsat, KokoKerroin, Kaupunki-maamerkki) · kategoriamallit (RekisteroiKategoria) ·
maastokorkeus c581b2ba (SampleHeightMostDetailed erissä, Olympos todennettu) · taso1-kynnys · lahitaso · nostot-heti (Ranskan
kehysmittaus ok) · maakunnat-heti · taysi · nimio-vaisto · lento-v3 cdd285f9 (odottaa) · s11-lammitys (HYLÄTTY: WarmUp 4,9 → 7,2 s).
Rajapintaohje Mallinsepälle: proto-3d/lokit/mallinseppa-rajapinta.md osiot 1–7.

## Käytännöt

- **Viestitauko**: tämä sessio ylitti 10 vertaisviestin rajan; session-id-viestit tauolla kunnes omistaja kirjoittaa. Fable luki
  SHA:t transkriptistä ja juna-viimeisin.txt:stä. Uusi sessio aloittaa puhtaalla laskurilla.
- Savuke: lokit/natiiviseppa-skriptit/sessio-k/ (savuke.sh: install + `--console-pty` uudelleenyritys; reliefi-sim.sh tavallinen
  launch polton kuormassa). `ui aloita ateena` + `aja lat lon 1.0 1.5` antaa kertoimen ≥ 2,5 mantereella; `uusi-peli` ei zoomaa.
- Kuviin kulma ja versio suoraan kuvaan, rajaus ≥ 300 px (omistaja 27.9. 00.2x).
- Laitekäännös pääprojektissa: `git checkout --detach <haara>` → laite.sh → .app talteen → `git checkout -- . && git checkout master`.
