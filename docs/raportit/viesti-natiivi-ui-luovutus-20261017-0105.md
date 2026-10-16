# Natiivi-UI: luovutus 17.10.2026 klo 01.05 (Postivahti: kova raja 37 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; -yo (00.1x) ja vanhemmat on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, remote natiivi-backup.
Ennen käännöstä `zsh tyokalut/tarkista.sh` (0 virhettä); Linssit-testit `bash Linssit-testit/kaanna.sh` (EI zsh: CS0006).
Omistaja pyysi julkaisua 01.03: juna 198 lähtee yön valmiilla erillä → kaikki alla olevat junaan 198, kuvat PT:lle sitä mukaa.

## VALMIIT TÄSSÄ SESSIOSSA
- Museon korttikuvat (junan 197 lukitusehto) KK:lle ja PT:lle: lokit/todistus-museo-kortit-{iphone-197-20261017-0035,ipad-197-20261017-0042},
  leveät teokset lokit/todistus-museo-leveys-iphone-198-20261017-0047 – kaikki ok. NS yhdisti 716614385:n (juna 197 = 04174fdc5).
- Web PR #4746 (lukijan valinnat pois; natiivin kultainen jälki ennallaan) MERGED. Web PR #4750 ("yöllä" pois ISS-nimistä, 13 nimeä) MERGED.
- Levy: 5 omaa museozoom-videota pois; _tyo/natiivi-ui: museo-fontti- ja museo-juna-197-app pois. museo-nimi9-197-app JÄÄ (Karttaseppä).

## JUNA 198 -JONO (PT:n järjestys)
1. MUSEO ☰ POIS + KEVYET YMPYRÄT (omistaja 00.58/00.59): natiivi-ui/museo-kevyt-198 **0e98aa62c** (04174fdc5 päällä, tarkistus 0).
   KortinLukija valikko-ehto (MuseoTaulu.LukijaValikko = false), MuseoTaulu.KevytRengas = true (ei hehkua, 0,75 pt kerma, hiusviivat
   Kehys.Bg, valittu Erikois.AktiivinenOranssi). Testi: `ui museolukija 0|1`, `ui museorengas 0|1`. Käännös jonossa
   (ketjut-20261016/museo-kevyt-198-kaannos.zsh → _tyo/natiivi-ui/museo-kevyt-198-app, seuranta museo-kevyt-198-ketju.out).
   → Julkaisijan SIMU NYT → `zsh tyokalut/natiivi-ui-ajot/ajo-museo-kevyt-198.zsh <app-kansio> 123B4B25-36B7-4A76-B677-905621CD8F5A iphone`
   (sk-museo-kevyt-198.txt: Yövartio R1–R4 NYK|UUSI) → polku PT:lle (→ omistajalle ennen kytkentää; kytkimet ovat jo päällä oletuksena,
   PT voi pyytää oletukset pois, jos omistaja ei hyväksy).
2. ISS-KOHDELUETTELO (omistaja 00.32): natiivi-ui/iss-luettelo-198 **d79750cc0** (⊃ 04174fdc5; agentin 0efcffde8). Kategoriat ruutuina
   (Kategoriat), iPad 4 saraketta (leveys ≥ 600 pt ja lyhyt sivu ≥ 600), reuna 0,5 pt HarmaaKuulto.Reunus, nimet Koko.Apuri,
   Kirjasin.Mittari kapiteeleina (MittariNimet). VALKOINEN TAUSTA = Cupolan kuvakerrokset (2732×2048) poistuivat Kuvat-välimuistista
   pikkukuvien alta → IssKyytiNakyma kiinnittää ne (Kuvat.Kiinnita), pikkukuvat HaePienena 384×256; loki "cupolan kerros tuhoutui".
   Testi: `ui linssi kohdevalikko kategoriat 0|1`, `… kategoria <n|kaupungit|kaikki>`, `… mittari 0|1`. Käännös jonossa (Julkaisija piti
   odottajaa PT:n järjestyksessä KS → PK raketti jälkeen; seuranta iss-luettelo-198-ketju.out). → SIMU NYT → ajo-iss-luettelo-198.zsh
   iPad (udid F7513985-C8BC-4E97-8D29-9C9BD420E962) + iPhone (sk-iss-luettelo-198-<laite>.txt: L0 NYK, L1–L4 UUSI + vieritys) → PT.
   Kohta 6 (yöllä) tulee ämpärin viennistä (#4750).
   CUPOLAN NIMET (KK:n löydökset 2–3, omistajan kuva iss-linnunrata-katkeaa-0043): natiivi-ui/kupoli-nimet-198 **08222841b** (04174fdc5):
   KupoliNimisto.KallistusPois 0,06→0,15 / täysi 0,22→0,3 (Bergen), TaivasNimet.NimiVoima 0,35 + NimiArvo 0,15 (Revontulet).
   Linssit 1961/1961. EI vielä käännetty eikä kuvattu: yhdistä iss-luettelo-198:aan tai käännä erikseen, kuva Cupolasta yöllä
   pohjoisessa (`astro kyyti revontulet iss` vie revontulten hetkeen) → PT. Löydös 1 (pikkupallon harmaa laatikko) = Karttaseppä.
3. KS:N SKANNERIN KORKOKUVA: MUOTO.md kuitattu (k-/v- ok, Etsi/Tunnus Ydin-puolelle KS:n haarassa, lahteet json:ssa). KS lähettää SHA:n.
4. KAMERAPÖYTÄ (omistaja 00.50 + "Kyllä, kaikki kolme": laukaisin, etsimen kulmat, SEURAA): Opus-agentti TYÖSSÄ worktreessa
   /Users/Shared/Claude/wt/proto-natiivi-ui-kamerapoyta-198 (natiivi-ui/kamerapoyta-198, pohja 04174fdc5). Tarkista `git log`:
   jos agentin commit puuttuu, agentti ei ehtinyt → jatka itse (ohjeet: Kaytossa=false, vain pohjat ohjauspöytä/IssKuvagalleria/
   IssEtsinNakyma, testikomennot `ui linssi kamerapoyta …`, SEURAA vain jos linssin API on; puuttuva pohja → PT). Kuvapari iPad + iPhone
   PT:lle ENNEN kytkentää.
5. SKANNERIN PIIRTO KS:n datalla (omistaja 00.53): <tunnus>-viivat.json (keskusta, rannat, joet, alue; u/v korkeuden ruudukossa) IssSkanneriin
   samalla vihreällä pohjalla, keskusta pisteenä, rannat/joet/alue kirkkaampana viivana; lahteet-rivi näkyviin. Kuvapari Kiova + rannikkokaupunki
   PT:lle ennen kytkentää.

## JUNA 197 -JÄÄNNÖKSET (simuvuoroa odottavat, Julkaisijan SIMU NYT erikseen kullekin)
- CUPOLAN OHITA ESITTELY (omistaja 00.12): natiivi-ui/cupola-ohita-197 **6ff9c6350** (⊃ PK 041942137 OhitaEsittely/EsittelyKaynnissa
  + SS aanipohja-197). IssLoppuvalinta: raketin Ohitan rivinappi (IssOhjaus.Valikkorivi, Moderni) oikeaan reunaan; `ui linssi ohitaesittely
  nayta|kiinni|paina`. Käännös jonossa (Julkaisija: lukossa LS:n jälkeen; seuranta cupola-ohita-ketju.out). → ajo-cupola-ohita-197.zsh
  iPhone (video + ääni) → PT. PT: jos SS 9db0288e9 ei ehdi 197:ään, myös tämä 198:aan.
- LASIPOHJA-197 (PT 00.3x, pakollinen): natiivi-ui/lasipohja-197 **37c340b82** KÄÄNNETTY (556d85da5, _tyo/natiivi-ui/lasipohja-197-app).
  Lasipohja.Kirkkaalla (sävy 0,4 peittävänä: Äänet, videopelikortti, Pulun lämmin lasichat), ohjaamo pois Luokat-listasta, Lasitausta
  herättää levossa olevan pallon (PallonLepo.Muuttui). → SIMU NYT → ajo-lasipohja-197.zsh iPhone (sk-lasipohja-197.txt) → PT; jos ok, SHA NS:lle.

## Muuta
- Karttaseppä tekee pikkupallon harmaan laatikon + 51,6°-rajat (Sijaintipallo.cs, yksi kirjoittaja) ja vihjevarjon (kuvapari sinulle ja VS:lle).
- Sisältökirjurin Ranskan kohdat.json (#4743) → Resources/Museo/ranska/kohdat.json VASTA PT:n luvalla (ennallaan).
- _tyo/natiivi-ui .app:t nyt: museo-kortit-197, museo-nimi9-197 (KS), lasipohja-197; tulossa cupola-ohita-197, iss-luettelo-198, museo-kevyt-198
  → pidä 2 uusinta + käytössä oleva, poista museo-kortit-197-app kun seuraava on varmistettu.
- Worktreet (proto): cupola-ohita-197, lasipohja-197, iss-luettelo-198, kupoli-nimet-198, museo-kevyt-198, kamerapoyta-198 + vanhat
  museo-*-197/198, lukija-197, pohja-liikepohja (poistettavissa mergen jälkeen). Web: natiivi-ui-iss-nimet ja natiivi-ui-lukija-valinnat
  (molemmat mergetty → `tools/uusi-worktree.sh --poista`).

## Opit
- juna-197 menetti taas tarkista.sh:n suoritusoikeuden (100644) → käännöspalvelu "permission denied" ilman käännöstä. Tarkista
  `git ls-tree <sha> tyokalut/tarkista.sh` ennen käännöstä; korjaus `git update-index --chmod=+x`.
- Linssit-testit/kaanna.sh on sh-skripti: zsh ei pilko -r-listaa → CS0006 Metadata file. Aja `bash`.
- Kuvat-välimuisti (300 Mt iPadilla) tuhoaa vanhimmat tekstuurit → valkoinen pinta. Iso pysyvä kuva näkymän ajaksi Kuvat.Kiinnita.

## Lisäys 01.08
- Cupola Ohita KÄÄNNETTY b38e4dbb4 (6ff9c6350) → _tyo/natiivi-ui/cupola-ohita-197-app; lasipohja-197 → lasipohja-197-app.
- Julkaisijan simujärjestys: LS (~01.20) → NS iPad → NUI Cupola-video → NUI lasipohja iPhone → PK mittaus → museo-kevyt + iss-luettelo
  (niiden käännökset pidossa NS:n rungon ja KS:n jälkeen, jatkuvat itse). Käynnistä kukin vasta Julkaisijan SIMU NYT -viestistä.
