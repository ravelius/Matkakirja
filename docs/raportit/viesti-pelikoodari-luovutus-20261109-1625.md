# Pelikoodari: luovutus 09.11.2026 klo 16.25

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (≥ 25 %). Edellinen: `git show 8016030aa:docs/raportit/viesti-pelikoodari-luovutus-20261109-1535.md`
(sen kaikki kohdat hoidettu tai alla). Kuvat ≤ 1000 px (PIL-arkki scratchpadiin), laajat haut Sonnet-agenteilla.
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), nyt haarassa pelikoodari/pulu-lahteet.
Lokit: /Users/Shared/Claude/proto-3d/lokit/. Skenaariot: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/{pulu-lahteet,pulu-v2,liiketappi}/.

## 1. ODOTTAA JU:TA (katso kuvat itse, sitten PT:lle ≤ 3 riviä + kuvapolku)
- **EN Pulun valmiit cb19b7556** (pulu-lahteet = v2 8c5328689 + lähteet + QA `ui chat siru n`), sk-pulu-v2/sk-pulu-valmiit.txt iphone →
  lokit/pk-pulu-valmiit-iphone-cb19b7556. PT 16.1x VAATII KUVAN: valmiiden kysymysten lista AUKI + yksi vastaus: t-0/t-1 Tuileries,
  t-2/t-3 Monaco (kaupunki:monaco tai maa:MCO, v2:n uusi kohta). Lokissa "ui chat siru: … valmis vastaus kyllä". Kelpaa → PT:lle:
  junaan cb19b7556 (tai uudempi pulu-lahteet-kärki) yhtenä (v2 + lähteet). Pelkkä 8c5328689 ei näytä Monacoa (maa:/kaupunki: vain lähteissä).
  EH (8c5328689) katsottu: FRA 62 kohtaa, mutta PT hylkäsi junasta, koska lista ei näkynyt kuvassa.
- **EK lähteet 2f646e622 KATSOTTU (iphone+ipad)**: lähdejärjestys oikein (p-1 Tuileries valmiit 5, p-3 "generoidut nähtävyys Eiffel-torni
  (Pariisi)", p-3b Lisää → kaupunki:pariisi valmiit 5, p-4 kaupunki:pariisi valmiit, p-5 maa:FRA valmiit). VIKA: p-3:n generoidut sirut
  eivät näkyneet 20 s:ssa (vain Lisää-nappi) → workerin ehdotushaku epäonnistuu hiljaa (PuluChat.Ehdotukset). Diagnoosi e31921ac7
  (lokirivit "MATKAKIRJA pulu: ehdotukset …"/"ohitettu"/"epäonnistui"), JU-ajo sk-pulu-lahteet-2 iphone → lokit/pk-pulu-lahteet3-iphone-e31921ac7
  pyydetty liiketapin perään. TEE: lue syy; jos worker ei vastaa editorissa (ei kehittäjä/verkko), korjaa tai kerro PT:lle. Huom: ilman
  live-generointia (LiveVainKehittajalle && !Kehittaja) korttilähde ei estä kaupungin valmiita (LiveKaytossa-ehto).
- **Liiketappi 8cdb4549c** (natiivi-backup pelikoodari/vasen-tikku = natiivi-ui/palkki-aina aa46f41db + 8841fd32f + liiketappi; OMISTAJA
  16.16 PT:n kautta "vasemman peukalon kohdalle … lähemmäs ja kauemmas sekä vasemmalle ja oikealle … orbit pysyy käynnissä … dronella"):
  LiikeTappi.cs (oikean kameratapin peilikuva, KameraTappi luo ja ajaa), KameraEleet.LiikeMuutos (+ testi LiikeTappiSuunnat, 4/4),
  PalloKierto.TappiLiiku: kierron aikana zoom/siirto kertyy ajon päälle (AjonLiikeSiirto Eteneessä), muuten drone. QA `ui liiketappi tila|x y s`.
  JU-ajo sk-liiketappi-1 iphone + pieni iPad → lokit/pk-liiketappi1-{iphone,ipad-pieni}-8cdb4549c pyydetty EN:n perään. TEE: katso
  l-0 (vasen tappi ei maan nimen/Liiku-napin päällä, varsinkin iPad), l-1…l-3 liike, o-1…o-4 kierto jatkuu ("kierron päällä > 0").
  EI JUNAAN: NUI (16.3x) – PalloKierron kierto-/ajologiikka on NUI:n; uusi NUI-sessio tekee haaraan natiivi-ui/temple-orbit julkisen kutsun
  (etäisyys ± ja keskuksen siirto kiertoa katkaisematta) ja kertoo nimen+sha:n → vaihda LiikeTappi/TappiLiiku sen kutsuun ja poista oma
  ajoLiikeKerroin/AjonLiikeSiirto PalloKierrosta. Kuvat PT:lle katsottuina (tuntumaksi), junaan vasta NUI:n rajapinnalla.
## 2. VALMIIT TÄLLÄ VUOROLLA
- 1d alkuvarjo d58806806 katsottu (a-4s pihan läiskät poissa) → PT:lle 16.2x junarivi 5ed43b793 + d58806806; pari
  _tyo/pelikoodari/juoksu-223/pari-a4s-piha-5ed43b793-vs-d58806806.png. Odottaa PT:n kuittausta.
- Tappi-kierto 8841fd32f katsottu ja PT kuittasi 16.1x → JU vie junaan 223 (arkki _tyo/pelikoodari/pulu-lahteet/arkki-tappi-kierto-iphone-8841fd32f.png).
- Pulun lähteet: merge pulu-v2 → pulu-lahteet (3012382d2), lähde 2 kaupunkinäkymän nähtävyydestä + korttilähde ensin 2f646e622,
  QA siru cb19b7556, diagnoosi e31921ac7.

## 3. JONO
- Kun yllä kuitattu: rivi PT:lle "JONO TYHJÄ: Pelikoodari".
- Tyylikirjan generointi (tyokalut/tarkista.sh): palauta git checkoutilla, ei committiin. tarkista.sh pysähtyy valovahtiin (junan
  Aurinko.cs ym., ei PK:n) → aja unity-tarkistus suoraan: `sh Peli-testit/unity-tarkistus.sh`; testit `cd Peli-testit && sh kaanna.sh <osa>`.
