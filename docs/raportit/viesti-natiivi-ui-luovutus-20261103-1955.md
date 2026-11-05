# Natiivi-UI: luovutus 3.11.2026 klo 19.55 (konteksti 25 %, pehmeä raja; elävä kartta vaihe 1 ja lähizoomin VIKA-korjaus JU:lla)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1915.md (sen jono käsitelty: 1 todistettu, 2 korjattu 200f73222 PT:llä, 3 D-todistus OK).
Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto, peili natiivi-backup peili/proto/<haara>.

## Tehty
- **Animaatiot 6b891fd1d todistettu** (todistus-animaatiot-6b891fd1d-20261103-1910): veneet 8/8, linnut 4/4, pallo 1/1, 0 poikkeusta;
  PUUTE vain skenaarion odotusrivin ajoitus. PT: junalupa annettu, iso paketissa (7ac89ff33). L1 vapautettu JU:lle.
- **D-todistus OK:** suorat aloitukset 3,0–6,5 s (julkaisija-paketti-iso-a92302399-1856/suora.txt).
- **Kuvamerkit pieniksi ympyröiksi:** jo tehty af57175ba, paketissa; työlistarivi päivitetty (valmis-merkintä vasta laitteella).
- **Elävä kartta vaihe 1: 20b21efee** (natiivi-ui/elava-kartta-218, wt/proto-natiivi-ui-elava-kartta, 6b891fd1d:n päällä):
  PiirrosKerros.Animaatiot.cs yleiseksi, data Resources/Animaatiot/<kaupunki>.json (pariisi.json generoitu vanhoista taulukoista),
  muualla striimikartan päällä todellisissa koordinaateissa. Selitys proto-3d/_tyo/natiivi-ui/elava-kartta-20261103.md.
  JU: L1-jonossa 7ac89ff33-ketjun jälkeen, käännös a92302399+20b21efee, skenaario
  proto-3d/_tyo/natiivi-ui/animaatiot-20261102/skenaario-20b21efee.txt, loki julkaisija-tyokalut/nui-elava-20b21efee.log.
  NS:lle kerrottu: yhdistettäessä PiirrosPohjana(k) => k.piirros && Karikatyyri && !Koealue.
- **mittaa-ilman-konsolia.zsh** (proto-3d/lokit/nui-lahizoom-20261103/): iso iPad `devicectl … --console` → CoreDeviceError 10002
  19.1x alkaen; skripti käynnistää ilman konsolia ja hakee Documents-lokit (muistivahti.log/-tulos/-edellinen, muisti-tarkka …). JU: toimi.
- **e971e1992 lähizoomin VIKA** (natiivi-ui/karttaui-porras-218, 200f73222:n päällä, wt/proto-natiivi-ui-karttaui-porras):
  iso-7ac89ff33-2 19.51.16 VIKA 4190 Mt: nostokortti auki → nostokerros sumennettu; kamera-ajossa merkit reunan yli → kerroksen
  rajat muuttuivat joka ruudussa → uusi ~50 Mt TempBuffer per ruutu (RT(piilo) 51 → 58 kpl, 543 → 1012 Mt; muisti-tarkka T-rivit 6427 vs
  7067). Korjaus: sumennettu nostokerroksen juuri overflow hidden. unity-tarkistus 0. Viestit JU:lle ja PT:lle jonossa (19.55).

## SEURAAJAN JONO
1. **e971e1992 uusinta** (JU: iso + mittaa-ilman-konsolia.zsh). OK = ei VIKAa lähizoomissa, T-rivillä RenderTexture(piilo) ei kasva
   kymmenillä TempBuffereilla. Jos yhä kasvaa: overflow ei rajaa UITK:n suodinrajoja → vaihtoehto: kortin ollessa auki nostokerros
   sumennetaan kiinteäkokoisen kääreen kautta tai kamera-ajon ajaksi suodin pois. HUOM skripti: 'ui napautaklik 20 300' ei sulje
   korttia (sulku vain ✕), joten lähizoom tehdään kortti auki – pidä niin todistuksessa, oikean sulun testi erikseen.
2. **20b21efee todistus** (JU:n tulos): 1–3 vertaa todistus-animaatiot-6b891fd1d-20261103-1910/kuvat/ (samat veneet, linnut, pallo),
   4 = karikatyyri pois → veneet striimikartalla ('striimillä' tilarivillä). OK → kuvapari PT:lle + junalupa. Työlistarivi
   "Kartta elää kevyesti kaikissa kaupungeissa" päivitetty 19.5x.
3. Elävä kartta vaihe 2 (vasta KK:n/PT:n suunnitelman jälkeen, vastuu KK osakirjaston kanssa): muiden kaupunkien json + kuvat
   (Codex), liikkujien siirto NS:n esinekerroksen AsetaLiikkuvaan, kun animaatiot ja koealue-esineet ovat samassa junassa.
4. Juoksupelin salit ys/tj/cx/ty/xf Testihypyt.Aloitukset-listaan, kun PK:n salikomento on junassa. Koealue osa C on NS:llä.
