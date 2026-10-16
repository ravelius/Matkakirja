# Pelikoodarin luovutus 16.10.2026 aamu (KOVA RAJA, Postivahti + PT 05.2x, klo 05.3x)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261016-yo: kaikki kohdat hoidettu (alla).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md).
  PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
  Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
- Testit (worktreen juuressa): `sh Linssit-testit/kaanna.sh`, `sh Peli-testit/kaanna.sh`, `sh Linssit-testit/unity-tarkistus.sh`.
- Ajotyökalut /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ (SHA=… UDID=… zsh ajo-….zsh). Oma simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19.
- HUOM 05.29: omistaja keskeytti simuajon (työkalukutsu hylätty) → ei simu- eikä testiajoja ennen kuin omistaja/PT sanoo.

## ENSIMMÄISENÄ: max-q-jäätymisen selvitys (PT 05.1x, Valosepän löydös 2) – KESKEN
Tausta: _tyo/linssiseppa2/iss-nyt/ARVIO-0349.md. Satunnainen 4–7 s jäätyminen ISS-raketin laukaisussa.
Mitattu (kehysajat-lokit, lokit/todistus-iss-nyt-video-20261016-*):
- v2 (0224, iPad A26BC7D0): 7000 ms ruutu app-t 83,4 (videon 2,9 s) + 2817 ms 74,7 – paketin taustalataus (esilataaja, 862 tiedostoa)
  jatkui vielä laukaisun aikana (paketti valmis rivillä 1467, laukaisu 940).
- v5 (0344): 6782 ms ruutu app-t 98,4: max-q-vonkuna soi 4,2 s myöhässä (raidan 47,75 s, piti 43,5) → jäätyminen alkoi ENNEN ääntä;
  ruutu päättyi täsmälleen riviin "peli-komento: 98.38 aani mykistys" (testiajon komentotiedosto). Paketti oli valmis ennen laukaisua.
- v4/v5b: ei jäätymistä. Omat toistot iPhonella (5c4a2265a): 3349 ms t=84,6 (laukaisun jälkeen, ennen max-q:ta; samassa ikkunassa
  "cupolan esihaku 2: 4917 laattaa"), toisessa 2766 ms t=43; max-q-kohta ajallaan.
- Pinonäyte _tyo/pelikoodari/raketti-jaatyminen/vaara-prosessi/sample-051951.txt oli VÄÄRÄSTÄ prosessista (pgrep -n osui Valosepän
  iPad-simuun), mutta osoittaa yleisen ongelman: pääsäikeessä Esilataaja.LataaTiedosto → File.Delete + File.Move (rename) vei 5,7 s / 75 s
  (simulaattorien data ulkoisella T7-levyllä, kuormassa). CupolaEnnakko itse halpa (~0).
HYPOTEESI: pääsäikeen tiedosto-operaatiot (Esilataaja LataaTiedosto -valmistuminen: Delete/Move/Liita; komentotiedostojen luku;
KehysMittari File.AppendAllText 5 s välein) jumittuvat sekunneiksi kuormitetulla levyllä → simulaattoriympäristön ilmiö, laitteella
harvinaisempi. TODISTAMATTA omasta prosessista.
SEURAAVA ASKEL: aja `SHA=5c4a2265a UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh ajo-raketti-jaatyminen.zsh` (korjattu: pgrep UDID:n
mukaan, vain uudet ajokansiot, sample 110 s) 2–3 kertaa, kunnes kehysajat > 2000 ms → katso sample-*.txt pääsäie (python-jäsennin
luovutuksen keskustelussa: KORUTIINI/UPDATE-summat). Jos File.Move/Exists/AppendAllText: siirrä Esilataajan valmistumisen tiedosto-
operaatiot taustasäikeeseen (Task.Run + yield until done) omaan haaraan pelikoodari/maxq-jaatyminen-196, testit, L2 JU:lta, todenna simussa.
Jos jokin muu: korjaa se. PT:lle ≤ 3 riviä.

## Tässä vuorossa valmiit
- KOHTAAMINEN-196 59b2068b5 (KÄÄNNETTY 72130d533): video äänineen PT:llä, sha NS:lle junaan 196. _tyo/pelikoodari/kohtaaminen-196/.
  A (tuplanapautus → lappu) todennettu oikealla kosketuksella. B (Macin osoitinlevyn hipaisu) → omistajan TF-testiin (yöllä Mac-ikkuna piilossa
  → appi 1 fps; skripti pelikoodari-ajot/mac-hipaisu-tupla-196.zsh valmiina päivälle). Skenaario: Marseille + `peli tutki vaikea`
  (Pariisi/Marseille `tutki` avaa aarretehtävän).
- TAIDEMUSEO-196 87abe30c3 (KÄÄNNETTY 5c4a2265a), peilattu: kävely V2 + testit (KavelyV2SilmanKorkeudellaJaKatseEdella,
  KavelyV2JatkuvaJaKatseEnintaan12AstettaYlos), Äänittäjän lattia-askeleet (parketti v2, marmori v2b; MuseoAskeleet V2-tilassa),
  QA `museo jatka`, SK:n kohtazoom 9d5e51692, tauon napautus katkaisee myös Auto Zoomissa (5a55e5360), katse ylös ≤ 12° (87abe30c3).
  Linssit 1882/1882, unity 0. LOPULLINEN VIDEO PT hyväksyi → KK:lle korttina: _tyo/pelikoodari/taidemuseo-196/lopullinen-5c4a2265a/.
  Kytkin MuseoKierros.KavelyV2 = false, kunnes omistaja hyväksyy → sitten kytkin päälle (+ Auto Zoom oletukseksi, jos PT/omistaja sanoo) ja NS:lle.
  Paspartuu + otsikkovarjo (PT:n huomiot 1–2) = olemassa olevaa museon ulkoasua (A/B ab-v2-pois-vs-paalla.png) → Linssisepälle erikseen (PT).
- c16017d01 "Kuva tarkentuu…" ⊂ natiiviseppa/juna-196 (kuitattu PT:lle, ei kytkintä).
- Levysiivous 4,7 Gi (kuitattu Postivahdille). Jäljellä: worktreet kohtaaminen-196, taidemuseo-196 (poista mergen jälkeen) ja iss-ukkoset-196
  (3e4adfe3e Valosepän iss-efektit-196:n kautta, ei vielä juna-196:ssa).
- Työlistan 3 kohdassa ei avointa PK-osaa (PT päivittää tilanteet).

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-pelikoodari-luovutus-20261016-aamu.md
(haara pelikoodari-luovutus-20261014-paiva). Jatka max-q-jäätymisen selvitystä (ajo-raketti-jaatyminen.zsh, pinonäyte omasta prosessista),
kun simuajot ovat taas sallittuja; taidemuseon kytkentä odottaa omistajan vastausta."
