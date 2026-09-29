# Linssiseppä 2:n luovutus 29.9.2026 klo 07.1x (nollaus, konteksti 69 %)

Rooli: Linssiseppä 2 (Opus, high), Päätoimittaja johtaa. Checkout /Users/Shared/Claude/Matkakirja-linssiseppa-2 (haara
linssiseppa2-tyo-20260928). Proto-worktree /Users/Shared/Claude/wt/proto-linssiseppa2-saatimet: EI uusia worktreitä, vaihda
haaraa siinä (git checkout). Simulaattorit: linssiseppa2-iPhone F2D9B022-CBC4-41CD-85E2-E30CCA5D6446, linssiseppa2-iPad13
4CE6C737-B056-4F73-9CEA-D2DABFC9B8FC. Käännös- ja laitevuorot Julkaisijalta ("NYT"; ilmoita "sammutettu").
Skriptit S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa-2/8e74262f-165d-4279-9d93-701effda9a78/scratchpad:
kaanna-jono.sh (proto-3d/tyokalut/linssiseppa-ajot) + ajo-*.sh (ajo-radio2.sh iPad pysty/vaaka, ajo-saatimet6.sh, ajo-kohde.sh
master-vertailu, ajo-radio3.sh äänikontrolli), ketju*.sh odottaa käännöstä ja lupatiedostoa ($S/laite-nyt, $S/laite-nyt-radio).
29.9. koko päivän: enintään 3 simulaattoria, GPU-työt sallittu päivällä (Päätoimittajan tiedote), käännökset nice 15.

## 1. KÄRKI: avaruuskävely (omistaja 29.9. "Kyllä, radion jälkeen")

- Suunnitelma docs/raportit/avaruuskavely-suunnitelma-20260929.md (7 vaihetta), Codex-tilaus lähetetty sellaisenaan
  (posti/fable-codex-avaruuskavely-kerrokset-20260929.md 06a0a84c7; vastaus codex-fable-avaruuskavely-kerrokset-*.md).
  Luonnos docs/raportit/codex-tilausluonnos-avaruuskavely-20260929.md (kerrokset, ankkurit).
- Proto-haara **linssiseppa2/avaruuskavely** luotu kohdasta ca610a6d (kyyti-saatimet), EI VIELÄ KOODIA. Tee ensin:
  1) IssKyyti.cs: KyydinTila.Ulkona + IssKuvakulma.Ulkona(iss) = Ikkunan kaava suunnalla Suuntima + 90 ja alas 45°
     (ζ ≈ 49°), kenttä ~70°. Kallistus yli ~55–60° pitkällä objektiivilla ei piirrä laattoja (näkyy pohjapallo #264e91,
     laite 29.9.), joten pysy siinä alle.
  2) Ydin/Iss/Avaruuskavely.cs: tilakone Ilmalukko → Ulos (4 s) → Köysi (napautus) → Auringonnousu (simukello kelaa ISS:n
     seuraavaan auringonnousuun ≤ 5 s; nousu kun auringon korkeus alapisteessä > −dip, dip = acos(R/(R+h)) ≈ 20,3°;
     Aurinko.Alihajapiste + Aika.Jd, kuten Ylilennot.Valossa) → Pulu (repliikit) → Kuva (napautus) → Vertailu → Takaisin.
     Testit Linssit-testeihin.
  3) Unity: AvaruuskavelyNakyma paikkamerkeillä (harmaat laatikot: kaide, käsine, luukku), kehittäjäkomento
     `astro kavely`, Pulu.Astronautti = true, repliikit tekstinä kunnes äänet tulevat.
- Pulun repliikit (Päätoimittaja, sanatarkasti): luukulla "[excited] Luukku on auki! [warmly] Kiinnitä köysi kaiteeseen
  ennen kuin päästät irti – täällä ei ole alas, on vain ympäri."; auringonnousu "[excited] Katso horisonttia! [warmly]
  Kierrämme maapallon puolessatoista tunnissa, joten aurinko nousee meille noin kuusitoista kertaa vuorokaudessa.";
  kuva "[amused] Hymyile, kamera on valmis! [warmly] Ota kuva – verrataan sitä astronautin oikeaan kuvaan samalta paikalta."
- Pelikoodari tekee 5 ääntä (ilmalukko-paine, ilmalukko-luukku, karabiini, hengitys-silmukka, suljin) + Pulun 3 repliikkiä
  radioversiona: proto-3d/lokit/avaruuskavely-aanet/ (tehosteet/, pulu/, pulu/kuiva/, aanet.json). Quindar-piippaukset
  (2 525 Hz, 250 ms) tekee peli itse. Tuonti kuten radion äänissä: WAV, ADPCM, normalize 0, pitkät Compressed In Memory.
- Avaus Pulun taulusta (Päätoimittaja): Linssiseppä 1 lisää haaraan linssiseppa/pulun-taulu rajapinnan
  `PulunTauluNakyma.LisaaRivi(tunnus, otsikko, selite, Func<bool> aktiivinen, Action toiminto, AstroMoodi? lahto)` ja kertoo
  SHA:n. Rekisteröi: `…Astronautti.Taulu.LisaaRivi("avaruuskavely", "Avaruuskävely", "<selite>", () => Avaruuskavely.Kaynnissa,
  Avaruuskavely.Aloita, AstroMoodi.Seuranta)`; paikka ISS:n sisälle -rivin jälkeen.
- Web päätetään erikseen natiivin jälkeen.

## 2. MERGE-PYYNNÖSSÄ (Natiiviseppä)

- **Radiolinssin uudistus** linssiseppa2/radiolinssi **9ee9136e** (metat f784f214, tuonti 9ee9136e) → 1.0.42-yhdistelmä
  25c7c971 (juna 76f6f422). Laitetestaajan "EI PASS rms 0" = mittausvirhe: asemat soivat MatkakirjaRadio.mm:n
  AVAudioEnginellä Unityn ohi, `aani mittaa` ei näe niitä; oikea mittari `radio tila` -rms (radio2: 0,18, moottori käy).
  Laitetestaaja mittaa radio tila -rms:n 25c7c971:stä — tarkista tulos (Natiiviseppä/Julkaisija). Kuvaparit
  proto-3d/lokit/linssiseppa2-laite-20260928-radio2/kuvapari-{rooma,napa,vaaka}.jpg, omistaja nähnyt ("hienolta").
- **Kyyti-säätimet** linssiseppa2/kyyti-saatimet **ca610a6d** (metat b40a43de): pilvet, vuodenaika, oma sijainti (haku ±51°,
  katse 200 km vain omalle sijainnille), siirtymä 4,80 s. Master-vertailu: Etna piirtyy masterissa ja haarassa (ei regressio).
- Säätöpaneelin nahka Natiivi-UI:lla (natiivi-ui/iss-nahka fb1465ed, pohja linssiseppa2/iss-paneeli a3926649).

## 3. TULOSSA

- **Kuunvaloradio** (omistaja: "Radio saisi olla kuun valossa kuvattu ja sen omat valot ja näyttö hehkuisivat"): Codex
  tilattu posti/fable-codex-radio-kuunvalo-20260929.md; samat kerrokset, nimet ja manifestin akselit + additiiviset
  hehkukerrokset (VU-tahdissa, pois-tilassa sammuvat). Kun tulee: vaihda Resources/RadioUusi ja kytke hehkut
  RadioNakyma.Codex.cs:ssä (PaivitaCodex: opacity VU:sta, 0 kun !nakyvissa).
- Codexin avaruuskävelyn kerrokset, Pelikoodarin avaruuskävelyn äänet, Linssiseppä 1:n LisaaRivi-SHA.

## 4. WEB

- Radiodata 182 maata PR ravelius/Matkakirja#3589 mergetty ja viety (v2391). Radion uudistus VAIN NATIIVI (omistaja 24.9.),
  webiin ei mitään.

## 5. OPIT

- `ui kierto vaaka` (ui-etuliite) kääntää iPadin; kuvatiedosto jää pystymuotoon, käännä kuvapariin 90°.
- Käännöspalvelun Burst AotLinkerException on satunnainen → aja uudelleen.
- Rajatut selvitykset Sonnet-ali-agentille (juurisyyt, data) — napaläiskä (napakansi ilman MixFogia) ja kohdetilan
  harmaa pinta ratkesivat niillä.
- Radiohaaran testikommentissa RadioTestit.VakiotKutenWebissa lukee "webin vastine Siirtosepälle" — virheellinen (vain
  natiivi); korjaa seuraavan radiomuutoksen yhteydessä.
