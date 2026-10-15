# Pelikoodarin luovutus 15.10.2026 ilta 4 (KOVA RAJA 35 %, Postivahti, klo 20.30)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus viesti-pelikoodari-luovutus-20261015-ilta3.md: kaikki sen kohdat hoidettu tai alla.

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md).
  PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03.
- Testit: `sh Linssit-testit/kaanna.sh` ja `sh Linssit-testit/unity-tarkistus.sh` (sh, ei zsh). Käännöstarkistus: L2 JU:lta → KÄÄNNETTY → NS + PT.
- Simuskenaarioissa ISS-komennot muodossa `linssi astro kyyti …` (EI `linssi linssi astro …` – se yrittää avata linssiä "astro", ei lokiriviä).

## ENSIMMÄISENÄ (PT 20.3x)
1. **pulu-mika-en-tunne JUNAAN 195** (omistaja 20.24): ääni ämpärissä `aanet/pulu/vapaalento-v1/livia-mika-en-tunne.mp3` (3,45 s), teksti
   "Tätä rakennusta en tunne, enkä halua arvailla." (main 89fe98821 docs/raportit/hyvaksytyt-tekstit-20261015-2024.md). Kuuluu "Mikä tämä on?"
   -vastaukseen (oma alue; ks. pelikoodari/mika-tama-on-195, junassa). Tee OMA haara juna-195:n päälle (ei pulu-tekstit-196:n), kytke teksti +
   ääni, L2 JU:lta → sha NS:lle runkoon 195 ja PT:lle. Ei aloitettu. (Siirtoseppä kytki vain kaupunkien kutsut 473d566ca.)

## Valmiit tässä vuorossa
- Etsimen kuvapari PT:lle (_tyo/pelikoodari/iss-kamera-195/kuvapari-etsin.png, KUVAPARI.md); teleobjektiivi-repliikki LAAJAlla ohi bf8c1bf42.
- PT:n etsinkorjaukset ef46a881c (julisteen mm = etsimen mm; etsin käytössä → ei automaattista Kuviin-tallennusta, jaa-napin "Tallenna kuva";
  julisteen otsikko "KANSAINVÄLINEN AVARUUSASEMA ISS" kaikissa julisteissa) → video 1 PT:lle (etsin-video-d3693575f.mp4, VIDEO.md).
- Kuun telekuvan kertojaääni pelikoodari/iss-fakta-196 06072c1c0, KÄÄNNETTY eaf2cbf18 → NS:lle junaan 195 (juna-195 sisältää jo).
- Raketin 4 faktaääntä: PT 19.5x EI kytketä (raita soi kaikilla lennoilla; tekstifaktat jäävät).
- Pulun chatin 5 tekstiä (omistaja 20.24): natiivi pelikoodari/pulu-tekstit-196 ba2778726 (L2 pyydetty JU:lta, juna 196), web PR #4651
  (ravelius/Matkakirja, pollo.js + livia-eleet.js; CI ei vielä alkanut → merge kun vihreä). Worker.js:n "Livia ei saanut…" ei muutettu (SK:lle kerrottu).

## KESKEN (kärki järjestyksessä)
1. **ETSIN, PYSÄYTYSKUVA + VIDEO 2** (PT 20.1x): pelikoodari/iss-kamera-195 **0c7fe3cb4** (pysäytyskuva rajaukseen kehityksen ajaksi:
   IssKyytiNakyma.PysaytaJaValahda → ScreenCapture → IssEtsinNakyma.Pysayta/Vapauta; alarivi katsepisteestä KyydinAsento). unity-tarkistus 0,
   Linssit 1879/1879. **L2 + ASENNUS jonossa JU:lla** (simu 39644E75, app _tyo/pelikoodari/iss-kamera-195-app/). Kun KÄÄNNETTY + SIMU NYT:
   `SHA=<käännös> zsh /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-etsin-video-195.zsh` (skenaario sk-etsin-video-195.txt:
   v0-kehitys = pysäytyskuva näkyy, v1-kortti). Sitten SIMU VAPAA JU:lle ja yhdistys:
   kopioi lokit/todistus-etsinvideo-195-*/etsinvideo.mp4 → _tyo/pelikoodari/iss-kamera-195/video/tallenne.mov; miksaa aani/etsinvideo.wav +
   etsinvideo-natiivi.wav 48 kHz:iin (amix normalize=0) → tallenne.wav; aja siirtoseppa-ajot/tallenne-yhdista.py (tekee .video.mp4).
   HUOM: skripti poimi väärän piippauksen (kertoja alussa) → tarkista merkin 1 kHz piippaus itse (ajossa 19.56 wav 3,65 s = video 3,643 s,
   siirto ~0) ja yhdistä ffmpegillä ilman siirtoa; leikkaa alusta merkki (-ss 4.5). Tarkista ruutuarkki: kehityksessä EI mustaa, ei Pulun haamua
   rajauksen kulmassa. Video + SHA PT:lle (PT → omistaja). Kytkin IssEtsin.Kaytossa pysyy false omistajan päätökseen asti.
   LCD näyttää aseman alapisteen (AstronauttiLinssi.Sijainti, dokumentoitu) – PT:lle kerrottu, ei muuteta.
2. **PULUN 5 ISS-VASTAUSTA** (PT 20.3x: äänitys + sama teksti kuplaan näille viidelle, muut kysymykset ennallaan elävälle Pululle; PT kirjaa
   poikkeuksen 5.10. säännöstä): äänet `aanet/pulu/iss-kysymykset-v1/pulu-iss-kysymys-{lentokone,tulivuori,muuri,musta-taivas,auringonnousut}.mp3`
   (paketti _valmiit/pulu-iss-vastaukset-vienti-20261015), tekstit main eec551f5c docs/kohtaukset/iss-yotaivas/iss-pulu-kysymykset.json.
   Paikka: ISS-ohjaamon Pulun chatin valmiit kysymykset (LinssiKysymykset.AstroTila "ohjaamo"; web-lähde js/linssit/astro-kysymykset.js →
   paketin moduuli; natiivi PuluChat.NaytaLinssinValmiit näyttää 2 kysymättä jäänyttä, VastaaLinssinValmiilla → elävä vastaus taustatiedolla).
   Tee näille viidelle oma polku: kysymys siruna, napautus → teksti kuplaan + mp3 Pulun äänellä (Puhe-luenta pois päältä tälle). Chippejä
   enintään rivi; jos liikaa, vaihtuvasti 3. Junaan 196, kuva PT:lle.
   + **KOHOKOHDAT** (omistaja 20.27, PT): kysymykset liitetään ISS-kohdevalikon kohokohtiin; kohokohdan avaus → liitetty kysymys Pulun chatissa
   valmiina ehdotuksena. Siirtoseppä tekee datan (kysymys-id), Pelikoodari chat-puolen. Toimeksianto
   /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/iss-kohokohdat-20261015.md (ei vielä luettu).
3. **Pulun 49 chat-ottoa** tulossa Äänittäjältä (iss-aanettomat / pulu-chat-odotus-*): kytke kun ämpärissä (odotusrivit PuluChat Yleiset/
   Vastausmietinnat; tekstit ba2778726:n mukaiset).
4. Äänittäjä 20.3x: ämpärissä isoisan-uni-alkusoitto (aanet/isoisan-uni-v1/, 45,8 s) ja Pulun aloitus-ohje, kesäyön opetus, maapallo
   (aanet/pulu/isoisan-uni-v1/…; paketti isoisan-uni-pulu-kesayo-vienti-20261015). Kytkijä epäselvä (isoisän uni = NUI 580f28994?) → kysy PT:ltä.

## Avoimet / seurattavat
- Proto-worktreet: -iss-kamera-195 (kesken), -iss-fakta-196 (junassa, poistettavissa), -pulu-tekstit-196 (L2:lla), aiemmat ks. ilta3.
  Main-worktree /Users/Shared/Claude/wt/pelikoodari-pulu-tekstit (PR #4651; poista `tools/uusi-worktree.sh --poista` mergen jälkeen).
- Etsimen pysäytyskuva vie ~22 Mt (koko ruutu) kehityksen ajan; jos muistivaroituksia, rajaa tekstuuri rajaukseen.
- Simu 39644E75 sammutettu ajojen jälkeen (todistusajo sammuttaa).

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-pelikoodari-luovutus-20261015-ilta4.md
(haara pelikoodari-luovutus-20261014-paiva). Ensin pulu-mika-en-tunne junaan 195 (NS), sitten etsinvideo 2 (odota JU:n KÄÄNNETTY 0c7fe3cb4),
sitten Pulun 5 ISS-vastausta + kohokohdat (PT local_5df52e10-10e4-4b72-9554-0049db300dfe)."
