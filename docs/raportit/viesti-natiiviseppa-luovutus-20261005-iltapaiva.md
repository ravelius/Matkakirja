# Natiivisepän luovutus 5.10.2026 iltapäivä (13.0x)

Luovuttaja: Natiiviseppä (Opus 5.5, high). Edellinen: viesti-natiiviseppa-luovutus-20261005.md (käytännöt voimassa).

## TILA HETI

- **JUNA 144 LOPULLINEN KOE e636bc55** (haara natiiviseppa/juna-144-ohjaamo-koe, worktree wt/proto-natiiviseppa-j144; simukäännös
  061121c9, .app lokit/natiiviseppa-app-144vie-061121c9) = ec0038f4 + ISS-ohjaamo (natiivi-ui/iss-ohjaamo-144 2bb26db8 + LS2 v2e
  eea832b1) + plist 5e9d2c7f + linna/kaupunki-kuva 79a3582c (sumu/Volume pois) + elävä opas (natiivi-ui/opas-kevyt-144 650f9325,
  lontoo → 9cf44e55 → 110c7dee → 7db42dcc; EI 2c490b78) — kaikki Päätoimittajan kuittaamia. Testit 0/444/415/675.
  VIE ja TF ODOTTAVAT OMISTAJAN LUPAA (19.5x "Odota junaa hetki"). VIE-ehdot: Natiivi-UI:n 4 kuvaa (dc9b6022), Laitetestaajan
  napautuspolku, iPad-muistiajo 10 min (laitekäännös minulla, Linssisepän komentojono viestissä 19.5x), Linssisepän koesimu.
  Avaus: juna/b13 91220fb6 → e636bc55 (git update-ref), juna.log-rivi, vahti kääntää, BUILD 144 -master, kopioi-juna-app.sh.
  Pelikoodarin #4018 julki vasta kun TF-build ⊇ e636bc55 → ilmoita hänelle.
  Juna 145 -jono: pulu-testiotsake 23b682e1, astrokuva-tauko bc66e66d, pulu-chat-yksi d1d1f0ee, linna-145 12eeab86, LS2 S2-maailma
  (kuittasin ehdoin), lontoo 2c490b78 (PCM) — kuittaukset Päätoimittajalta.

- **JUNA 144 SIIRRETTY (omistaja ~17.4x, Julkaisijan välittämänä): EI avata klo 20.** Lähtee vasta kun elävä opas on todennettu simussa
  (Linssiseppä, Pelikoodari, Natiivi-UI; tavoite ~22–23); opas ec0038f4:n päälle vain Päätoimittajan kuittauksella; ISS-ohjaamo vain jos
  Meksikon + Kanarian parit hyväksytty. Juna 145 -jono: pulu-testiotsake 23b682e1, astrokuva-tauko bc66e66d, pulu-chat-yksi d1d1f0ee,
  linna-145 12eeab86 (kuittaukset vahvistettava Päätoimittajalta).
- (aiempi) VIE kokeella ec0038f4 (simukäännös 5f257c20, .app lokit/natiiviseppa-app-144koe-5f257c20).
  Ehto (a): Pelikoodarin 5 min todistusajo kuvaselitteen kaiuttimesta tästä kokeesta ennen VIE:tä (pyydetty, simuvuoro Julkaisijalta).
  Ehto (b): ISS-ohjaamo vain jos Meksikon pari hyväksytty + koe käännetty ja tarkistettu klo 19.00 mennessä, muuten ilman.
  Klo 20: Julkaisijan NYT → git update-ref refs/heads/juna/b13 <ec0038f4> <91220fb6> (proto-repo) + rivi juna.logiin; vahti kääntää;
  BUILD 144 -master (merge --no-ff juna/b13 master a5a18288:n päälle, viestiin käännös-SHA) + kopioi-juna-app.sh 1.1.144 <käännös>.
  Kohta 1 ("1.1 (144)") tarkistetaan TF 144:stä. Laitetestaajan raportti docs/raportit/kuittaus-juna144-koe-5f257c20-20261005.md.

- **Juna 144 -koe a1cfce55** (natiiviseppa/juna-144-koe, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-j144) = master a5a18288
  + latauspalkki 62bafb4a + kytkentä da6b8a27 (Siirtosepän pieni haara; palkki vain kytkennän kanssa) + testimykistys-natiivi
  8ff03da0 + lukija-william f5e5372c + asetukset 89ba8062 (todistus lokit/natiiviseppa-asetus-todistus/). Testit 0/444/415/625.
  Ehdolliset (vain Päätoimittajan kuittauksella): siirtoseppa/linna-143 (EI Steam Audiota 144:ään; tarkistukseen
  MATKAKIRJA_KIRJASTOT=/Users/Shared/Claude/proto-3d/_lahteet/unity-paketit-siirtoseppa/kirjastot), LS2 ISS-ohjaamo.
  VIE-ikkuna klo 20: ennen sitä käännös + rutiinikuittaus Laitetestaajalta (napautuspolku, poikkeukset, ääni) + VIE Päätoimittajalta.
  Uusi Asetus-kutsu → lisää avain Matkakirjan tools/vienti/asetusavaimet.json (Pelikoodarin #3994).

- **BUILD 143 = proto master cc57dde7** (juna/b13 91220fb6, vahdin junakäännös 81ac41ea klo 12.22–12.33; .app
  lokit/juna-1.1.143-81ac41ea). Sisältö: BUILD 142 + Brotli ca4251f5 + chat-linna b38360f4 + x-napit 9a688396 +
  siirtoseppa/linna-143 024a098d + x-siivous 121b0840 + Tavli ea02bae1 + kirjainväli-kerning 46b62059 + ei-linssiä
  7837ac54 + glint-2 5b6b9d46. TF 1.1 (143) on Julkaisijalla (muutosloki #3990).
- Master sen jälkeen: 38519dad (pelikoodari/todistusajo d257025c) → **a5a18288** (todistusajo OHJE.md bf2f924f). Vain työkaluja.
- **Datasiirto (Päätoimittaja kuittasi ehdotuksen 5f7cc5418):** haara natiiviseppa/asetukset **89ba8062**
  (worktree /Users/Shared/Claude/wt/proto-natiiviseppa-asetukset, pohja a5a18288). Testit 0/444/415/625.
  - Peli/Asetus.cs: kokoelmat/asetukset.json (valinnainen), oletukset koodissa, skeema 1. Koekansio
    Documents/sisalto-koe/kokoelmat/asetukset.json. Komento peli-komento `asetus` | `asetus <avain>` | `asetus lataa`.
  - Ryhmät: aanet (AaniVakiot ~35 + TavliVahvistus/MyllyVahvistus/MyllyLisaKerroin), pelit (Peliluettelo nimet/historia/
    alkuperä/nappi), tekstit (tavli/mylly.valinta.otsikko), kamera (Yokuori), osoitteet (Cupolan karttanostot-juuret).
  - Käännös jonossa Julkaisijalla (~13.40), simu FBBD41D7 hiljaisessa ikkunassa (~13.50).
  - **Todistus (Päätoimittajan ehdot):** 1) BUILD 143 vs 89ba8062 ilman asetuksia: ääniraita samalla tasolla; 2) koekansiolla
    teksti + äänitaso vaihtuu, ilman sitä oletukset → kuva + ääni Päätoimittajalle. Skripti proto-3d/lokit/natiiviseppa-skriptit/ajo-asetus.sh
    (APP=… KOE=0|1 ajo-asetus.sh <nimi>; äänet päälle oikealla tapilla (201,567) ja touch <K>/aanet-ok).
  - Junaan vasta kuitattuna, VIE-ikkunat klo 12 ja 20 (omistaja). Natiivi-UI tekstit vasta kun infra masterissa;
    vienti + skeemavalidointi tilataan Sisältökirjurilta/Julkaisijalta.
- iPad-mittaus EI ole VIE-ehto (omistaja 12.30). Brotli-laitemittaus puhtaalla asennuksella jäi tekemättä
  (devicectl: kill launch-pid, ei timeout-käärettä; xctrace ~15 min/ajo). Tulokset: lokit/natiiviseppa-ipad143/.
- Juna 144 -ehdokkaat: Siirtosepän laineet-uusinta 0fb2fc7b (Cinemachine e9a7915b päällä; Steam Audio -koko kuitataan minulla),
  ISS-ohjaamo (LS2 kuvaparit), linna-kuva 9f37a9e9 (omistajan sävy), datasiirto vaihe 1.
