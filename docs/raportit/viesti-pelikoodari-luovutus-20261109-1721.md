# Pelikoodari: luovutus 09.11.2026 klo 17.21

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (28 %). Edellinen: `git show da7bee259:docs/raportit/viesti-pelikoodari-luovutus-20261109-1700.md`
(sen kohdat hoidettu tai alla). Kuvat ≤ 1000 px (PIL-arkki scratchpadiin), laajat haut Sonnet-agenteilla.
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), nyt haarassa pelikoodari/pariisi-nimiaanet.

## TEHTY TÄSSÄ VUOROSSA
- PÖLLÖ-WORKER (PT:n jono): PR ravelius/Matkakirja#6520 squash 894271c7b mainiin → pollo-julkaisu.yml julkaisee. Syy: testiliikenteen
  Haiku 5.5 (UA proto3d/kehitys) kirjoitti isoisän merkinnän kanssa koko 200 tokenin katon (Workers-loki out=200) → 200 + tyhjä lista;
  tuotannon Sonnet 5.5 toimi. Korjaus EHDOTUSTEN_LOPPUOHJE käyttäjäviestin loppuun. PT kuittasi.
  TEE: tarkista julkaisu livenä (Actions pollo-julkaisu vihreä), sitten curl: runko /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/
  85818931-d3b2-42e2-a10f-5f23fcbc6b5c/scratchpad/runko2.json, otsakkeet `-H 'x-matkakirja-natiivi: app.matkakirja.proto3d'
  -A 'Matkakirja/1.1 (app.matkakirja.proto3d)' -H 'x-matkakirja-aikuinen: 1'` (UA:n pitää sisältää tunniste) → odotus 2 Eiffel-kysymystä.
  Cloudflare-loki: /private/tmp/…/scratchpad/loki.sh (source ~/.zshrc; telemetry query, "kulu: … out=").
- OMISTAJAN PÄÄTÖS 17.12 "Kelpaavat" (nimet + alut, junaan 224):
  - Vientipaketit (SHA256SUMS OK): /Users/Shared/Claude/proto-3d/_valmiit/luennat-v8-vienti-20261109 (aanet/luennat/v8: v7 9 241 + 26 =
    9 252 palaa; 15 v7-avainta uudella otolla, 11 uutta; LAHTEET.md listaa id/avain/kesto/tagi) ja _valmiit/pariisi-nimet-v1-vienti-20261109
    (aanet/opas/pariisi-nimet-v1: n001…n130.mp3 + nimet.json {"versio":1,"nimet":{"pariisi:<kartan nimi>":{teksti,url,kesto_s}}}).
  - Natiivi bda9945bf (natiivi-backup pelikoodari/pariisi-nimiaanet, juna-223 85d3bab39:n päällä): Valmisluennat.ManifestiOletus v8;
    UI/KohdeNimiaanet.cs (Tietokortit.Avaa → Soita: vain Pariisin 20 km säteellä, ei jos Kohdenostot.Kohde(qid,nimi) != null, Puhe.Soita(url));
    kultainen Peli-testit/Kultaiset/valmisluennat-v8 (+ pariisi-alut.json), testi PariisinAlutOsuvatV8Kansioon. Valmisluennat 11/11, unity-tarkistus 0.
  - JU:lle lähetetty 17.1x: vienti ämpäriin ensin, sitten ajo skenaariolla
    /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/pariisi-nimet-20261109/sk-pariisi-nimiaanet.txt (odotukset tiedoston alussa).
    TEE kun JU vastaa: kuvat + loki katsottuna ("nimiääni: 130 nimeä ladattu", "pariisi:Pompidou-keskus soi", Concorde ei nimiääntä ja
    "valmis kappale … ← <a01-avain>.mp3" v8/k/) → PT:lle ≤ 3 riviä → junaan 224 bda9945bf.
  - HUOM yhteensovitus: Karttaseppän natiivi-backup karttaseppa/tietonapautus (d5aea75b7, JU:lla) muuttaa NostotKartalla.TietoNapautus:
    nimi, jolla on kohdenosto, avaa esittelyn (ei Tietokortit.Avaa). Ei ristiriitaa: oma kytkentä on Tietokortit.Avaa-metodissa.
  - Riski: 11 uuden alun teksti/tagi (Sainte-Chapelle, Grand Palais, Tour Montparnasse, Tuileries'n palatsi, 7 hahmotelma-ihmettä) on päätelty
    webin/paketin teksteistä; jos natiivin luenta ei osu (loki "palavirta" eikä "valmis kappale"), vertaa NostoluentaVienti-viennin tekstiä
    alut/lista.json:iin (Lukijaaani.LuennanPalatJaTagit: [pause] jos kappaleita/lainaus perässä).
- JU:n ajot katsottu: liiketappi2 678376fbb ok (pieni iPad: tappi irti RANSKA-kartussista, kierto jatkuu o-2…o-4; iPhone ok) ja
  pulu-mallinostot 4c49da614 iphone ok 3/3 → PT:lle kuitattu "junaan" 17.2x.
- JU:n kysymyslista (oviaukko, viivat, muurin porras, rungon muutos, lataus +6 s, juna 218, verkon palautus, eunukin sivuvika, ovilehdet,
  ovet, kulkukartan seinät; KK pyysi ennen TF 224): vastattu "ei tiedossa" kaikkiin (ei luovutuksessa eikä lokissa). Jos JU antaa ajopolut, katso.

## JONO (järjestyksessä)
1. JU:n nimiääni/v8-ajon tulos (yllä) → PT.
2. PT 17.1x: SISÄLTÖVIENTI d8dcdc43a (KS Lontoon 14 kylttiä) käynnistyi automaattisesti ilman PK:n vahvistusta → tarkista jälkikäteen
   viittaukset (julkaistu TF 223 hakee mediasta: ei rikkinäisiä kuva-/QID-viittauksia) → rivi PT:lle "ok" tai mikä rikki (muisti: media-vienti = julkaisu).
3. LONTOON 14 NOSTON PULUN KYSYMYKSET (PT 17.1x: tee nyt): kohdat kohdekartta:lontoo:<nimi>, 2/kohde, luonnokset
   /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/nostot-korostetut-20261109/LONTOO-14-TEKSTIT.md (rivit "Pulu:"; PT luki), jutut PR #6519.
   Putki: Pulu v3 / FRA-paketin tapa (aiempi työ: _tyo/pelikoodari/pulu-mallinostot/, natiivi-backup pelikoodari/pulu-mallinostot 4c49da614;
   valmistele-/yhdista-mallinostot.mjs ja pulu-esigenerointi/MALLINOSTOT – sijainti etsittävä: `git log --all --oneline -- '*mallinostot*'`
   päärepossa ja natiivissa), uusi PULU_VERSIO v4.
4. Kun kaikki kuitattu: "JONO TYHJÄ: Pelikoodari" PT:lle.

Testit: `cd Peli-testit && sh kaanna.sh <osa>`, `sh Peli-testit/unity-tarkistus.sh`; pöllö: `node --test tests/pollo*.test.mjs` (224/224).
