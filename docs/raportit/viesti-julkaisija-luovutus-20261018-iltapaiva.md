# Julkaisijan luovutus 18.10.2026 klo 14.3x (iltapäivä)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Edellinen: `viesti-julkaisija-luovutus-20261018-aamupaiva.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md. Viestit aina `mcp__ccd_session_mgmt__send_message` session-id:llä. Levy 47 Gi (14.2x).

## 0. HETI: juna 202 LUKITTU – TF odottaa NS:n BUILD 202 -sha:ta
- PT 14.3x: **LUKITSE 202** (OMISTAJA PYYSI JULKAISUA 13.32; KK hyväksyi logon). Web 5/5 MERGETTY: #4854 c27d59f92,
  #4855 b965877e5, #4860 cc6cdc9c8, #4862 569505396, #4861 4634cfcf5. Muutosloki #4875 MERGETTY **4162457fd** (= M).
- Runko 13ed936fc9ec87e294e20c233bacb361c119de5e (be8c2400b + logo 2b944e920), NS:n testit vihreät 14.28; **NS:n lukituskäännös
  alkoi 14.29** → NS lähettää KÄÄNNETTY + BUILD 202 -sha:n (proto master, täysi sha).
- Kun sha tulee: `/Users/Shared/Claude/julkaisija-tyokalut/tf-kaynnista.sh 202 <BUILD-täysi-sha> 4162457fdd5c7c0921ac6859b04c15756ef43fed`
  (muistiajo-202.txt = OHITETTU, PT: omistaja 15.10. 09.36 "EI TESTEJÄ JUNAAN"). Ketju tf202.sh → tf202-ketju.log. Mac-TF NS kuten 201.
- **TF-viestiin KK:n huomio:** laitteella ensimmäinen avaus voi vielä näyttää vanhan mustan ruudun (iOS:n käynnistysruutuvälimuisti).
- TF-vaiheet asemataululle + rivi PT + KK (muisti tf-valmistuminen-asemataululle).

## 1. Jono 202:n jälkeen (PT 14.2x, juna 203)
1) Vie `vie-paketti.sh /Users/Shared/Claude/proto-3d/_valmiit/taidemuseo-ranska-v2p-vienti-20261018`.
2) Käännös LR 0c4c99767 (oma kansio _tyo/linnanrakentaja/…) → simu kehykset + GG lähikuvat → LR + PT.
- LS Mona Lisa 202h käännetty (ei simua tänään; PT: Mona Lisa junaan 203).

## 2. Tila nyt
- Simu VAPAA (NUI 14.22). L1/L2: vain NS:n lukituskäännös. Levyvahti **korjattu** pid 95403 (`zsh levyvahti-l2.zsh`):
  vain L2-odottajat SIGSTOP, SIGCONT automaattisesti ≥ 26 Gi tai 30 min, trap vapauttaa; rivit "LEVYVAHTI SIGSTOP/SIGCONT"
  tf-jonoon → Monitor → PT. Kuolee nollauksessa → käynnistä uudelleen (aloitus vapauttaa jäänteet).
- Tänään viety: sali-v2l, v2m, v2n, v2o (LR). _tyo/julkaisija: juna201-kuva8, juna202-kuva1/2/3, juna202-logo-release-app
  (ab1cf9481 = lopullinen logo; voi siirtää T7:lle TF:n jälkeen). LR:n louvre-v9/v9b → LR poistaa itse.

## 3. Opit
- 10.01–10.46 molemmat linjat seis: vanha levyvahti SIGSTOPasi (myös L1:n lukon haltijan) eikä vapauttanut → korjattu (yllä).
  Tarkista `ps -o stat` (T = pysäytetty), jos käännös ei etene.
- Seuraa omia käännöslokeja Monitorilla (KÄÄNNETTY|VIKA): simu oli 15 min tyhjä 12.33–12.48, kun valmistumista ei huomattu.
- Kun kaksi saman roolin käännöstä menee samaan app-kansioon ja simu ajaa siitä → oma kansio uudelle (ei ylikirjoitusta kesken).
- Toisen roolin _tyo-kansioita ei poisteta (ei poistoja oman työtilan ulkopuolelta) → rooli poistaa itse tai mv T7:lle.
- Lukkojonossa odottava ajo uudelleen jonoon → järjestys voi kääntyä (kilpajuoksu); peru ja jonota molemmat oikeassa järjestyksessä.
