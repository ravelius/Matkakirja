# Linssisepän luovutus 13.10.2026 klo 17.53 (PT:n nollaus, konteksti 53 %)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot kuten ennen: ketju `ajo-<nimi>.zsh` kansiossa
proto-3d/tyokalut/linssiseppa-ajot/ odottaa Julkaisijan `kaannos-<nimi>.nyt` + `simu-<nimi>.nyt`, irrotus perl setsid (ks. -20261013-paiva.md).
VAIN SIMU -ketju (ei käännöstä): pohja ajo-vesi187i.zsh / ajo-nappula187.zsh (valmis appi lokit/linssiseppa-app/<nimi>).
Ilmoita SIMU VAPAA. Testit `nice -n 15 sh Linssit-testit/kaanna.sh` (tunnettu FAIL PuuttuvatAanetTestit.TehosteetKytketty), `nice -n 15 zsh tyokalut/tarkista.sh | grep "virheitä yhteensä"`.
Edellinen luovutus: viesti-linssiseppa-luovutus-20261013-paiva.md.

## 1. KUITATTU JUNAAN 187 (tässä sessiossa)
- katso-kohteet-187 50a680cde + af91c8cac (Lontoo Lower Thames Street, Tower Bridge keskellä).
- kippi-lontoo-praha-187 f5832e93e (kaupunkierä 3) + Akershusin pysäkkikuva (lokit/kaupungit187-era3-pt/a2-…).
- museo-palaute-187 977be4eee (kävely, 5 kohtaa, kehys, nimen tummennus 72 suikaleena) ja jatko **597057562** (kehys pähkinäpuu 78/74/62 ×
  KehysMustaKerroin 3 → valossa 65/49/34; iPhonen pystyn otsikon taustaliuku Himmennys.Tumma). Kuvat lokit/museo187-pt/kehys187d/.
- **vesi-v15-187 73ae56851** (wt proto-linssiseppa-vesi187, f5832e93e:n päällä): VesiIndeksi v15 ensin; **index-v15 ämpärissä** 17.05
  (sha 62b1cdcb…; Palermo/sisilia + Valletta nosto 0,4 → 2,0 m). Syy: Googlen merimalli nousee 0,4 m:n oman pinnan yli → vaaleat
  suorareunaiset laikut. Vertailu vesi187i–j: 1,5 jättää laikkuja, ≥ 1,8 upottaa Palermon kelluvat laiturit (PT hyväksyi hinnan). Kuvat lokit/vesi187-pt/.
- Aloituslento kohta 1: omistaja "Ei nyt" (lento ennallaan).

## 2. KESKEN: VESILAIKUT MUISSA MERIKAUPUNGEISSA (PT:n päätös odottaa)
Simu lautat188b (Barcelona b1) näytti samat laikut Barcelonassa 0,4 m:llä. 0,4 m:n kaupungit index-v15:ssä: ateena, barcelona, bergen,
edinburgh, helsinki, islanti, koopenhamina, kreeta, marseille, oslo, tampere, tukholma, venetsia. Ehdotettu PT:lle (17.5x): kartoitus
→ index-v16 vain laikullisille (Venetsia ja Tukholma harkiten: rantakadut/LS2:n säätö). VALMIINA: sk-vesi187l-ipad.txt + ajo-vesi187l.zsh
(VAIN SIMU, appi vesi-187k afbcda911, 13 satamakuvaa 0,4 m:llä) – EI käynnistetty; käynnistä vasta PT:n luvalla ja pyydä simu Julkaisijalta.
index-v16 tehdään kuten v15: _valmiit/vesi-v15-vienti-20261013 (python: v15 + nosto_m muutokset, versio/huom, SHA256SUMS, LAHTEET.md) +
koodiin VesiIndeksi.Nimet "index-v16.json" ensin + VesiVerkkoTestit (3 kohtaa: Nimet-merkkijono, "vN ensin", "vN puuttuu → vN-1").
Testaa nosto ensin doc-ohituksella: skenaariossa `doc kaupunki-kuva-asetukset.txt=vesinosto X` ennen kaupunkitilaa (sk-vesi187j-ipad.txt).

## 3. LAUTAT (JUNA 188) – linssiseppa/kaukolautat-188 b2c813d6c (wt proto-linssiseppa-lautat188)
f6ffb0f5a luokittelu (tyokalut/elava_kaupunki_kadut.py KAUKOLAUTAT: avomerelle jatkuvat + KAUKOLAUTTA_NIMET; 38 reittiä 7 kaupungissa
isoiksi; --kuiva-tila) + 0d10f7973 LR:n RoPaxLautta 170 m (Ydin/Elava/RoPaxLautta.cs, LR:n lähde _valmiit/autolautta-ropax-v1;
"autolautta" → RoPaxLautta.Luo(170), vanha 50 m:n malli tyypiksi "maantielautta") + b2c813d6c kuriin (≤ 3 ro-paxia/kaupunki
VesiLiikenne.AutolauttojaMax, 1/reitti, Reitti.PaaVaraM puoli runkoa + 5 m, vana ≤ 250 m myös VesiVanat.cs + VesiPinta.shader = LS2:n
tiedostot, LS2:lle kerrottu). Testit 1672/1673. Simu lautat188b (8e76a53df) OK → KUITTAUSPYYNTÖ PT:llä (kuvat lokit/lautat188-pt/).
Avoimet: 90 m:n versio (RoPaxLautta.Luo(90)) Gozon/Pireuksen pikalautoille ei käytössä (tarvitsee tyypin tai nimipoikkeuksen);
Gozon pikalautta luokittuu ro-paxiksi. kippi187-wt:n haara linssiseppa/kippi-lontoo-praha-187 = samat commitit 0d10f7973:een asti.

## 4. PELINAPPULA (PT:n kiireellinen 16.3x) – SELVITETTY, ei LS1:n
NUI:n iPhone-ajossa a40f8a3d (16.19) nappula puuttui; toistoissa 13/13 näkyi (kaksi iPhonea, myös NUI:n 96044270; pakotettu elävä hetki;
savy oletus/hdr 0/agx 0). Ei alkulentoa polulla, ei sävytoisto → satunnainen. PK:lla diagnostiikka (ca3de062a). Huom: savy-komennot
kanavaan `komento savy …` (ei peli). Todistusajo sammuttaa simun lopuksi (myös toisen roolin laitteen).

## 5. MUUTA
- Proto-wt:t: palaute187, kippi187, alkulento187, katso187, vesi187, lautat188. Appikopiot lokit/linssiseppa-app/ (siivoa: 3 uusinta + käytössä).
- Guillaume II -kipin rivi ennallaan (kuvasta ei voi todeta, PT ok).
- Mac käynnistettiin 15.5x uudelleen: setsid-ketjut kuolevat → tarkista `ps` ja käynnistä uudelleen.
