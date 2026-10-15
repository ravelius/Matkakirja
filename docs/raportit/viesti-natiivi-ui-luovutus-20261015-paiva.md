# Natiivi-UI: luovutus 15.10.2026 klo 11.5x (tilinvaihto, Postivahdin pyyntö)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261014-ilta3.md (säännöt, opit,
worktreet). Viestit send_messagella id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md, PT:lle ≤ 3 riviä. Käännökset VAIN
Julkaisijan KÄÄNNÖS NYT -viestillä (käännöslinja eli LINJA kerrotaan viestissä), simut SIMULAATTORI NYT; LUKKO VAPAA / SIMU VAPAA perään.
Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012 (testi192w-kaanna.sh, skan192w-simut.sh,
sk-skan192w-{iphone,ipad}.txt ovat uusimmat mallit). Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat).
Työpuu: /Users/Shared/Claude/wt/proto-natiivi-ui-issikkuna (haara natiivi-ui/iss-193).

## VALMIS: ISS-SKANNERI JUNAAN 192 (omistaja hyväksyi 10.33, Kaytossa = true)
- natiivi-ui/iss-193 **4a68ce760** + pelikoodari/iss-nimet-192-nui **414f68bd5** → PT välittää NS:lle (ilmoitettu PT:lle 10.4x).
  Koeyhdistys juna-192 c023df27e + molemmat = natiivi-ui/koe-juna192-skanneri e45319b88: ei ristiriitoja, unity 0, vahdit ok.
  VARMISTA NS:ltä, että molemmat ovat junan 192 rungossa.
- Skannerin linjaukset (omistaja 08.10, 08.12, 08.35, 10.02, 10.05, 10.33), kaikki IssSkanneri.cs:ssä:
  zoomaus pisteestä 0,7 s (omistajan poikkeus 250 ms:n rajaan) → pyörähdys 1,1 s → teksti kirjain kerrallaan 0,03 s (digitaalinen
  naksahdus iss-skanneri-kirjain, välilyönti äänetön) → ennen jokaista datariviä lukutauko (merkit/15 s, väh. 0,5 s, ×0,75–1,25;
  ensimmäinen ×0,6), kursori vilkkuu uuden rivin alussa. Datarivit "NIMIKE ........ arvo": arvot samassa sarakkeessa (Mittaa()
  mittaa nimikesarakkeen, Iowan Old Style ei ole tasalevyinen). Ei aseman lukemia eikä koordinaatteja. Luvut "643 452" (Tuhannet).
  Tekstiruutu puhelimella turva-alueen levyinen, iPadilla ≤ 460 pt. Pysyy, kunnes napautetaan; sulku 1,5 s: rivit pois alhaalta
  ylös 0,9 s, kuva pienenee pisteeseen 0,6 s. Piste + viiva häipyvät Cupolan lasin reunalla (IssKyytiNakyma.VedonLasi).
- Aineisto Resources/IssSkanneri: faktat.json + data.json (SK, PT hyväksyi; data.json:ssa myös keskilampo 45 kohteelle), 143 kohteen
  korkeuskartat (KS). KS:n datat.json (karttaseppa/iss-skanneri-193) EI käytössä (sama tieto SK:n datassa).
- Äänet OhjaamonAanet: ämpäri aanet/cupola/skanneri/v2/ (avaus = iss-skanneri-avaus-pitka.wav, sirina, rivi, sulku, kirjain).
  OMISTAJA 10.33: "etsi toinen digi kirjoituskoneen ääni" → omistajan valinta iss-skanneri-kirjain-mekaaninen.wav: iss-193
  **ad776c15d** (OhjaamonAanet lataa sen tehosteeksi iss-skanneri-kirjain) annettu NS:lle JUNAAN 193 (11.5x); varmista NS:ltä.
- Videot: proto-3d/_valmiit/skanneri-video-20261015/skanneri-ateena-{iphone,ipad}-v2.mp4 (äänet lisätty jälkikäteen:
  ajoskriptit/aanita2.py <video> <konsoli-stdout.log> <äänikansio> <ulos> + vihrea.py; iPad käännetään transpose=2). Uusi video vain pyynnöstä.

## AVOIMET
1. LS1:n tarkistuslista (PT:n pyyntö): Ranskan salin teosnimi osuu kankaan päälle iPad vaakana 37/51 teoksessa (4 rajalla):
   /Users/Shared/Claude/proto-3d/lokit/todistus-ranskasali2-ipad-20261015-0120/nimikyltit/TARKISTUSLISTA.md (+ kulmat-1…3.png).
   Ehto: kankaan vasen reuna < ~25 % ruudun leveydestä ja yläreuna < ~17 % korkeudesta. Ei aloitettu.
2. Omistaja 09.36: "Ei testejä junaan" (vain skannerivideo oli poikkeus).
3. Levy oli 99 %: NUI:n vanhat app-kopiot poistettu, jäljellä natiivi-ui-app-testi192v ja -192w (poista vanhempi seuraavan
   käännöksen jälkeen). Testihaarat natiivi-ui/testi-192* ja koe-* ovat poistettavissa junan 192 jälkeen.

## Opit
- Simu-video on mykistetty: äänet liitetään jälkikäteen pelin ajoituksin ja asia merkitään PT:lle.
- Avaus- ja sulkuhetki videosta vihreiden pikselien määrästä; iPadilla ohjaamon LCD-vihreä katoaa avauksessa → pohjataso videon lopusta.
- Kielivahti ei hyväksy muuttuvaa avainta ("ui.lehti.saa.kuu-" + n) → avaimet taulukkoon.
- Julkaisijan käännös antaa oman SHA:n (kääntöpalvelu yhdistää); käännöksen tunniste on kaannos.txt / KÄÄNNETTY-rivi, ei haaran kärki.
