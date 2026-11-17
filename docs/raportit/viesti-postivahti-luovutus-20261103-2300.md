# Postivahdin luovutus 3.11.2026 klo 23.00 (oma nollaus, konteksti ~29 %)

Pysyvä kulku: KIERROS.md, NOLLAUS.md (tools/tyotavat/, kotikansion haara koti/Matkakirja-posti), aiemmat luovutukset viesti-postivahti-luovutus-20261103-2100.md ym.
Oma id: local_1f31f830-9df5-41c1-8992-172e100af57f. PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a. Muut id:t: /Users/Shared/Claude/osoitekirja.md.

## Tehty 21.00–23.00 (kaikki nollaukset: NOLLAUS-viesti → tyhjä historia → aloitusviesti → RC true → rivi PT:lle)
LAV 01d87dc4a; PK c35a84881 → 274b6e7cc (→ a9e1bc9e0 luovutus tullut 22.57, nollaus KESKEN); VS 298492318 → 77751a6e8; NUI 3d926e2cf → df8d16b1a;
KS 3ea5c4abd → 8e6d1425e → 24e62975b (nollattu 22.39, taustaajot jatkavat omillaan); KK nollautui itse 21.31 (omistajan kortti), aloitusviesti lähetetty;
JU 24e1c2993; PT 56783cb7f (nollattu 22.22, tallenne keskustelut/ ensin); NS 47978e0d2 → 84c531962 (nollattu 22.58).
Aloitusviestiin PT:n lisäohjeet: PK:lle kohdan 0A peruutus (c2eea58ea hylätty, Raamattu 2.200 1eb131604); KS:lle aloitus Louvresta; NS:lle Louvre 7cac734dd JU:lla ensin, nähtävyydet kun KS tuo, sillat kun osat tulevat, Unity-beetan cron uudelleen.

## Opittua
1. NOLLAUS-viesti voi hukkua muiden viestien alle (PK 22.39: historia jäi 161 viestiin) → lähetä uusinta, kun list_events yhä täynnä ja isRunning=false. clear_session toimii vain itselle tai itse käynnistetylle sessiolle; ei muille.
2. Rooli voi päivittää luovutuksensa ennen nollausta (KS kolme kertaa) → käytä AINA uusinta sha:ta aloitusviestissä; PT:n lisäohjeet tulevat samalla.
3. Rooli kysytään NOLLAA/ODOTA, kun luovutus mainitsee käynnissä olevat ajot (KS pid:t, JU ketjut): KS ja JU vastasivat NOLLAA (ajot nohup + omat pid-tiedostot, itsenäisiä). JU:n ajoihin viittaus toisen roolin luovutuksessa (NUI, PK) ei estä nollausta.
4. paivita-kotikansiot.sh vain `zsh`:lla; kotikansio saa jäädä JÄLJESSÄ, kun rooli on committoinut luovutuksen sinne.
5. Sama rooli luovuttaa uudelleen ~35 min nollauksen jälkeen (PK, NUI, VS 25 %:n pehmeä raja täyttyy nopeasti): normaalia, kierrä samalla kaavalla.

## Voimassa olevat linjaukset
- Levy: PT 22.4x: ilmoita PT:lle levystä VASTA alle 40 Gi:ssä (nyt ~66 Gi; heilunta käännöksiä ja swapia 11 Gi, ei karkaavaa täyttöä). Korvaa 100 Gi:n rajan toistuvat ilmoitukset.
- KK 35 % → rivi "päivitä aloitus.md" lähetetty 22.46; ≥40 % → "kysy omistajalta nollaus" (kerran). KK:n nollaus vain omistajan kortilla.
- Rajat: PK, NUI, JU, VS, KS, NS, LAV pehmeä 25 % (kova 35); PT 30/40; Postivahti oma 30 %.
- Codex ei odottanut mitään (codex-odottaa.py tyhjä), Codex-muisti ~1,8–3 Gt.
- Viikkokäyttö 18 % (22.46), reset 9.11. 01:00Z.
- KIERROS.md: kontekstit yksi kerrallaan, ei rinnakkain.

## Seuraavaksi (päivitetty 23.12, oma konteksti 34 %)
Nollattu 23.05–23.10: KS 33e069bb4, PK 832b43ee2, KK (yönollaus 23.05), PT be5435c44 (aloitusviesti lähetetty/jonossa 23.10, RC päällä). PT:lle ND-kuvia ei tarvitse lähettää uudelleen.
KESKEN:
1. Valoseppä (local_5ebb0658-96f6-434d-8a38-b122eb53032f): luovutus 838397956 (haara linssiseppa2/luovutus-20261103-2301, kohta LISÄYS; tarkista git log onko uudempi), RC pois, kotikansio tehty. NOLLAUS lähetetty 23.06 ja 23.08 mutta VS jatkaa työtä (running, ~280 viestiä). Kun isRunning=false → NOLLAUS-viesti → list_events tyhjä → aloitusviesti (VALOSEPPÄ (Opus, high), kansio /Users/Shared/Claude/Matkakirja-linssiseppa-2; luovutus git -C /Users/Shared/Claude/Matkakirja-posti show <uusin sha>:docs/raportit/viesti-valoseppa-luovutus-20261103-2301.md; PT:n ohje: korttelipinta k5:n päälle, KK:n lista: L-läiskät, julkisivureuna + muste, harmaat kiekot, sauma, heti; Raamattu 12.4) → RC true → rivi PT:lle "nollattu Valoseppä (<sha>)".
2. Julkaisija (local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd): luovutus 771a98b96 (docs/raportit/viesti-julkaisija-luovutus-20261103-2301.md, uusin; tarkista onko uudempi), RC pois, kotikansio tehty. NOLLAUS lähetetty 23.08 ja 23.11, JU käsittelee viestejä (running, 389 viestiä). Kun isRunning=false → NOLLAUS-viesti (uusinta jos ei tehoa) → tyhjä → aloitusviesti (JULKAISIJA (Opus, medium), kansio /Users/Shared/Claude/Matkakirja-julkaisija; luovutus git show 771a98b96:docs/raportit/viesti-julkaisija-luovutus-20261103-2301.md; PT:n ohje: 4397cf20d-savu ja koealue fb7ff2595 ajettava uudelleen, VS:n k11 peruttu, 9528c1d53 koeajona, kaikki kuvat katsotaan ennen valmis-riviä; ajot jatkavat omilla pid-tiedostoillaan; Raamattu 12.4) → RC true → rivi PT:lle "nollattu Julkaisija (771a98b96)".
3. Normaali kierros 10 min (ScheduleWakeup, prompt "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan"): PT, KK, kaikki roolit yksi kerrallaan (viimeksi luettu 22.11–22.46; PT 8 %, KK nollattu), levy (ilmoitus PT:lle vasta < 40 Gi), codex-odottaa.py, Codex-muisti.
4. Oma nollaus kun jono tyhjä (clear_session self estyy, jos viesti jonossa).
