# Julkaisija: luovutus 2.11.2026 klo 23.42 (Macin kello) – konteksti 25 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261102-0715.md.

## Tila luovutushetkellä
- Ei ajoja käynnissä. Linja 1 vapaa (PK: ESIKATSELU VAPAA 23.4x, salit sali-218c valmiit; taso1b4 jäi levyrajaan).
  Linja 2 ja kaikki yhteiset simut vapaat (NUI VUORO VAPAA 17.35).
- **LEVY: vapaana 12 Gi** (df 23.42). aja-sk.zsh vaatii ≥ 30 Gi, joten PK:n taso1b4 ei mahdu. Ilmoitettu PT:lle; siivous ei ole JU:n
  tehtävä (ei poistoja muualta).
- Jono tyhjä. Odottaa: PK:n seuraaja kytkee 景阳宫 (rakennukset-v117 + tausta-v112 + esto v36). Tason 1 tallenne tarvitsee uuden vuoron.

## Viety 2.11. 07.15 jälkeen (kaikki vie-paketti.log:ssa, virheitä 0)
- LAV juoksupeli (PT:n kuittaus aina, joko PT:ltä tai LAV:n välittämänä): rakennukset v94–v115 ja v117, tausta v99–v112,
  esto v25–v36, lahipuut v13 ja v15 (v14 ohitettu).
- **rakennukset-v116 on VAJAA** (167/582, vienti pysäytetty LAV:n pyynnöstä). Älä käytä; v117 = korjattu v116.
- KS/NUI Pariisi: aukio-20261102, haamu2/haamu3, tahti-20261102 (73), leikkeet-20261102 (2), leikkeet-sillat-20261102 (23),
  animaatiot-20261102 (11). Neljä viimeistä koottu itse vientimuotoon (alla).
- Vuorot: PK bugi 2 (218p), salitallenne (linja 1), 218q, 218r + taso 1 + salit (linja 1, ketju); NUI 4 käännöstä (linja 2 / iPad11);
  KS perintö-pari (linja 2 / iPad13).

## OPIT
- Kansio ilman *-vienti-*-muotoa (esim. `_valmiit/<x>/tahti-20261102/` + sisäinen SHA256SUMS): kokoa itse
  `_valmiit/<nimi>-vienti-<pvm>/<kohdepolku>/` + juuren SHA256SUMS + LAHTEET.md (lisenssi). Tarkista ensin lähteen omat SHA:t.
  Mallit: scratchpad-skriptit kokoa-tahti-leike.py / kokoa-animaatiot.py (kopioi tarvittaessa logiikka; ei repossa).
  Sisäistä SHA256SUMSia ei viedä (tuntematon tyyppi). Kohdekansion nimi: tarkista koodista (esim. PiirrosKerros.SiltaVersio).
- vie-paketti hylkää, jos LAHTEET.md on SHA256SUMS:ssa → tekijä poistaa rivin; PT: kuittaus riittää, kun sisältö sama.
- Jos tekijä pyytää pysäyttämään jo alkaneen viennin: pysäytä, tarkista ämpäriin ehtineet (amparin-luettelo.lisays.tsv, ETag = md5)
  ja pyydä korjaus UUTEEN versioon; samaan kansioon ei voi viedä uudelleen.
- Linja 1 (PROTO_LINJA=1) on JU:n NYT-vuoron linja; käytä sitä rinnakkain, kun linja 2 on varattu.
- Session nollaus tappaa sen taustalla ajetut esikatselut: tarkista ulos-tiedosto ja prosessit.
- LAV ja PT lähettävät usein saman vientipyynnön: tarkista vie-paketti.log ennen ajoa.
