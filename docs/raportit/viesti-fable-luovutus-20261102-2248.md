# PT:n luovutus 2.11.2026 klo 22.48

Edellinen: viesti-fable-luovutus-20261102-2047.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Syy: konteksti 30 % (pehmeä raja). `date` ennen aikaleimoja. Vahdit Monitorilla (30 min, viritä uudelleen):
/Users/Shared/Claude/hooks/codex-posti-vahti.sh ja /Users/Shared/Claude/hooks/odottajat-vahti.py.
Viestit: mcp__ccd_session_mgmt__send_message session id:llä. Junarivit tools/asemataulu/juna.py, työlista tyolista.py.
Loki-PR:t worktreessa (tools/uusi-worktree.sh fable <aihe>, poisto `--poista fable-<aihe>`), merge --squash, ei auto-mergeä.

## YÖVALTUUTUS (omistaja 22.25, loki PR 6036)
"Menen nukkumaan. Saat hyväksyä puolestani kaikki" → KK hyväksyy omistajan puolesta (lista
scratchpad/keskustelukanava/yo-hyvaksynnat-20261102.md). Omistajalle menevät KK:lle. EI: TF/junan lukitus, ostot,
asetukset/avaimet/CLAUDE.md, poistot, generointi yli 3 %:n kiintiön → aamuun.

## OMISTAJAN PÄÄTÖKSET TÄSSÄ VUOROSSA (kaikki lokissa)
- 21.05 juoksupelin arkiset hahmot: ruokaeunukki, palvelijatar, vedenkantaja; särkymisen ääni EI houkuttele jahtaajia
  (PR 6028). PK toteuttaa nykyisen paketin, eunukkikorjausten ja ristikko-ovien jälkeen; tietokortit PK, PT tarkistaa 1914.
- 21.17 aukiot: terassin pronssit (kilpikonna, kurki ym.), leijonat, vesiastiat + lakaisijat, sade lohikäärmeenpäistä (PR 6030).
  LAV tilasi Codexilta (posti 9b79182b4) – EI VIELÄ TOIMITETTU; herätä LAV kun tulee. Sade: VS (aloittaa nyt).
- 21.42 nostot ja saapumiszoomaus kaikkiin Euroopan kaupunkeihin; Raamattu 2.204/2.137/2.138 päivitetty (PR 6033).
  Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261102-nostot-ja-zoomaus-kaikkiin.md.
- 21.53 Pariisin loput palat pala00:n tyylillä: KS tilasi Codexilta palat 1–15 (10a39d6b9). PT päätti: 5 kohteen kyltit
  (62–138 m) siirretään piirroksen kohdalle, ei uutta Codex-kierrosta (KS: kylttisiirrot-pala00.json).

## AUKI JA KENELLÄ
- NUI: osat A+F valmiina haarassa natiivi-ui/zoomaus-kaikkiin-218 (93ac209c8; Alpit, Lappi, Sisilia, Kreeta, Islanti
  rajattuina alueina = PT:n päätös). E (nostot kaikkiin) aloitetaan NYT paikallisilla nostoilla, paikattomat viuhkaan
  kunnes D. Pariisin animaatiot 743728bd7 kuitattu (kytkin), ämpärivienti uuteen kansioon sallittu → JU.
- KS: B (kaupunkikeskustat.json, OSM-ajo, Overpass ruuhkainen) ja D (paikattomat nostot, Sonnet-parvi) – PT kehotti
  aloittamaan D:n rinnalla. Pariisin palat Codexilla → kokoaminen → koko kaupunki KK:lle.
- NS: saapumisen GC osa 1+2 runkoon (juna 218 runko 8d9951aa7; suurin 183 → 142 ms, vahti hylkää yhä). Nollattu;
  seuraavaksi osa C (esilataus, Lontoo + Bratislava), sitten GC jatkuu.
- LAV: itäinen rivi 承乾宫, 钟粹宫, 永和宫 (kytketty), 景阳宫 (v117 + tausta-v112 + esto v36 JU:lla, PK:n seuraaja kytkee)
  hyväksytty. 重华宫 pois (ei reitin varrella). Notre-Dame-rivi oli jo tehty 31.10. → valmis. LAV lepää pronsseihin asti.
- VS: Sarytšev (sarja8) ja Etna (etna5, 182fbf7de) kuitattu kokeina (EI junaan). Nyt sade lohikäärmeenpäistä, sitten
  Etnan lähilauta 19022 (korjaa vanan reunan punaiset pisteet).
- PK: nollattu (fd51e75eb), odottaa ketju14/ketju2-ajoja; sitten KK:n 3 korjausta (kamera oviaukossa, Maali-kortin hattu,
  latauskuvan otsikko), 景阳宫 kytkentä, arkiset hahmot + lakaisijat/vesiastiat (KK ohjaa suoraan).
- JU: odottaa vientejä (v117, animaatiokuvat); lepo oikeutettu.
- Asemataulu: ei cronia ilman Boostia (asemataulu.md luku 8), PT vastasi 22.1x.

## OPPI
- Ennen tehtävän lähettämistä nollattavalle roolille: tarkista, onko se luovutuksessa; jos ei, lähetä uudelleen nollauksen
  jälkeen (NUI:n A/F/E puuttui luovutuksesta 22.05).
- Työlistan "pidossa"-rivit voivat olla jo tehtyjä (Notre-Dame) → tarkista lokista ennen jakoa.
