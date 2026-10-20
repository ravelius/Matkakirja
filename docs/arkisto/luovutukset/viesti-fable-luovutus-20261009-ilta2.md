# Päätoimittajan luovutus 9.10.2026 klo 17.5x (oma nollaus, konteksti 67 %)

Syy: Raamattu KONTEKSTIN NOLLAUS → FABLEN OMA NOLLAUS (raja 65 %). Session id ennallaan local_593b89a1-2514-4d74-b956-2a73db862382.
5 h 18 %, viikko 25 %. Keskustelu tallennettu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-09-klo-1525-1755.md.
Edellinen luovutus: viesti-fable-luovutus-20261009-ilta.md (15.2x). Työjonot: scratchpad/tyojonot.md (päivitetty 17.5x).

## 1. Juna 173 on AUKI (omistajan päätös)
- Omistaja 17.2x sanatarkasti: "kyllä voidaan myös tänään julkaista mutta kerätään niin paljon kokoon kunnes sanon että nyt on hyvä hetki".
  → Kaikki kuittaukset menevät avoimeen junaan 173. Julkaisu (myös tänään) vasta omistajan "nyt"-sanasta. Silloin PT kuittaa lopullisen BUILD-SHA:n
  ja kirjoituttaa muutoslokin uudelleen (Natiiviseppä kirjoittaa, PT tarkistaa). Julkaisija pitää TF 173:n pidossa siihen asti.
- Runko natiiviseppa/juna-173, viimeisin ilmoitettu fc79489c3 (L1246/P442/K453, unity 0). Kuitatut tänään 15.3x–17.5x:
  - LS1: nykyintro-173 bf0017f1b (kuva-arkki #4300), tuuli-vasa-173 c3dee6f41 (⊇ soundly f5088ce94 + puhdas-tuuli eb983f45a; tuuli v3 HP 280 Hz; Vasan katse_suunta).
  - Pelikoodari: kaupunkijakso-intro 35393b309 + 2ae1b0e1a (intro linssipidon ohi, hiljainen kello musiikki pois), valmisluennat-kultainen 970355d5d (testit).
  - Siirtoseppä: juna173-historia 4792cf9e4 (arvio 10 puhdas, #4301).
  - NUI: foto-v3 9de8361f9, nyt-rivi b08c47595, kieli 773d7e09e → f0f2e436f → d2e46ee50 → 174cd9b73 → fa777a580 → 7d1bf4a63 (UI-kansio valmis, 1304 avainta).
  - LS2: vesi-v5 f7d6156d2 (vesi 40 km, kuvapari 0c173e35e) — kuitattu 17.5x, Natiivisepälle lähetetty.
  - OHITETAAN: NUI d00e429f8 (tähtien iso v3 → v2). v3 pysyy, kunnes Codexin korjattu v4 tulee.
- Tulossa junaan (kuittaa, kun valmis):
  - Vouti v4 (LR vie v44/hahmot → Siirtoseppä kytkee) + voudin keskustelukamera kasvojen puolelle (Siirtoseppä, kuva-arkki).
  - Vasan kuva-arkki (LS1; #4302 on julki f60fed15d, BUILD 172 -pikatarkistus OK). Huono kuva → katse_suunta pois datasta.
  - Varjot (LS2, c166e6799 toimii): mobiili 2048² × 2 kaskadia → Natiivisepän kustannuskuittaus → oletuksena päälle.
  - Kaukomaan yövalot (Karttaseppä, _valmiit/kaukomaa-yo-vienti-20261009) → vienti Natiivisepän kuittauksen jälkeen → LS2 kytkee.
- Osoittimet: uusin-3 → v6e (prefektuuri, Google-sävy; Julkaisija 16.25). uusin-2 pysyy v6b:ssä (omistajan nykyiset TF:t).

## 2. Kesken ja omistajalle
- **Omat mallit (KL, Riddarholmen):** LR:n KL v3b + Riddarholmen v2b (spiiran tumma ydinkartio, AO). v6g kuvattu: Riddarholmen hyvä, KL:n
  keskirisaliitin AO-laikut + pääkaton ruutukuvio → LR korjaa → LS2 v6h (KL v3c) + kuvapari. PT katsoo ensin, sitten OMISTAJALLE hyväksyttäväksi
  (prefektuuri v6b/v6c/v6e-vertailu mukaan). Natiiviseppä kuittasi muistin (+2,4 Mt). Osoitinta ei vaihdeta ennen omistajaa.
- **Notre-Dame:** Codex-pilotti #57 hylätty (tornien pyramidikatot, etelän ruusuikkuna puuttuu, IoU 0,92). Fotogrammetriaselvitys
  scratchpad/fotogrammetria-nd-kl-20261009.md: koko ulkopuolen restauroinnin jälkeistä mallia ei ole; Diolez Fab-länsijulkisivu 45–134 € (kuvia ei
  nähty); francois.bouillen CC BY -malli on SISÄTILASKANNAUS (PT tarkisti kuvasta) eikä kelpaa. Googlen ND on restauroinnin aikainen
  (docs/raportit/google-nd-20261009.md). Omistajalle kerrottu. ND-suositus tehdään tekoälypintakokeen jälkeen.
- **Tekoälypinnat (omistaja 17.3x kortti "Kyllä, kokeillaan (suositus)"):** ComfyUI + SDXL + ControlNet union + IP-Adapter T7:llä
  (/Volumes/T7 4TB/Matkakirja-karttaseppa/tekoalypinnat/, 14 Gt, LAHTEET.md; ei FLUX.1-deviä eikä Hunyuania). KL-koe: valokuvamainen, massat ja
  katot osuvat, ikkunat osin väärin (64–82 % reunoista ±3 px). Karttaseppä hioo (ikkunat ≥ 90 %, pilvinen valo). LR (pinta.py): Olavinlinnan
  pilottiseinä + ND eteläjulkisivu → projisointi → vertailu (nykyinen / Codex / uusi) PT:lle → omistajalle. Omistajalle vain pelikuvia.
- **Codex:** C5 v2 #58 hylätty (P1 7 %), C5 v1 pysyy. Olavinlinnan seinäpilotti tilattu (posti 227c8acbb). Tähtien iso kuva v4 tilattavana.
  Sisältökirjuri tarkistaa postin nyt tunneittain (cron :17); 16.24 ja 16.46 toimitukset jäivät ilmoittamatta.
- **Pilvikrediitit (omistaja 15.3x, 250/250 $):** ajo 13.27 oli pilvessä samalla tilillä, mutta se kirjattiin tilauksen käyttöön. Linja:
  pilveen vasta, kun 5 h- tai viikkoraja on täynnä (cron vaihe 0). Muisti pilviajot-remotetrigger päivitetty.
- **Unity 6.7 (omistaja kysyi 17.3x):** raporttia ei vielä ole. Natiiviseppä tekee tuonnin illalla, kun käännöksiä ja simuja ei ole.
- **Soundly:** erät 1b–1d Pelikoodarilla taustalla; aukoista ostolista omistajalle. Omistajan päätettävät (viim. 1.11.): tilauksen pituus +
  Soundlyn kirjallinen vahvistus päivityksistä, MYÖH-erä (VAIN EUROOPPA), uskonnolliset resitaatiot.
- **Raportit mergetty:** #4297 Italia, #4303 Eurooppa (kuvalait), #4299 arvio 6 + kuori, #4300 nykyintro, #4301 arvio 10.

## 3. Raamattu ja loki
- Kirjattavat lokiin: scratchpad/kirjattavat-20261006.md loppu (nykyintron musiikki, pilvikrediitti, omistajan julkaisupäätös 17.2x,
  tekoälypinnat 17.3x) → seuraava loki-PR (junan aikana Julkaisijalle, muisti loki-merget-junan-aikana).

## 4. Roolit (nollattu tänään PT:n käskystä: NUI 15.25, LS1 16.0x, LS2 16.25, Siirtoseppä 16.57, LR 17.10)
- Natiiviseppä: avoin juna 173, kuittaukset; Unity 6.7 -tuonti illalla.
- NUI: UI-kieli valmis; oma seuraava suositus (näkyvä UI-parannus).
- Pelikoodari: Soundly 1b–1d taustalla.
- LS1: Vasan kuva-arkki.
- LS2: v6h-kuvat → varjojen mobiiliasetukset → laattavarjokoe (Googlen leivotut varjot vs LIVE-aurinko; vaihtoehto URP-decal).
- LR: vouti v4 vientiin, KL:n risaliitti ja katto, tekoälypinnat (pinta.py).
- Siirtoseppä: vouti v4 kytkentä + keskustelukamera.
- Karttaseppä: tekoälyputken hionta; yövalot vientiin; pienet sisäjärvet < 20 km (Googlen valkoiset läiskät) jonoon.
- Sisältökirjuri: Olavinlinnan seinäpilotti, tähdet v4.
- Julkaisija: TF 173 pidossa; Codex-posti.

## 5. Rutiinit ja ansat
- JONOKIERROS-cron (7, 27, 47) luotava uudelleen; vaihe 0 get_usage self (55 % tila, 65 % nollaus) + rajat (≥ 95 % → tekstityöt pilveen).
- SendMessage Claude Desktop -sessioille rajoittuu 10:een per omistajan viesti → käytä mcp__ccd_session_mgmt__send_message (hook neuvoo).
- Roolin nollaus: luovutus + clear_session self samassa vuorossa; ÄLÄ lähetä roolille muuta nollauskäskyn jälkeen. Aloitusviesti + RC PT:ltä
  (Postivahdille sanottu, ettei lähetä niitä).
- Ennen omaa nollausta: tools/tallenna-keskustelu.py (tämän checkoutin haara on mainista jäljessä → aja `git show origin/main:tools/tallenna-keskustelu.py`).
